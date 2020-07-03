<template>
  <div id="result">
    <h2>{{$route.query.q}}</h2>
    <p id="result-count">找到{{songCount}}个结果</p>
    <div id="choosepannel">
      <template>
        <el-tabs v-model="activeName">
          <el-tab-pane label="歌曲" name="songs">
            <div id="result-content">
              <listview :lists="mData" @songid-trans1="getid"></listview>
            </div>
          </el-tab-pane>
          <el-tab-pane label="歌单" name="lists">
            <div class="songlists">
              <div
                class="singlelist"
                v-for="(playlist,index) in playlists"
                :key="index"
                @click="toplaylist(playlist)"
              >
                <span>播放量:{{playlist.playCount}}</span>
                <img :src="playlist.coverImgUrl" />
                <br />
                <p>{{playlist.name}}</p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="MV" name="mv">
            <div class="mvlists">
              <div class="mvlist" v-for="mv in mvs" :key="mv.id">
                <span>播放量:{{mv.playCount}}</span>
                <img :src="mv.cover" @click="tomvpage(mv.id)" />
                <br />
                <p>{{mv.name}}</p>
                <p class="artist">{{mv.artistName}}</p>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>
   

<script>
import listview from "../views/list-tem2.vue";
import Axios from "axios";
import bus from "../bus/eventBus.js";
export default {
  name: "result",
  data() {
    return {
      songCount: 0,
      mData: [],
      activeName: "songs",
      type: 1,
      playlists: "",
      mvs: ""
    };
  },
  watch: {
    activeName() {
      switch (this.activeName) {
        case "songs":
          this.type = 1;
          this.getData();
          break;
        case "lists":
          this.type = 1000;
          this.getData();
          break;
        case "mv":
          this.type = 1004;
          this.getData();
      }
    }
  },
  components: {
    listview
  },
  created() {
    console.log(this.$route.query.q);
    this.getData();
  },
  methods: {
    getData() {
      Axios.get("https://autumnfish.cn/search", {
        params: {
          limit: 10,
          keywords: this.$route.query.q,
          type: this.type
        }
      }).then(res => {
        console.log(res);
        this.mData = res.data.result.songs;
        this.songCount = res.data.result.songCount;
        this.playlists = res.data.result.playlists;
        this.mvs = res.data.result.mvs;
      });
    },
    getid(id) {
      console.log(id);
      Axios.get("https://autumnfish.cn/song/url", {
        params: {
          id: id
        }
      }).then(res => {
        let murl = res.data.data[0].url;
        bus.$emit("songid-trans2", murl);
      });
    },
    toplaylist(val) {
      this.$router.push("/playlist?playlistid=" + val.id);
    },
    tomvpage(val) {
      console.log("hi");
      console.log(val)
      this.$router.push("/mv?id=" + val);
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-tabs__item.is-active, .el-tabs__item:hover {
  color: #c3473a;
}

h2 {
  margin-left: 70px;
  font-size: 33px;
  display: inline-block;
}

#result-count {
  display: inline-block;
  font-size: 15px;
  color: #bebebe;
  margin-left: 10px;
}

#choosepannel {
  width: 70%;
  margin-left: 70px;
  margin-bottom: 140px;
}

/deep/ .el-tabs__item.is-active {
  color: #c3473a;
}

/deep/ .el-tabs__item:hover {
  color: #c3473a;
}

/deep/ .el-tabs__active-bar {
  background-color: #c3473a;
}

.songlists {
  display: flex;
  flex-wrap: wrap;
}

.songlists img {
  width: 200px;
}

.singlelist {
  position: relative;
  margin-right: 30px;
  width: 200px;
}

.singlelist span {
  position: absolute;
  right: 0;
  color: #ffffff;
}

.mvlists {
  display: flex;
  flex-wrap: wrap;
}

.mvlist, .mvlist img {
  width: 270px;
}

.mvlist {
  position: relative;
  margin-right: 30px;
}

.mvlist span {
  position: absolute;
  right: 0;
  color: white;
}

.mvlist img {
  border-radius: 10px;
}

.mvlist p {
  margin: 0;
}

.mvlist .artist {
  color: #c5c5c5;
}

.mvlists img 
  cursor pointer
</style>