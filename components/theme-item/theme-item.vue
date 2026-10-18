<template>
	<view class="theme-item">
		<navigator url="/pages/classList/classList" class="box" v-if="!isMore">
			<image class="pic" src="/common/images/classify1.jpg" mode=""></image>
			<view class="mask">
				明星
			</view>
			<view class="tab">
				3天前更新
			</view>
		</navigator>

	<navigator url="/pages/Category/Category" open-type="reLaunch" class="box more" v-if="isMore">
		<image class="pic" src="/common/images/more.jpg" mode=""></image>
		<view class="mask">
			<uni-icons type="bars" size="34" color="#fff"></uni-icons>
			<view class="text">
				更多
			</view>
		</view>
	</navigator>
	</view>
</template>

<script setup>
	defineProps({
		isMore: {
			type: Boolean,
			default: false
		}
	})
</script>

<style lang="scss" scoped>
	.theme-item {
		.box {
			height: 340rpx;
			border-radius: 10rpx;
			overflow: hidden; //外容器搭配使用
			position: relative;

			.pic {
				height: 100%;
				width: 100%;
			}

			.mask {
				width: 100%;
				height: 70rpx;
				position: absolute;
				bottom: 0;
				left: 0;
				color: black;
				background-color: rgba(0, 0, 0, 0.2);
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				backdrop-filter: blur(20rpx); //增加模糊效果
				font-weight: 500;
				font-size: 30rpx;
			}

			.tab {
				position: absolute;
				top: 0;
				left: 0;
				background: rgba(250, 129, 90, 0.7);
				backdrop-filter: blur(20rpx); //增加模糊效果
				color: #fff;
				font-size: 20rpx;
				padding: 6px 14rpx;
				border-radius: 0 0 20px 0;
				transform: scale(0.8);
				transform-origin: left top;
			}
		}

		.box.more {
			.mask {
				width: 100%;
				height: 100%;
				flex-direction: column;
			}

			.text {
				font-size: 28rpx;
			}
		}
	}
</style>
