<template>
	<div class='container-fluid' style='width:100%'>
		<div class="row">
			<div class="col col-md-12 col-sm-12 text-left">
			  <div class="row" style='height:40px'>
         <el-tabs v-model="activeName" @tab-click="handleClick">
                   <el-tab-pane label="票据数量（张）" name="first">
                       
                   </el-tab-pane>
                  <el-tab-pane label="票据金额（万元）" name="second">
                    
                  </el-tab-pane>
               </el-tabs>  
        </div>
        <div class="row">
          <div class="col col-md-12 col-sm-12">
            <div class="row">
                         <div class="col col-md-12 col-sm-12">
                            <div class="row"  style='border-bottom:solid 1px #ddd;padding:10px 0px;background-color:white;'>
                                 <div class="col col-md-12 col-sm-12" style='height:16px;'>
                                     <span style='border-left:solid 4px #f75d5d;'>
                                     <span style='font-size:16px;padding-left:10px'>
                                      状态
                                    </span>
                                 </span>
                                 </div>
                               </div>
                            <div class="row" style='background-color:white;padding:50px;box-shadow:5px 5px 10px #ddd'>
                             <div class="col col-md-12 col-sm-12">
                                <div class="row">
                                  <div class="col col-md-2 col-sm-2 text-center">
                                    <div class="row" style='padding:20px'>
                                      <span class='tab_num' style='color:#17c295'>
                                        {{billData.draftSum||0}}
                                      </span>
                                    </div>
                                    <div class="row">
                                      <p class="tips">
                                        草稿
                                      </p>
                                    </div>
                                  </div>
                                  <div class="col col-md-2 col-sm-2 text-center">
                                      <div class="row" style='padding:20px'>
                                      <span class='tab_num' style='color:#ffa722'>
                                         {{billData.holdSum||0}}
                                      </span>
                                    </div>
                                    <div class="row">
                                      <p class="tips">
                                        持有中
                                      </p>
                                    </div>
                                  </div>
                                  <div class="col col-md-2 col-sm-2 text-center">
                                      <div class="row" style='padding:20px'>
                                      <span class='tab_num' style='color:#ffa722'>
                                         {{billData.pledgeSum||0}}
                                      </span>
                                    </div>
                                    <div class="row">
                                      <p class="tips">
                                        质押中
                                      </p>
                                    </div>
                                  </div>
                                  <div class="col col-md-2 col-sm-2 text-center">
                                      <div class="row" style='padding:20px'>
                                      <span class='tab_num' style='color:#ff6060'>
                                         {{billData.transSum||0}}
                                      </span>
                                    </div>
                                    <div class="row">
                                      <p class="tips">
                                        已转让
                                      </p>
                                    </div>
                                  </div>
                                  <div class="col col-md-2 col-sm-2 text-center">
                                      <div class="row" style='padding:20px'>
                                      <span class='tab_num' style='color:#ff6060'>
                                         {{billData.discountSum||0}}
                                      </span>
                                    </div>
                                    <div class="row">
                                      <p class="tips">
                                        已贴现
                                      </p>
                                    </div>
                                  </div>
                                  <div class="col col-md-2 col-sm-2 text-center">
                                      <div class="row" style='padding:20px'>
                                      <span class='tab_num' style='color:#ff6060'>
                                        {{billData.collectionSum||0}}
                                      </span>
                                    </div>
                                    <div class="row">
                                      <p class="tips">
                                        已托收
                                      </p>
                                    </div>
                                  </div>
                                </div>
                             </div>
                           </div>
                           <div class="row" style='margin-top:20px;min-height:180px;'>
                             <div class="col col-md-6 col-sm-6 text-left" style='background-color:white;border-right:solid 10px #f5f5f5'>
                                 <div class="row"  style='border-bottom:solid 1px #ddd;padding:8px 0px;'>
                                    <div class="col col-md-12 col-sm-12">
                                     <span style='height:16px;border-left:solid 4px #3497ff;'>
                                     <span style='font-size:16px;padding-left:10px'>
                                      是否到期
                                    </span>
                                 </span>
                                 </div>
                               </div>
                                <div class="row" style='box-shadow:5px 5px 10px #ddd'>
                                  <div class="col col-md-6 col-sm-6">
                                    <div class="row text-center" style='padding:20px'>
                                      <span class='tab_num' style='color:#17c295'>
                                         {{billData.notDueSum||0}}
                                      </span>
                                    </div>
                                      <div class="row text-center">
                                       <p class="tips">
                                        未到期
                                      </p>
                                    </div>
                                  </div>
                                  <div class="col col-md-6 col-sm-6">
                                   <div class="row text-center" style='padding:20px'>
                                      <span class='tab_num' style='color:#ff6060'>
                                         {{billData.expireSum||0}}
                                      </span>
                                    </div>
                                      <div class="row text-center">
                                       <p class="tips">
                                        已到期
                                      </p>
                                    </div>
                                  </div>
                                </div>
                             </div>

                             <div class="col col-md-6 col-sm-6 text-left" style='background-color:white;'>
                               <div class="row"  style='border-bottom:solid 1px #ddd;padding:8px 0px;'>
                                 <div class="col col-md-12 col-sm-12">
                                     <span style='height:16px;border-left:solid 4px #ffa722;'>
                                     <span style='font-size:16px;padding-left:10px'>
                                      票据来源
                                    </span>
                                 </span>
                                 </div>
                               </div>
                                <div class="row" style='box-shadow:5px 5px 10px #ddd'>
                                  <div class="col col-md-6 col-sm-6">
                                    <div class="row text-center" style='padding:20px'>
                                      <span class='tab_num' style='color:#17c295'>
                                        {{billData.signSum||0}}
                                      </span>
                                    </div>
                                      <div class="row text-center">
                                       <p class="tips">
                                        自行签发
                                      </p>
                                    </div>
                                  </div>
                                  <div class="col col-md-6 col-sm-6">
                                   <div class="row text-center" style='padding:20px'>
                                      <span class='tab_num' style='color:#ffa722'>
                                         {{billData.endTransSum||0}}
                                      </span>
                                    </div>
                                      <div class="row text-center">
                                       <p class="tips">
                                        背书转让
                                      </p>
                                    </div>
                                  </div>
                                </div>

                             </div>
                           </div>
                              <div class="row"  style='padding:5px;background-color:white;margin-top:-10px'>
                                 <div class="col col-md-6 col-sm-6">
                                   <div class="row">
                                      <div class="col col-md-4 col-sm-4 text-left">
                                        <el-row :gutter='10'>
                                          <el-col :span='3'>
                                              <img src="../assets/ring.png"> 
                                          </el-col>
                                          <el-col :span='10'>
                                            <span style='display:block;height:16px;'>
                                          <strong style='color:red;font-size:16px'> 
                                          消息提醒
                                         </strong>
                                       </span>
                                          </el-col>
                                        </el-row>
                                       </div>
                                </div>
                              </div>
                           </div>
                           <div class="row" style="background-color:white;padding:30px 0px;box-shadow:5px 5px 10px #ddd">
                             <div class="col col-md-12 col-sm-12">
 
                             <div class="row" style='min-height:200px;color:#5c5c5c;padding:10px 0px 0px 5px;' v-if='briefData.length!=0||pageData.length!=0' >
                                  <div class="col col-md-12 col-sm-12 text-left" >
                                     <div class="row" v-if='briefData.length!=0'>
                                       <div class="col col-md-6 col-sm-6 text-left">
                                                  {{briefData.point}}
                                       </div>
                                       <div class="col col-md-1 col-sm-1 text-right">
                                              <el-button type='text' @click='toBrief'>查看</el-button>
                                       </div>
                                       <div class="col col-md-1 col-sm-1 text-left">
                                               <el-button type='text' style='color:red' @click='delMention'>删除</el-button>
                                       </div>
                                     </div>

                                     <div class="row" v-if='pageData.length!=0' v-for='items in pageData'>
                                       <div class="col col-md-6 col-sm-6 text-left" style='padding:10px'>
                                                票号：{{items.billNo}}的票据存在公示催告，请注意风险
                                       </div>
                                       <div class="col col-md-1 col-sm-1 text-right">
                                             <el-button type='text' @click='toDetail(items.id,items.version,items.billMedium)'>查看</el-button>
                                       </div>
                                       <div class="col col-md-1 col-sm-1 text-left">
                                              <el-button type='text' style='color:red' @click="delItem(items.version,items.id)">删除</el-button>
                                       </div>
                                     </div>

                                  </div>
                           </div>

                           <div class="row" style='min-height:200px' v-else>
                                  <div class="col col-md-12 col-sm-12 text-center">
                                    <img src="../assets/blankspace.png" style='padding:20px'>
                                    <p style='font-size:16px;color:#a9abaf;font-weight:500'>暂无消息提醒</p>
                                  </div>
                               </div>
                             </div>
                        </div>
                    </div>
                 </div>
          </div>
        </div>
			</div>
		</div>
	</div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first',
        briefData:[],//消息数据
        billData:[],//统计数据
        pageData:[],//消息分页数据
        flag:true

      };
    },
    mounted(){
     this.getData();
    },
    methods: {
      handleClick(tab, event) {
        let self=this;
      if(tab.name=='first'){
          self.flag=true
      }
      else{
        self.flag=false
      }
       this.getData();
      },
      getData(){
        let self=this;
        this.$http.get("/dingtalk/brief/list?falg="+this.flag+'&pageSize=10').then(res=>{
 console.log(res);
          if(res.data.code=='000000'){
          self.briefData=res.data.data.brief||[];
                   
          self.billData=res.data.data.billCount||[];
          self.pageData=res.data.data.page.result||[];
          }
        })
      },
      toBrief(){
         this.$router.push({path:'/ticks',query:{brief:'brief'}})
      },
      toDetail(id,version,type){
        if(type=='electric'){
                this.$router.push({path:'/elecTicks',query:{id:id,version:version,brief:'brief'}})
              }
              else{
                this.$router.push({path:'/paperTicks',query:{id:id,version:version,brief:'brief'}})
              }
      },
      delMention(){//统计消息删除
        let self=this;
          this.$confirm('确认删除该消息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.put("/dingtalk/brief/del/duedate/msg").then(res=>{
           if(res.data.code=="000000"){
                this.$message({
              type: 'success',
               message: '删除成功!'
                });
                self.getData();
           }
           else{
              this.$message({
              type: 'worning',
               message: '删除失败，请重试!'
                });
           }
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    
      },
         delItem(version,num){//单条消息删除
        let self=this;
           this.$confirm('确认删除该消息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { 
        this.$http.put("/dingtalk/brief/del/notice/msg/"+version+"/"+num).then(res=>{
           if(res.data.code=="000000"){
                this.$message({
              type: 'success',
               message: '删除成功!'
                });
                self.getData()
           }
           else{
              this.$message({
              type: 'warning',
               message: '删除失败，请重试!'
                });
           }
        }).catch(()=>{
              this.$message({
            type: 'warning',
            message: '网络异常，请重试'
          }); 
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
  };
</script>
<style scoped>
  .tab_num{
    font-size: 25px
  }
  .tips{
    font-size:16px;
  }
</style>