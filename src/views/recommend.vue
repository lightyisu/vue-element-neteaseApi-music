<template>
  <div id="recommend">
    <div id="title">
      <span :class="{actived:tag==0}" @click="tag=0">全部</span>
      <span :class="{actived:tag==7}" @click="tag=7">华语</span>
      <span :class="{actived:tag==96}" @click="tag=96">欧美</span>
      <span :class="{actived:tag==8}" @click="tag=8">日本</span>
      <span :class="{actived:tag==16}" @click="tag=16">韩国</span>
    </div>
    <div id="contents">
     <listview v-bind:lists="listData"></listview>
    </div>
  </div>
</template>
 

<script>
import axios from 'axios'
import bus from '../bus/eventBus.js'
import listview from './list-tem.vue'
export default {
  name: "recommend",
  data() {
    return {
      tag: 0,
      listData:''
   
    };
  },
  components:{
    listview
  }
  ,
  watch:{
    tag(){
      this.getList();
    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
        axios.get('https://autumnfish.cn/top/song',{
      params:{
        type:this.tag
      }
    }).then((res)=>{
      console.log(res)
      this.listData=res.data.data;
    })
    },
    playmusic(id){
        console.log(id)
        console.log('hi')
        axios.get('https://autumnfish.cn/song/url',{
          params:{
            id:id
          }
        }).then((res)=>{
           let murl = res.data.data[0].url;
           bus.$emit('recommendTrans',murl)
        })
    }
  }
};
</script>

<style lang="stylus" scoped>
#title {
  margin-left: 800px;
  margin-top: 20px;
}

#title span {
  margin-right: 10px;
  cursor: pointer;
}

.actived {
  color: red;
}
tbody img
  width 88px
  border-radius 10px
.index
  margin 20px
  text-align center
#contents
  padding-top 50px

</style>