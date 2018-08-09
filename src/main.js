import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip=false
const app = new Vue(App)
app.$mount()

export default {
    config : {
        pages: ['^pages/index/main', 'pages/comments/main', 'pages/books/main', 'pages/detail/main'],
        window: {
            "backgroundTextStyle":"light",
            "navigationBarBackgroundColor": "#EA5149",
            "navigationBarTitleText": "呵呵图书",
            "navigationBarTextStyle":"light"
        },
        "tabBar": {
            "selectedColor":"#EA5149",
            "list": 
            [
                {
                    "pagePath": "pages/index/main",
                    "text": "首页",
                    'iconPath': 'static/img/me.png',
                    "selectedIconPath": "static/img/me-active.png"
                },
                {
                    "pagePath": "pages/books/main",
                    "text": "图书列表",
                    'iconPath': 'static/img/book.png',
                    "selectedIconPath": "static/img/book-active.png"
                },
                {
                    "pagePath": "pages/comments/main",
                    "text": "图书列表",
                    'iconPath': 'static/img/todo.png',
                    "selectedIconPath": "static/img/todo-active.png"
                }
            ]
        }
    }
}
