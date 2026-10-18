<template>
	<!-- 用户功能 -->
	<view class="section">
		<view class="uniui-list" v-for="(item,index) in user" :key="index">
			<view class="row2" v-if="props.type">
				<view class="row" v-if=" item.type == `top` " @click="clickCon(item.name)">
					<view class="uniui-left">
						<uni-icons :type="item.icons" size="20" color="#28b389"></uni-icons>
						<view class="text">{{item.name}}</view>
						<!-- 仅在小程序出现 -->
						<!-- #ifdef MP -->
						<button v-if="item.name == `联系客服`" open-type="contact" class="contact">联系客服 </button>
						<!-- #endif -->

						<!-- 除了小程序都能出现 -->
						<!-- #ifndef MP -->
						<button v-if="item.name == `联系客服`" @click="Clickcontact" open-type="contact"
							class="contact">拨打电话 </button>
						<!-- #endif -->
					</view>
					<view class="uniui-right">
						<view class="text">{{item.MesNum}}</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
			</view>
			<view class="row2" v-else>
				<view class="row" v-if=" item.type == `bottom` " @click="clickCon(item.name)">
					<view class="uniui-left">
						<uni-icons :type="item.icons" size="20" color="#28b389"></uni-icons>
						<view class="text">{{item.name}}</view>
					</view>
					<view class="uniui-right">
						<view class="text">{{item.MesNum}}</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const props = defineProps({
		type: {
			type: Boolean,
			default: null
		},
		userInfo: {
			type: Array,
			default: null
		}
	})
	const user = props.userInfo
	const num = ref(props.num)
	const clickCon = (val) => {
		if (val !== '联系客服') {
			uni.navigateTo({
				url: "/pages/classList/classList"
			});
		}
	}

	// 拨打电话
	const Clickcontact = () => {
		uni.makePhoneCall({
			phoneNumber: "1231231231"
		})
	}
</script>

<style scoped lang="scss">
	.section {
		width: 690rpx;
		margin: 50rpx auto;
		border: 1px solid #eee;
		border-radius: 10rpx;
		box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);

		.uniui-list {
			.row {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 30rpx;
				border-bottom: 1px solid #eee;
				padding: 25rpx;
				background-color: #ffffff;
				// &:last-child {
				// 	border-bottom: 0;
				// }

				.uniui-left {
					display: flex;
					align-items: center;

					.text {
						color: #666;
						padding-left: 20rpx;
					}
				}

				.uniui-right {
					display: flex;
					align-items: center;

					.text {
						color: #aaa;
						padding-right: 10rpx;
					}
				}

				.contact {
					position: absolute;
					top: 0;
					left: 0;
					height: 100%;
					width: 100%;
					opacity: 0; // 透明度变为 0

				}
			}
		}
	}
</style>
