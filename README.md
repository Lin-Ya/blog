---
title: 409_实践项目：用Vue.js全家桶打造个人博客站点
tags: Vue.js,项目
---
我为了能更熟练地掌握vue全家桶的使用，在参考了网上的一些经验和建议以后决定给自己搭建一个由vue全家桶打造的个人博客站。

> [Github地址]()和[预览地址]()
> 目前版本：1.0 （独立的前端响应式页面，带有代码高亮、发布和编辑博文、编辑器可视化等功能）

# 项目设想
用Vue.js全家桶搭建个人博客单页面站点，其中需要实现的模块有：
- 用户登录、注销 （Account）
- 博文编辑（Markdown-editor）
- 标签分类页（Tag）
- 博文列表页（Post）
- 博文浏览页（Article）
- LeanCloud数据存储

另外希望能实现的功能还有：
- [x] 支持`markdown`语法实时编辑
- [x] 适配移动端
- [x] 代码高亮
- [x] 博文发布
- [ ] 可编辑更新已发布的博文
- [ ] 账户管理
- [ ] 评论与回复
- [ ] 点赞、阅读数、评论数的统计

# 技术栈
## 前端：
- Vue.js2
- Vue-Cli 初始化项目
- Vue-Router 不刷新页面达到切换子组件
- Vuex 规范组件之间的数据流向，对全局各模块数据进行状态管理
## 后端：
- LeanCloud数据存储

##  依赖插件：
- marked.js
- highlight.js
- moment.js
- github-markdown-css

# 开发思路：

页面应用在加载的同时会向LeanCloud发送请求博文数据，由Vuex存储响应数据。为了能方便的处理各种事件，针对用户、博文、标签和文章单独建立module由Vuex进行状态管理。正因如此我才能方便地实现博文编辑（将当前用户信息与博文所有者的用户信息进行比对）。


## 1. 合理利用LeanCloud存储数据
使用LeanCloud作为后端数据存储理由很简单：我上一个[Vue项目](https://lin-ya.github.io/Vue-Resumer2/dist/)使用LeanCloud作为用户信息存储，这次希望能提升使用熟练度。

这次要用到LeanCloud存储博文数据，需要理清博文、标签、文章内容三者的关系（owner在此不谈）。
查看了[数据存储文档](https://leancloud.cn/docs/leanstorage_guide-js.html#hash-400605635)以后，以这样的方式存储数据：

![数据存放结构](http://p8qvw09e6.bkt.clouddn.com/storyWriter/1533803488031.jpg)
利用了LeanCloud存储中的对象指针，实现数据对象的关联。拿Post来举例子：里面除了存放有自有的属性title以外，还存放有标签组tagGroup数组，里面并非是真是的tag数据，而是一些指向Tags的数据Class的指针。我在获取Post的时候，默认是得不到这些指针指向的真实数据，除非我给query添加上`query.include('tags')`，LeanCloud就会把指针内容数据一并返回，同理可得针对article的Class的获取。

## 2. 配置marked、hljs渲染文章
```javascript
import moment from "moment";
import marked from "marked";
import hljs from "highlight.js";
import "@/assets/atom-one-dark.css";

hljs.initHighlightingOnLoad();
let myRenderer = new marked.Renderer();
marked.setOptions({
  renderer: myRenderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

marked.setOptions({
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  }
});
```
在编辑器部分，为了实现同步预览，把编辑区的内容传入marked，再使用`v-html`指令渲染。

## 3. 使用vuex存储loading状态

# 部分预览
![enter description here](http://p8qvw09e6.bkt.clouddn.com/storyWriter/chrome_2018-08-09_17-05-25.png "chrome_2018-08-09_17-05-25")

![enter description here](http://p8qvw09e6.bkt.clouddn.com/storyWriter/chrome_2018-08-09_17-06-10.png "chrome_2018-08-09_17-06-10")

![enter description here](http://p8qvw09e6.bkt.clouddn.com/storyWriter/chrome_2018-08-09_17-13-23.png "chrome_2018-08-09_17-13-23")

# 改进计划

1. 增添server端，负责对数据增删改查，提供API接口供前端使用
2. 后台管理页面与博客站分离
3. 改进博客页面样式
4. 增添评论、回复功能
5. 增添博文数据统计功能，例如阅读数、点赞数和评论数