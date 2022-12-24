class level{
  constructor(){
    this.currentLevel=1
    this.latestLevel=0
    this.maxLevel=0
  }
  //level +1
  setLevel(){
    this.currentLevel+=1
  }
  //mendapatkan level sekarang
  getCurrentLevel(){
    return this.currentLevel
  }
  //reset
  reset(){
    this.currentLevel=1
  }
}