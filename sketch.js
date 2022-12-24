let groundImg
let planeImg
let musuhImg
let stage=0
//fungsi preload untuk memuat file sebelum fungsi setup
function preload(){
   groundImg=loadImage('R.png');
    planeImg=loadImage('s.gif')
    musuhImg=loadImage('t.png')
}

function setup() {
  createCanvas(600, 450);
  //instansiasi class
  hero=new hero(20,200,40,120)
  map=new map();
  monster=new monster(610,168,40,70)
  monster.setupMonster()
  level=new level()
}

function draw() {
//if else stage, ada 3 stage 0,1,2
if(stage==0){
  //judul
  background(0,75,130);
  stroke(255,255,255)
  textSize(30)
  text("Air Strike",250,225)
  textSize(18)
  text("Tekan enter untuk lanjutkan",200,245)
}else if(stage==1){
  //stage game
  background(0,75,130);
  noStroke()
  fill(0)
  text("Level : ",30,40);
  text("Score : ",30,60);
  text("Nyawa : ",30,80);
  text(level.getCurrentLevel(),85,40)
  text(hero.getScore(),88,60)
  text(hero.getLife(),95,80)
 
  //pemanggilan map dan heroagar di tampilkan di canvas
  map.move()
  hero.show()
  //check apakah arrow key di press
    hero.moveLeft();
    hero.moveRight();
    hero.moveUp();
    hero.moveDown()
  //pemanggilan peluru hero 
    hero.showPeluru()
  monster.show()
  //pemanggilan peluru musuh
  monster.showPeluruMusuh()
  
  //cek apakah peluru hero mengenai musuh, jika kena peluru dan musuh di hapus dr canvas ,score+1
  for(let m of monster.monsters){
    for(let peluru of hero.peluru){
        if(dist(m.x,m.y,peluru.x,peluru.y)<30){
          monster.monsters.splice(monster.monsters.indexOf(m),1)
          hero.peluru.splice(hero.peluru.indexOf(peluru),1)
          hero.increaseScore()
        }
      }
    }
  
  //cek apakah peluru musuh mengenai hero, kalo kena dihapus dua duanya,life-1
  for(let m of monster.peluruMusuh){
      if(dist(hero.x,hero.y,m.x,m.y)<25){
        monster.peluruMusuh.splice(monster.peluruMusuh.indexOf(m),1)
        hero.calculateLife()
      }  
  }
  
  //cek apakah monster mengenai hero, jika kena game over,cek apakah skor tertinggi
  for(let m of monster.monsters){
    if(dist(hero.x,hero.y,m.x,m.y)<40){
      stage=2
      hero.getMaxScore()
    }else if(m.x<0){
      stage=2
      hero.getMaxScore()
    }
  }
  
  //peluru monster ability
  //jika peluru ability mengenai hero , life+3, ukuran peluru+2
  if(level.getCurrentLevel()%3==0){
    monster.showAbility()
      if(dist(hero.x,hero.y,monster.x,monster.y)<40){
        monster.x=0
        monster.y=0
        hero.life+=3
        hero.ukuran+=2
      }
  }
  //setup x dan y peluru ability
  if(monster.monsters.length==1&& level.getCurrentLevel()%3==0){
     monster.setupAbility()
  }
  
  //jika life =0 , game over
  if(hero.getLife()<=0){
    stage=2
    hero.getMaxScore()
  }
  //jika monster sudah habis, level+1,init map,jumlah monster*1.5,kecepatan monster+0.2,hero life+1,kecepatan peluru hero+0.1
  if(monster.monsters.length<=0){
    level.setLevel()
    map.init()
    monster.n+=1.5
    monster.kecepatan+=0.2
    monster.setupMonster()
    hero.saveLife()
    hero.kecepatan=+0.1
  }

//stage 2Game Over
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

//fungsi key , tombol spasi hero attack,tombol enter start, tombol y reset, esc kembali ke opening
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

