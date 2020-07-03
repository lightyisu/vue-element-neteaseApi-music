<template>
  <div id="list">
       <el-row id="mhead" >
        
        <el-col :span="6">音乐标题</el-col>
        <el-col :span='5'>歌手</el-col>
        <el-col :span="6">专辑</el-col>
        <el-col :span='3' style="margin-left:10px" >时长</el-col>
        
      </el-row>
      <el-row type="flex" class="lists" v-for="(list,index) in lists" :key="index" @click.native="$emit('songid-trans1',list.id)">
       
        <el-col :span="6" class="text-content"  >{{list.name}}</el-col>
        <el-col :span='5' class="text-content" >{{list.artists[0].name}}</el-col>
        <el-col :span="6" class="text-content" >{{list.album.name}}</el-col>
        <el-col :span='2' class="text-content" >{{list.duration}}</el-col>
        <el-col :span="2" class="text-content" ></el-col>
      </el-row>
  </div>
</template>

<script>
export default {
    props:['lists'],
    data(){
        return{
           
        }
    },
    methods:{
      getalert(){
        alert('hi')
      }
    }
}
</script>
<style lang="stylus" scoped>
#mhead
  color gray
  padding-left 22px
  margin-bottom 10px
.el-row img
  border-radius 8px
  width 80px
.lists
 
  cursor pointer
  &:hover
     background #fafafa
.text-content
  padding 17px
  
</style>