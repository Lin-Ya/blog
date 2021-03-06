//user
export const LOGIN_INIT = 'LOGIN_INIT'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const LOGOUT_USER = 'LOGOUT_USER'

//article
export const SET_ARTICLE = 'SET_ARTICLE'
export const CLEAR_ARTICLE = 'CLEAR_ARTICLE'
export const EDIT_ARTICLE = 'EDIT_ARTICLE'
export const PUSH_ARTICLE = 'PUSH_ARTICLE'
export const SET_TEMPPOSTARTICLE = 'SET_TEMPPOSTARTICLE'
export const CLEAR_TEMPPOSTARTICLE = 'CLEAR_TEMPPOSTARTICLE'

//tag
export const GET_TAGSLIST = 'GET_TAGSLIST'
export const SET_TARGETTAG = 'SET_TARGETTAG'  //设置当前需要筛选的targettag

//post
export const SET_POSTSLIST = 'SET_POSTSLIST'  //获取默认的postlist
export const SET_CURRENTPOST = 'SET_CURRENTPOST' //设置当前浏览的post
export const SET_NOWPAGE = 'SET_NOWPAGE' //设置当前页码
export const SET_LOADING = 'SET_LOADING' //设置loading状态