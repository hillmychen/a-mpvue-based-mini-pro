<template>
  <div class="swiper">
    <swiper 
      indicator-dots="true"
      indicator-color="#EA5A49"
      autoplay="true" 
      interval="6000" 
      duration="1000"
      circular="true">
      <div v-for="(img, imgIndex) in imgUrls" :key="imgIndex">
        <swiper-item class="flex">
          <img v-for="imgItem in img" :key="imgItem.id" :src="imgItem.imageurl" class="slide-image flex-1" mode="aspectFit" @click="gotoDetail(imgItem)"/>
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>
<script>
  export default {
    props:["tops"],
    data() {
      return{

      }
    },
    computed:{
      imgUrls() {

        let res= this.tops
        console.log([res.slice(0,2),res.slice(2,4),res.slice(4)])
        return [res.slice(0,2),res.slice(2,4),res.slice(4)]
      }      
    },
    methods:{
      gotoDetail(imgItem){

        wx.navigateTo({
          url: `/pages/detail/main?id=${imgItem.id}`
        })
      }
    }
  }
</script>
<style lang='scss'>
.swiper{
  margin-top:5px;
  .slide-image{
    height:250rpx;
    width:50%;
  }
}
</style>
