<template>
  <div id="app">
      <top id="top"></top>
      <div id="content">
      <sidebar id="sidebar"></sidebar>
      <router-view id="view"></router-view>
      </div>
         <player id="player"></player>
  </div>
</template>

<script>
import sidebar from './components/sidebar.vue'
import top from './components/nav.vue'
import player from './components/player.vue'
export default {
  name: 'app',
  components: {
   top,sidebar,player
  }
}
</script>

<style lang="stylus" >
html
body
  margin 0
  padding  0
  width 100%
  height 100%
#player
  position fixed
  bottom 0
  width 100%
  
#app
  width 100%
  height 100%
#top
  height 10%
  overflow hidden

#sidebar
  
  height 100%
#content
  display flex
  height 90%
#view
  width 100%
 
 
</style>
