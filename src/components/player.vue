<template>
  <div id="player">
    
    <audio  controls :src="murl" autoplay >
       
      </audio>
  </div>
</template>

<script>
import bus from "../bus/eventBus.js";

export default {
  data() {
    return {
      murl:''
    };
  },
  components: {},
  created() {
    bus.$on("urltrans", murl => {
      console.log(murl);
      this.murl=murl
    });
    bus.$on('recommendTrans',murl=>{
      console.log(murl);
      this.murl=murl;
    })
    bus.$on('songid-trans2',murl=>{
    
      this.murl=murl;
    })
    bus.$on('track-trans',murl=>{
      this.murl=murl;
    })
  }
};
</script>

<style lang="stylus" scoped>
audio 
  outline none
  width 100%
 
</style>