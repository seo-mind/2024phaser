import { EventEmitter } from 'events';
import Phaser from 'phaser';
import IntroScene from './scenes/IntroScene';
import MainScene from './scenes/MainScene';

export const gameEvents = new EventEmitter();

const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  backgroundColor: '#ffffff',
  scene: [IntroScene, MainScene],
  dom: {
    createContainer: true
  }
};

const game = new Phaser.Game(config);

export default game;
