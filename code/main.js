var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 480,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config)
var score = 0
const WIDTH = 800
const HEIGHT = 480

function preload () {
  this.load.image('bg', 'assets/bg.png')
  this.load.image('star', 'assets/star.png')
  game.input.mouse.capture = true
}

function create (){
  bg = this.add.sprite(WIDTH / 2, HEIGHT / 2, 'bg')
  bg.setDisplaySize(WIDTH, HEIGHT)

  star = this.add.sprite(100, 450, 'star').setInteractive()
  this.input.on('pointerover', function (event, gameObjects) {
    gameObjects[0].setTint(0xff0000);
  })
  this.input.on('pointerout', function (event, gameObjects) {
    gameObjects[0].clearTint();
  })
}

function update (){

}
