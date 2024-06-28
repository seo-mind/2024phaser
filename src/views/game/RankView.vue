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
import { useCommonGameStore } from '@/stores/game/CommonGameStore';
import { storeToRefs } from 'pinia';
import { onBeforeUnmount, onMounted } from 'vue';
import { useRoute } from 'vue-router';

//rank  가져오기
const commonGameStore = useCommonGameStore();
const { gameDataList } = storeToRefs(commonGameStore)
const route = useRoute()

onMounted(async () => {
  console.log(route.params.id)
  await commonGameStore.getRankList('&type='+route.params.id);
});


onBeforeUnmount(() => {
 
  commonGameStore.$reset()
})

</script>

<style lang="scss" scoped>


</style>