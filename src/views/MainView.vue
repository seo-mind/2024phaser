<<template>
  <div>
    <!-- card 선택 -->
    <section class="cards">
      <!-- <div class="card charizard animated">
       
      </div> -->
      <router-link class="nav-link" to="/game1"><div class="card pika animated"><span>총알 피하기<br />&lt;영어 단어&gt;</span> </div>
      </router-link>
      <div class="card eevee animated"><span>Comming soon</span></div>
      <!-- <div class="card mewtwo animated"></div> -->
    </section>
    

  </div>
</template>

<script setup>
import { onMounted} from 'vue'


// /*

//   using 
//     - an animated gif of sparkles.
//     - an animated gradient as a holo effect.
//     - color-dodge mix blend mode
  
// */
// var x;
// var cards = document.querySelectorAll(".card");
// var styleElement = document.querySelector(".hover");

// cards.forEach(function(card) {
//   card.addEventListener("mousemove", handleMove);
//   card.addEventListener("touchmove", handleMove);
//   card.addEventListener("mouseout", handleEnd);
//   card.addEventListener("touchend", handleEnd);
//   card.addEventListener("touchcancel", handleEnd);
// });

// function handleMove(e) {
//   e.preventDefault();
  
//   // normalise touch/mouse
//   var pos = [e.offsetX, e.offsetY];
//   if (e.type === "touchmove") {
//     pos = [e.touches[0].clientX, e.touches[0].clientY];
//   }
  
//   var card = e.currentTarget;
  
//   // math for mouse position
//   var l = pos[0];
//   var t = pos[1];
//   var h = card.offsetHeight;
//   var w = card.offsetWidth;
//   var px = Math.abs(Math.floor(100 / w * l) - 100);
//   var py = Math.abs(Math.floor(100 / h * t) - 100);
//   var pa = (50 - px) + (50 - py);
  
//   // math for gradient / background positions
//   var lp = (50 + (px - 50) / 1.5);
//   var tp = (50 + (py - 50) / 1.5);
//   var px_spark = (50 + (px - 50) / 7);
//   var py_spark = (50 + (py - 50) / 7);
//   var p_opc = 20 + (Math.abs(pa) * 1.5);
//   var ty = ((tp - 50) / 2) * -1;
//   var tx = ((lp - 50) / 1.5) * 0.5;
  
//   // css to apply for active card
//   var grad_pos = `background-position: ${lp}% ${tp}%;`
//   var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`
//   var opc = `opacity: ${p_opc / 100};`
//   var tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`
  
//   // need to use a <style> tag for psuedo elements
//   var style = `
//     .card:hover:before { ${grad_pos} }  /* gradient */
//     .card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */ 
//   `;
  
//   // set / apply css class and style
//   cards.forEach(function(c) { c.classList.remove("active"); });
//   card.classList.remove("animated");
//   card.style.transform = tf;
//   styleElement.innerHTML = style;
  
//   if (e.type === "touchmove") {
//     return false;
//   }
  
//   clearTimeout(x);
// }

// function handleEnd(e) {
//   var card = e.currentTarget;
//   styleElement.innerHTML = "";
//   card.removeAttribute("style");
//   x = setTimeout(function() {
//     card.classList.add("animated");
//   }, 2500);
// }
var x;
var card1 = document.querySelector('.card[data-index="1"]');
var cards = document.querySelectorAll(".card");
var styleElement = document.createElement('style');
onMounted(() => {


})
document.head.appendChild(styleElement);

cards.forEach(function(card, index) {
  card.addEventListener("mousemove", handleMove);
  card.addEventListener("touchmove", handleMove);
  card.addEventListener("mouseout", handleEnd);
  card.addEventListener("touchend", handleEnd);
  card.addEventListener("touchcancel", handleEnd);
  // 각 카드에 고유한 ID를 부여
  card.dataset.index = index;
});

function handleMove(e) {
  e.preventDefault();
  
  // normalise touch/mouse
  var pos = [e.offsetX, e.offsetY];
  if (e.type === "touchmove") {
    pos = [e.touches[0].clientX, e.touches[0].clientY];
  }
  
  var card = e.currentTarget;
  
  // math for mouse position
  var l = pos[0];
  var t = pos[1];
  var h = card.offsetHeight;
  var w = card.offsetWidth;
  var px = Math.abs(Math.floor(100 / w * l) - 100);
  var py = Math.abs(Math.floor(100 / h * t) - 100);
  var pa = (50 - px) + (50 - py);
  
  // math for gradient / background positions
  var lp = (50 + (px - 50) / 1.5);
  var tp = (50 + (py - 50) / 1.5);
  var px_spark = (50 + (px - 50) / 7);
  var py_spark = (50 + (py - 50) / 7);
  var p_opc = 20 + (Math.abs(pa) * 1.5);
  var ty = ((tp - 50) / 2) * -1;
  var tx = ((lp - 50) / 1.5) * 0.5;
  
  // css to apply for active card
  var grad_pos = `background-position: ${lp}% ${tp}%;`
  var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`
  var opc = `opacity: ${p_opc / 100};`
  var tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`
  
  // 고유한 스타일을 생성하기 위해 data-index를 사용하여 스타일 적용
  var index = card.dataset.index;
  var style = `
    .card[data-index="${index}"]:hover:before { ${grad_pos} }  /* gradient */
    .card[data-index="${index}"]:hover:after { ${sprk_pos} ${opc} }   /* sparkles */ 
  `;
  
  // set / apply css class and style
  cards.forEach(function(c) { c.classList.remove("active"); });
  card.classList.remove("animated");
  card.style.transform = tf;
  styleElement.innerHTML = style;
  
  if (e.type === "touchmove") {
    return false;
  }
  
  clearTimeout(x);
}

function handleEnd(e) {
  var card = e.currentTarget;
  styleElement.innerHTML = "";
  card.removeAttribute("style");
  x = setTimeout(function() {
    card.classList.add("animated");
  }, 2500);
}

</script>
<style scoped>
@import '@/css/card.scss';
.card {
  width: 300px;
  height: 400px;
  background: var(--back);
  color: var(--color1);
  background-color: var(--color2);
  background-size: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.card span{
  font-size: 25px;
  font-weight: bold;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
 }
</style>