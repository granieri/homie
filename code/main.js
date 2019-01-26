const WIDTH = 800
const HEIGHT = 480

var config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
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

function preload () {
  this.load.image('bg', 'assets/bg.png')
  this.load.image('star', 'assets/star.png')
  this.load.image('guy', 'assets/guy.png')
  this.load.image('oven', 'assets/oven.png')
  this.load.image('tv', 'assets/tv.png')
  this.load.image('lamp', 'assets/lamp.png')
  this.load.image('coffee', 'assets/coffee.png')
  this.load.image('chair', 'assets/chair.png')
  this.load.image('art1', 'assets/art1.png')

  game.input.mouse.capture = true
}

function create (){

  rect = 0

  bg = this.add.sprite(WIDTH / 2, HEIGHT / 2, 'bg')
  bg.setDisplaySize(WIDTH, HEIGHT)

  this.input.on('pointerover', function (event, gameObjects) {
    gameObjects[0].setTint(0xe273ab);
  })
  this.input.on('pointerout', function (event, gameObjects) {
    gameObjects[0].clearTint();
  })
  //bg
  art1 = this.add.sprite(236,212,'art1').setOrigin(0,1).setInteractive()
  art1.setScale(.08)
  art1.angle = 2
  art2 = this.add.sprite(353,220,rect).setOrigin(0,1).setInteractive()
  //kitchen
  fridge = this.add.sprite(60,415,rect).setOrigin(0,1).setInteractive()
  oven = this.add.sprite(10-20,455+15,'oven').setOrigin(0,1).setInteractive()
  oven.setScale(.12)
  oven.angle = 5
  counter = this.add.sprite(195,450,rect).setOrigin(0,1).setInteractive()
  coffee_machine = this.add.sprite(215-20,330+15,'coffee').setOrigin(0,1).setInteractive()
  coffee_machine.setScale(.1)
  //tv area
  lazyboy = this.add.sprite(371-70,416+50,'chair').setOrigin(0,1).setInteractive()
  lazyboy.setScale(.15)
  lazyboy.flipX = true
  lazyboy.angle = -5
  side_table = this.add.sprite(350,430,rect).setOrigin(0,1).setInteractive()
  radio = this.add.sprite(358,379,rect).setOrigin(0,1).setInteractive()
  tv = this.add.sprite(515-50,377+60,'tv').setOrigin(0,1).setInteractive()
  tv.setScale(.1)
  //bedroom
  thermostat = this.add.sprite(620,272,rect).setOrigin(0,1).setInteractive()
  bed = this.add.sprite(644,448,rect).setOrigin(0,1).setInteractive()
  table = this.add.sprite(608,456,rect).setOrigin(0,1).setInteractive()

  guy = this.add.sprite(260,HEIGHT-20,'guy').setOrigin(0,1)
  guy.setScale(.2)

}

function update (){
  //console.log('X:' + this.input.activePointer.x);
  //console.log('Y:' + this.input.activePointer.y);
}
