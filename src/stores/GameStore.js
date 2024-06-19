import { instance } from '@/common/AxiosConfig'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useGameStore = defineStore('useGameStore', () => {
  const game = ref({
    data: {},
    dataList: [],
    paginationInfo: {
      currentPage: 1,
      limit: 10,
      pageCount: 5
    },
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
  
  const gamePaginationInfo = computed(() => {
    return game.value.paginationInfo
  })

  
  /** SETTERS */

  const setCurrentPage = (page) => {
    game.value.paginationInfo.currentPage = page
  }

  const setLimit = (limit) => {
    game.value.paginationInfo.limit = limit
  }

  
  /** 초기화 함수 */

  const initGameStoreState = () => {
    game.value.data = {}
    game.value.dataList = {}
    game.value.result = {}
  }

  const initGameSearchParam = () => {
    game.value.params = {}
    game.value.paginationInfo = {
      currentPage: 1,
      limit: 10,
      pageCount: 5
    }
  }




  const getWordsList = async () => {
    const response = await instance.get('/words')
    if (response.data) {
      game.value.dataList = response.data
    }
    return response
  }

  
  const getRankList = async () => {
    const response = await instance.get('/ranks?_sort=-score&_limit=10')
    if (response.data) {
      game.value.dataList = response.data
    }
    return response
  }

  // const setBoard = async () => {
  //   const response = await axios.post('/board', this.board.data)
  //   board.value.result = response.data
  // }

  const insGameRank = async (insRankData, headerOptions) => {
    const response = await instance.post(`/ranks`, insRankData, headerOptions)
    return response
  }

  return {
    game,
    gameData,
    gameDataList,
    getWordsList,
    insGameRank,
    getRankList
  }
})
