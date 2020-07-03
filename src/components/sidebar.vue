<template>
  <div id="sidebar">
    <el-row class="tac">
      <el-col :span="3">
        <el-menu default-active="1" active-text-color="crimson" >
          <router-link to='/discovery'>
          <el-menu-item index="1">
            
            <img  style="width:20px;position:relative;left:3px" src="../assets/find.png">
            <span slot="title">
              发现音乐
              </span>
          </el-menu-item>
          </router-link>
          <router-link to='/latest'>
          <el-menu-item index="2" >
            <img  style="width:25px" src="../assets/list.png">
            <span  slot="title">最新音乐</span>
          </el-menu-item>
          </router-link>
          <router-link to='/recommend'>
          <el-menu-item index="3">
            <img style="width:23px" src="../assets/recommend.png">
            <span slot="title">推荐音乐</span>
          </el-menu-item>
          </router-link>
          <router-link to='/mv'>
          <el-menu-item index='4'>
            <img style="width:20px;position:relative;left:1px" src="../assets/mv.png">
              <span slot="title">最新MV</span>
          </el-menu-item>
          </router-link>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "sidebar"
};
</script>

<style lang="stylus" scoped>

.tac
    height 100%
.el-col 
    height 100%
.el-menu
    min-width 200px
    height 100%
img 
    margin-right 6px
a 
    text-decoration none 
    color black 
</style>