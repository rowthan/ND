var _ = require('lodash');
var passport = require('passport');
var request = require('request');
var InstagramStrategy = require('passport-instagram').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var OpenIDStrategy = require('passport-openid').Strategy;
var OAuthStrategy = require('passport-oauth').OAuthStrategy;
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/User');
var Post = require('../models/Post');

var nodemail = require('./nodemail');
// var UserPro = require('../proxy/user');

var authconfi =require('../config/config').auth;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/**
 * Sign in with Instagram.
 */
passport.use(new InstagramStrategy({
  clientID: process.env.INSTAGRAM_ID,
  clientSecret: process.env.INSTAGRAM_SECRET,
  callbackURL: '/auth/instagram/callback',
  passReqToCallback: true
},function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({ instagram: profile.id }, function(err, existingUser) {
      if (existingUser) {
        req.flash('errors', { msg: 'There is already an Instagram account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, function(err, user) {
          user.instagram = profile.id;
          user.tokens.push({ kind: 'instagram', accessToken: accessToken });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.picture = user.profile.picture || profile._json.data.profile_picture;
          user.profile.website = user.profile.website || profile._json.data.website;
          user.save(function(err) {
            req.flash('info', { msg: 'Instagram account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ instagram: profile.id }, function(err, existingUser) {
      if (existingUser) {
        return done(null, existingUser);
      }
      var user = new User();
      user.instagram = profile.id;
      user.tokens.push({ kind: 'instagram', accessToken: accessToken });
      user.profile.name = profile.displayName;
      // Similar to Twitter API, assigns a temporary e-mail address
      // to get on with the registration process. It can be changed later
      // to a valid e-mail address in Profile Management.
      user.email = profile.username + "@instagram.com";
      user.profile.website = profile._json.data.website;
      user.profile.picture = profile._json.data.profile_picture;
      user.save(function(err) {
        done(err, user);
      });
    });
  }
}));

/**
 * Sign in using Email or name and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
  email = email.toLowerCase().trim();

  User.findOne({$or : [{'profile.name': email},{email:email}] }).select('+password profile.name forbid').exec( function(err, user) {
    console.log('select user'+user);
    if (!user) {
      return done(null, false, { message: '该账户不存在 ' + email});
    }
    if(user.forbid){
      return done(null, false, { message: '该账户已经被禁用 无法登陆 ' + email});
    }
    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        // var user0=JSON.stringify({
        //   name:user.profile.name,
        //   _id:user._id,
        // });

        return done(null, user,{ message: '登陆成功.' });
      }
      else {
        return done(null, false, { message: 'Invalid email or password.' });
      }
    });
  });
}));

/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({ facebook: profile.id }, function(err, existingUser) {
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, function(err, user) {
          user.facebook = profile.id;
          user.tokens.push({ kind: 'facebook', accessToken: accessToken });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          user.save(function(err) {
            req.flash('info', { msg: 'Facebook account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ facebook: profile.id }, function(err, existingUser) {
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ email: profile._json.email }, function(err, existingEmailUser) {
        if (existingEmailUser) {
          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' });
          done(err);
        } else {
          var user = new User();
          user.email = profile._json.email;
          user.facebook = profile.id;
          user.tokens.push({ kind: 'facebook', accessToken: accessToken });
          user.profile.name = profile.displayName;
          user.profile.gender = profile._json.gender;
          user.profile.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          user.profile.location = (profile._json.location) ? profile._json.location.name : '';
          user.save(function(err) {
            done(err, user);
          });
        }
      });
    });
  }
}));

/**
 * Sign in with GitHub.
 */
passport.use(new GitHubStrategy({
  clientID: authconfi.github.clientID,
  clientSecret: authconfi.github.clientSecret,
  callbackURL: authconfi.github.callbackURL,//'http://localhost/auth/github/callback',
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
  if(profile._json.email){
    console.log('callback');
    if (req.user) {//手动关联
      User.findOne({ github: profile.id }, function(err, existingUser) {
        console.log('this is err '+err+'and id is '+profile.id);
        if (existingUser) {
          req.flash('errors', { msg: '该github账户已经关联到您脑洞网账号，无需重新绑定。进入我的账户-账号管理，重新绑定或断开绑定。' });
          done(err);
        } else {
          User.findById(req.user.id, function(err, user) {
            console.log('find by id');
            user.github = profile.id;
            user.tokens.push({ kind: 'github', accessToken: accessToken });
            user.profile.name = user.profile.name || profile.displayName;
            user.profile.picture = user.profile.picture || profile._json.avatar_url;
            user.profile.location = user.profile.location || profile._json.location;
            user.profile.website = user.profile.website || profile._json.blog;
            user.save(function(err) {
              if(err){
                console.log('error save'+err);
              }
              req.flash('info', { msg: 'GitHub 账户已经关联成功 .' });
              done(err, user);
            });
          });
        }
      });
    }
    else {//第三方登陆
      User.findOne({ github: profile.id }, function(err, existingUser) {
        if (existingUser) {
          return done(null, existingUser);
        }

        User.findOne({ email: profile._json.email }, function(err, existingEmailUser) {
          if (existingEmailUser) {
            req.flash('errors', { msg: '该github邮箱'+profile._json.email+'已经在脑洞网被注册，为了您的安全，请使用邮箱登陆后关联github账户！如果您未曾注册过本网站，您的邮箱地址可能被盗用，请使用忘记密码找回账户。' });
            done(err);
          }
          else {//第一次使用
            console.log('the callback profile is'+JSON.stringify(profile));
            var user = new User();
            user.email = profile._json.email;
            user.github = profile.id;
            user.tokens.push({ kind: 'github', accessToken: accessToken });
            user.profile.name = profile.displayName;
            
            var password=user.email;
            user.password=password;

            user.profile.picture = profile._json.avatar_url;
            user.profile.location = profile._json.location;
            user.profile.website = profile._json.blog;
            user.save(function(err) {
              if(!err){
                var text ='您的密码为'+password+'请及时更新';
                nodemail.sendEmail(user.email,'naodong 密码提醒',text,function (err) {
                  req.flash('info',{msg:'您使用github第一次登陆成功，账户密码已发送至您的邮箱，为了您的账户安全，请尽快修改密码！'});
                  done(err, user);
                })
              }
            });
          }
        });
      });
    }
  }
  else{
    req.flash('info',{msg:'使用github登陆，脑洞网需要获取github账号'+profile.displayName+'邮箱地址。请在github中设置允许访问：setting-profile-Public email'});
    done()
  }

}));

// Sign in with Twitter.

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: '/auth/twitter/callback',
  passReqToCallback: true
}, function(req, accessToken, tokenSecret, profile, done) {
  if (req.user) {
    User.findOne({ twitter: profile.id }, function(err, existingUser) {
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a Twitter account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, function(err, user) {
          user.twitter = profile.id;
          user.tokens.push({ kind: 'twitter', accessToken: accessToken, tokenSecret: tokenSecret });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.location = user.profile.location || profile._json.location;
          user.profile.picture = user.profile.picture || profile._json.profile_image_url_https;
          user.save(function(err) {
            req.flash('info', { msg: 'Twitter account has been linked.' });
            done(err, user);
          });
        });
      }
    });

  } else {
    User.findOne({ twitter: profile.id }, function(err, existingUser) {
      if (existingUser) {
        return done(null, existingUser);
      }
      var user = new User();
      // Twitter will not provide an email address.  Period.
      // But a person’s twitter username is guaranteed to be unique
      // so we can "fake" a twitter email address as follows:
      user.email = profile.username + "@twitter.com";
      user.twitter = profile.id;
      user.tokens.push({ kind: 'twitter', accessToken: accessToken, tokenSecret: tokenSecret });
      user.profile.name = profile.displayName;
      user.profile.location = profile._json.location;
      user.profile.picture = profile._json.profile_image_url_https;
      user.save(function(err) {
        done(err, user);
      });
    });
  }
}));

/**
 * Sign in with Google.
 */
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/auth/google/callback',
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({ google: profile.id }, function(err, existingUser) {
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, function(err, user) {
          user.google = profile.id;
          user.tokens.push({ kind: 'google', accessToken: accessToken });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || profile._json.image.url;
          user.save(function(err) {
            req.flash('info', { msg: 'Google account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ google: profile.id }, function(err, existingUser) {
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ email: profile.emails[0].value }, function(err, existingEmailUser) {
        if (existingEmailUser) {
          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
          done(err);
        } else {
          var user = new User();
          user.email = profile.emails[0].value;
          user.google = profile.id;
          user.tokens.push({ kind: 'google', accessToken: accessToken });
          user.profile.name = profile.displayName;
          user.profile.gender = profile._json.gender;
          user.profile.picture = profile._json.image.url;
          user.save(function(err) {
            done(err, user);
          });
        }
      });
    });
  }
}));

/**
 * Sign in with LinkedIn.
 */
passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_ID,
  clientSecret: process.env.LINKEDIN_SECRET,
  callbackURL: process.env.LINKEDIN_CALLBACK_URL,
  scope: ['r_basicprofile', 'r_emailaddress'],
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findOne({ linkedin: profile.id }, function(err, existingUser) {
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a LinkedIn account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, function(err, user) {
          user.linkedin = profile.id;
          user.tokens.push({ kind: 'linkedin', accessToken: accessToken });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.location = user.profile.location || profile._json.location.name;
          user.profile.picture = user.profile.picture || profile._json.pictureUrl;
          user.profile.website = user.profile.website || profile._json.publicProfileUrl;
          user.save(function(err) {
            req.flash('info', { msg: 'LinkedIn account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ linkedin: profile.id }, function(err, existingUser) {
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ email: profile._json.emailAddress }, function(err, existingEmailUser) {
        if (existingEmailUser) {
          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with LinkedIn manually from Account Settings.' });
          done(err);
        } else {
          var user = new User();
          user.linkedin = profile.id;
          user.tokens.push({ kind: 'linkedin', accessToken: accessToken });
          user.email = profile._json.emailAddress;
          user.profile.name = profile.displayName;
          user.profile.location = profile._json.location.name;
          user.profile.picture = profile._json.pictureUrl;
          user.profile.website = profile._json.publicProfileUrl;
          user.save(function(err) {
            done(err, user);
          });
        }
      });
    });
  }
}));

/**
 * Tumblr API OAuth.
 */
passport.use('tumblr', new OAuthStrategy({
    requestTokenURL: 'http://www.tumblr.com/oauth/request_token',
    accessTokenURL: 'http://www.tumblr.com/oauth/access_token',
    userAuthorizationURL: 'http://www.tumblr.com/oauth/authorize',
    consumerKey: process.env.TUMBLR_KEY,
    consumerSecret: process.env.TUMBLR_SECRET,
    callbackURL: '/auth/tumblr/callback',
    passReqToCallback: true
  },
  function(req, token, tokenSecret, profile, done) {
    User.findById(req.user._id, function(err, user) {
      user.tokens.push({ kind: 'tumblr', accessToken: token, tokenSecret: tokenSecret });
      user.save(function(err) {
        done(err, user);
      });
    });
  }
));

/**
 * Foursquare API OAuth.
 */
passport.use('foursquare', new OAuth2Strategy({
    authorizationURL: 'https://foursquare.com/oauth2/authorize',
    tokenURL: 'https://foursquare.com/oauth2/access_token',
    clientID: process.env.FOURSQUARE_ID,
    clientSecret: process.env.FOURSQUARE_SECRET,
    callbackURL: process.env.FOURSQUARE_REDIRECT_URL,
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    User.findById(req.user._id, function(err, user) {
      user.tokens.push({ kind: 'foursquare', accessToken: accessToken });
      user.save(function(err) {
        done(err, user);
      });
    });
  }
));

/**
 * Venmo API OAuth.
 */
passport.use('venmo', new OAuth2Strategy({
    authorizationURL: 'https://api.venmo.com/v1/oauth/authorize',
    tokenURL: 'https://api.venmo.com/v1/oauth/access_token',
    clientID: process.env.VENMO_ID,
    clientSecret: process.env.VENMO_SECRET,
    callbackURL: process.env.VENMO_REDIRECT_URL,
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    User.findById(req.user._id, function(err, user) {
      user.tokens.push({ kind: 'venmo', accessToken: accessToken });
      user.save(function(err) {
        done(err, user);
      });
    });
  }
));

/**
 * Steam API OpenID.
 */
passport.use(new OpenIDStrategy({
  apiKey: process.env.STEAM_KEY,
  providerURL: 'http://steamcommunity.com/openid',
  returnURL: 'http://localhost:3000/auth/steam/callback',
  realm: 'http://localhost:3000/',
  stateless: true
}, function(identifier, done) {
  var steamId = identifier.match(/\d+$/)[0];
  var profileURL = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + process.env.STEAM_KEY + '&steamids=' + steamId;

  User.findOne({ steam: steamId }, function(err, existingUser) {
    if (existingUser) return done(err, existingUser);
    request(profileURL, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        var profile = data.response.players[0];

        var user = new User();
        user.steam = steamId;
        user.email = steamId + '@steam.com'; // steam does not disclose emails, prevent duplicate keys
        user.tokens.push({ kind: 'steam', accessToken: steamId });
        user.profile.name = profile.personaname;
        user.profile.picture = profile.avatarmedium;
        user.save(function(err) {
          done(err, user);
        });
      } else {
        done(error, null);
      }
    });
  });
}));

/**
 * Login Required middleware.
 */
exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('errors',{ msg: '您还未登陆，请登陆后操作！' });
  res.redirect('/login?url='+req.originalUrl);
};

exports.isAdmin = function (req,res,next) {
  if(req.user.role>1){
    return next();
  }
  req.flash('errors',{msg:'您不是管理员，无权操作！'});
  res.redirect(req.originalUrl);
};

exports.isSuperAdmin = function (req,res,next) {
  if(req.user.role>=100){
    return next()
  }
  req.flash('errors',{msg:"您无权设置"});
  res.redirect('back');
};

exports.isAuthor = function (req,res,next) {
  var postid =req.query.postid|| req.params.token;
  if (!postid){
    req.flash('errors',{msg:"未接受到参数"});
    res.redirect('back');
  }

  Post.findOne({_id:postid},'userId',function (err,result) {

    if(result.userId.toString()==req.user._id.toString()){
      return next()
    }
    else{
      req.flash('errors',{msg:"您不是原作者 无权操作"});
      res.redirect('back');
    }
  })

};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = function(req, res, next) {
  var provider = req.path.split('/').slice(-1)[0];

  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect('/auth/' + provider);
  }
};
