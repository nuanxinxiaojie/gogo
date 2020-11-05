<template>
  <div class="app">
    <div class="xuanran">
      <router-view></router-view>
    </div>
    <div class="daohang">
      <!-- <router-link to="/msite">外卖</router-link>
      <router-link to="/search">搜索</router-link>
      <router-link to="/order">订单</router-link>
      <router-link to="/profile">我的</router-link>-->
      <Footer v-show="$route.meta.footer" />
    </div>
  </div>
</template>

<script>
import Footer from "./components/Footer/Footer.vue";
// import { login } from "./api";

export default {
  components: {
    Footer,
  },
   mounted(){
    this.$store.dispatch('getAddress')
    this.$store.dispatch('autoLogin')
  }
  // async mounted() {
  //   // 地址信息
  //   const result1 = await reqAddress("116.36867", "40.10038");
  //   const result2 = await reqCategorys();
  //   const result3 = await reqShops({
  //     longitude: "116.36867",
  //     latitude: "40.10038",
  //   });
  //   console.log(result1);
  //   console.log(result2);
  //   console.log(result3);
  // },
};
</script>


<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixins.styl';

.app {
  width: 100%;
}
</style>


