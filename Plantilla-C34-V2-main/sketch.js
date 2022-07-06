
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;

var kitty;
var ground;
var higherground;
var rope;
var con;
var con_2;
var bubble;
var food;

function preload(){
  fish = loadImage("fish.png");
  bubble_img = loadImage("bubble.png");
  kitty = loadImage("Cat.png");
  bg_img = loadImage("fondo.png");

  blink = loadAnimation("blink_cat_1.png","blink_cat_2.png");
  eat = loadAnimation("blink_cat_1.png","eat_cat.png");
  anger = loadAnimation("blink_cat_1.png","angry cat.png")

  blink.playing = true;
  eat.playing = true;
  anger.playing = true;
  anger.looping = false;
  eat.looping = false;
}

function setup() {
  createCanvas(500,800);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  var food_options={
    restitution:0.08
  }

  ground = new Ground(250,height-10,width,20);
  food = Bodies.circle(100,400,15,food_options);
  World.add(world,food);

  bubble = createSprite(290,460,20,20);
  bubble.addImage(bubble_img);
  bubble.scale = 0.1;

  kitty = createSprite(270,100,100,100);
  kitty.addImage(cat_img);
  kitty.scale = 0.2;

  higherground = new Ground(300,170,100,10);

  kitty.addAnimation('blinking',blink);
  kitty.addAnimation('eating',eat);
  kitty.addAnimation('angering',anger);
  kitty.changeAnimation('blinking');

  rope = new Rope(4,{x:230,y:330});
  rope_2 = new Rope(4,{x:50,y:450});
  con = new Link(rope,food);
  con_2 = new Link(rope_2,food);

  button = createImg("cut_button.png");
  button.position(200,320);
  button.size(50,50);
  

  button_2 = createImg("cut_button.png");
  button_2.position(30,420);
  button_2.size(50,50);
  button_2.mouseCliked(drop);

  ellipseMode(RADIUS);
}


function draw() 
{
  background(51);
  Image(bg_img,0,0,widht,height);
  Engine.update(engine);

  push();
  imageMode(CENTER);
  if(food!=null){
   image(fish,fish.position.x,fish.position.y,70,70); 
  }
  pop();

  ground.show();
  higherground.show();
  rope.show();
  rope_2.show();

  if (collide(food,kitty,80)==true){
    remove_rope();
    bubble.visible = false;
    World.remove(engine.world,food);
    food = null;

    kitty.changeAnimation('eating');
  }

  if(collide(food,bubble,40)==true){
    engine.world.gravity.y = -1;
    bubble.position.x = food.position.x;
    bubble.position.y = food.position.y;
  }
  drawSprites();
}

function drop(){
  rope.break();
  con_2.dettach();
  con_2 = null;
}

function remove_rope(){
  rope.break();
  con.dettach();
  con = null;
}

function collide(body,sprite,x){
  if(body!=null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=x){
      return true;
    }
    else{
      return false;
    }
  }
}