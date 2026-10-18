export const cache = {
	/**
	 * 设置缓存
	 * @param {String} key 缓存键名
	 * @param {Any} data 需要缓存的数据
	 * @param {Number} expire 过期时间（单位：秒），默认1天
	 */
	set(key, data, expire = 86400) {
		const obj = {
			data: data,
			time: Date.now(),
			expire: expire * 1000 // 转为毫秒
		}
		try {
			uni.setStorageSync(key, JSON.stringify(obj))
		} catch (e) {
			console.error('缓存设置失败', e)
		}
	},

	/**
	 * 获取缓存
	 * @param {String} key 缓存键名
	 * @returns 数据 或 null（如果不存在或已过期）
	 */
	get(key) {
		try {
			const str = uni.getStorageSync(key)
			if (!str) return null

			const obj = JSON.parse(str)
			// 判断是否过期
			if (Date.now() - obj.time > obj.expire) {
				uni.removeStorageSync(key) // 过期了就删掉
				return null
			}
			return obj.data
		} catch (e) {
			console.error('缓存读取失败', e)
			return null
		}
	}
}
