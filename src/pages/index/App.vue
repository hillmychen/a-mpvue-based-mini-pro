<template>

    <div class="container">

        <div class="userinfo">
            <img alt="" :src="userInfo.avatarUrl" />
            <p v-if="logged">{{userInfo.nickName}}</p>
            <button v-else open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin" >点击登录</button>
        </div>

        <year-progress></year-progress>

        <button @click="scanBook" class="btn">添加图书</button>
    </div>
    
</template>

<script>
    import qcloud from 'wafer2-client-sdk'
    import config from '@/config' 
    import { get , showSuccess, request, post ,showModal} from '@/util'
    import YearProgress from '@/components/yearProgress'

    export default{   

        components:{
            YearProgress
        },  

        data(){
            return {
                userInfo:{
                    avatarUrl:require('../../../static/img/unlogin.png')
                },
                logged:false
            }
        },

        methods:{
            getWxLogin: function ({encryptedData, iv, userinfo}) {
                const self = this
                wx.login({
                    success: function (loginResult) {
                    console.log('loginResult', loginResult)
                    var loginParams = {
                        code: loginResult.code,
                        encryptedData: encryptedData,
                        iv: iv
                    }
                    qcloud.setLoginUrl(config.loginUrl)
                    qcloud.login({
                        loginParams,
                        success () {
                            // 获取用户信息
                            qcloud.request({
                                url: config.userUrl,
                                login: true,
                                success (userRes) {
                                    console.log(userRes)
                                    showSuccess('登录成功')
                                    wx.setStorageSync('userinfo', userRes.data.data)
                                    self.userinfo = userRes.data.data
                                }
                            })
                        },
                        fail (error) {
                            showModal('登录失败', error)
                        }
                    })
                    },
                    fail: function (loginError) {
                        showModal('登录失败', loginError)
                    }
                })
            },
            doLogin (e) {
                const self = this
                // 查看是否授权
                wx.getSetting({
                    success: function (res) {
                    // 授权信息里有用户信息
                    if (res.authSetting['scope.userInfo']) {
                        // 检查用户登录是否过期
                        wx.checkSession ({
                                success: function () {
                                    // 没过期 直接成功
                                    showSuccess('登录成功')
                                },
                                fail: function () {
                                    // 过期了 重新登录 先清楚登录的状态
                                    qcloud.clearSession()
                                    // 登录态已过期，需重新登录
                                    // 登录需要的加密信息
                                    var options = {
                                    encryptedData: e.mp.detail.encryptedData,
                                    iv: e.mp.detail.iv,
                                    userinfo: e.mp.detail.userInfo
                                    }
                                    // self.getWxLogin(options)

                                    qcloud.setLoginUrl(config.loginUrl)

                                    qcloud.login({
                                        success: function (userInfo) {
                                            console.log('登录成功', userInfo);
                                            showSuccess('登录成功')
                                            wx.setStorageSync('userInfo', userInfo)
                                            self.userInfo=userInfo
                                            self.logged=true
                                        },
                                        fail: function (err) {
                                            console.log('登录失败', err);
                                        }
                                    })
                                }
                            })
                        } else {
                            showModal('用户未授权', e.mp.detail.errMsg)
                        }
                    }
                })
            },
            // 通过isbn获取并添加图书
            async addBook(isbn){
                const bookInfo= await post('/weapp/addbook', {
                    isbn,
                    openId:this.userInfo.openId
                })
                
                if(bookInfo.code==0 && bookInfo.data.title){
                    showModal(`添加成功`)
                }

            },
            // 扫描图书
            scanBook(){
                wx.scanCode({
                    success: (res) => {
                        if(res.result){
                            console.log(res.result)
                            this.addBook(res.result)
                        }
                    }
                })
            }
        },

        async created () {
            qcloud.setLoginUrl(config.loginUrl)
            // qcloud.login({
            //     success: function (userInfo) {
            //         console.log('登录成功', userInfo);
            //     },
            //     fail: function (err) {
            //         console.log('登录失败', err);
            //     }
            // })
        },

        onShow(){

            let userInfo=wx.getStorageSync('userInfo')
            console.log(userInfo)
            if(userInfo){
                this.userInfo=userInfo
                this.logged=true
            }
        }

    }
</script>
<style lang="scss" rel='stylesheet/scss'>
.container{
    padding:0 30rpx;
}
.userinfo{
    margin-top:100rpx;
    text-align:center;
    img{
        width:150rpx;
        height:150rpx;
        border-radius:50%;
        margin:20rpx;
    }
}
</style>
