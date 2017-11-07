<template>
  <el-dialog title="编辑图片" size='small' style='z-index:10001' :visible.sync="show" :before-close="handleClose" :close-on-click-modal='false'>
    <el-row :gutter='20'>
      <el-col :span='12' v-for='(items,index) in showList' style='padding:0px 20px'>
        <img :src="items.picUrl" alt="" class='pic_item'>
        <img src="../assets/del.png" alt="" class='btn_del' @click='delPic(index)'>
        <p>{{items.picType=='back'?'票据背面':'票据正面'}}</p>
      </el-col>
      <el-col :span='12' style='padding:20px' v-if='!hasFront||photoList.length==0'>
        <div class="pic_tab">
          <input type="file" accept="image/jpeg,image/png,image/bmp,image/gif" class='file' @change='setPic($event,0)' ref='pic' id='files'>
          <p style='color:#ddd;font-size:20px'>票据正面</p>
        </div>
      </el-col>
      <el-col :span='12' style='padding:20px'>
        <div class="pic_tab">
          <input type="file" accept="image/jpeg,image/png,image/bmp,image/gif" class='file' @change='setPic($event,1)' ref='pics'>
          <p style='color:#ddd;font-size:20px'>票据背面</p>
        </div>
      </el-col>
    </el-row>
    <div class="row">
      <div class="col col-md-12 col-sm-12">
        <p style='color:#a9abaf'>请上传格式为gif、jpg、png、bmp格式，大于4KB小于4M的图片</p>
        <p style='color:#a9abaf'>预计处理时长为30-60秒，工作日：9:00~18:00</p>
      </div>
    </div>
    <div class="row" style='padding-top:50px'>
      <div class="col col-md-6 col-sm-6 text-right">
        <el-button :plain="true" @click='cancelUpload'>取消</el-button>
      </div>
      <div class="col col-md-6 col-sm-6 text-left">
        <el-button type='primary' @click='confirmUpload' :disabled='imgLoading'>确认</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
  import {
    imgCheck,
    arrRemove,
    getObjectURL
  } from '@/lib/tools';
  export default {
    name: 'fileloader',
    props: ['ocr'], //ocr:是否ocr  isUpdated:与父组件同步的图片链接（vue传值）
    data() {
      return {
        show: false,
        showList: [],
        hasFront: false,
        photoList: [],
        imgLoading: false,
        isOcr: this.ocr
      }
    },
    created() {
    },
    methods: {
      handleClose(done) { //关闭窗口
        this.cancelUpload();
        done();
      },
      delPic(e) { //删除图片
        this.photoList = arrRemove(this.photoList, '', e, 1)
        this.showList = arrRemove(this.showList, '', e, 1)
      },
      setPic(e, type) { //选择图片
        let self = this;
        if (self.photoList.length >= 10) {
          self.$notify({
            title: '警告',
            message: '最多识别十张图片',
            type: 'warning'
          });
        } else {
          if (type == 1) {
            var file = self.$refs.pics.files[0];
            if (!imgCheck(file).flag) {
              self.$notify({
                title: '警告',
                message: imgCheck(file).error,
                type: 'warning'
              });
            } else {
              var url = getObjectURL(file);
              self.photoList.push(file);
              self.showList.push({
                picUrl: url,
                picType: 'back'
              });
            }
            e.target.value = ''
          } else {
            var file = self.$refs.pic.files[0];
            if (!imgCheck(file).flag) { //图片校验
              self.$notify({
                title: '警告',
                message: imgCheck(file).error,
                type: 'warning'
              });
            } else {
              self.hasFront = true;
              var url = getObjectURL(file);
              self.photoList.unshift(file); //正面图片必须排在最前面
              self.showList.splice(0, 1, {
                picUrl: url,
                picType: 'front'
              });
            }
            e.target.value = ''
          }
        }
      },
      cancelUpload() { //取消上传
        this.dialogInit();
        this.show = false;
      },
      dialogInit() { //重置数据
        this.photoList.length = 0;
        this.hasFront = false;
        this.showList.length = 0;
        this.imgLoading = false;
      },
      confirmUpload() { //确认上传：ocr上传不需要与父页面交互，但是新增编辑需要展示图片，
        let self = this;
        self.imgLoading = true;
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }; //上传头
        if (self.photoList.length != 0) //判定有无图片
        {
          var reader = new FormData(); //开始上传
          for (var i = 0; i < self.photoList.length; i++) {
            reader.append('images', self.photoList[i]);
          }
          self.$http.post('/dingtalk/bill/upload/list', reader, config).then(res => {
            if (res.data.code == '000000') {
              var urlList = res.data.data.urlList;
              var picData = [];
              console.log(urlList)
              if (self.hasFront) {
                picData.push({
                  picUrl: urlList[0],
                  picType: 'front'
                }); //添加面图
                urlList.shift(0, 1); //获取背面图数据
                if (urlList.length > 0) {
                  for (var i = 0; i < urlList.length; i++) {
                    picData.push({
                      picUrl: urlList[i],
                      picType: 'back'
                    })
                  }
                }
              } else {
                for (var i = 0; i < urlList.length; i++) {
                  picData.push({
                    picType: 'back',
                    picUrl: urlList[i]
                  })
                }
              }
              var data = {
                photoList: picData,
                dataSource: 'dingtalkPC',
                ocr: self.isOcr
              };
              self.$http.post('/dingtalk/bill/add/save', data).then(res => {
                if (res.data.code == '000000') {
                  self.$message({
                    showClose: true,
                    message: '上传成功',
                    type: 'success'
                  });
                  setTimeout(function() {
                    self.imgLoading = false
                  }, 500)
                  self.show = false;
                  if (self.isOcr) {
                    self.$router.push({
                      path: '/paperTicks',
                      query: {
                        id: res.data.data.id,
                        version: 1
                      }
                    })
                  }
                  self.dialogInit();
                } else {
                  self.$message({
                    showClose: true,
                    message: '失败',
                    type: 'warning'
                  });
                }
              })
            }
          });
        } else {
          self.show = false;
        }
        setTimeout(function() {
          self.imgLoading = false
        }, 500)
      }
    }
  }
</script>
