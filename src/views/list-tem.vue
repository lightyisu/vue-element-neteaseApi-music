<template>
  <div id="list">
       <el-row id="mhead">
        
        <el-col :span="6" :offset="3">音乐标题</el-col>
        <el-col :span='5'>歌手</el-col>
        <el-col :span="6">专辑</el-col>
        <el-col :span='2'>时长</el-col>
        <el-col :span="2"></el-col>
      </el-row>
      <el-row type="flex" class="lists" v-for="(list,index) in lists" :key="index">
        <el-col :span="2" :offset="1" class="cover" ><img  @click="$emit('trans-track',list.id)" :src="list.al.picUrl"></el-col>
        <el-col :span="6" class="text-content"  >{{list.name}}</el-col>
        <el-col :span='5' class="text-content" >{{list.ar[0].name}}</el-col>
        <el-col :span="6" class="text-content" >{{list.al.name}}</el-col>
        <el-col :span='2' class="text-content" >{{list.dt}}</el-col>
        <el-col :span="2" class="text-content" ></el-col>
      </el-row>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
    props:['lists'],
    data(){
        return{
           
        }
    },
   
}
</script>
<style lang="stylus" scoped>
#mhead
  color gray
.el-row img
  border-radius 8px
  width 80px
.lists
  margin-top 30px
  cursor pointer
  &:hover
     background #fafafa
.text-content
  padding-top 30px
</style>