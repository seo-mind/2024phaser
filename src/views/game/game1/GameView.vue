<template>
  <div ref="gameContainer" class="game-container">
  </div>

  
  <div v-if="blockLayer" class="hide-layer"></div>
  <div v-if="showWordLayer" class="word-layer">
    <div class="content">
      <span class="title">제시어 : <p>{{ randomKeys[randomKey].eng }}</p></span>
      <div class="word-options">
        <button v-for="(word,index ) in randomKeys" :key="index" @click="selectWord(word)">
          {{ word.kor }}
        </button>
      </div>
    </div>
  </div>
  <div v-if="endGame" class="end-layer">
    <div class="content">
      <span class="title">게임 종료
        <br />틀린 단어는 '{{ randomKeys[randomKey].eng }}'<br />
        뜻은 '{{ randomKeys[randomKey].kor }}' 입니다</span>
      <div class="word-options">
        <input type="text" v-model="gameData.player" placeholder="이름을 입력하세요">
        <button @click="insBoard(gameData)">랭킹 등록</button>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { getRandomElements } from '@/common/game/GameUtils';
import { useCommonGameStore } from '@/stores/game/CommonGameStore';
import { useGameStore } from '@/stores/game/game1/GameStore';
import game, { gameEvents } from '@/views/game/game1/Game.js';
import { storeToRefs } from 'pinia';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const gameContainer = ref(null);
const showWordLayer = ref(false);
const endGame = ref(false);
const blockLayer = ref(false);
const gameStore = useGameStore();
const commonGameStore = useCommonGameStore();
const router = useRouter()
// gameStore 에서 gameData, gaeDataList 를 가져옵니다
const { gameDataList} = storeToRefs(gameStore)
const { gameData } = storeToRefs(commonGameStore)



let randomKeys =[];
const list_count = 4;
let randomKey = 0;
let playTime = 0;

onMounted(async () => {
  // await useGameStore.getWords();
  await gameStore.getWordsList();

  // 플레이어 기본 데이터 
  gameData.value.player = "AAA";
  gameData.value.score = 0;
  gameData.value.type = "game1"
  gameData.value.rankDate = new Date()

  
  
  // 게임을 특정 DOM 요소에 붙입니다
  game.parent = gameContainer.value;



  gameEvents.on('player-hit', (playtime) => {
    playTime = playtime;
      
    // canvas를 선택해서 display 를 none 으로 설정합니다
    //game.canvas.style.display = 'none';

    showWord()
  });
});

onBeforeUnmount(() => {
  gameStore.$reset()
})

function showWord(){
  randomKeys = getRandomElements(gameDataList.value, list_count)
  randomKey = Math.floor(Math.random() * ( list_count ));
  showWordLayer.value = true; 
  blockLayer.value =true;
} 
function selectWord(word) {
  

  
  if ( randomKeys[randomKey] == word ){
    

    showWordLayer.value = false;
    blockLayer.value = false;
    gameEvents.emit('data-sent', true);
   

    // canvas를 선택해서 display 를 block 으로 설정합니다
    //game.canvas.style.display = 'block';


  }else{
    
    endGame.value = true;
    showWordLayer.value = false;
    gameData.value.score = playTime;
    //insBoard(gameData.value)

  }
  return false;
}



const insBoard = async (gameData) => {
  gameData.rankDate = new Date()
  const response = await commonGameStore.insGameRank(gameData)
  if (response.status === 201) {
    //gameStore.initPostSearchParam()
    // router.push({
    //   name: 'rank1',
    //   params: { }
    // })
    location.href = "/ranks/game1"
  }
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
  width: 1200px;
  height: 800px;
}
.word-layer .content{
  top: 40%;
  position: absolute;
  left: 35%;
  width: 600px;
  height: 200px;
  background-color: #e4ffd8;
  border: 1px solid;
  padding: 30px;
}
.hide-layer {
  position: absolute;
  width: 1200px;
  height: 800px;
  background-color: black;
  opacity: 0.1;
}
.end-layer{
  top: 30%;
  position: absolute;
  left: 15%;
  width: 600px;
  height: 200px;
  padding: 30px;
  background-color: #e4ffd8;
}
.end-layer .title{
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  display: block;
}
.end-layer input{
  height: 40px;
  width: 200px;
  padding-left: 20px;

}
.word-layer .title{
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  display: block;
}
.word-layer .title p{
  display:inline;
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
