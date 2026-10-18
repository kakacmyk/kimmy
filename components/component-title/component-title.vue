<template>
	<view class="common-title">
		<view class="name">
			{{props.title.name}}
		</view>
		<view class="custom">
			<slot name="custom"></slot>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps([
		"title"
	])
</script>

<style lang="scss" scoped>
	.common-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;

		.name {
			font-size: 40rpx;
		}
	}
</style>
