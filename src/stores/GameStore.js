import { instance } from '@/common/AxiosConfig'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useGameStore = defineStore('useGameStore', () => {
  const game = ref({
    data: {},
    dataList: [],
    result: {
      status: '',
      message: ''
    }
  })

  const gameData = computed(() => {
    return game.value.data
  })

  const gameDataList = computed(() => {
    return game.value.dataList
  })


  const getWordsList = async () => {
    const response = await instance.get('/words')
    if (response.data) {
      game.value.dataList = response.data
    }
    return response
  }


  // const setBoard = async () => {
  //   const response = await axios.post('/board', this.board.data)
  //   board.value.result = response.data
  // }

  return {
    game,
    gameData,
    gameDataList,
    getWordsList,
  }
})
