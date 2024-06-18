import Phaser from 'phaser';
import { gameEvents } from '../Game.js'; // 수정된 부분

class IntroScene extends Phaser.Scene {
  constructor() {
    super({ key: 'IntroScene' });
  }

  preload() {
    // 인트로 화면에 필요한 리소스를 로드합니다.
    this.load.image('introBackground', 'path/to/introBackground.png');
    this.load.image('startButton', 'path/to/startButton.png');
  }

  create() {
    // 인트로 화면 설정
    this.add.image(400, 300, 'introBackground');
    const startButton = this.add.image(400, 500, 'startButton').setInteractive();
  
    startButton.on('pointerdown', () => {
      this.scene.start('MainScene');
    });
  
    // Enter 키 입력 감지
    this.input.keyboard.once('keydown-ENTER', () => {
      this.scene.start('MainScene');
    });

    
    // HTML 문자열로부터 DOM 요소 생성
    const htmlString = `
      <div style="text-align: center;">
        <button id="myButton" style="font-size: 24px;">Click Me</button>
      </div>
    `;
    //this.add.dom(400, 300, 'div', 'background-color: lime; width: 220px; height: 100px; font: 48px Arial', 'Phaser');
    this.add.dom().createFromHTML(htmlString);
  }
  
}

export default IntroScene;
