import Phaser from 'phaser';
import { gameEvents } from '../Game.js'; // 수정된 부분

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
    this.startTime = 0;
    this.elapsedTime = 0;
    this.words = [
      { word: 'Hello', meaning: '안녕하세요' },
      { word: 'World', meaning: '세계' },
      { word: 'Phaser', meaning: '페이저' },
      { word: 'Game', meaning: '게임' },
      { word: 'Over', meaning: '끝' }
    ]; // 단어와 뜻 목록
  }

  preload() {
    // 게임에 필요한 리소스를 로드합니다.
    // public/assets 경로
    this.load.image('player', '/assets/player.png');
    this.load.image('bullet', '/assets/bullet.png');
  }

  create() {
    // 플레이어 설정
    this.player = this.physics.add.sprite(400, 300, 'player');
    this.player.setScale(0.1);
    this.player.setCollideWorldBounds(true);

    // 플레이 시간 텍스트 객체 생성
    this.timeText = this.add.text(10, 10, 'Time: 0', { fontSize: '32px', fill: '#fff' });

    // 게임 시작 시간 기록
    this.startTime = this.time.now;

    // 단어 입력 필드와 버튼 생성
    let inputFieldHtml = `<input type="text" id="answer" placeholder="뜻을 입력하세요" style="width:100px;height:50px;">`;
    this.inputField = this.add.dom(400, 300).createFromHTML(inputFieldHtml);
    
    // 입력 필드와 버튼 숨기기
    this.inputField.setVisible(true);

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

    // 충돌 체크
    this.physics.add.overlap(this.player, this.bullets, this.showWord, null, this);

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

  showWord(player, bullet) {
    
    // 게임 일시 정지
    //this.scene.pause();

    bullet.disableBody(true, true);

    // 랜덤 단어 선택
    this.currentWord = this.words[Phaser.Math.Between(0, this.words.length - 1)];

    // 단어 표시
    if (this.wordText) this.wordText.destroy(); // 이전 텍스트 제거
    //this.wordText = this.add.text(player.x, player.y - 50, this.currentWord.word, { fontSize: '32px', fill: '#fff' });
    this.wordText = this.add.text(400, 300, this.currentWord.word, { fontSize: '32px', fill: '#fff' });

    // 입력 필드와 버튼 표시
    this.inputField.setVisible(true);
  }
}

export default MainScene;
