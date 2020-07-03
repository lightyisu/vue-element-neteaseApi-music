<template>
  <div id="playlist">
    <div id="playlist-page">
      <div id="playlist-head">
        <img :src="cover" />
        <div id="left-head">
          <h2>{{playlistname}}</h2>
          <img id="author-icon" :src="avatar" />
          <span id="author">{{author}}</span>
          <span id="birthDate">{{birthDate}}创建</span>
          <br />
          <p>标签:{{tags}}</p>
          <p>简介：{{description}}</p>
        </div>
      </div>
      <div id="playlist-content">
        <el-tabs v-model="activeName">
          <el-tab-pane label="歌曲列表" name="songs">
            <listview :lists="tracks" @trans-track="playmusic"></listview>
          </el-tab-pane>
          <el-tab-pane label="评论" name="comment">
            <h3>热门评论({{hotCommentsCount}})</h3>
            <el-row v-for="(comment,index) in hotComments" :key="index" class="singleComment">
              <el-col :span="2">
                <img class="avatar" :src="comment.user.avatarUrl" />
              </el-col>
              <el-col :span="18">
                <el-row style="margin-bottom:10px">
                  <span class="username">{{comment.user.nickname}}</span>
                  ：{{comment.content}}
                </el-row>
                <el-row class="date">{{comment.time|formatting}}</el-row>
              </el-col>
            </el-row>
            <h3>最新评论(10)</h3>
            <el-row v-for="(comment,index) in latestComments" :key="index+'hash'" class="singleComment">
              <el-col :span="2">
                <img class="avatar" :src="comment.user.avatarUrl" />
              </el-col>
              <el-col :span="18">
                <el-row style="margin-bottom:10px">
                  <span class="username">{{comment.user.nickname}}</span>
                  ：{{comment.content}}
                </el-row>
                <el-row class="date">{{comment.time|formatting}}</el-row>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import listview from "../views/list-tem.vue";
import bus from "../bus/eventBus.js";
export default {
  data() {
    return {
      activeName: "comment",
      playlistname: "",
      cover: "",
      author: "",
      birthDate: "",
      tags: "",
      description: "",
      avatar: "",
      tracks: "",
      hotComments: "",
      hotCommentsCount: "",
      latestComments:''
    };
  },

  components: {
    listview
  },
  created() {
    //获取歌单详情
    Axios.get("https://autumnfish.cn/playlist/detail", {
      params: {
        id: this.$route.query.playlistid
      }
    }).then(res => {
      console.log(res);
      this.playlistname = res.data.playlist.name;
      this.cover = res.data.playlist.coverImgUrl;
      this.author = res.data.playlist.creator.nickname;
      this.tags = res.data.playlist.tags.join("/");
      this.description = res.data.playlist.description;
      this.avatar = res.data.playlist.creator.avatarUrl;
      this.tracks = res.data.playlist.tracks;
    });
    //获取评论
    Axios.get("https://autumnfish.cn/comment/hot", {
      params: {
        id: this.$route.query.playlistid,
        type: 2
      }
    }).then(res => {
      console.log(res);
      this.hotComments = res.data.hotComments;
      this.hotCommentsCount = res.data.total;
    });
    //最新评论
    Axios.get("https://autumnfish.cn/comment/playlist", {
      params: {
        limit: 20,
        id: this.$route.query.playlistid
      }
    }).then(res => {
      console.log(res);
      this.latestComments=res.data.comments;
    });
  },
  methods: {
    playmusic(id) {
      console.log(id);

      Axios.get("https://autumnfish.cn/song/url", {
        params: {
          id: id
        }
      }).then(res => {
        let murl = res.data.data[0].url;
        bus.$emit("track-trans", murl);
      });
    }
  },
  filters: {
    formatting(val) {
      let time = new Date();
      time.setTime(val.toString().slice(0, 10) * 1000);
      return time.toLocaleString();
    }
  }
};
</script>

<style lang="stylus" scoped>
#playlist-page {
  margin-left: 70px;
  margin-top: 70px;
  margin-bottom: 70px;
}

#playlist-head {
  height: 250px;
}

#playlist-head img {
  width: 240px;
  float: left;
  clear: right;
}

#playlist-head #author-icon {
  border-radius: 20px;
  width: 30px;
  margin-right: 20px;
  position: relative;
  top: -6px;
}

#left-head {
  margin-left: 300px;
  width: 70%;
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

.avatar {
  width: 60px;
  border-radius: 30px;
}

.date {
  color: #bebebe;
}

.username {
  color: #517eaf;
}

.singleComment {
  margin-bottom: 40px;
}
</style>