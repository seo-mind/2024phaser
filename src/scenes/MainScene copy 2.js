import Phaser from 'phaser';
import { gameEvents } from '../Game.js'; // 수정된 부분

const words = [
  { word: "apple", meaning: "사과" },
  { word: "banana", meaning: "바나나" },
  { word: "cherry", meaning: "체리" },
  // 추가 단어와 뜻을 여기에 추가하세요
];

let selectedWord = {};

class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
    this.startTime = 0;
    this.elapsedTime = 0;
  }

  preload() {
      // 게임에 필요한 리소스를 로드합니다.
    // public/assets 경로
    this.load.image('player', '/assets/player.png');
    this.load.image('bullet', '/assets/bullet.png');
  }

  create() {
    this.player = this.physics.add.sprite(100, 100, 'player');
    this.player.setScale(0.1);
    this.player.setCollideWorldBounds(true);

    // 총알 그룹 설정
    this.bullets = this.physics.add.group({
      defaultKey: 'bullet',
      maxSize: 10
    });

    // 총알 주기적으로 생성
    this.time.addEvent({
      delay: 1000,
      callback: this.fireBullet,
      callbackScope: this,
      loop: true
    });

    // 플레이 시간 텍스트 객체 생성
    this.timeText = this.add.text(10, 10, 'Time: 0', { fontSize: '32px', fill: '#fff' });


    // 충돌 감지 설정
    this.physics.add.overlap(this.player, this.bullets, this.handleOverlap, null, this);

    
    // 키보드 입력 설정
    this.cursors = this.input.keyboard.createCursorKeys();


  }

  update() {
    // 플레이어 이동 로직
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-200);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(200);
    } else {
      this.player.setVelocityY(0);
    }

    // 경과 시간 계산
    this.elapsedTime = this.time.now - this.startTime;

    // 밀리초를 초 단위로 변환하여 텍스트 업데이트
    const seconds = Math.floor(this.elapsedTime / 1000);
    this.timeText.setText('Time: ' + seconds);

  }

  fireBullet() {
    const bullet = this.bullets.get();

    if (bullet) {
      bullet.enableBody(true, Phaser.Math.Between(0, 800), 0, true, true);
      bullet.setVelocityY(200);
    }
  }

  handleOverlap(player, bullet) {
    bullet.destroy(); // 총알 제거
    this.scene.pause(); // 정지 
    //gameEvents.emit('player-hit'); // 이벤트 발생
    this.selectWord();
  }

  selectWord() {
    console.log('test');
    
    this.wordText = this.add.text(400, 150, '', { fontSize: '28px', fill: '#000' }).setOrigin(0.5);
    this.resultText = this.add.text(400, 350, '', { fontSize: '28px', fill: '#000' }).setOrigin(0.5);
    console.log('test2');
    this.inputField = this.add.dom(400, 250, 'input', { type: 'text', placeholder: '뜻을 입력하세요' });
    this.submitButton = this.add.dom(400, 300, 'button', { type: 'button' }, '확인');
    this.submitButton.addListener('click');
    this.submitButton.on('click', () => this.checkAnswer());
    console.log('test3');
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex];
    this.wordText.setText(selectedWord.word);
  }
  
  checkAnswer() {
    const playerGuess = this.inputField.node.value;
    
    if (playerGuess === selectedWord.meaning) {
        this.resultText.setText('정답입니다!');
    } else {
        this.resultText.setText(`틀렸습니다. 정답은 ${selectedWord.meaning}입니다.`);
    }

    this.selectWord();
    this.inputField.node.value = '';
  }

}

export default MainScene;
