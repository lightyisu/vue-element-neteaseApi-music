<template>
  <div id="discovery">
    <!--轮播图开始-->
    <template>
      <el-carousel :interval="6000" type="card" height="240px">
        <el-carousel-item v-for="(item,index) in bannerUrls" :key="index">
          <img :src="item.imageUrl" />
        </el-carousel-item>
      </el-carousel>
    </template>
    <!--结束-->
    <div id="recommendlist">
      <h3>推荐歌单</h3>
      <div class="songlist">
        <div class="card" v-for="song in songlist" :key="song.id">
          <div class="wrap-top">{{song.copywriter}}</div>
          <img class="cover" :src="song.picUrl" />
          <img class="play" src="../assets/play.png" />
          <p>{{song.name}}</p>
        </div>
      </div>
    </div>
    <div id="latestsong">
      <h3>最新音乐</h3>
      <div class="songlist">
        <div class="long-card" v-for="song in latestlist" :key="song.id" @click="playmusic(song)">
          <img :src="song.picUrl" />
          <p>{{song.name}}</p>
          <p class="singer">{{song.song.artists[0].name}}</p>
        </div>
      </div>
      <div id="mv" >
        <h3>推荐MV</h3>
        <div class="songlist">
          <div class="mvcard" v-for="mv in mvdetails" :key="mv.artistId">
            <p class="mv-count">{{mv.playCount}}</p>
            <img :src="mv.picUrl" />
            <p class="copyrecommend">{{mv.copywriter}}</p>
            <p class="mv-singer">{{mv.artistName}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 

<script>
import axios from "axios";
import bus from "../bus/eventBus.js";
export default {
  name: "discovery",
  data() {
    return {
      bannerUrls: "",
      songlist: "",
      latestlist: "",
      mvdetails: ""
    };
  },
  created() {
       axios //轮播图请求
      .get("https://autumnfish.cn/banner", {
        t: 0
      })
      .then(res => {
        this.bannerUrls = res.data.banners;
      }); //歌单请求
    axios.get("https://autumnfish.cn/personalized?limit=8", {}).then(res => {
      console.log(res);
      this.songlist = res.data.result;
    });//最新歌曲
    axios.get("https://autumnfish.cn/personalized/newsong").then(res => {
      console.log(res);
      this.latestlist = res.data.result;
    });
    //最新MV
    axios.get("https://autumnfish.cn/personalized/mv").then(res => {
      console.log(res);
      this.mvdetails = res.data.result;
    });
  },
  methods: {
    playmusic(song) {
      console.log("ok");
      console.log(song);
      axios
        .get("https://autumnfish.cn/song/url", {
          params: {
            id: song.id
          }
        })
        .then(res => {
          console.log(res);
          let murl = res.data.data[0].url;
          console.log(murl);
          let details = {
            title: song.name,
            artist: song.song.artists[0].name,
            src: murl,
            pic: song.picUrl
          };
          bus.$emit("urltrans", murl);
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-carousel {
  padding-left: 20px;
  min-width: 1200px;
  margin: 40px auto;
}

.el-carousel img {
  width: 600px;
  border-radius: 10px;
}

#recommendlist, #latestsong {
  margin-left: 70px;
}

h3 {
  font-weight: 520;
}

.cover {
  width: 200px;
  border-radius: 10px;
}

.card {
  margin-right: 70px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 40px;
}

.songlist {
  display: flex;
  flex-wrap: wrap;
}

.wrap-top {
  width: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: -85px;
  color: white;
  transition: top 0.5s;
  padding: 5px;
}

.card:hover .wrap-top {
  top: 0;
}

.card:hover .play {
  display: inline;
}

.card p {
  width: 200px;
}

.play {
  display: none;
  width: 40px;
  position: absolute;
  bottom: 87px;
  right: 18px;
}

.long-card {
  width: 550px;
  height: 100px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
}

.long-card img {
  float: left;
  height: 80%;
  padding: 10px;
}

.singer {
  padding: 10px;
  color: gray;
}
.mvcard
  position relative
  margin-right 30px
.mv-count
  position absolute
  right 10px
  top 0
  color white
  font-size 12px
.mvcard img {
  width: 270px;
  border-radius 10px
}
.mv-singer
  color gray
  margin 0
.copyrecommend
  margin 0
  width 270px
#mv
  margin-bottom 70px

</style>