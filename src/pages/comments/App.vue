<template>
    <div >
        <!-- 评论列表 -->
        <comment-list :comments="comments" type="personal"></comment-list>

        <!-- 图书列表 -->
        <BooksCard v-if="userinfo.openId" v-for="book  in books" :key="book.id" :books="book"></BooksCard>
    </div>
</template>

<script>
    import { get ,post,showModal,showSuccess} from "@/util"
    import CommentList from '@/components/commentlist'
    import BooksCard from '@/components/booksCard'        

    export default{
        data:{
            comments:[],
            userinfo:{},
            books:[]
        },
        onShow(){
            // 判断用户信息是否存在
            if(!this.userinfo.openId){
                // 不存在的话，则从缓存获取信息
                let userinfo = wx.getStorageSync('userInfo')
                if(userinfo){

                    this.userinfo = userinfo
                    this.init()
                }
            }
        },
        onPullDownRefresh(){
            this.init()
            wx.stopPullDownRefresh()
        },
        components:{
            CommentList,
            BooksCard
        },
        methods:{
            // 初始化数据
            init(){
                wx.showNavigationBarLoading()                
                this.getComments()
                this.getBooks()
                wx.hideNavigationBarLoading()
                
            },
            // 获取评论列表
            async getComments() {
                // 请求评论列表
                const comments= await get ('/weapp/commentlist',{
                    openid:this.userinfo.openId
                })
                this.comments = comments.comments || []
            },
            // 获取图书信息
            async getBooks(){
                // 请求图书列表 
                const books= await get('/weapp/bookslist',{openid:this.userinfo.openId})
                console.log(books)
                this.books=books.lists
            }
        }
    }
</script>