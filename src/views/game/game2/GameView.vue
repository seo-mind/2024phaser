<template>
  <div ref="gameContainer" class="game-container">
  </div>

  
  <div v-if="blockLayer" class="hide-layer"></div>
  <div v-if="showWordLayer" class="word-layer">
    <div class="content">
      <span class="title">제시어 : <p>{{ correctWord.eng }}</p></span>
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
        <br />틀린 단어는 '{{ correctWord.eng }}'<br />
        뜻은 '{{ correctWord.kor }}' 입니다</span>
      <div class="word-options">
        <input type="text" v-model="gameData.player" placeholder="이름을 입력하세요">
        <button @click="insBoard(gameData)">랭킹 등록</button>
      </div>
    </div>
  </div>
  <div>
    <div class="input-layer" style="position:absolute;top:800px;">
      <input type="text" id="game2" v-model="userInput" style="height: 30px;" >
      <button @click="checkWord()" id="submitButton"  style="height: 30px;" >enter</button>
    </div>
  </div>
</template>

<script setup>
import { getRandomElements } from '@/common/game/GameUtils';
import { useCommonGameStore } from '@/stores/game/CommonGameStore';
import { useGameStore } from '@/stores/game/game2/GameStore';
import game, { gameEvents } from '@/views/game/game2/Game.js';
import { storeToRefs } from 'pinia';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const gameContainer = ref(null);
const showWordLayer = ref(false);
const endGame = ref(false);
const blockLayer = ref(false);
const userInput = ref('');
const gameStore = useGameStore();
const commonGameStore = useCommonGameStore();
const router = useRouter()
// gameStore 에서 gameData, gaeDataList 를 가져옵니다
const { gameData,gameDataList} = storeToRefs(gameStore)



let randomKeys =[];
const list_count = 4;
let randomKey = 0;
let playTime = 0;
let correctWord= {};

onMounted(async () => {
  // await useGameStore.getWords();
  await gameStore.getWordsList();

  // 플레이어 기본 데이터 
  gameData.value.player = "AAA";
  gameData.value.score = 0;
  gameData.value.type = "game2"
  gameData.value.rankDate = new Date()

  
  
  // 게임을 특정 DOM 요소에 붙입니다
  game.parent = gameContainer.value;

});


gameEvents.on('focus-text', () => {
  // playTime = playtime;

  
  init()
  const submitButton = document.getElementById('submitButton');
  const inputElement = document.getElementById('game2');
  inputElement.addEventListener('keydown', (event) => {

      if (event.key === 'Enter') {
          event.preventDefault(); // 기본 Enter 동작을 막음 (필요한 경우)
          submitButton.click(); // 버튼 클릭 이벤트를 트리거
      }
  });
});
gameEvents.on('check-text', (wordList, score) => {
  // playTime = playtime;

  // let correct = wordList[0]; 
  // randomKeys = getRandomElements(wordList);

  showWord(wordList,4)
  console.log(score);
  correctWord = wordList[0];
  gameData.value.score = score
  // showWordLayer.value = true; 
  // blockLayer.value =true;

 // userInput.value = '';

});


onBeforeUnmount(() => {
  gameStore.$reset()
})

const init = () =>{
  const inputElement = document.getElementById('game2');
  inputElement.focus();
}


function showWord(wordList){
  randomKeys = getRandomElements(wordList, list_count)
  //randomKey = Math.floor(Math.random() * ( list_count ));

  // randomKeys.map((obj, index) =>{
  //   if ( userInput.value == obj.eng){
  //     randomKey = index;
  //   }
  // });

  showWordLayer.value = true; 
  blockLayer.value =true;
} 
function selectWord(word) {
  if ( correctWord.eng == word.eng ){

    showWordLayer.value = false;
    blockLayer.value = false;
    gameEvents.emit('data-sent', "", "2");
    userInput.value = '';
    init()
    // canvas를 선택해서 display 를 block 으로 설정합니다
    //game.canvas.style.display = 'block';


  }else{
    
    endGame.value = true;
    showWordLayer.value = false;
    //gameData.value.score = playTime;
    //insBoard(gameData.value)

  }
  return false;
}



const checkWord = ()=> {
      // 내려오는 단어와 사용자 입력 비교
     // console.log(game.parent.parent.fallingWords)
      gameEvents.emit('data-sent', userInput.value, "1");
      //
      // game.parent.fallingWords.children.iterate((word) => {
      //   console.log(word)
      //   if (word.text === this.userInput) {
      //     word.destroy()
      //     this.userInput = ''
      //     this.$parent.score++
      //   }
      // })
    }

// const checkWord = () => {
//   const inputElement = document.getElementById('game2');
//   const word = inputElement.value;
//   inputElement.value = "";
//   gameEvents.emit('data-sent', word);
// }

// function getRandomElements(arr, count) {
//   const shuffled = arr.slice(); // 원본 배열을 복사
//   for (let i = shuffled.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
    
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // 요소를 섞음
//   }
//   return shuffled.slice(0, count); // 섞인 배열에서 처음 count개의 요소를 반환
// }



const insBoard = async (gameData) => {
  gameData.rankDate = new Date()
  const response = await commonGameStore.insGameRank(gameData)
  if (response.status === 201) {
    //gameStore.initPostSearchParam()
    // router.push({
    //   name: 'rank1',
    //   params: { }
    // })
    location.href = "/ranks/game2"
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
