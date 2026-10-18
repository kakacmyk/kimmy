<template>
	<view class="preview">
		<!-- 操作 -->
		<swiper circular class="swiper">
			<swiper-item v-for="item in 5 ">
				<image @click="maskChange" src="/common/images/preview1.jpg" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="mask" v-if="isshow">
			<view class="goBack" @click="goBack" :style="{top:getStatusBarHeight()+'px'}">
				<uni-icons type="back" color="#fff" size="30"></uni-icons>
			</view>
			<view class="cont"> 2 / 9 </view>
			<view class="time"><uni-dateformat :date="Date.now()" format="hh:mm"></uni-dateformat></view>
			<view class="date"><uni-dateformat :date="Date.now()" format="MM 月dd 日"></uni-dateformat></view>
			<view class="footer">
				<view class="box" @click="clickinfo">
					<uni-icons type="info" size="28"></uni-icons>
					<view class="text">信息</view>
				</view>
				<view class="box" @click="clickScoreOpen">
					<uni-icons type="star" size="28"></uni-icons>
					<view class="text">5分</view>
				</view>
				<view class="box">
					<uni-icons type="download" size="24"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>
		<!-- 信息弹出框 -->
		<uni-popup ref="popup" type="bottom" border-radius="10px 10px 0 0">
			<view class="infoPopup">
				<view class="popHeader">
					<view class=""></view>
					<view class="title">
						壁纸信息
					</view>
					<view class="close" @click="clickClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y>
					<view class="content">
						<uni-forms ref="baseForm" label-align="right" :modelValue="baseFormData">
							<uni-forms-item v-for="item in FormData " :key="item.key" class="forms-item"
								:label-width="item.labelWidth" :label="item.name"
								:class="{ 'active': item.labelWidth == '60'}">
								<uni-rate :touchable="false" :value="2" readonly="true" v-if="item.name == `评分:`" />
								<text class="value"></text>
								<text class="bar" v-if="item.name == `标签:`">12312</text>
							</uni-forms-item>
						</uni-forms>
						<view class="copyright">
							声明：本资料仅供个人学习交流，严禁用于商业用途！版权归原作者所有。如有侵权，请联系我[xxxxxxxxxxxx]，我会立即删除，谢谢理解！
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<!-- 评分弹出窗 -->
		<uni-popup ref="scorePopup" :is-mask-click="false">
			<view class="scorePopup">
				<view class="popHeader">
					<view>
					</view>
					<view class="title">
						壁纸评分
					</view>
					<view class="close" @click="clickScoreClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<view class="content">
					<uni-rate allowHalf :value="userScore" @change="onChange" />
					<text class="text"> {{userScore}}分</text>
				</view>
				<view class="footer">
					<button type="default" size="mini" plain>确认评分</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from "vue"

	import {
		getStatusBarHeight
	} from "@/utils/system.js"


	const isshow = ref(true)
	const popup = ref()
	const userScore = ref(0)
	const scorePopup = ref()
	const baseFormData = reactive({})
	const FormData = reactive([{
			name: '壁纸ID：',
			key: '1',
			content: "123123",
			labelWidth: 70,
		},
		{
			name: '发布者：',
			key: '2',
			content: "123123",
			labelWidth: 70
		},
		{
			name: '评分:',
			key: '3',
			content: "123123",
			labelWidth: 60
		},
		{
			name: '摘要:',
			key: '4',
			content: "123123",
			labelWidth: 60
		}, {
			name: '标签:',
			key: '5',
			content: "123123",
			labelWidth: 60
		},
	])

	const goBack = () => {
		uni.navigateBack()
	}

	const onChange = (val) => {
		userScore.value = val.value
	}

	// 是否显示屏蔽层
	const maskChange = () => {
		isshow.value = !isshow.value
	}

	// 关闭信息弹窗
	const clickClose = () => {
		popup.value.close()
	}

	// 开启信息弹窗
	const clickinfo = () => {
		popup.value.open()
	}

	// 关闭评分弹窗
	const clickScoreClose = () => {
		scorePopup.value.close()
	}

	// 开启评分弹窗
	const clickScoreOpen = () => {
		scorePopup.value.open()
	}
</script>

<style lang="scss" scoped>
	.preview {
		position: relative;

		.swiper {
			width: 100%;
			height: 100vh;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.mask {

			// 在mask下的子级元素【view】都将共用样式
			&>view {
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				color: #fff;
				width: fit-content; // 自动伸缩最小值
			}

			.goBack {
				width: 39px;
				height: 38px;
				background: rgba(0, 0, 0, 0.5);
				left: 30rpx;
				margin-left: 0;
				border-radius: 100rpx;
				top: 0;
				backdrop-filter: blur(10rpx);
				border: 1rpx solid rgba(255, 255, 255, 0.3);
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.cont {
				top: 10vh;
				background: rgba(0, 0, 0, 0.3);
				font-size: 28rpx;
				border-radius: 40rpx;
				padding: 8rpx 20rpx;
				backdrop-filter: blur(10rpx);
			}

			.time {
				font-size: 140rpx;
				top: calc(10vh + 80rpx);
				font-weight: 100;
				line-height: 1em; //去掉行高
				text-shadow: 0 4px rgba(0, 0, 0, 0.3);
			}

			.date {
				font-size: 20px;
				top: calc(10vh + 220rpx);
				text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);

			}

			.footer {
				background: rgba(255, 255, 255, 0.7);
				bottom: 10vh;
				width: 65vw;
				display: flex;
				color: #000;
				border-radius: 120rpx;
				justify-content: space-around;
				align-items: center;
				box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
				backdrop-filter: blur(20rpx);

				.box {
					display: flex;
					padding: 6px 14px;
					// cursor: pointer;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.text {
						font-size: 26rpx;
						color: #676767;
					}
				}
			}
		}

		.infoPopup {
			background: #fff;
			padding: 30rpx;
			border-radius: 30rpx 30rpx 0 0;
			overflow: hidden;

			.popHeader {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.title {
					color: #767676;
					font-size: 26rpx;
				}

				.close {
					padding: 6rpx;
				}
			}

			scroll-view {
				max-height: 60vh;

				.content {
					padding: 10rpx 30rpx;

					:deep(.uni-forms-item) {
						margin-bottom: 10px;
						display: flex;
						align-items: center;
					}

					:deep(.uni-forms-item__label) {
						color: #767676;
					}

					:deep(.active .uni-forms-item__content) {
						margin-left: 20rpx;
					}

					.bar {
						border: 1px solid $qq-theme-color;
						color: $qq-theme-color;
						font-size: 22rpx;
						padding: 10rpx 30rpx;
						border-radius: 40px;
						overflow: hidden;
						line-height: 1em;
						margin: 0 10rpx 10rpx 0;
					}
				}

				.copyright {
					font-size: 28rpx;
					padding: 20rpx;
					background: #F6F6F6;
					overflow: hidden;
					color: #666;
					border-radius: 10rpx;
					margin: 20rpx 0;
					line-height: 1.6em;
				}
			}
		}

		.scorePopup {
			background: #fff;
			padding: 30rpx;
			width: 70vw;
			border-radius: 30rpx;
			overflow: hidden;

			.content {
				padding: 30px 0;
				display: flex;
				align-items: center;
				justify-content: center;

				.text {
					width: 80rpx;
					color: #FFCA3E;
					padding-left: 10rpx;
					// line-height: 1em;
					// text-align: right;
				}
			}

			.footer {
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.popHeader {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.title {
					color: #767676;
					font-size: 26rpx;
				}

				.close {
					padding: 6rpx;
				}
			}

		}
	}
</style>
