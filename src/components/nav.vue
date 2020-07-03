<template>
  <div id="top">
      <nav>
          <img  src="../assets/logo.png">
          <el-input style="width:200px" placeholder='搜索音乐' prefix-icon='el-icon-search'
          v-model='search' @keyup.native.enter="toresult" >

          </el-input>
          </nav>
  </div>
</template>

<script>
export default {
    name:'top',
    data(){
        return {
            search:' '
        }
    },
    methods:{
        toresult(){
            console.log('ppp');
          this.$router.push('/result?q='+this.search)
        }
    }
}
</script>

<style lang="stylus" scoped>
nav 
    background #f5f5f7
    position relative
   
img 
    width 140px
    margin-top -30px
    margin-left 40px
.el-input
    position absolute
    right 6%
    top 20%

</style>