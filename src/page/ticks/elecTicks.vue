<template>
	<div class='container-fluid' style='line-height:30px;padding-bottom:20px'>
		<div class="row">
			<div class="col col-md-12 col-sm-12 text-center">
				<div class="row" style='padding:10px'>
					<div class="col col-md-12 col-sm-12 text-left" style='padding:0px'>
						票据><span style='color:#999;font-size:12px'>{{billNo}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="row" style='background-color:white'>
			<div class="col col-md-12 col-sm-12 text-center">
				<div class="row" style='padding:10px' v-if='data.photoList!=null'>
					<div class="col col-md-6 col-sm-6 col-md-offset-3 col-sm-offset-3">
						<el-carousel arrow="always" :autoplay='false' @change='getItem'>
							<el-carousel-item v-for="(item,a) in data.photoList" :key="a">
								<img v-bind:src="data.hostUrl+item.picUrl" alt="" @click="clickImg()" class='inner_pic'>
								<span class='tipss'>{{item.picType=='front'?'正面':'背面'}}<br></span>
							</el-carousel-item>
						</el-carousel>
					</div>
					<div class="col col-md-3 col-sm-3">
						<span style='position:absolute;bottom:0px;left:0px'><span style='color:#20a0ff'>{{picIndex+1}}</span>/{{data.photoList.length}}</span>
					</div>
				</div>
				<div class="row" style='padding:5px;color:#5c5c5c'>
					<div class="col col-md-12 col-sm-12" style='background-color:#f5f7fb'>
						<div class="row" style='padding:10px'>
							<div class="col col-md-3 col-sm-3 text-left">
								<div style='padding-top:10%;'>
									{{data.billMedium+data.billType}}
								</div>
							</div>
							<div class="col col-md-6 col-sm-6 text-center">
								<h3 style='border-bottom:solid 2px #b9c2d2'>
									<span style='display:block;padding:20px'>电子{{data.billType=='银票'?'银行':'商业'}}承兑汇票</span>
								</h3>
							</div>
						</div>
						<div class="row" style='padding:10px'>
							<div class="col col-md-4 col-sm-4 text-left">
								票号：{{data.billNo}}
							</div>
							<div class="col col-md-3 col-sm-3 text-left">
								出票日：{{data.draftDate}}
							</div>
							<div class="col col-md-3 col-sm-3 text-left">
								到期日：{{data.dueDate}}
							</div>
							<div class="col col-md-2 col-sm-2 text-left">
								状态： {{data.billStatus}}
							</div>
						</div>
						<div class="row" style='padding:10px'>
							<div class="col col-md-3 col-sm-3 text-left">
								剩余期限：{{Number(data.limitDays)==0?'已到期':Number(data.limitDays)+'天'}}
							</div>
							<div class="col col-md-7 col-sm-7 text-left" style='word-break:keep-all;'>
								调整：{{data.adjustDays}}天<span>
									（节假日顺延{{data.adjustDays}}天）
								</span>
							</div>
							<div class="col col-md-2 col-sm-2 text-left">
								来源： {{data.billSource}}
							</div>
						</div>
						<div class="row" style='padding:20px;'>
							<table class='billTable'>
								<tr>
									<td rowspan='3' style='width:2%;padding:10px'>
										<p>出</p>
										<p>票</p>
										<p>人</p>
									</td>
									<td style='width:15%'>全称</td>
									<td colspan='2' style='width:33%'>
										{{data.drawerName}}
									</td>
									<td rowspan='3' style='width:2%;padding:10px'>
										<p>收</p>
										<p>款</p>
										<p>人</p>
									</td>
									<td style='width:15%'>全称</td>
									<td style='width:33%'>
										{{data.payeeName}}
									</td>
								</tr>
								<tr>
									<td>账号</td>
									<td colspan='2'>{{data.drawerAcct}}</td>
									<td>账号</td>
									<td>{{data.payeeAcct}}</td>
								</tr>
								<tr>
									<td>开户银行</td>
									<td colspan='2'>{{data.drawerBank}}</td>
									<td>开户银行</td>
									<td>{{data.payeeBank}}</td>
								</tr>
								<tr>
									<td colspan='2' style='padding:10px 0px'>出票金额</td>
									<td colspan='4'>{{convertCurrencys(data.billAmount)}}</td>
									<td>{{data.billAmount}}</td>
								</tr>
								<tr>
									<td rowspan='2' style='padding:10px'>
										<p>承</p>
										<p>兑</p>
										<p>人</p>
									</td>
									<td>全称</td>
									<td>{{data.acceptorName}}</td>
									<td colspan='2' style='width:10%'>
										{{data.acceptorType}}
									</td>
									<td>开户行行号</td>
									<td>{{data.acceptorBankNo}}</td>
								</tr>
								<tr>
									<td>账号</td>
									<td colspan='3'>{{data.acceptorAcct}}</td>
									<td>开户行名称</td>
									<td>{{data.acceptorBank}}</td>
								</tr>
							</table>
						</div>
						<div class="row text-center" style='padding:10px 0px'>
							<div class="col col-md-12 col-sm-12">
								<el-button type='primary' @click='back'>
									返回
								</el-button>
							</div>
						</div>
					</div>
				</div>
				<big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		convertCurrency
	} from '../../lib/util.js';
	import BigImg from '../../components/BigImg.vue'
	export default {
		data() {
			return {
				id: '',
				version: '',
				billNo: '',
				brief: '',
				data: [],
				showImg: false,
				picIndex: 0,
				imgSrc: ''
			}
		},
		components: {
			BigImg
		},
		methods: {
			convertCurrencys(num) {
				return convertCurrency(num)
			},
			getItem(val, oldVal) {
				this.picIndex = val;
			},
			clickImg() {
				let self = this;
				this.showImg = true;
				// 获取当前图片地址
				this.imgSrc = self.data.hostUrl + self.data.photoList[self.picIndex].picUrl;
			},
			viewImg() {
				this.showImg = false;
			},
			back() {
				this.$router.push({
					path: '/ticks'
				})
			},
			getData() {
				let self = this;
				var url = '';
				if (this.brief) {
					url = '/dingtalk/bill/view/init/' + this.version + '/' + this.id + '?brief=brief'
				} else {
					url = '/dingtalk/bill/view/init/' + this.version + '/' + this.id
				}
				this.$http.get(url)
					.then(res => {
						if (res.data.code == '000000') {
							self.data = res.data.data;
							self.billNo = res.data.data.billNo;
						}
					})
			}
		},
		mounted() {
			this.id = this.$route.query.id;
			this.version = this.$route.query.version;
			this.brief = this.$route.query.brief;
			this.getData();
		}
	}
</script>
<style scoped>
	.billTable {
		width: 100%;
		height: 200px;
		background-color: white
	}
	.billTable tr td {
		border: solid 1px #ddd;
		text-align: center
	}
	.row {
		display: flex;
	}
	.tipss {
		color: white;
		position: absolute;
		top: 0px;
		display: block;
		width: 50px;
		height: 30px;
		background-color: black;
		opacity: 0.5
	}
</style>