import IntroScene from '@/scenes/game1/IntroScene';
import MainScene from '@/scenes/game1/MainScene';
import { EventEmitter } from 'events';
import Phaser from 'phaser';

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
