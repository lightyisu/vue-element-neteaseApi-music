<template>
  <div id="latestlist">
    <div id="highquaility" :style="getBg">
      <img :src="highquality.coverImgUrl" />
      <h3>精品歌单</h3>
      <p id="hq-title">{{highquality.name}}</p>
      <p
        id="content"
      >中古民谣：多是由吟游诗人根据民间故事或神话史诗编写传唱的诗歌，或是村落城镇中世代相传的传统歌谣，总之产生于真正的民间。 这些音乐是当时普通民众里为数不多的几种娱乐形式之一，它蕴涵着率意与直接，它是人们忘却现实压抑，将心底感情至纯的一种宣泄。 当你打开歌单里的音乐，世界就变成了一缕凌空缥缈的风。 爱尔兰哨笛、手摇琴、尼古赫帕琴、竖琴，还有古老的中世纪之声，音乐在这里如同一把钥匙，连通了现代与千年前的问候。</p>
    </div>
    <div id="switch">
      <span :class="{actived:tag=='全部'}" @click="tag='全部'">全部</span>
      <span :class="{actived:tag=='欧美'}" @click="tag='欧美'">欧美</span>
      <span :class="{actived:tag=='华语'}" @click="tag='华语'">华语</span>
      <span :class="{actived:tag=='流行'}" @click="tag='流行'">流行</span>
      <span :class="{actived:tag=='说唱'}" @click="tag='说唱'">说唱</span>
      <span :class="{actived:tag=='摇滚'}" @click="tag='摇滚'">摇滚</span>
      <span :class="{actived:tag=='民谣'}" @click="tag='民谣'">民谣</span>
      <span :class="{actived:tag=='电子'}" @click="tag='电子'">电子</span>
      <span :class="{actived:tag=='轻音乐'}" @click="tag='轻音乐'">轻音乐</span>
      <span :class="{actived:tag=='影视原声'}" @click="tag='影视原声'">影视原声</span>
      <span :class="{actived:tag=='ACG'}" @click="tag='ACG'">ACG</span>
      <span :class="{actived:tag=='怀旧'}" @click="tag='怀旧'">怀旧</span>
      <span :class="{actived:tag=='治愈'}" @click="tag='治愈'">治愈</span>
      <span :class="{actived:tag=='旅行'}" @click="tag='旅行'">旅行</span>
    </div>
    <div id="recommendlist">
      <div class="songlist">
        <div class="card" v-for="(songlist,index) in songlists" :key="index">
          <div class="wrap-top">播放量:{{songlist.playCount}}</div>
          <img class="cover" :src="songlist.coverImgUrl" />
          <img class="play" src="../assets/play.png" />
          <p>{{songlist.name}}</p>
        </div>
      </div>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="8" @current-change='updatePage' :current-page="page" ></el-pagination>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "latestlist",
  data() {
    return {
      total:0,
      highquality: "",
      songlists: "",
      tag: "全部",
      page:1
    };
  },
  computed: {
    getBg() {
      return {
        background: `url(${this.highquality.coverImgUrl})`
      };
    }
  },
  watch: {
    tag() {
      console.log(this.tag);
      this.page=1;
      this.getTop();
      this.getList();
    }
  },
  created() {
    this.getTop();
    this.getList();
  },
  methods: {
    getTop() {
      //取得顶端数据
      axios
        .get("https://autumnfish.cn/top/playlist/highquality", {
          params: {
            limit: 1,
            cat: this.tag
          }
        })
        .then(res => {
          this.highquality = res.data.playlists[0];
        });
    },
    getList() {
      //取得歌单列表数据
      axios
        .get("https://autumnfish.cn/top/playlist", {
          params: {
            limit: 8,
            offset: (this.page-1)*8,
            cat: this.tag
          }
        })
        .then(res => {
          console.log(res);
          this.songlists = res.data.playlists;
          this.total=res.data.total;
        });
    },
    updatePage(val){
      this.page=val;
      console.log(val)
      this.getList();
    }
  }
};
</script>

<style lang="stylus" scoped>
#highquaility {
  width: 1000px;
  height: 200px;
  background-color: lightgray;
  margin: 20px auto;
  filter: blur(0.5);
}

#highquaility img {
  width: 160px;
  padding: 20px;
  float: left;
}

#highquaility h3 {
  color: #dfac67;
  padding: 5px;
  font-size: 15px;
  font-weight: 200;
  display: inline-block;
  border: 1px solid #dfac67;
  border-radius: 6px;
}

#hq-title {
  color: white;
  margin: 0;
}

#content {
  padding: 4px;
  margin: 0;
  color: gray;
}

#switch {
  margin-left: 430px;
  height: 30px;
}

#switch span {
  margin-right: 17px;
  cursor: pointer;
}

.actived {
  color: red;
}

.songlist {
  display: flex;
  flex-wrap: wrap;
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

.wrap-top {
  width: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: -85px;
  color: white;
  transition: top 0.5s;
  padding: 5px;
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

#recommendlist {
  margin-left: 120px;
}
.el-pagination
  
  margin 0 auto
  margin-bottom 90px
  text-align center
</style>