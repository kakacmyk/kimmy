<template>
	<view class="gomeLayout pageBg">
		<custom-nav-bar></custom-nav-bar>
		<!-- 轮播 -->
		<view class="banner">
			<swiper indicator-dots indicator-color="rgba(255, 255, 255, 0.5)" indicator-active-color="#fff" autoplay
				circular>
				<swiper-item v-for="itme in picArr">
					<image :src="itme" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 公告条 -->
		<view class="notice">
			<view class="uniui-left" style="display: flex;">
				<uni-icons type="sound-filled" size="20" color="#28b389"></uni-icons>
				<view class="text">公告</view>
			</view>
			<view class="uniui-center">
				<swiper vertical autoplay interval="1500" duration="300" circular>
					<swiper-item v-for="item in 3">
						<navigator url="/pages/notice/detail">
							<view class="text2">文字内容阿萨阿大撒是的阿萨是是阿萨阿萨</view>
						</navigator>
					</swiper-item>
				</swiper>
			</view>
			<view class="uniui-right">
				<uni-icons type="right" size="16" color="#333"></uni-icons>
			</view>
		</view>
		<!-- 每日推荐 -->
		<view class="content">
			<component-title :title="title">
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="18" color="#28b389"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd"></uni-dateformat>号
						</view>
					</view>
				</template>
			</component-title>
			<view class="select">
				<scroll-view class="scroll-view_H" scroll-x="true">
					<!-- 	<view class="box" v-for="item in 8">
						<image src="/common/images/preview_small.webp" mode="aspectFill"></image>
					</view> -->
					<!-- 增加这一层容器 -->
					<view class="scroll-content">
						<view class="box" :class="{ 'last-box': index == 7 }" v-for="(item,index) in 8" :key="index">
							<image src="/common/images/classify2.jpg" mode="aspectFill" @click="goPrevivew"></image>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 专题精选 -->
		<view class="theme">
			<component-title :title="title2">
				<template #custom>
					<navigator class="more" url="">Mornt+</navigator>
				</template>
			</component-title>

			<view class="content">
				<theme-item v-for="(item,index) in 8" :key="index"></theme-item>
				<theme-item :isMore="true"></theme-item>
			</view>

		</view>
	</view>
</template>

<script setup>
	const picArr = [
		"/static/images/banner1.jpg",
		"/static/images/banner2.jpg",
		"/static/images/banner3.jpg"
	]

	const title2 = {
		name: "专题精选",
	}

	const title = {
		name: "每日推荐",
	}

	const goPrevivew = () => {
		uni.navigateTo({
			url: "/pages/previvew/previvew"
		})
	}
</script>

<style lang="scss" scoped>
	.gomeLayout {
		.banner {
			width: 750rpx;
			padding: 30rpx 0;

			swiper {
				width: 750rpx;
				height: 340rpx;

				swiper-item {
					width: 100%;
					height: 100%;
					padding: 0 30rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 15rpx;
					}
				}
			}
		}

		.notice {
			display: flex;
			width: 690rpx;
			height: 80rpx;
			line-height: 80rpx;
			background-color: #f9f9f9;
			margin: 0 auto;
			border-radius: 80rpx;

			.uniui-left {
				width: 140rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				:deep() {
					.uni-icons {
						color: $qq-boder-color !important;
					}
				}

				.text {
					font-size: 28rpx;
					font-weight: 600;
					color: $qq-theme-color;
					margin-left: 10rpx;
				}
			}

			.uniui-center {
				flex: 1;

				swiper {
					height: 100%;

					&-item {
						height: 100%;
						font-size: 30rpx;
						color: #666;

						// 文字太长触发省略号
						.text2 {
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
					}
				}
			}

			.uniui-right {
				width: 70rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.content {
			padding-top: 50rpx;

			.date {
				color: #28b389;
				display: flex;
				align-items: center;

				.text {
					margin-left: 5rpx;
				}
			}

			.select {
				width: 720rpx;
				margin-left: 30rpx;
				margin-top: 30rpx;

				scroll-view {
					width: 100%;

					white-space: nowrap;

					.scroll-content {
						// display: flex;
						// flex-direction: row;

						.box {
							// flex-shrink: 0;
							width: 200rpx;
							height: 430rpx;
							display: inline-block;
							margin-left: 15rpx;

							image {
								width: 100%;
								height: 100%;
								border-radius: 10rpx;
							}
						}

						.box:last-child {
							margin-right: 30rpx;
						}

						// .last-box {
						// 	padding-right: 30rpx;
						// }

					}

				}
			}
		}

		.theme {
			padding: 50rpx 0;

			.more {
				font-size: 32rpx;
				color: #888;
			}

			.content {
				margin-top: 30rpx;
				padding: 0 30rpx;
				display: grid;
				grid-template-columns: repeat(3, 1fr); //repeat重复，3列 平均分配
				gap: 15rpx;
			}
		}
	}
</style>
