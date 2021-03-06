let music
let blip

class GameScene extends Phaser.Scene {
  constructor(config) {
    super(config)
  }

  preload () {
    this.scene.remove('TutScene')
    this.load.image('bg', 'assets/bg.png')
    this.load.image('guy', 'assets/guy.png')
    this.load.image('oven', 'assets/oven.png')
    this.load.spritesheet('tv', 'assets/tvs.png',
      { frameWidth: 146, frameHeight: 178 }
    )
    this.load.image('tv_stand', 'assets/tv_stand.png')
    this.load.spritesheet('lamp', 'assets/lamps.png',
      { frameWidth: 169, frameHeight: 424 }
    )
    this.load.image('sittingInChair', 'assets/sitting_in_chair.png')
    this.load.image('coffee', 'assets/coffee.png')
    this.load.image('chair', 'assets/chair.png')
    this.load.image('art1', 'assets/art1.png')
    this.load.image('art2', 'assets/art2.png')
    this.load.image('art3', 'assets/art3.png')
    this.load.image('menu', 'assets/menu.png')
    this.load.image('fridge', 'assets/fridge.png')
    this.load.image('counter', 'assets/counter.png')
    this.load.image('bed', 'assets/bed.png')
    this.load.image('thermostat', 'assets/thermostat.png')
    this.load.image('darkness', 'assets/darkness.png')
    this.load.image('radio', 'assets/radio.png')
    this.load.image('console', 'assets/console.png')

    this.load.image('review_good', 'assets/good_review_no_spill.png')
    this.load.image('review_good_spill', 'assets/good_review_no_spill.png')
    this.load.image('review_bad', 'assets/bad_review_no_spill.png')
    this.load.image('review_bad_spill', 'assets/bad_review_spill.png')

    this.load.image('walk1', 'assets/Walk_Cycle1.png')
    this.load.image('walk2', 'assets/Walk_Cycle2.png')
    this.load.image('walk3', 'assets/Walk_Cycle3.png')
    this.load.image('walk4', 'assets/Walk_Cycle4.png')
    this.load.image('walk5', 'assets/Walk_Cycle5.png')
    this.load.image('walk6', 'assets/Walk_Cycle6.png')
    this.load.image('walk7', 'assets/Walk_Cycle7.png')


    this.load.image('coffeeEmpty', 'assets/Coffee_Maker_Empty_Cup.png')
    this.load.image('coffeeFilling', 'assets/Coffee_Maker_Filling_Full_Cup.png')
    this.load.image('coffeeFull', 'assets/Coffee_Maker_Full_Cup.png')
    this.load.image('coffeeOverFlow', 'assets/Coffee_Maker_Overflowing_Full_Cup.png')

    this.load.audio('coffeeSound', [
      'assets/coffee_machine.mp3'
    ])

    this.load.audio('tv_sound', [
        'assets/tv.mp3'
    ])

    this.load.audio('ambience', [
        'assets/apartment.mp3'
    ])

    this.load.audio('click', [
        'assets/click.mp3'
    ])

    this.load.audio('80ssong', [
        'assets/80ssong.mp3'
    ])

    this.load.audio('theme', [
        'assets/aardvark.mp3'
    ])

    game.input.mouse.capture = true
  }

  create (){
    var happiness = 0
    var listenForCoffee = false
    var listenForTV = false
    var listenForRadio = false

    var firstEvent = this.time.delayedCall(3000, show_menu_box,
      [this, {x: 330, y: 290}, [{text: '"I wonder whats on the TV today"'}]], this)

    var firstEventClose = this.time.delayedCall(9000, hide_menu_box,
      [this], this)

    var firstEventActivateListener = this.time.delayedCall(3000, function(){
      listenForTV = true
    }, [], this)

    var secondEvent = this.time.delayedCall(20000, show_menu_box,
      [this, {x: 330, y: 290}, [{text: '"Yo Homie, brew me some coffee."'}]], this)

    var secondEventClose = this.time.delayedCall(26000, hide_menu_box,
      [this], this)

    var secondEventActivateListener = this.time.delayedCall(20000, function(){
      listenForCoffee = true
      listenForTV = false
    }, [], this)

    var thirdEvent = this.time.delayedCall(30000, show_menu_box,
      [this, {x: 330, y: 290}, [{text: '"Hey Homie, I want to listen to the radio"'}]], this)

    var thirdEventClose = this.time.delayedCall(36000, hide_menu_box,
      [this], this)

    var thirdEventActivateListener = this.time.delayedCall(30000, function(){
      listenForRadio = true
      listenForCoffee = false
    }, [], this)

    var endEvent = this.time.delayedCall(50000, function(){
        show_menu_box(this, {x: 330, y: 200}, [{text: 'Your human just sent a message'}])
        this.input.enabled = false
      }, [], this)
    var endEvent_score = this.time.delayedCall(55000, function(){
        if(happiness > 6){
          if(coffeeSpilled) this.add.sprite(400, 240, 'review_good_spill')
          else this.add.sprite(400, 240, 'review_good')
        }
        else {
          if(coffeeSpilled) this.add.sprite(400, 240, 'review_bad_spill')
          else this.add.sprite(400, 240, 'review_bad')
        }
        let score_text = "You scored " + happiness
        this.add.text(350, 400, score_text, { fontFamily: 'pxl', fontSize: 18, color: '#000000' })
      },

    [], this)

    let ambience = this.sound.add('ambience', {volume: 0.18, loop: true})
    ambience.play()
    let click = this.sound.add('click')
    let theme = this.sound.add('theme', {volume: 0.8, loop: true})
    let popsong = this.sound.add('80ssong', {volume: 0.8, loop: true})

    let rect = 0
    let t = this.add.text(0, 0, '', { fontFamily: 'pxl', fontSize: 10 }).setOrigin(0,0)

    let state = {
      box_up: false,
      lamp_on: true,
      oven_on: false,
      coffee_machine_on: false,
      tv_on: false,
      console_on: 0,
      radio_on: 0
    }

   // let listenForTV

    let bg = this.add.sprite(WIDTH / 2, HEIGHT / 2, 'bg')
    bg.setDisplaySize(WIDTH, HEIGHT)

    this.input.on('pointerover', function (event, gameObjects) {
      gameObjects[0].setTint(0xffb7f3)
    })

    this.input.on('pointerout', function (event, gameObjects) {
      gameObjects[0].clearTint()
    })

    this.input.on('pointerdown', function (event, gameObjects) {
      if(state.box_up){
        hide_menu_box(this)
      }
    }, this)

    //bg
    // let art1 = this.add.sprite(236,212,'art1').setOrigin(0,1).setInteractive()
    // art1.setScale(.08)
    // art1.angle = 2
    let art2 = this.add.sprite(353,220,'art2').setOrigin(0,1).setInteractive()
    art2.setScale(.6)
    let art3 = this.add.sprite(220,212,'art3').setOrigin(0,1).setInteractive()
    art3.setScale(.5)
    art2.on('pointerdown', function(e){
      click.play()
      show_menu_box(this, e, [{text: 'Reverse image search shows that this is worthless'}])
    }, this)
    art3.on('pointerdown', function(e){
      click.play()
      show_menu_box(this, e, [{text: 'Reverse image search shows that this is a knock-off of a knock-off'}])
    }, this)
    let lamp = this.add.sprite(340,120,'lamp').setInteractive()
    lamp.setFrame(1)
    lamp.setScale(.4)
    lamp.on('pointerdown', function(e){
      click.play()
      if(state.lamp_on) {
        this.happiness -= 1
        darkness.alpha = 0.2
        state.lamp_on = false
        lamp.setFrame(0)
      }
      else {
        darkness.alpha = 0
        state.lamp_on = true
        lamp.setFrame(1)
      }
    }, this)
    //kitchen
    let fridge = this.add.sprite(60,420,'fridge').setOrigin(0,1)
    fridge.setScale(.25)
    fridge.on('pointerdown', function(e){
      show_menu_box(this, e, [])
    }, this)
    let oven = this.add.sprite(7,468,'oven').setOrigin(0,1).setInteractive()
    oven.setScale(.25)
    oven.on('pointerdown', function(e){
      click.play()
      // pass
    }, this)
    let counter = this.add.sprite(190,450,'counter').setOrigin(0,1)
    counter.setScale(0.4)
    var coffeeFilled = false;
    let coffee_machine = this.add.sprite(181,338,'coffeeEmpty').setOrigin(0,1).setInteractive()
    coffee_machine.setScale(.45)
         this.anims.create({
          key: 'coffee',
          frames: [
              { key: 'coffeeEmpty' },
              { key: 'coffeeFilling', duration: 1500 },
              { key: 'coffeeFull' },
          ],
          frameRate: 8,
          repeat: 0
        })
        this.anims.create({
          key: 'overFlow',
          frames: [
              { key: 'coffeeFull' },
              { key: 'coffeeOverFlow', duration: 1500 },
              { key: 'coffeeFull' },
          ],
          frameRate: 8,
          repeat: 0
        })
        var coffeeFilled = false;
        var coffeeSpilled = false;
        let coffeeAudio = this.sound.add('coffeeSound', { volume: 0.3})
     coffee_machine.on('pointerdown', function(e){

       if(coffeeFilled == false){
        coffeeAudio.play()
       coffeeFilled = true;
       coffee_machine.play('coffee')
       coffee_machine.x = 181
       coffee_machine.y = 338
       if(listenForCoffee == true){
            happiness += 5
            show_menu_box(this, {x: 330, y: 290}, [{text: '"Thanks Homie! I love the smell of coffee."'}])
            var coffeeThanksClose = this.time.delayedCall(5000, hide_menu_box,
              [this], this);
          }
       }
       else
       {
        coffeeAudio.play()
         console.log('OverFlow')
        coffee_machine.play('overFlow')
        show_menu_box(this, {x: 330, y: 290}, [{text: '"WTF Homie! You made a mess!"'}])
        var coffeeInsultClose = this.time.delayedCall(5000, hide_menu_box,
         [this], this);
        coffeeSpilled = true;
        happiness -= 6
       }
     }, this)
    //tv area
    let lazyboy = this.add.sprite(378,310,'sittingInChair')
    lazyboy.setScale(.32)
    let radio = this.add.sprite(280,455,'radio').setOrigin(0,1).setInteractive()
    radio.setScale(0.43)
    radio.on('pointerdown', function(e){
      click.play()
      if(state.radio_on == 0){
        // turn on
        if(listenForRadio){
          happiness+=3
          listenForRadio = false
        }
        else if(state.tv_on){
          happiness-=1
        }
        state.radio_on = 1
        if(theme.isPaused) theme.resume()
        else theme.play()
      }
      else if(state.radio_on == 1){
        state.radio_on = 2
        theme.pause()
        if(popsong.isPaused) popsong.resume()
        else popsong.play()
      }
      else if(state.radio_on == 2){
        state.radio_on = 0
        popsong.pause()
      }
    })
    let tv_stand = this.add.sprite(470,430,'tv_stand').setOrigin(0,1)
    tv_stand.setScale(0.5)
    let tv = this.add.sprite(480,365,'tv').setOrigin(0,1).setInteractive()
    let tvAudio = this.sound.add('tv_sound', { volume: 0.3, loop: true })
    tv.setScale(.5)
    tv.on('pointerdown', function(e){
      click.play()
      if(state.tv_on) {
        if(listenForRadio){
          happiness+=2
        }
        state.tv_on = false
        tv.setFrame(0)
        tvAudio.pause()
      }
      else {
        if(listenForTV){
          happiness += 5
          listenForTV = false
          console.log(happiness + ' tv')
        }
        state.tv_on = true
        if(tvAudio.isPaused) tvAudio.resume()
        else tvAudio.play()
        tv.setFrame(1)
      }
    }, this)
    let game_console = this.add.sprite(505,395,'console').setInteractive()
    game_console.on('pointerdown', function(e){
      click.play()
      if(state.tv_on && state.console_on == 2){
        state.console_on = 0
        tv.setFrame(1)
        console.log('console off')
      }
      else if(state.tv_on && state.console_on == 0){
        state.console_on = 2
        tv.setFrame(2)
        console.log('console on street game')
      }
    })

    //bedroom
    let thermostat = this.add.sprite(590,315,'thermostat').setOrigin(0,1).setInteractive()
    thermostat.setScale(.1)
    thermostat.on('pointerdown', function(){
      click.play()
      // pass
    }, this)
    let bed = this.add.sprite(620,460,'bed').setOrigin(0,1)
    bed.setScale(.5)

    //let guy = this.add.sprite(260,HEIGHT-20,'guy').setOrigin(0,1)
    //guy.setScale(.23)

    let darkness = this.add.sprite(WIDTH / 2, HEIGHT / 2, 'darkness')
    darkness.alpha = 0

  // //guy
  // graphics = this.add.graphics();
  // var line1 = new Phaser.Curves.Line([ 100, 100, 500, 200 ]);
  //   path = this.add.path();
  //   follower = { t: 0, vec: new Phaser.Math.Vector2() };
  //   path.add(line1);
  //   this.tweens.add({
  //     targets: follower,
  //     t: 1,
  //     ease: 'Linear',
  //     duration: 4000,
  //     yoyo: true,
  //     repeat: -1
  //   })
  //
  //   this.anims.create({
  //     key: 'snooze',
  //     frames: [
  //         { key: 'walk1' },
  //         { key: 'walk2' },
  //         { key: 'walk3' },
  //         { key: 'walk4' },
  //         { key: 'walk5' },
  //         { key: 'walk6' },
  //         { key: 'walk7', duration: 50 }
  //     ],
  //     frameRate: 8,
  //     repeat: -1
  //   })
  //
  //   guy = this.add.sprite(260, 360, 'walk1').play('snooze')
  //   guy.setScale(.26)
    function show_menu_box(ctx, e, options){
      if (state.box_up) {
        ctx.menu_box.getAll().forEach(child => {child.destroy()})
        ctx.menu_box.getAll().forEach(child => {child.destroy()})
        ctx.menu_box.destroy()
        state.box_up = false
      }
      else {
      var menu_box = ctx.add.container(e.x, e.y)

      //make the back of the message box
      var box = ctx.add.sprite(0,0, 'menu').setOrigin(0,1)

      box.alpha = 0.9
      //make a text field

      if(e.y<100) {
        if(e.x<700) box.setOrigin(0,0)
        else box.setOrigin(1,0)
      }
      else{
        if(e.x<700) box.setOrigin(0,1)
        else box.setOrigin(1,1)
      }

      box.width = 200
      box.height = 100
      menu_box.add(box)
      for(let i in options){
        var text = ctx.add.text(20, (-80-10*i), options[i].text, { fontFamily: 'pxl', fontSize: 10, wordWrap: { width: 150, useAdvancedWrap: true } }).setOrigin(0,0)
        menu_box.add(text)
      }

      //make a state reference to the messsage box
      ctx.menu_box = menu_box
      state.box_up = true
      }
    }
    function hide_menu_box(ctx){
      ctx.menu_box.getAll().forEach(child => {child.destroy()})
      ctx.menu_box.getAll().forEach(child => {child.destroy()})
      ctx.menu_box.destroy()
      state.box_up = false
    }
  }

  update (){
    //graphics.lineStyle(2, 0xffffff, 1);

    //path.draw(graphics);
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
    this.load.image('darkness', 'assets/darkness.png')

    this.load.audio('theme', [
        'assets/aardvark.mp3'
    ])

    this.load.audio('blip', [
        'assets/blip.mp3'
    ])

    this.load.image('homie', 'assets/homie.png')
  }

  create (){
    var add = this.add
    let in_btn
    WebFont.load({
      custom: {
        families: [ 'pxl' ]
      },
      active: function() {
        add.text(75, 170, 'homie', { color: '#ffffff', fontFamily: 'pxl', fontSize: 100 })
        add.text(75, 280, 'a game by max, erik, mark, yo, and wilfred', { color: '#ffffff', fontFamily: 'pxl', fontSize: 15 })
        add.text(75, 310, 'with sounds from rob', { color: '#ffffff', fontFamily: 'pxl', fontSize: 15 })
        in_btn = add.text(220, 400, '[click here]', { fontFamily: 'pxl', fontSize: 25 }).setInteractive()

        in_btn.on('pointerdown', function (pointer) {
          blip.play()
          game.scene.start('TutScene')
          game.scene.remove('TitleScene')
          add.sprite(800 / 2, 480 / 2, 'darkness')
        })
      }
    })

    let homie = this.add.sprite(610,195,'homie')
    homie.setScale(.32)
    homie.angle = 1

    music = this.sound.add('theme', {loop: true})
    music.play()

    blip = this.sound.add('blip')
  }

  update (){
  }
}

class TutScene extends Phaser.Scene {
  constructor(config) {
    super(config)
    game.scene.remove('TitleScene')
  }

  preload () {
    //this.scene.remove('TitleScene')
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js')
    this.cameras.main.setBackgroundColor('#000000')
    game.input.mouse.capture = true

    this.load.audio('blip', [
        'assets/blip.mp3'
    ])
  }

  create (){
    var add = this.add
    let start_btn
    blip = this.sound.add('blip')

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

        start_btn = add.text(100, 400, 'click here to activate homie #384720a', { fontFamily: 'pxl', fontSize: 25 }).setInteractive()
        start_btn.on('pointerdown', function (pointer) {
          blip.play()
          music.stop()
          game.scene.start('GameScene')
        })
      }
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

var follower;
var path;
var graphics;

var game = new Phaser.Game(config)

game.scene.add('TitleScene', TitleScene)
game.scene.add('TutScene', TutScene)
game.scene.add('GameScene', GameScene)
