<template>
  <div class="detail-container">
    <!-- 图书信息 -->
    <books-info :info="info"></books-info>
    
    <!-- 评论内容 -->

    <!-- 评论列表 -->
    <comment-list :comments="comments"></comment-list>

    <!-- 添加评论 -->
    <div class="comment" v-if="!comments.length">
      <textarea v-model='comment'
                class='textarea'
                :maxlength='100'
                placeholder='请输入图书短评'></textarea>
      <div class='location'>
        地理位置：
        <switch color='#EA5A49' :checked='location' @change='getGeo'></switch>
        <span class='text-primary'>{{location}}</span>
      </div>
      <div class='phone'>
        手机型号：
        <switch color='#EA5A49' :checked='phone' @change='getPhone'></switch>
        <span class='text-primary'>{{phone}}</span>
      </div>
      <button class="btn" @click='addComment'>
        评论
      </button>
    </div>

    <div v-else class='text-footer'>
      未登录或者已经评论过啦
    </div>
    <button open-type='share' class="btn">转发给好友</button>
  </div>
</template>
<script>
import { get ,post,showModal,showSuccess} from "@/util"
import BooksInfo from "@/components/booksInfo";
import CommentList from '@/components/commentlist'

export default {
  data(){
    return {
      bookId:'',
      info:{},
      phone:'',
      location:'',
      userinfo:{},
      comment:'',
      comments:[]
    }
  },
  components:{
    BooksInfo,
    CommentList
  },

  methods: {
    // 获取图书信息
    async getBookDetail(bookId){
      const bookInfo= await get('/weapp/booksdetail',{id:bookId})
      this.info=bookInfo
      wx.setNavigationBarTitle({
        title: bookInfo.title
      })
    },
    // 获取地理位置
    async getGeo(e){
      const ak = 'RmKXCpjKlwyFUVVXSCXcLF4KUsOimuuy'
      let url = 'https://api.map.baidu.com/geocoder/v2/'
      if(e.target.value){
        wx.getLocation({
          type: 'wgs84',
          success: (res)=>{
            // wx.request({ 
            //   url, 
            //   data: {
            //     ak,
            //     location: `${res.latitude},${res.longitude}`,
            //     output:'json'
            //   },

            //   header: {
            //     'content-type': 'application/json' // 默认值
            //   },

            //   success: (res)=> {
            //     console.log(res)
            //   }
            // })
            const latitude = res.latitude
            const longitude = res.longitude
            // wx.openLocation({
            //   latitude: latitude,
            //   longitude: longitude,
            //   scale: 28,
            //   success:(location)=> {
            //     console.log(location)
            //   }
            // })
            // 调用微信地图api获取位置
            wx.chooseLocation({
              success:(location)=> {
                console.log(location)
                this.location= location.address
              }
            })
          }
        })
      }else{
        this.location = '未知'
      }
        
      
    },
    // 获取手机型号
    async getPhone(e){
        if(e.target.value){
          // 选中
          let res = wx.getSystemInfoSync()
          this.phone = res.model
        }else{
          // 没选中
          this.phone = '未知'
        }
    },

    // 添加评论
    async addComment(e){
      const data={
        openId:this.userinfo.openId,
        bookid:this.bookId,
        comment:this.comment,
        phone:this.phone,
        location:this.location
      }
      try{
        // 发送数据
        await post('/weapp/addComment',data)
        this.comment = ''
        showSuccess("评论成功！")
      }catch(e){
        showModel('失败', e.msg)
      }
    },

    // 获取评论数据
    // async getComments(){
    //   const comments= await get('/weapp/commentlist',{
    //         bookid:this.bookId
    //   })
    //   console.log('comments', comments)
      
    //   this.commentList= comments.comments||[]
    // },
    async getComments () {
      const comments = await get('/weapp/commentlist', {bookid: this.bookId})
      this.comments = comments.comments || []
    },

  },
  mounted(){
      // 通过路径获取id参数
      this.bookId= this.$root.$mp.query.id
      this.getBookDetail(this.bookId)
      
      this.getComments()
      // 通过缓存获取用户信息
      const userinfo = wx.getStorageSync('userInfo')
      if (userinfo) {
        this.userinfo = userinfo
      }

  },

}
</script>
<style lang="scss" scoped>
.comment{
  margin-top:10px;
  .textarea{
    width:730rpx;
    height:200rpx;
    background:#eee;
    padding:10rpx;
  }
  .location{
    margin-top:10px;
    padding:5px 10px;
  }
  .phone{
    margin-top:10px;
    padding:5px 10px;
    
  }
}
</style>
