<template>
  <a :href="detailUrl">
    <div class="book-card">
      <!-- 图书图片 -->
      <div class="thumb">
        <img 
          :src="books.imageurl" 
            alt="" class="img" 
              mode="aspectFit"
                @click.stop="preViewImg(books)"
          />  
      </div>

      <!-- 图书信息详情 -->
      <div class="detail">
        <!-- 图书评分· -->
        <div class="row text-primary">
          <div class="right">
            {{books.rate}}  <stars :value="books.rate"></stars>
          </div>
          <div class="left">
            {{books.title}}          
          </div>
        </div>

        <!-- 图书浏览量 -->
        <div class="row ">
          <div class="right">
            浏览量：{{books.count}}
          </div>
          <div class="left">
            {{books.author}}          
          </div>
        </div>

        <!-- 图书添加用户信息-->
        <div class="row ">
          <div class="right">
            添加人：{{books.user_info.nickName}}
          </div>
          <div class="left">
            {{books.publisher}}          
          </div>
        </div>
      </div>
    </div>
  </a>
</template>
<script>
  import stars from '@/components/stars'
  export default {
    props:["books"],
    components:{
      stars,
    },
    data(){
      return{

      }
    },
    computed:{
      // 跳转图书详情页
      detailUrl(){

        return `/pages/detail/main?id=${this.books.id}`
      }
    },
    mounted() {
      
    },
    methods:{
      preViewImg(books) {
        wx.previewImage({
          current: books.imageurl, // 当前显示图片的http链接
          urls: [books.imageurl]// 需要预览的图片http链接列表
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.book-card{
  padding:5px;
  overflow: hidden;
  margin-top:5px;
  margin-bottom:5px;
  font-size:14px;
  .thumb{
    width:90px;
    height:90px;
    float: left;
    margin:0 auto;
    overflow:hidden;
    .img{
      max-width: 100%;
      max-height: 100%;
    }
  }
  .detail{
    margin-left: 100px;
    .row{
      line-height:20px;
      margin-bottom:3px;
    }
    .right{
      float: right;
      
    }
    .left{
      margin-right:80px;
    }
  }
  
}
</style>
