<template>
		<div class="container">
    <el-row :gutter='20'>
      <el-col :span='12' v-for='(items,index) in photoList'>
           <img :src="hostUrl+items.picUrl" alt="" class='pic_item'>
                        <img src="../assets/del.png" alt="" class='btn_del' @click='delPic(index)'>
                     <p>{{items.picType=='back'?'票据背面':'票据正面'}}</p>
      </el-col>
      <el-col :span='12'>
         <div class="pic_tab" v-loading='isPicLoading'>
                             <input type="file" accept="image/*" class='file'
                              @change='setPic($event,0)' ref='pic'>
                              <p style='color:#ddd;font-size:20px'>票据正面</p>
                           </div>
      </el-col>
      <el-col :span='12'>
           <div class="pic_tab"  v-loading='isPicLoading'>
                             <input type="file" accept="image/*" class='file'
                              @change='setPic($event,1)' ref='pics'>
                               <p style='color:#ddd;font-size:20px'>票据背面</p>
                     </div>
      </el-col>
    </el-row>
    <el-row  :gutter='20'>
         <el-col>
           <el-button :plain="true" @click='cancelUpload'>取消</el-button>
         </el-col>
         <el-col>
           <el-button type='primary' @click='confirmUpload'>确认</el-button>
         </el-col>
    </el-row>  
    </div>
</template> 
<script>
     import {arrRemove,imgCheck} from '../lib/tools.js'
	export default {
		name:'elUploadDialog',
		props:['photoList','hostUrl'],
		data(){
			return {
				isPicLoading:false,
				photoList_1:photoList
			 }
		},
		watch:{
           photoList:function(val,oval){
            this.$store.commit('SET_PIC',val);
           }
		},
		methods:{
		 delPic(e){
          let self=this;
          self.photoList=arrRemove(self.photoList,'',e,1)
         },
        cancelUpload(){//取消上传
          let self=this;
         this.photoList=[];//取消上传之后，视图数组不变，上传数组不变
         for(var i=0;i<this.photoList_1.length;i++)
           {self.photoList[i]=self.photoList_1[i]}
           this.dialogVisible=false; 
          },
         confirmUpload(){//确认上传
          let self=this;
          this.photoList_1=[];//确认上传之后更新数组2，数组2为视图数组
          for(var i=0;i<this.photoList.length;i++)
           {
           	self.photoList_1[i]=self.photoList[i]}
            this.dialogVisible=false;
            this.isPicLoading=false
           },
        setPic(e,type){
        if(type==0){type='front'}else{type='back'}//判断正背面
        let self=this;
         self.isPicLoading=true
         let config = {headers: {'Content-Type': 'multipart/form-data'}};
        var fd=new FormData();
         if(type=='back'){//背面数据
         var file= this.$refs.pics.files[0]||undefined;
           if(!imgCheck(file).flag){//图片校验
             self.$notify({
               title: '警告',
               message: imgCheck(file).error,
               type: 'warning'
              });
              self.isPicLoading=false
            }
          else{//通过
            fd.append('images',file);
              self.$http.post('/dingtalk/bill/upload/list',fd,config).then(res=>{
                 if(res.data.code=='000000'){
                 self.hostUrl=res.data.data.hostUrl;
                 self.photoList.push({picType:type,picUrl:res.data.data.urlList[0]});//成功之后更新数组1，确认上传之后更新数组2
                 self.isPicLoading=false
                 }
               })
              }
          }
      else
      {//正面数据
        var file= this.$refs.pic.files[0]||undefined;
          if(!imgCheck(file).flag){
             self.$notify({
             title: '警告',
             message: imgCheck(file).error,
              type: 'warning'
              });
              self.isPicLoading=false
           }else{
             fd.append('images',file);
             self.$http.post('/dingtalk/bill/upload/list',fd,config).then(res=>{
                   if(res.data.code=='000000'){
                   self.hostUrl=res.data.data.hostUrl;
                  self.photoList.push({picType:type,picUrl:res.data.data.urlList[0]});
                  self.isPicLoading=false
           }
      })
      }
    }  
    },
		}
	}
</script>