var bg,bgImg;
var player, shooterImg, shooter_shooting;
var mau, mauImg, mau2, mau2Img, mau3, mau3Img, mau4, mau4Img;
var pet, petImg, pet2, pet2Img;
var boss, bossImg, boss2, boss2Img

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var mauGroup;
var mau3Group;
var mau4Group;
var score = 0;
var life = 3;
var bullets = 150;

var gameState = "fight"

var lose, winning, explosionSound;
var bulletGroup, mau2Group;


function preload(){
  bgImg = loadImage("assets/bg.avif");
  shooterImg = loadImage("assets/jack.png");
  // shooter_shooting = loadImage("assets/jack_2.png");
  mauImg = loadImage("assets/mau.png")
  mau2Img = loadImage("assets/mau2.png");
  mau3Img = loadImage("assets/mau3.png");
  mau4Img = loadImage("assets/mau4.png");
  // petImg = loadImage("assets/pet.png");
  // pet2Img = loadImage("assets/pet2.png");
  // bossImg = loadImage("assets/boss.png");
  // boss2Img = loadImage("assets/boss2.png");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img =loadImage("assets/heart_2.png");
  heart3Img = loadImage ("assets/heart_3.png")

  lose = loadSound('assets/lose.mp3');
  winning = loadSound("assets/win.mp3");
  explosionSound = loadSound("assets/explosion.mp3");


}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20, displayHeight/2-40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.7
  //criando o sprite do jogador
  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(shooterImg);
  player.scale = 0.2;
  player.debug = true;
  player.setCollider("rectangle",0,0,500,500)


  //criando sprites para representar vidas restantes
  heart1 = createSprite(displayWidth-150, 40, 20, 20);
  heart1.visible = false;
  heart1.addImage("heart1",heart1Img);
  heart1.scale = 0.4;

  heart2 = createSprite(displayWidth-100, 40, 20, 20);
  heart2.visible = false;
  heart2.addImage("heart2",heart2Img);
  heart2.scale = 0.4;

  heart3 = createSprite(displayWidth-150, 40, 20, 20);
  heart3.visible = true;
  heart3.addImage("heart3",heart3Img);
  heart3.scale = 0.4;
   

  //criando grupos de zumbis e balas
  mauGroup = new Group()
  bulletGroup = new Group()
  mau2Group = new Group()
  mau3Group = new Group()
  mau4Group = new Group()




}

function draw() {
  background(0); 


if(gameState === "fight"){

  //exibindo a imagem apropriada de acordo com as vidas restantes
    if (life == 3) {
      heart3.visible = true;
      heart2.visible = false;
      heart1.visible = false;
    }

    if (life == 2) {
      heart3.visible = false;
      heart2.visible = true;
      heart1.visible = false;
    }

    if (life == 1) {
      heart3.visible = false;
      heart2.visible = false;
      heart1.visible = true;
    }

  //vá para gameState "lost" quando 0 vidas estiverem restantes
    if (life == 0) {
      gameState = "lost";
    }

  //vá para gameState "won" se a pontuação for 100
    if (score == 100) {
      gameState = "won";
    }

  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
    if (keyDown("UP_ARROW")||touches.length>0) {
      player.y -=20;
    }

    if (keyDown("DOWN_ARROW")||touches.length>0) {
      player.y +=20;
    }



//solte balas e mude a imagem do atirador para a posição de tiro quando o espaço for pressionado
if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.velocityX = 20
  
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooterImg)
  bullets = bullets-1
  explosionSound.play();
}

// //o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
// else if(keyWentUp("space")){
//   player.addImage(shooterImg)
// }

//vá para gameState "bullet" quando o jogador ficar sem balas
  if (bullets == 0) {
    gameState = "bullet"
    lose.play();
  }

//destrua o zumbi quando a bala o tocar e aumente a pontuação
if(mauGroup.isTouching(bulletGroup)){
  for(var i=0;i<mauGroup.length;i++){     
      
   if(mauGroup[i].isTouching(bulletGroup)){
        mauGroup[i].destroy()
        bulletGroup.destroyEach()
        explosionSound.play();
 
        score = score+2
        } 
  
  }
}

if(mau2Group.isTouching(bulletGroup)){
  for(var i=0;i<mau2Group.length;i++){     
      
   if(mau2Group[i].isTouching(bulletGroup)){
        mau2Group[i].destroy()
        bulletGroup.destroyEach()
        explosionSound.play();
 
        score = score+2
        } 
  
  }
}

if(mau3Group.isTouching(bulletGroup)){
  for(var i=0;i<mau3Group.length;i++){     
      
   if(mau3Group[i].isTouching(bulletGroup)){
        mau3Group[i].destroy()
        bulletGroup.destroyEach()
        explosionSound.play();
 
        score = score+2
        } 
  
  }
}

if(mau4Group.isTouching(bulletGroup)){
  for(var i=0;i<mau4Group.length;i++){     
      
   if(mau4Group[i].isTouching(bulletGroup)){
        mau4Group[i].destroy()
        bulletGroup.destroyEach()
        explosionSound.play();
 
        score = score+2
        } 
  
  }
}

//reduza a vida e destrua o zumbi quando o jogador o tocar
if(mauGroup.isTouching(player)){
 
   lose.play();
 

 for(var i=0;i<mauGroup.length;i++){     
      
  if(mauGroup[i].isTouching(player)){
       mauGroup[i].destroy()
      
      life=life-1
       } 
 
 }
}

if(mau2Group.isTouching(player)){
 
  lose.play();


for(var i=0;i<mau2Group.length;i++){     
     
 if(mau2Group[i].isTouching(player)){
      mau2Group[i].destroy()
     
     life=life-1
      } 

}
}

if(mau3Group.isTouching(player)){
 
  lose.play();


for(var i=0;i<mau3Group.length;i++){     
     
 if(mau3Group[i].isTouching(player)){
      mau3Group[i].destroy()
     
     life=life-1
      } 

}
}

if(mau4Group.isTouching(player)){
 
  lose.play();


for(var i=0;i<mau4Group.length;i++){     
     
 if(mau4Group[i].isTouching(player)){
      mau4Group[i].destroy()
     
     life=life-1
      } 

}
}

//chame a função para gerar zumbis
enemy();
inimigo2()
inimigo3()
inimigo4()

}




drawSprites();

//exibindo a pontuação e as vidas e balas restantes
  textSize(20)
  fill("white")
  text("Balas = " + bullets,displayWidth-210,displayHeight/2-250)
  text("Pontuação = " + score,displayWidth-200,displayHeight/2-220)
  text("Vidas = " + life,displayWidth-200,displayHeight/2-280)

//destrua o zumbi e o jogador e exiba uma mensagem em gameState "lost"
if(gameState == "lost"){
  textSize(100)
  fill("darkblue")
  text("Você perdeu tente denovo", 150, 400)
  mauGroup.destroyEach()
  player.destroy()
  mau2Group.destroyEach()
  mau3Group.destroyEach()
  mau4Group.destroyEach()
  heart1.visible = false;

}

//destrua o zumbi e o jogador e exiba uma mensagem em gameState "won"
else if(gameState == "won"){
  textSize(100)
  fill("darkblue")
  text("Você GANHOU parabéns", 150, 400)
  mauGroup.destroyEach()
  player.destroy()
  mau2Group.destroyEach()
  mau3Group.destroyEach()
  mau4Group.destroyEach()


}

//destrua o zumbi, o jogador e as balas e exiba uma mensagem no gameState "bullet"
else if(gameState == "bullet"){
  textSize(100)
  fill("darkblue")
  text("Você não tem mais balas, que pena", 150, 400)
  mauGroup.destroyEach()
  player.destroy()
  mau2Group.destroyEach()
  mau3Group.destroyEach()
  mau4Group.destroyEach()


}

}


//criando função para gerar zumbis
function enemy(){
  if (frameCount%80==0) {
    mau = createSprite(random(900, 1100), random(100, 500), 40, 40)
    mau.addImage(mauImg)
    mau.scale = 0.15
    mau.velocityX = -5
    mau.debug = true;
    mau.setCollider("rectangle",0,0,400,400)
    mau.lifetime = 600
    mauGroup.add(mau)
  }

}

function inimigo2(){
  if (frameCount%80==0) {
    mau2 = createSprite(random(900, 1100), random(100, 500), 40, 40)
    mau2.addImage(mau2Img)
    mau2.scale = 0.15
    mau2.velocityX = -5
    mau2.debug = true;
    mau2.setCollider("rectangle",0,0,400,400)
    mau2.lifetime = 600
    mau2Group.add(mau2)
  }

}

function inimigo3(){
  if (frameCount%80==0) {
    mau3 = createSprite(random(900, 1100), random(100, 500), 40, 40)
    mau3.addImage(mau3Img)
    mau3.scale = 0.15
    mau3.velocityX = -5
    mau3.debug = true;
    mau3.setCollider("rectangle",0,0,400,400)
    mau3.lifetime = 600
    mau3Group.add(mau3)
  }

}

function inimigo4(){
  if (frameCount%80==0) {
    mau4 = createSprite(random(900, 1100), random(100, 500), 40, 40)
    mau4.addImage(mau4Img)
    mau4.scale = 0.15
    mau4.velocityX = -5
    mau4.debug = true;
    mau4.setCollider("rectangle",0,0,400,400)
    mau4.lifetime = 600
    mau4Group.add(mau4)
  }

}



