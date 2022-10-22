<template>
	<view class="home">
		<!-- 轮播图 -->
		<view class="swiper-wrapper">
			<swiper class="swiper" :autoplay="true" :circular="true">
				<swiper-item v-for="item in advertisingList" :key="item.id">
					<view class="swiper-inner">
						<navigator class="navigate" :url="_getSiteUrl(item.data.link)">
							<image class="image" :src="item.data.image" />
						</navigator>
					</view>
				</swiper-item>
			</swiper>
			<view class="mask">
				<image class="image" src="@/static/images/cricle.png" />
			</view>
		</view>
		
		<!-- 导航栏 -->
		<view class="navigate-wrapper">
			<navigator class="navigate" open-type="switchTab" url="/pages/dynamic/dynamic">
				<image class="image" src="@/static/images/coffee.png" />
				<text class="text">精彩动态</text>
			</navigator>
			<navigator class="navigate" open-type="switchTab" url="/pages/me/me">
				<image class="image" src="@/static/images/ran.png" />
				<text class="text">个人中心</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	import { getAdvertisingList } from '@/config/api';
	
	export default {
		data() {
			return {
				advertisingList: [],
			}
		},
		onLoad() {
			this.getAdvertisingList();
		},
		methods: {
			async getAdvertisingList() {
				const list = await getAdvertisingList({ space: '1,2,3' });
				this.advertisingList = list;
			},
			_getSiteUrl(url) {
				return '/pages/webview/webview?siteUrl=' + encodeURI(url);
			}
		}
	}
</script>

<style lang="scss">
	.home {
		min-height: 100vh;
		background-color: #eee;
	}
	
	.swiper-wrapper {
		position: relative;
		height: 0;
		padding-top: 50%;
		.swiper {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			height: 100%;
			&-inner {
				height: 100%;
				.navigate, .image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.mask {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 10%;
			.image {
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.navigate-wrapper {
		position: relative;
		display: flex;
		column-gap: 32rpx;
		margin-top: -50rpx;
		padding: 0 32rpx;
		height: 100rpx;
		.navigate {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			column-gap: 32rpx;
			height: 100%;
			background-color: #fff;
			border-radius: 100rpx;
			box-shadow: 0 0 3px #eee;
			.image {
				width: 40rpx;
				height: 40rpx;
			}
			.text {
				font-size: 28rpx;
			}
		}
	}
</style>
