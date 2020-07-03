<template>
  <div id="mv">
    <div id="mv-page">
      <h2>MV详情页</h2>
      <video width="780" height="438" :src="videourl" controls>
      </video>
      <div style="margin-left:860px" id="related">
      <h2 >相关MV</h2>
      <div class="songlist">
          <div class="mvcard" v-for="mv in relatedmvs" :key="mv.artistId">
            <p class="mv-count">{{mv.playCount}}</p>
            <img :src="mv.cover" />
            <p class="r-mv-name">{{mv.name}}</p>
            <p class="mv-singer">{{mv.artistName}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      videourl:'',
      relatedmvs:''
    }
  },
  created(){
    //视频
    axios.get('https://autumnfish.cn/mv/url',{
      params:{
        id:this.$route.query.id
      }
    }).then((res)=>{
      console.log(res);
      this.videourl=res.data.data.url;
    })
    //相关MV
    axios.get('https://autumnfish.cn/simi/mv',{
      params:{
        mvid:this.$route.query.id
      }
    }).then((res)=>{
      console.log(res)
      this.relatedmvs=res.data.mvs
    })
  }

};
</script>
<style lang="stylus" scoped>
#mv-page {
  margin-left: 60px;
  margin-top: 40px;
  margin-bottom 70px
}
video 
  float left
.mvcard
  position relative
  margin-right 30px
  width 200px

.mv-count
  position absolute
  right 10px
  top 0
  color white
  font-size 12px
.mvcard img {
  width: 200px;
  border-radius 10px
}
.mv-singer
  color gray
  margin 0
.r-mv-name
  margin 0
  font-size 15px
</style>