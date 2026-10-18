<template>
	<view class="classLsit">
		<view class="content">
			<navigator url="/pages/previvew/previvew" class="item" v-for="(item, index) in 15 " :key="index">
				<image src="/common/images/preview2.jpg" mode="aspectFill"></image>
			</navigator>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	.classLsit {
		.content {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 5rpx;
			padding: 5rpx;

			.item {
				height: 440rpx;

				image {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}
	}
</style>
