<template>
  <div class="cartcontrol">
    <transition name="fade">
       <div class="iconfont icon-remove_circle_outline" v-show="food.count" @click.stop="updateFoodCount(false)"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="iconfont icon-add_circle" @click.stop="updateFoodCount(true)"></div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    props:["food"],
    methods:{
      updateFoodCount(isAdd){
        if(isAdd){
          this.$store.dispatch("updateFoodCount",{isAdd,food:this.food})
        }else{
          this.$store.dispatch("updateFoodCount",{isAdd,food:this.food})
        }
       
      }
    }
  }
</script>



<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-remove_circle_outline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.fade-enter-active, .fade-leave-active 
        transition:all  .5s;
      &.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ 
        opacity: 0.5;
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>

