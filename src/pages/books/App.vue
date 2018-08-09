<template>
    <div>
        <top-swiper :tops="tops"></top-swiper>
        <books-card v-for="book  in books" :key="book.id" :books="book"></books-card>
        <p v-if="!more" class="no-more">
            没有更多了
        </p>
    </div>
</template>

<script>
    // 每次加载10条
    // 0页   0-10
    // 1     10-20
    // 2     20-30（5）
    // page 当前第几页

    // 没有更多数据
    // 1. page=0 不能显示这条提醒
    // 2. page>0 数据长度<10 停止触底加载
    import { get } from "@/util"
    import booksCard from "@/components/booksCard.vue"
    import TopSwiper from "@/components/topSwiper.vue"
    
    export default {
        data(){
            return {
                books:[],
                page:0,//初始化页数
                more:true,//判断是否加载更多
                tops:[]
            }
        },
        components:{
            booksCard,
            TopSwiper
        },
        mounted () {
            this.getTop()
            this.getBooksList(true)
        },
        
        // 下拉刷新 
        onPullDownRefresh(){
            this.getBooksList(true)
        },
        onReachBottom(){
            if(!this.more){
                return false
            }
            this.page=this.page+1
            this.getBooksList()
        },
        methods : {
            // 获取图书列表
            async getBooksList(refresh){
                wx.showNavigationBarLoading()
                // 如果是重新刷新
                if(refresh){
                    this.page=0
                    this.more=true
                }
                // 获取图书列表
                const booksList= await get('/weapp/bookslist',{page:this.page})
                console.log(booksList)

                // 如果返回数据少于10，且页数大于0，停止触底加载
                if(booksList.lists.length<10 && this.page>0){
                    this.more = false
                    console.log(this.more)
                    
                }

                if(refresh){
                    this.books=booksList.lists
                    wx.stopPullDownRefresh()
                    
                }else{
                    this.books=this.books.concat(booksList.lists)
                }
                
                wx.hideNavigationBarLoading()
                
            },

            // 加载浏览量排名前5的图书
            async getTop(){
                const top=await get('/weapp/getTop')
                this.tops=top.topList
            }
        }
    }
</script>
<style lang="scss">
.no-more{
    text-align: center;
}
</style>
