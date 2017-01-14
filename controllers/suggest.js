//var _ = require('lodash');
//var async = require('async');
//var crypto = require('crypto');
//var nodemailer = require('nodemailer');
//var passport = require('passport');
var Suggest = require('../models/Suggest');
var _ = require('underscore');


exports.getSuggset = function (req,res) {
    res.render('suggest', {
        title: 'suggest'
    });
};

exports.postSuggest = function (req, res,next) {
    var _suggestObj = req.body.suggest;
    console.log('the _suggest is '+_suggestObj);
    var suggest = new Suggest(_suggestObj);
    console.log('the suggest is '+suggest);

    if(req.user){
        suggest.userId=req.user._id;
    }
    // req.assert('email', 'Email is not valid').isEmail();
    // req.assert('password', '密码不得少于6位').len(6);
    // req.assert('confirmPassword', '两次密码不一样！请重新输入').equals(req.body.password);

    // var errors = req.validationErrors();
    //
    // if (errors) {
    //     req.flash('errors', errors);
    //     return res.redirect('/suggest');
    // }



    suggest.save(function (err) {
        if (err) {
            return next(err);
        }


        req.flash('success', {msg: 'Success! 留言成功.'});
        res.redirect('back');
    });

};

