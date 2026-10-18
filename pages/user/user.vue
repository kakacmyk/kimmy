<template>
	<view class="userLayout pageBg">
		<!-- 头像/地址 -->
		<view class="userInfo">
			<view class="avatar">
				<image class="pic" src="/static/images/xxmLogo.png" mode="aspectFill"></image>
			</view>
			<view class="IP">
				100.100.100.100
			</view>
			<view class="adress">
				来自于：四川
			</view>
		</view>
		<!-- 用户功能 -->
		<view class="topHalf">
			<component-UserList :userInfo="userInfo" :type="true"></component-UserList>
		</view>
		<view class="bottomHalf">
			<component-UserList :userInfo="userInfo" :type="false"></component-UserList>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive
	} from "vue"

	const userInfo = reactive([{
		icons: "download-filled",
		name: "我的下载",
		MesNum: 0,
		type: "top"

	}, {
		icons: "star-filled",
		name: "我的评分",
		MesNum: 0,
		type: "top"
	}, {
		icons: "chatboxes-filled",
		name: "联系客服",
		MesNum: null,
		type: "top"
	}, {
		icons: "notification-filled",
		name: "订阅更新",
		MesNum: null,
		type: "bottom"
	}, {
		icons: "help-filled",
		name: "常见问题",
		MesNum: null,
		type: "bottom"
	}])
</script>

<style lang="scss" scoped>
	.userLayout {
		.userInfo {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 50rpx 0;

			.avatar {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				overflow: hidden;

				.pic {
					width: 100%;
					height: 100%;
				}

			}

			.IP {
				font-size: 44rpx;
				color: #333;
				padding: 20rpx 0 5rpx;
			}

			.adress {
				font-size: 28rpx;
				color: #aaa;
			}
		}
	}
</style>
