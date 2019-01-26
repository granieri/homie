let music
let blip

class GameScene extends Phaser.Scene {
  constructor(config) {
    super(config)
  }

  preload () {
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

  create (){
    music.pause()
    let rect = 0

    let bg = this.add.sprite(WIDTH / 2, HEIGHT / 2, 'bg')
    bg.setDisplaySize(WIDTH, HEIGHT)

    this.input.on('pointerover', function (event, gameObjects) {
      gameObjects[0].setTint(0xffb7f3);
    })
    this.input.on('pointerout', function (event, gameObjects) {
      gameObjects[0].clearTint();
    })
    //bg
    let art1 = this.add.sprite(236,212,'art1').setOrigin(0,1).setInteractive()
    art1.setScale(.08)
    art1.angle = 2
    let art2 = this.add.sprite(353,220,rect).setOrigin(0,1).setInteractive()
    //kitchen
    let fridge = this.add.sprite(60,415,rect).setOrigin(0,1).setInteractive()
    let oven = this.add.sprite(10-20,455+15,'oven').setOrigin(0,1).setInteractive()
    oven.setScale(.12)
    oven.angle = 5
    let counter = this.add.sprite(195,450,rect).setOrigin(0,1).setInteractive()
    let coffee_machine = this.add.sprite(215-20,330+15,'coffee').setOrigin(0,1).setInteractive()
    coffee_machine.setScale(.1)
    //tv area
    let lazyboy = this.add.sprite(371-70,416+50,'chair').setOrigin(0,1).setInteractive()
    lazyboy.setScale(.15)
    lazyboy.flipX = true
    lazyboy.angle = -5
    let side_table = this.add.sprite(350,430,rect).setOrigin(0,1).setInteractive()
    let radio = this.add.sprite(358,379,rect).setOrigin(0,1).setInteractive()
    let tv = this.add.sprite(515-50,377+60,'tv').setOrigin(0,1).setInteractive()
    tv.setScale(.1)
    //bedroom
    let thermostat = this.add.sprite(620,272,rect).setOrigin(0,1).setInteractive()
    let bed = this.add.sprite(644,448,rect).setOrigin(0,1).setInteractive()
    let table = this.add.sprite(608,456,rect).setOrigin(0,1).setInteractive()

    let guy = this.add.sprite(260,HEIGHT-20,'guy').setOrigin(0,1)
    guy.setScale(.2)

  }

  update (){
    //console.log('X:' + this.input.activePointer.x);
    //console.log('Y:' + this.input.activePointer.y);
  }

}

class TitleScene extends Phaser.Scene {
  constructor(config) {
    super(config)
  }

  preload () {
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js')
    this.cameras.main.setBackgroundColor('#000000')
    game.input.mouse.capture = true

    this.load.audio('theme', [
        'assets/aardvark.mp3'
    ])

    this.load.audio('blip', [
        'assets/blip.mp3'
    ])
  }

  create (){
    var add = this.add
    WebFont.load({
      custom: {
        families: [ 'pxl' ]
      },
      active: function() {
        add.text(75, 170, 'homie', { color: '#ffffff', fontFamily: 'pxl', fontSize: 100 })
        add.text(75, 280, 'a game by max, erik, mark, yo, and wilfred', { color: '#ffffff', fontFamily: 'pxl', fontSize: 15 })
        add.text(220, 400, 'click anywhere to start', { fontFamily: 'pxl', fontSize: 25 })
      }
    })

    music = this.sound.add('theme')
    music.play()

    blip = this.sound.add('blip')

    this.input.on('pointerdown', function (pointer) {
      blip.play()
      game.scene.start('TutScene')
    })
  }

  update (){
  }
}

class TutScene extends Phaser.Scene {
  constructor(config) {
    super(config)
  }

  preload () {
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js')
    this.cameras.main.setBackgroundColor('#000000')
    game.input.mouse.capture = true
  }

  create (){
    var add = this.add

    WebFont.load({
      custom: {
        families: [ 'pxl' ]
      },
      active: function() {
        add.text(100, 70, 'welcome homie unit #384720a!', { color: '#ffffff', fontFamily: 'pxl', fontSize: 25 })
        add.text(100, 100, 'setup is complete', { color: '#ffffff', fontFamily: 'pxl', fontSize: 25 })
        add.text(100, 140, '- click your environment to interact', { fontFamily: 'pxl', fontSize: 25 })
        add.text(100, 170, '- keep human(s) happy', { fontFamily: 'pxl', fontSize: 25 })
        add.text(100, 200, '- relax', { fontFamily: 'pxl', fontSize: 25 })

        add.text(100, 400, 'click to activatie homie #384720a', { fontFamily: 'pxl', fontSize: 25 })
      }
    })

    this.input.on('pointerdown', function (pointer) {
      game.scene.start('GameScene')
    })
  }

  update (){
  }
}

const WIDTH = 800
const HEIGHT = 480

var config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  scene: TitleScene
}

var game = new Phaser.Game(config)
var score = 0

game.scene.add('TitleScene', TitleScene)
game.scene.add('TutScene', TutScene)
game.scene.add('GameScene', GameScene)
