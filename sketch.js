let groundImg
let planeImg
let musuhImg
let stage=0

function preload(){
   groundImg=loadImage('R.png');
    planeImg=loadImage('s.gif')
    musuhImg=loadImage('t.png')
}

function setup() {
  createCanvas(600, 450);

  hero=new hero(20,200,40,120)
  map=new map();
  monster=new monster(610,168,40,70)
  monster.setupMonster()
  level=new level()
}

function draw() {

if(stage==0){

  background(0,75,130);
  stroke(255,255,255)
  textSize(30)
  text("Air Strike",250,225)
  textSize(18)
  text("Tekan enter untuk lanjutkan",200,245)
}else if(stage==1){

  background(0,75,130);
  noStroke()
  fill(0)
  text("Level : ",30,40);
  text("Score : ",30,60);
  text("Nyawa : ",30,80);
  text(level.getCurrentLevel(),85,40)
  text(hero.getScore(),88,60)
  text(hero.getLife(),95,80)
 

  map.move()
  hero.show()

    hero.moveLeft();
    hero.moveRight();
    hero.moveUp();
    hero.moveDown()

    hero.showPeluru()
  monster.show()

  monster.showPeluruMusuh()
  
  
  for(let m of monster.monsters){
    for(let peluru of hero.peluru){
        if(dist(m.x,m.y,peluru.x,peluru.y)<30){
          monster.monsters.splice(monster.monsters.indexOf(m),1)
          hero.peluru.splice(hero.peluru.indexOf(peluru),1)
          hero.increaseScore()
        }
      }
    }
  

  for(let m of monster.peluruMusuh){
      if(dist(hero.x,hero.y,m.x,m.y)<25){
        monster.peluruMusuh.splice(monster.peluruMusuh.indexOf(m),1)
        hero.calculateLife()
      }  
  }
  
 
  for(let m of monster.monsters){
    if(dist(hero.x,hero.y,m.x,m.y)<40){
      stage=2
      hero.getMaxScore()
    }else if(m.x<0){
      stage=2
      hero.getMaxScore()
    }
  }
  
  
  if(level.getCurrentLevel()%3==0){
    monster.showAbility()
      if(dist(hero.x,hero.y,monster.x,monster.y)<40){
        monster.x=0
        monster.y=0
        hero.life+=3
        hero.ukuran+=2
      }
  }
 
  if(monster.monsters.length==1&& level.getCurrentLevel()%3==0){
     monster.setupAbility()
  }
  
 
  if(hero.getLife()<=0){
    stage=2
    hero.getMaxScore()
  }
 
  if(monster.monsters.length<=0){
    level.setLevel()
    map.init()
    monster.n+=1.5
    monster.kecepatan+=0.2
    monster.setupMonster()
    hero.saveLife()
    hero.kecepatan=+0.1
  }


}else{
  background(0,75,130);
  stroke(255,255,255)
  fill(0)
  text("Game Over",255,230)
  text("Level",255,250)
  text("Score",255,270)
  text("Record",255,290)
  text(level.getCurrentLevel(),310,250)
  text(hero.getScore(),310,270)
  text(hero.maxScore,320,290)
}


}
function keyPressed(){
  if(stage==1 && keyCode===32){
    hero.attack()
  }else if(stage==0 && keyCode===RETURN){
    stage=1
  }else if(stage==2 && keyCode===89){
    hero.reset()
    map.reset()
    monster.reset()
    level.reset()
    stage=1
  }else if(stage==2 && keyCode===27){
    hero.reset()
    map.reset()
    monster.reset()
    level.reset()
    stage=0
  }
}

