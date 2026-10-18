<template>
	<view class="meun">
		<uni-segmented-control :current="current" :values="values" @clickItem="onClickItem" styleType="button"
			activeColor="#40b253"></uni-segmented-control>
	</view>
	<view class="container">
		<view class="layout">
			<view class="box" v-for=" (item,index) in picArr" :key="item._id">
				<view class="pic">
					<image lazy-load :src="item.url" mode="widthFix" @click="onPreView(index)"></image>
				</view>
				<view class="text">
					{{item.content}}
				</view>
			</view>
		</view>
		<view class="float">
			<view class="itme" @click="onRefresh"><uni-icons type="refreshempty" size="30" color="#888"></uni-icons>
			</view>
			<view class="itme" @click="onTop"><uni-icons type="arrow-up" size="30" color="#888"></uni-icons></view>
		</view>
		<view class="loadMore">
			<uni-load-more status="loading"></uni-load-more>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref,
		reactive,
		computed
	} from 'vue';
	import {
		onReachBottom,
		onPullDownRefresh
	} from "@dcloudio/uni-app"
	import {
		cache
	} from '@/utils/cache.js'

	const picArr = ref([])
	const current = ref(0)
	const classfiy = reactive([{
			Animal: "cat",
			value: "猫"
		},
		{
			Animal: "dog",
			value: "狗"
		},
		{
			Animal: "all",
			value: "全部"
		}
	])

	const values = computed(() => {
		return classfiy.map(e => e.value)
	})

	// 👇 新增：用于记录上一次刷新的时间戳
	let lastRefreshTime = 0;

	const onClickItem = (val) => {
		current.value = val.currentIndex;
		picArr.value = [];
		network();
	}

	function network(isRefresh = false) {
		const currentAnimal = classfiy[current.value].Animal;
		const cacheKey = `pic_cache_${currentAnimal}`;

		if (!isRefresh && picArr.value.length === 0) {
			const cachedData = cache.get(cacheKey);
			if (cachedData && cachedData.length > 0) {
				picArr.value = cachedData;
				return;
			}
		}

		uni.showNavigationBarLoading()
		uni.request({
			url: 'https://tea.qingnian8.com/tools/petShow',
			data: {
				size: 5,
				type: currentAnimal
			},
			method: 'GET',
			header: {
				'access-key': "638990"
			},
		}).then(res => {
			const newData = res.data.data;
			if (picArr.value.length === 0) {
				picArr.value = newData;
				cache.set(cacheKey, newData, 7200);
			} else {
				picArr.value = [...picArr.value, ...newData]
			}
		}).catch(error => {
			uni.showToast({
				title: "请求有误，请重新刷新",
				icon: 'none'
			})
		}).finally(() => {
			uni.hideNavigationBarLoading()
			uni.stopPullDownRefresh()
		})
	}

	// 👇 新增：统一的刷新判断函数（核心防抖/节流逻辑）
	const handleRefresh = () => {
		const now = Date.now(); // 获取当前时间
		// 如果当前时间 - 上次刷新时间 < 3000 毫秒（3秒）
		if (now - lastRefreshTime < 3000) {
			uni.showToast({
				title: '刷新太快啦，请休息3秒~',
				icon: 'none',
				duration: 1500
			});
			// 重要：必须手动停止下拉刷新动画，否则动画会一直转
			uni.stopPullDownRefresh();
			return; // 终止后续代码，不发起请求
		}

		// 如果超过了3秒，更新最后一次刷新时间
		lastRefreshTime = now;

		// 执行正常的刷新逻辑
		picArr.value = [];
		network(true);
	}

	function onPreView(index) {
		const arrUrl = picArr.value.map(e => e.url)
		uni.previewImage({
			urls: arrUrl,
			current: index
		})
	}

	// 点击右下角刷新按钮（调用统一的 handleRefresh）
	const onRefresh = () => {
		handleRefresh();
	}

	const onTop = () => {
		uni.pageScrollTo({
			scrollTop: 0,
			duration: 100
		})
	}

	onReachBottom(() => {
		network() // 触底加载不受3秒限制
	})

	// 页面下拉刷新（调用统一的 handleRefresh）
	onPullDownRefresh(() => {
		handleRefresh();
	})

	onMounted(() => {
		network();
	})
</script>

<style lang="scss" scoped>
	/* 样式保持不变，直接复制你原来的即可 */
	.meun {
		padding: 50rpx 50rpx 0;
	}

	.container {
		.layout {
			padding: 50rpx;

			.box {
				margin-bottom: 20rpx;
				box-shadow: 0 10rpx 50rpx rgba(0, 0, 0, 0.08);
				border-radius: 20rpx;
				overflow: hidden;

				.pic {
					image {
						width: 100%;
					}
				}

				.text {
					padding: 10rpx;
					margin-left: 10rpx;
				}
			}
		}

		.loadMore {
			padding-bottom: calc(env(safe-area-inset-bottom) + 50rpx);
		}

		.float {
			position: fixed;
			right: 30rpx;
			bottom: 80rpx;
			padding-bottom: env(safe-area-inset-bottom);

			.itme {
				width: 90rpx;
				height: 90rpx;
				background-color: rgba(255, 255, 255, 0.9);
				box-shadow: 0 10rpx 50rpx rgba(0, 0, 0, 0.08);
				margin-bottom: 20rpx;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				border: 1rpx solid #eee;
			}
		}
	}
</style>
