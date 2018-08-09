<template>
  <div class='bookinfo'>

    <!-- 图书封面 -->
    <div class="thumb">
      <img class='back' 
        :src="info.imageurl"
        mode='aspectFill'>
      <img class="img"  
            :src="info.imageurl" 
            mode='aspectFit'
          >
      <div class="info">
        <div class="title">
          {{info.title}}
        </div>
        <div class="author">
          {{info.author}}
        </div>
      </div>
    </div>

    <!-- 图书信息 -->
    <div class="detail">
      <img :src="userinfo.avatarUrl" class='avatar' mode='aspectFit'>
      {{userinfo.nickName}}
      <div class="right text-primary">
        {{info.rate}}分
        <stars :value='info.rate'></stars>
      </div>
    </div>
    <div class="detail">
      {{info.publisher}}
      <div class="right">
        {{info.price}}
      </div>
    </div>

    <!-- 图书标签,简介-->
    <div class="tags">
      <div class="badge" :key='tag' v-for='tag in info.tags'>{{tag}}</div>
    </div>
    <div class="summary">
      <p :key='i' v-for='(sum,i) in info.summary'>{{sum}}</p>
    </div>
  </div>
</template>

<script>
import stars from '@/components/stars'
export default {
  props:["info"],
  components: {
    stars
  },
  data(){
    return {

    }
  },
  computed: {
    userinfo(){
      return this.info.user_info || {}
    }
  }
}
</script>

<style lang='scss'>
.bookinfo{
  font-size: 14px;
  
  .badge{
    display: inline-block;
    margin:5px;
    padding:5px;
    border-radius: 10px;
    border:1px #EA5A49 solid;
    color:#EA5A49;
  }
  .summary{
    padding:0 15px;
    margin-top:10px;
    p{
      text-indent: 2em;
      font-size:14px;
    }
  }
  .right{
    float: right;
  }
  .detail{
    padding:5px 10px;
    .avatar{
      width:20px;
      height:20px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .thumb{
    width:750rpx;
    height:500rpx;
    overflow:hidden;
    position: relative;
    .back{
      filter: blur(15px);
      width:100%;
    }
    .img{
      position: absolute;
      width:100%;
      height:300rpx;
      left:0;
      top:30rpx;
    }
    .info{
      color:white;
      position: absolute;
      width:100%;
      left:0;
      top:330rpx;
      text-align: center;
      .title{
        font-size:20px;
      }
      .author{
        font-size: 14px;
      }

    }
  }
}
</style>


