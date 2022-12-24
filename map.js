class map{
  constructor(){
    this.x=0
    this.y=height
    this.w=width
    this.h=40
    this.kecepatan=0.1
  }
  
  //setiap pemanggilan init kecepatan +1 , x kembali ke posisi 0
  init(){
    this.kecepatan+=0.1
    this.x=0
  }
  //menampilkan gound bergerak
  move(){
      image(groundImg,this.x,this.y-40,this.w*2,this.h);
    this.x-=this.kecepatan
  }
  //reset
  reset(){
    this.kecepatan=0.1
    this.x=0
  }
}