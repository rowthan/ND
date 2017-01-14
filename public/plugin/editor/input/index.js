"use strict";

var width = window.innerWidth;
var height = window.innerHeight;
var frameRate = 1 / 40;
var canvas = "";
var ctx = "";

var randomstartplacement = false;
var rainbowmode = true;
var letterpushed = false;
var letterlist = [];

var Cd = 0.47;
var rho = 1.22;
var A = Math.PI * 15 * 15 / 10000;
var ag = 9.81;

function test() {
  var x = document.getElementById("editor").value || "";
  var length = x.length;
  var str = x.substr(length-1,length) || null;
  keyUp(str);
}

var setup = function setup() {
  canvas = document.getElementsByTagName("canvas")[0];
  ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  window.addEventListener('resize', resizeCanvas, false);
  // window.addEventListener('keydown', keyUp, false);



  document.getElementById('rainbow').onclick = function (e) {
    rainbowmode = e.currentTarget.checked;
  };

  document.getElementById('startplacement').onclick = function (e) {
    randomstartplacement = e.currentTarget.checked;
  };

  ctx.shadowBlur = 50;

  initSentence("你好 跟我一起!秀出你的脑洞！！");
  loop();
};

var resizeCanvas = function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  ctx.shadowBlur = 50;
};

var keyUp = function keyUp(e) {
  letterpushed = true;
  var ltr = generateLetter(e);//String.fromCharCode(e.keyCode)
  letterlist.push(ltr);
};

var initSentence = function initSentence(s) {
  var sentence = s.split('');
  var i = 0;
  letterpushed = false;
  setInterval(function () {
    if (sentence.length >= i + 1 && !letterpushed) {
      var ltr = generateLetter(sentence[i]);
      letterlist.push(ltr);
      i++;
    }
  }, 300);
};

var generateLetter = function generateLetter(value) {
  return {
    position: {
      x: generateStartPlacement(),
      y: height
    },
    velocity: {
      x: getRandomArbitrary(-5, 5),
      y: getRandomArbitrary(-15, -60)
    },
    mass: 0.1,
    radius: 40,
    restitution: -1,
    value: value,
    duration: 400,
    color: generateColor(),
    draw: function draw(context, l) {
      context.save();
      context.font = "80px monospace";
      context.shadowColor = l.color;
      context.fillStyle = l.color;
      context.fillText(l.value, l.position.x, l.position.y);
      context.restore();
    }
  };
};

var generateColor = function generateColor() {
  if (rainbowmode) {
    return "#" + Math.random().toString(16).slice(2, 8);
  }
  return "#ffffff";
};

var generateStartPlacement = function generateStartPlacement() {
  if (randomstartplacement) {
    return getRandomArbitrary(0, width);
  }
  return width / 2;
};

var loop = function loop() {
  ctx.clearRect(0, 0, width, height);
  letterlist.map(function (ltr) {
    var Fx = -0.5 * Cd * A * rho * ltr.velocity.x * ltr.velocity.x * ltr.velocity.x / Math.abs(ltr.velocity.x);
    var Fy = -0.5 * Cd * A * rho * ltr.velocity.y * ltr.velocity.y * ltr.velocity.y / Math.abs(ltr.velocity.y);

    Fx = isNaN(Fx) ? 0 : Fx;
    Fy = isNaN(Fy) ? 0 : Fy;

    var ax = Fx / ltr.mass;
    var ay = ag + Fy / ltr.mass;

    ltr.velocity.x += ax * frameRate;
    ltr.velocity.y += ay * frameRate;

    ltr.position.x += ltr.velocity.x * frameRate * 100;
    ltr.position.y += ltr.velocity.y * frameRate * 100;

    if (ltr.position.y > height - ltr.radius) {
      ltr.velocity.y *= ltr.restitution;
      ltr.position.y = height - ltr.radius;
    }

    if (ltr.position.x > width - ltr.radius) {
      ltr.velocity.x *= ltr.restitution;
      ltr.position.x = width - ltr.radius;
    }

    if (ltr.position.x < ltr.radius) {
      ltr.velocity.x *= ltr.restitution;
      ltr.position.x = ltr.radius;
    }

    ltr.draw(ctx, ltr);
    ltr.duration--;
  });

  letterlist = letterlist.filter(function (ltr) {
    return ltr.duration > 0;
  });

  window.requestAnimationFrame(function () {
    loop();
  });
};

var getRandomArbitrary = function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};

setup();