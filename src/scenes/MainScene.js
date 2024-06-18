import Phaser from 'phaser';
import { gameEvents } from '../Game.js'; // 수정된 부분

class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
    this.handleDataReceived = this.handleDataReceived.bind(this);
  }

  preload() {
    // 게임에 필요한 리소스를 로드합니다.
    // public/assets 경로
    this.load.image('player', '/assets/player.png');
    this.load.image('bullet', '/assets/bullet.png');
  }

  create() {
    
    this.startTime = 0;
    this.elapsedTime = 0;
    this.BULLET_SPEED = 200;

    this.player = this.physics.add.sprite(100, 100, 'player');
    this.player.setScale(0.1);
    this.player.setCollideWorldBounds(true);

    // 총알 그룹 설정
    this.bullets = this.physics.add.group({
      defaultKey: 'bullet',
      maxSize: 10
    });

    // 총알 주기적으로 생성
    // this.time.addEvent({
    //   delay: 1000,
    //   callback: this.fireBullet,
    //   callbackScope: this,
    //   loop: true
    // });
    
    this.time.addEvent({
      delay: 1000,                // 1초마다
      callback: this.onEvent,
      callbackScope: this,
      loop: true
    });

    // 플레이 시간 텍스트 객체 생성
    this.timeText = this.add.text(10, 10, 'Time: 0', { fontSize: '32px', fill: '#330900' });

    // 충돌 감지 설정
    this.physics.add.overlap(this.player, this.bullets, this.handleOverlap, null, this);
    
    // 키보드 입력 설정
    this.cursors = this.input.keyboard.createCursorKeys();


    gameEvents.on('data-sent', this.handleDataReceived, this );
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
    this.timeText.setText('Time: ' + this.elapsedTime);

    this.clearBullet();
    
  }

  onEvent(){
    this.fireBullet();
    this.updateTime();
  }

  updateTime() {
    this.BULLET_SPEED += 20;
    this.elapsedTime++;
  }

  clearBullet(){
    // 화면을 벗어난 총알 제거
    this.bullets.children.each(function(bullet) {
      if (bullet.active && (bullet.x < 0 || bullet.x > this.sys.game.config.width || bullet.y < 0 || bullet.y > this.sys.game.config.height)) {
        console.log(';;;');
        bullet.destroy();
      }
    }, this);
  }

  fireBullet() {
    const bullet = this.bullets.get();

    if (bullet) {
      // 총알이 생성될 위치를 무작위로 선택
      const positions = [
        { x: Phaser.Math.Between(0, 800), y: 0 }, // 상단에서 생성
        { x: Phaser.Math.Between(0, 800), y: 600 }, // 하단에서 생성
        { x: 0, y: Phaser.Math.Between(0, 600) }, // 왼쪽에서 생성
        { x: 800, y: Phaser.Math.Between(0, 600) } // 오른쪽에서 생성
      ];
      const spawnPosition = Phaser.Utils.Array.GetRandom(positions);

      bullet.enableBody(true, spawnPosition.x, spawnPosition.y, true, true);

      // 플레이어의 위치를 계산하여 bullet을 그 방향으로 발사
      const direction = new Phaser.Math.Vector2(this.player.x - bullet.x, this.player.y - bullet.y);
      direction.normalize();
      bullet.setVelocity(direction.x * this.BULLET_SPEED, direction.y * this.BULLET_SPEED);
    }
  }
  handleOverlap(player, bullet) {
    bullet.destroy(); // 총알 제거
    this.scenePause();
    gameEvents.emit('player-hit'); // Vue.js 이벤트 발생
    
  }

  
  handleDataReceived(data) {
    // Vue.js에서 받은 데이터를 Phaser에서 처리하는 로직
    this.sceneResume();
    //this.add.text(200, 200, `Received: ${data}`, { fontSize: '24px', fill: '#FF5733' }).setOrigin(0.5);

  }

  
  scenePause(){
    this.scene.pause();
    this.time.paused = true;
  }

  sceneResume(){
    this.scene.resume();
    this.time.paused = false;
    this.BULLET_SPEED = 200;
    
    // 모든 총알 파괴
    this.bullets.children.each(function(bullet) {
      bullet.destroy();
  }, this);
  }
  
}

export default MainScene;
