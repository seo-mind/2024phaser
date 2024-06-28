import { useGameStore } from '@/stores/game/game2/GameStore';
import { gameEvents } from '@/views/game/game2/Game.js'; // 수정된 부분
import Phaser from 'phaser';
import { storeToRefs } from 'pinia';
const gameStore = useGameStore();

await gameStore.getWordsList();
const { gameDataList} = storeToRefs(gameStore);
let words = gameDataList.value;
//words = getRandomElements(words);
let textsList = [];

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
    // this.words = [];
    this.handleDataReceived = this.handleDataReceived.bind(this);    
    this.gameScore = 0;
    this.sceneClear = 0;
  }

  preload() {
    // 게임에 필요한 리소스 로드
    
  }

  create() {

    // 총알 그룹 생성
    this.texts = this.physics.add.group({
      defaultKey: 'texts'
    });

    // 총알을 주기적으로 생성
    this.time.addEvent({
      delay: 2000, // 1000ms마다
      callback: this.addFallingWord,
      callbackScope: this,
      loop: true
    });

    this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '32px', fill: '#330900' });

    gameEvents.emit('focus-text'); // Vue.js 이벤트 발생
    
    gameEvents.on('data-sent', this.handleDataReceived, this );

    // 충돌 체크
    //this.physics.add.collider(this.player, this.bullets, this.hitBullet, null, this);

    this.fallingWords = this.physics.add.group()
    this.addFallingWord()
  }

  update() {
    //this.clearText();
     // 게임 로직 업데이트
     this.fallingWords.children.iterate((word) => {
      word.y += 1
      if (word.y > 600) {
        //this.addFallingWord()
        //word.destroy()
        //this.scene.pause();
        this.handleDataReceived(word.text, "1")

      }
    })
  }

  clearText(){
    // 화면을 벗어난 총알 제거
    // this.texts.children.each(function(text) {
    //   if (text.active && (text.x < 0 || text.x > this.sys.game.config.width || text.y < 0 || text.y > this.sys.game.config.height)) {
    //     //bullet.destroy();
    //     this.scene.pause();
    //   }
    // }, this);

   
  }

  addFallingWord() {
    // 새로운 내려오는 단어 생성
    const word = this.add.text(
      Phaser.Math.Between(50, 750),
      0,
      this.getRandomWord(),
      { fontSize: '20px', fill: '#FF5733' }
    )
    this.fallingWords.add(word)
  }
  getRandomWord() {
    // 무작위 단어 반환
    //const words = ['phaser', 'vue', 'vite', 'game', 'javascript']
    //console.log(words[Phaser.Math.Between(0, words.length - 1)])
    return words[Phaser.Math.Between(0, words.length - 1)].eng
  }
  getRandomWordData() {
    // 무작위 단어 반환
    //const words = ['phaser', 'vue', 'vite', 'game', 'javascript']
    //console.log(words[Phaser.Math.Between(0, words.length - 1)])
    return words[Phaser.Math.Between(0, words.length - 1)]
  }
  
  // spawnText() {
  //   const x = Phaser.Math.Between(0, this.scale.width);
  //   const y = 0;
  //   const word = words.pop();
  //   // const texts = this.texts.get();
    
  //   //const texts = this.add.text(x, y, word.eng, { fontSize: '20px', fill: '#FF5733' });
  //   //this.physics.world.enable(text);

  //   // 텍스트가 화면 하단으로 내려오도록 설정
  //   //texts.body.setVelocity(0, 30); // y축 방향으로 100 속도로 이동
    
  //   // // 텍스트가 화면 밖으로 나가면 제거
  //   // text.body.onWorldBounds = true;
  //   // text.body.world.on('worldbounds', (body) => {
  //   //   console.log(body.gameObject);
  //   //     if (body.gameObject === text) {
  //   //         //text.destroy();
  //   //         this.scene.pause();
  //   //     }
  //   // });
  // }

  hitBullet(player, bullet) {
    // 게임 오버 로직
    bullet.disableBody(true, true);
    this.scene.restart(); // 임시로 씬을 재시작하여 게임을 다시 시작합니다.
  }

  
  handleDataReceived(data, type) {
    // Vue.js에서 받은 데이터를 Phaser에서 처리하는 로직
    let sendList = [];         
    this.scene.pause();
    try{
      if( type == "1"){
        this.fallingWords.children.iterate((word) => {
          if( typeof word != "undefined"){
            console.log(`data: ${data}, word: ${word.text} `);
            console.log(word);
            if ( data == word.text) {
              console.log(word.text)
              word.destroy();
              
              words.map((obj, index) =>{
                if ( word.text == obj.eng){
                  let temp = {};
                  temp.eng = obj.eng;
                  temp.kor = obj.kor;
                  sendList.push(temp);
                }
              });
            }
          }
        })
        
        for(let  i = 0 ; i < 3; i ++){
          let temp = this.getRandomWordData();
          let flag = true;
          sendList.map((obj, index) =>{
            console.log(`temp: ${temp.eng}, obj: ${obj.eng}`)
            if ( temp.eng == obj.eng){
              flag = false;
            }
          });

          if( flag ){
            sendList.push(temp);
          }else{
            i--;
          
          }
        }
        
        //console.log(sendList)
        gameEvents.emit('check-text', sendList, this.gameScore  ); 
      }else if( type == "2"){
        try{
          this.scene.resume();
          this.gameScore += 1;
          this.scoreText.setText(`Score: ${this.gameScore}`);
          this.sceneClear += 1;
          if ( this.sceneClear == 3){
            this.sceneClear = 0;
            this.fallingWords.children.iterate((word) => {
              word.destroy();
            })
          }
        }catch(e){
          console.log(e)
        }
      }
    }catch(e){
      console.log(e)
    }
  }
}

