<<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <h1>랭킹</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>순위</th>
                  <th>이름</th>
                  <th>점수</th>
                  <th>날짜</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(rank, index) in gameDataList" :key="rank.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ rank.player }}</td>
                  <td>{{ rank.score }}</td>
                  <td>{{ rank.rankDate }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="button">
      <router-link to="/" class="btn btn-primary">메인으로</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted , onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/GameStore'

//rank  가져오기
const gameStore = useGameStore();
const { gameDataList } = storeToRefs(gameStore)

onMounted(async () => {
  await gameStore.getRankList();
});


onBeforeUnmount(() => {
  gameStore.$reset()
})

</script>

<style lang="scss" scoped>


</style>