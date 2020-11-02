
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
var kidoImg, treeImg;
var world, engine;
var kido, stone, tree, ground, slingshot;
var mango1, mango2, mango3, mango4, mango5, mango6, mango7, mango8;
var cloud1, cloud2, cloudImg;

function preload()
{
	kidoImg = loadImage("Plucking mangoes/boy.png")
	treeImg = loadImage("Plucking mangoes/tree.png");
	cloudImg = loadImage("Plucking mangoes/Cloud.png");
}

function setup() {
	createCanvas(1420, 687);

	cloud1 = createSprite(-150, 100);
	cloud1.addImage(cloudImg);
	cloud1.scale = random(0.3, 0.5);

	cloud2 = createSprite(1570, 100);
	cloud2.addImage(cloudImg);
	cloud2.scale = random(0.3, 0.5);

	kido = createSprite(205,585,80,140);
	kido.addImage(kidoImg);
	kido.scale = 0.08;

	tree = createSprite(1100,420);
	tree.addImage(treeImg);
	tree.scale = 0.5;

	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	stone = new Stone(185, 550, 35);
	ground = new Ground(width/2,670,width*width,40);

	mango1 = new Mango(975, 340, 50);
	mango2 = new Mango(1080, 250, 30);
	mango3 = new Mango(1100, 340, 60);
	mango4 = new Mango(1200, 230, 40);
	mango5 = new Mango(1030, 300, 37);
	mango6 = new Mango(1190, 290, 45);

	slingshot = new SlingShot(stone.body, {x:170, y:555});

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background("lightblue");
  textSize(20);
  text("Use Your mouse to drag the stone and throw it to get the mangoes!", 10, 20);
  text("Press space to get a second chance or F5 or Ctrl+R to play again!", 10, 50);
//  text(mouseX + "," + mouseY, 10, 10);
  drawSprites();
//  kido.display();
  ground.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();
//  kido.display();
  slingshot.display();
  stone.display();
//  kido.display();
//  slingshot.display();
//  mango1.display();
	detectCollision(mango1, stone);
	detectCollision(mango2, stone);
	detectCollision(mango3, stone);
	detectCollision(mango4, stone);
	detectCollision(mango5, stone);
	detectCollision(mango6, stone);

	cloudWork();

//  drawSprites();
 
}

function mouseDragged() 
{
	Matter.Body.setPosition(stone.body, {x: mouseX, y: mouseY});
}
function mouseReleased() 
{
	slingshot.fly();
}
function keyPressed() 
{
	if (keyCode === 32) 
	{
		Matter.Body.setPosition(stone.body, {x : 185, y : 550});
		slingshot.attach(stone.body);
	}
}

function detectCollision(Lmango, Lstone) 
{
	var mangoPos = Lmango.body.position;
	var stonePos = Lstone.body.position;

	var distance = dist(stonePos.x, stonePos.y, mangoPos.x, mangoPos.y);

	if (distance <= Lmango.radius + Lstone.radius) 
	{
		Matter.Body.setStatic(Lmango.body, false);
	}
}

function cloudWork() 
{
	cloud1.velocityX = random(1,7);

	if (cloud1.x > 1570) 
	{
		cloud1.x = -150;
		cloud1.y = random(10, 100);
		cloud1.velocityX = random(1,7);
		cloud1.scale = random(0.3, 0.5);
	}
	cloud2.velocityX = random(-1,-7);

	if (cloud2.x < -150) 
	{
		cloud2.x = 1570;
		cloud2.y = random(10, 100);
		cloud2.velocityX = random(-1,-7);
		cloud2.scale = random(0.3, 0.5);
	}

}
