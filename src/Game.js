import Phaser from 'phaser';
import IntroScene from './scenes/IntroScene';
import MainScene from './scenes/MainScene';
import { EventEmitter } from 'events';

export const gameEvents = new EventEmitter();

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
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
