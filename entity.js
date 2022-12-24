class entity{
  constructor(x,y,h,w){
    this.x=x
    this.y=y
    this.h=h
    this.w=w
    this.kecepatan=0
    this.peluru=[]
  }
  //selama attack di panggil akan menambah peluru hero ke stack
  attack(){
    let peluru={
      x:this.x+90,
      y:this.y+30
    }
    this.peluru.push(peluru)
  }
  //cek left arrow jika di press hero bergerak ke kiri
 moveLeft(){
    if(keyIsDown(LEFT_ARROW)){
      if(this.x>0){
        this.x-=2;
      }
    }
  }
  //cek right arrow
  moveRight(){
    if(keyIsDown(RIGHT_ARROW)){
        if(this.x<558){
          this.x+=2
        }
    }
  }
  //cek up arrow
  moveUp(){
    if(keyIsDown(UP_ARROW)){
      if(this.y>0){
        this.y-=2
      }
    }
  }
  //cek down arrow
  moveDown(){
    if(keyIsDown(DOWN_ARROW)){
      if(this.y<370){
      this.y+=2
      }
    }
  }
}