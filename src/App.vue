<template>
  <div id="app">
    <div class="container-fluid" style='background-color:#f5f5f5;'>
      <div class="row" style='position:fixed;top:0px;left:0px;right:0px;z-index:999;min-height:50px'>
        <div class="col col-md-12 col-sm-12">
          <div class="row" style='background-color:white;height:50px;line-height:50px'>
            <div class="col col-md-2 col-sm-2 text-center">
               <h4>票据管家</h4>
            </div>
              <div class="col col-md-4 col-sm-4 col-md-offset-6 col-sm-offset-6" >
                 <div class="row text-right"  style='line-height'>    
               <col class="col-md-12 col-sm-12 text-right">
                    <ul class='user_tabs'>
                  <!--     <li>{{dialogVisible}}</li> -->
                      <li>
                          <el-dropdown @command="handleCommand">
                           <el-button type="primary" size="small">
                            添加票据<i class="el-icon-caret-bottom el-icon--right"></i>
                           </el-button>
                           <el-dropdown-menu slot="dropdown" size="small">
                           <el-dropdown-item command='a'>手动添加</el-dropdown-item>
                            <el-dropdown-item command='b'>OCR识别</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </li>
                      <li style='border-left:solid 1px #ddd;border-right:solid 1px #ddd;height:80%'>
                          <el-popover trigger="hover">
                           <img src="./assets/crcode.png" class='codeImg'>
                            <p>扫描二维码进入钉钉群组</p>
                             <span slot="reference">                      
                           <i class="fa fa-question-circle-o" aria-hidden="true"  style='padding:10px 0px'>
                          </i>
                          帮助
                        </span>
                        </el-popover>
                      </li>
                      <li>
                        <img v-bind:src="avatorUrl" v-if="avatorUrl!=''" alt="..." class="img-circle"> 
                          <img src="./assets/default_h.png" v-else  class="img-circle">
                           {{userName}}
                      </li>
                    </ul>
              </div>
          </div>
        </div>
      </div>
      </div>
      <div class="row" style='padding-top:50px;display:flex;' :style="{height:maxHeight-80+'px'}">
        <div class="text-left" style='width:150px;background-color:#324157'>
          <sidebar></sidebar>
        </div>
        <div style='flex:0.01'>
          
        </div>
        <div  style='flex:2;'>   
         <router-view></router-view>
        </div>
      </div>
             <div class="row">
              <div class="col col-md-12 col-sm-12">
             <fileloader ref='fileload' :ocr='true' :isUpdated='false'></fileloader>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import sidebar from '@/components/sideBar';
import fileloader from '@/components/fileLoader';
  import cookies from 'js-cookie';
export default {
  name: 'app',
  components:{
    sidebar:sidebar,
    fileloader:fileloader
  },
  data(){
    return{
      corpId:"",
      maxHeight:''
    }
  },
  computed:{
   avatorUrl:function(){
    return cookies.get('avatorUrl',{path:'/'})
   },
   userName:function(){
    return cookies.get('userName',{path:'/'})
   }
  },
  created(){ 
    let self=this;
   self.maxHeight=window.screen.availHeight;
    this.corpId=this.$route.query.corpId?this.$route.query.corpId:cookies.get('corpId');
    if(this.corpId)
    {
    cookies.set('corpId',this.corpId,{path:'/'},1/12);}
    this.corpId=cookies.get('corpId')
    },

  methods:{

   renderCookies(name){
     return cookies.get(name)
   },
    handleCommand(command){
      let self=this;
      if(command=='a'){
        self.$router.push({path:'/addTicks'})
      }
      else{
      self.$refs.fileload.show=true
      }
    },
  }
}
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../src/assets/eui/lib/theme-default/index.css';
@import '../node_modules/font-awesome/css/font-awesome.css';

#app {
  font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
  min-width: 1200px;
  width:100%;
  overflow-x:hidden; 
   overflow-y:scroll; 
  position:absolute;
  left: 0px;
  top:0px;
}
.img-circle{
  width:30px;
   height:30px;
   background-color: #ddd;
   margin:0px 10px
}
.el-dialog__header{
  text-align: left;
  color:white;
  background-color: #95aacf
}
.el-dialog__title{
  color:white;
}
.pic_tab{
   border:dashed 1px #ddd;
   min-height:140px;
   width:100%;
   padding: 0px;
   background-image: url('assets/upload.png');
   background-repeat:no-repeat;
   background-position: center;


}
.pic_tab:hover{

border:dashed 1px #3497ff;
}
.pic_tab>.words{
  position: absolute;
  bottom: 20px;
  color:#ddd;
  left:37%;
  padding:0px;
}
.file{
 height:140px;
 width:100%;
 opacity: 0;
 cursor:pointer;
}
.preImg{
  width:100%;height:140px;
  position: absolute;
  left:0px;
  padding:0px;
  top:0px;
}
.btn_del{
  position: relative;
  left:46%;
  top: -24px;
  border-radius: 0px;
  width:8%;
  cursor:pointer;
}
.codeImg{
  width:100%;height:auto;
}
  .pic_item{
    width:100%;
    height:150px;

  }
  .user_tabs{
    list-style: none;
   width:400px;
   height:50px;
   padding-top: 10px;
   float:right;
   padding-right: 10px

  }
  .user_tabs li{
    float: left;
    width:33%;
    height:40px;
    text-align: center;
       padding: 0px;
       margin: 0px;
       line-height: 30px
  }
    .inner_pic{
    max-width:100%;
    height:100%;
  }
</style>
