import Phaser from 'phaser';

class IntroScene extends Phaser.Scene {
  constructor() {
    super({ key: 'IntroScene' });
  }

  preload() {
    // 인트로 화면에 필요한 리소스를 로드합니다.
    this.load.image('introBackground', '/assets/title.png');
    this.load.image('startButton', '/assets/enter.png');
    

  }

  create() {
    // 인트로 화면 설정
    this.add.image(400, 300, 'introBackground').setScale(0.5);
    const startButton = this.add.image(400, 500, 'startButton').setInteractive();
    startButton.setScale(0.5);
  
    startButton.on('pointerdown', () => {
      this.scene.start('MainScene');
    });
  
    // Enter 키 입력 감지
    this.input.keyboard.once('keydown-ENTER', () => {
      this.scene.start('MainScene');
    });
  }
  
}

export default IntroScene;
