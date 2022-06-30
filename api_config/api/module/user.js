import axios from '../axios.config'

export default {
    getBanner(params){
        return axios.post('/index/cates/images', params)
    }
}