import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // 게임에 필요한 리소스 로드
    this.load.image('player', 'assets/player.png');
    this.load.image('bullet', 'assets/bullet.png');
  }

  create() {
    // 플레이어 생성
    this.player = this.physics.add.sprite(400, 500, 'player');
    
    // 총알 그룹 생성
    this.bullets = this.physics.add.group({
      defaultKey: 'bullet',
      maxSize: 10
    });

    // 총알을 주기적으로 생성
    this.time.addEvent({
      delay: 1000, // 1000ms마다
      callback: this.spawnBullet,
      callbackScope: this,
      loop: true
    });

    // 충돌 체크
    this.physics.add.collider(this.player, this.bullets, this.hitBullet, null, this);
  }

  update() {
    // 플레이어 이동 로직
    if (this.input.activePointer.isDown) {
      this.player.x = this.input.x;
    }
  }

  spawnBullet() {
    // 화면 상단에서 랜덤한 위치에 총알 생성
    const x = Phaser.Math.Between(0, 800);
    const bullet = this.bullets.get(x, 0);
    
    if (bullet) {
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.body.velocity.y = 200;
    }
  }

  hitBullet(player, bullet) {
    // 게임 오버 로직
    bullet.disableBody(true, true);
    this.scene.restart(); // 임시로 씬을 재시작하여 게임을 다시 시작합니다.
  }
}

