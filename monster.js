class monster extends entity{
  constructor(x,y,w,h){
    super(x,y,w,h)
    this.life=0
    this.monsters=[]
    this.n=2
    this.peluruMusuh=[]
    this.kecepatan=0.5
  }
  setupMonster(){
    //i dari 0 sampaiin koordinat x,y random di masukkan ke dalam stack monsters,stack peluruMonster
    for(let i=0;i<this.n;i++){
      let monster={
        x:random(width,750),
        y:random(40,370)
      }
      this.monsters.push(monster)  
      let peluruMusuh={
        x:monster.x,
        y:monster.y
      }
      this.peluruMusuh.push(peluruMusuh)
    }
  }
  
  //menampilkan monster
  show(){
    for(let m of this.monsters){
      fill(0)
      image(musuhImg,m.x,m.y,this.w,this.h)
      m.x-=this.kecepatan
    } 
  }
  
  //menampilkan peluru monster
  showPeluruMusuh(){
      for(let i of this.peluruMusuh ){
        fill(0)
        noStroke()
        circle(i.x,i.y,4)
        i.x-=5
      }
  }
  
  //setup koordinat x dan y utk peluru ability
  setupAbility(){
    this.x=random(width,750)
    this.y=random(40,370)
  }
  //menampilkan ability
  showAbility(){
    fill(0,0,255)
    circle(this.x,this.y,20)
    this.x-=5
  }
  //reset
  reset(){
    this.kecepatan=0.5
    for(let i=0;i<this.n;i++){
      this.monsters.pop();
    }
    this.n=2
    this.setupMonster()
    this.setupAbility()
    this.kecepatan=0.5
  }
}