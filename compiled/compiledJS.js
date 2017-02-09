Klass("trackr.CookieManager",function(a){this.value=a});
var Alias2Apple={};!function(e){var a={};a.seed=function(){},e.Core=a}(Alias2Apple);
var Alias3objectA=function(){var r={myProperty:"foo"};return r}(),Alias3objectB=function(){var r={myProperty:"bar"};return r}();
function Book(o,n){}
function BookMore(o,n){}
function trstr(r){}var borrows1util={trim:trstr};
define(function(){});
define(function(){});
define(function(){});
define(function(){});

exports.sayHello=function(){return"Hello world"};
module.exports=function(){return"HELLO WORLD"};
define(function(){var n={};return n.sayHello=function(){return"hello world"},n});
define(function(){var t=function(t){this.subject=t||"world"};return t.prototype.sayHello=function(){return"Hello "+this.subject},t});
define(function(){var n={};return n.sayHello=function(){return"Hello world"},n});
function foo(){}
var siteCore=function(i){var e,a,o,t,s,l=window.location.href,n=i("body > nav .modal"),d=i("#modal-overlay"),c=i("#modal-overlay .modal-box"),r=i("#contact-me"),v=i("#my-resume");return{init:function(){e=this,e.observers(),l.indexOf("about")>0||l.indexOf("learning")>0||(l.indexOf("past-projects")>0?e.clientGrid():(awardCards=i("#awards-and-certs"),a=i("main section.clients"),e.awardsAndCerts(),e.goToClients()))},observers:function(){e.modalOpenClose(),e.modalNavWatch()},modalOpenClose:function(){n.click(function(e){d.css("top",0).addClass("active"),i(this).hasClass("resume")?(i("#modal-overlay .resume").addClass("active"),v.show()):(i("#modal-overlay .contact").addClass("active"),r.show())}),i("#modal-overlay").click(function(e){i(this).hasClass("active")&&(i(this).css("top","-100%"),i("#modal-overlay .active").removeClass("active"),r.hide(),v.hide())})},modalNavWatch:function(){var e=i("#modal-overlay nav li");c.click(function(i){i.stopPropagation()}),e.click(function(e){i(this).hasClass("active")||(i("#modal-overlay .active").removeClass("active"),i(this).addClass("active"),i("#modal-overlay .active").hasClass("resume")?(r.hide(),v.show()):(r.show(),v.hide()))})},awardsAndCerts:function(){o=i("#sliderHold li").width(),i("#sliderHold").width(6*o),i("#sliderHold li").width(o),i("#awards-and-certs").width(4.25*o),e.autoSlide(),i(".control_next").click(function(i){i.preventDefault(),e.sliderMoveRight(),s=!0})},autoSlide:function(){t=setInterval(function(){s?setTimeout(function(){s=!1},1e4):i("#sliderHold li:eq(0)").animate({marginLeft:1.2*-o},"slow",function(){i("#sliderHold li:first-child").css("marginLeft","").appendTo("#sliderHold")})},5e3)},sliderMoveRight:function(){i("#sliderHold li:eq(0)").animate({marginLeft:1.2*-o},"slow",function(){i("#sliderHold li:first-child").css("marginLeft","").appendTo("#sliderHold")})},goToClients:function(){a.click(function(i){window.location.href="past-projects.html"})}}}(jQuery);siteCore.init();
define("jacket",function(){var n=function(){};return n.prototype.zip=function(){},n});
var Lends1Person=makeClass({initialize:function(n){this.name=n},say:function(n){return this.name+" says: "+n}});
var Lends2Person=makeClass({initialize:function(n){this.name=n},say:function(n){return this.name+" says: "+n}});
var Lends3Person=makeClass({initialize:function(n){this.name=n},say:function(n){return this.name+" says: "+n}});
var Lends4Person=makeClass({initialize:function(n){this.name=n},say:function(n){return this.name+" says: "+n}});
var Mixes1Eventful={on:function(n,f){},fire:function(n,f){}};
var Mixes2FormButton=function(){};Mixes2FormButton.prototype.press=function(){this.fire("press",{})},mix(Mixes1Eventful).into(Mixes2FormButton.prototype);
var foo=1,bar=function(){};
this.Book=function(t){this.title=t};
module.exports={blend:function(n,e){}},exports.darken=function(n,e){};
namepath1Person=function(){this.say=function(){return"I'm an instance."}},namepath1Person.say=function(){return"I'm static."};var p=new namepath1Person;p.say(),namepath1Person.say();
namepath2Person=function(){this.Idea=function(){this.consider=function(){return"hmmm"}}};var p=new namepath2Person,i=new p.Idea;i.consider();
var namepath3chat={"#channel":{open:!0,'say-"hello"':function(a){}}};
var Namespace1;
function preload(){game.load.image("background","../media/phaser/gameBG.png"),game.load.image("paddle","../media/phaser/gamePaddle.png"),game.load.image("gameBegin","../media/phaser/begin.png"),game.load.spritesheet("gameBall","../media/phaser/gameBall.png",46,46)}function create(){gameBG=game.add.image(game.world.centerX,game.world.centerY,"background"),gameBG.anchor.set(.5),gameBG.width=game.width,paddle1=createPaddle(0,game.world.centerY),paddle2=createPaddle(game.world.width,game.world.centerY),gameBall=createBall(game.world.centerX,game.world.centerY),scoreP1=game.add.text(15,0,"player 1: 0",{font:"20px Arial",fill:"#ffffff",align:"left"}),scoreP2=game.add.text(worldHit-110,0,"player 2: 0",{font:"20px Arial",fill:"#ffffff",align:"left"}),gameTxt=game.add.sprite(game.world.centerX,game.world.centerY,"gameBegin").anchor.set(.5)}function update(){game.input.activePointer.isDown&&gameStop===!0&&(gameTxt.x=1e3,gameBall.body.velocity.x=500,gameBall.body.velocity.y=30),controlPaddle(paddle1,game.input.y),game.physics.arcade.collide(paddle1,gameBall,hitter),game.physics.arcade.collide(paddle2,gameBall,hitter),paddle2.y<gameBall.y?paddle2.y=gameBall.y-hitCount:paddle2.y=gameBall.y+hitCount,gameBall.x<30?(p2c+=1,scoreP2.text="player 2: "+p2c,resetBall()):gameBall.x>worldHit-30&&(p1c+=1,scoreP1.text="player 1: "+p1c,resetBall()),gameBall.body.bounce.setTo(1,1),paddle2.x=game.world.width-15,paddle1.x=16}function hitter(){gameBall.body.velocity.y<game.world.centerY?gameBall.body.velocity.y-=40:gameBall.body.velocity.y+=40,gameBall.body.velocity.x<game.world.centerX?gameBall.body.velocity.x-=30:gameBall.body.velocity.x+=30,hitCount++}function createPaddle(e,a,l){var d=game.add.sprite(e,a,"paddle");return d.anchor.setTo(.5,.5),game.physics.arcade.enable(d),d.body.collideWorldBounds=!0,d.body.checkCollision.right=!0,l&&(d.body.speed=2),d.body.bounce.setTo(1,1),d}function controlPaddle(e,a){e.y=a,e.y<e.height/2?e.y=e.height/2:e.y>game.world.height-e.height/2&&(e.y=game.world.height-e.height/2)}function createBall(e,a){var l=game.add.sprite(e,a,"gameBall");return l.anchor.setTo(.5,.5),game.physics.arcade.enable(l),l.body.collideWorldBounds=!0,l.body.bounce.setTo(1,1),l.body.velocity.x=0,l.body.velocity.y=0,l.animations.add("spinning"),l.animations.play("spinning",15,!0),l}function resetBall(){gameStop=!0,gameTxt.x=.5,hitCount=0,gameBall.body.velocity.x=0,gameBall.body.velocity.y=0,gameBall.x=game.world.centerX,gameBall.y=game.world.centerY,paddle1.x=16}var paddle1,paddle2,scoreP1,scoreP2,p1c=0,p2c=0,gameBall,worldHit=window.innerWidth*window.devicePixelRatio-18,worldHeight=500,gameStop=!0,gameTxt,hitCount=50,game=new Phaser.Game(worldHit,worldHeight,Phaser.AUTO,"phaser-example",{preload:preload,create:create,update:update});
function Requires1Widgetizer(){}
var Simple1;
var Simple2;
var Simple3;
define("html/utils",function(){var n={getStyleProperty:function(n,t){}};return n.isInHead=function(n){},n}),define("tag",function(){var n={Tag:function(n){}};return n});
define("my/shirt",function(){var n={color:"black",Turtleneck:function(n){this.size=n}};return n});