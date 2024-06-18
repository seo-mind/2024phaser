<template>
  <div ref="gameContainer" class="game-container">

    <div v-if="showWordLayer" class="word-layer">
      {{ randomKeys[randomKey].eng }}
    <div class="word-options">
      
      <button v-for="(word,index ) in randomKeys" :key="index" @click="selectWord(word)">
        {{ word.kor }}
      </button>
    </div>
  </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import game, { gameEvents } from '../Game.js';

const gameContainer = ref(null);
const showWordLayer = ref(false);
let words = ref(null); // 선택할 단어들

let randomKeys =[];
let randomKey = 0;
const list_count = 4;

onMounted(() => {
  words = [{"eng":"apple", "kor":"사과"}, {"eng":"door", "kor":"문"}, {"eng":"egg","kor":"계란"}, {"eng":"frog","kor":"개구리"}, {"eng":"one","kor":"1"}]
  
  // 게임을 특정 DOM 요소에 붙입니다
  game.parent = gameContainer.value;

  gameEvents.on('player-hit', () => {
    showWord()
  });
});

function showWord(){
  randomKeys = getRandomElements(words, list_count)
  randomKey = Math.floor(Math.random() * ( list_count ));
  showWordLayer.value = true; 
} 
function selectWord(word) {
  
  if ( randomKeys[randomKey] == word ){
    

    showWordLayer.value = false;

    gameEvents.emit('data-sent', word);
  }else{
    alert('끝')
    location.href = location.href
  }
  return false;
}


function getRandomElements(arr, count) {
  const shuffled = arr.slice(); // 원본 배열을 복사
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // 요소를 섞음
  }
  return shuffled.slice(0, count); // 섞인 배열에서 처음 count개의 요소를 반환
}

</script>

<style scoped>
.game-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.word-layer {
  position: absolute;
  top: 400;
  left: 300;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.word-options button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 18px;
  color: white;
  background: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.word-options button:hover {
  background: #0056b3;
}
</style>
