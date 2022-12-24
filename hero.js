class hero extends entity{
  constructor(x,y,w,h,life,score){
    super(x,y,w,h)
    this.life=10
    this.score=0
    this.maxScore=0
    this.ukuran=4
  }
  //score+1
  increaseScore(){
    this.score+=1
  }
  //return score
  getScore(){
    return this.score
  }
  //life -1
  calculateLife(){
    this.life-=1
  }
  //return life
  getLife(){
    return this.life
  }
  //life +1
  saveLife(){
    this.life+=1
  }
  //menampilkan hero
  show(){
    fill(0)
    image(planeImg,this.x,this.y,this.w,this.h) 
  }
  //menampilkan peluru hero
  showPeluru(){
    fill(125,249,255)
    noStroke()
    for (let peluru of this.peluru){
      circle(peluru.x,peluru.y,this.ukuran)
      peluru.x+=10
    }
  }
  //memeriksa apakah score sekarang lebih besar dri max score
  getMaxScore(){
     if(this.maxScore < this.score){
        this.maxScore = this.score;
    }
  }
  //reset
  reset(){
    for(let i=0;i<5;i++){
      this.peluru.pop()
    }
    this.ukuran=4
    this.life=10
    this.score=0
    this.x=10
    this.y=200
  }
}
