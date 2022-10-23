<template>
	<view class="home">
		<!-- 轮播图 -->
		<view class="carousel-wrapper">
			<swiper class="carousel" :autoplay="true" :circular="true">
				<swiper-item v-for="item in advertisingList" :key="item.id">
					<view class="carousel-inner">
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
				<image class="image" src="/static/images/coffee.png" />
				<text class="text">精彩动态</text>
			</navigator>
			<navigator class="navigate" open-type="switchTab" url="/pages/me/me">
				<image class="image" src="/static/images/ran.png" />
				<text class="text">个人中心</text>
			</navigator>
		</view>
		
		<view class="main">
			<view class="header">
				<text class="text" :class="{active: current === 0}" @tap="handleTap(0)">推荐</text>
				<text class="text" :class="{active: current === 1}" @tap="handleTap(1)">资讯</text>
			</view>
			<swiper class="listSwiper" :style="listSwiperStyle" :current="current" @change="handleSwiperChange">
				<swiper-item>
					<view class="dynamic">
						<view class="item" v-for="item in dynamicList" :key="item.id">
							<view class="image-wrapper">
								<image class="image" :src="item.cover" @load="_calcListHeight(0)" mode="widthFix" />
							</view>
							<view class="content">
								<text>{{item.content}}</text>
							</view>
							<view class="info">
								<image class="avatar" :src="item.avatar || '/static/images/nopic.png'" />
								<text class="name">{{item.userName}}</text>
								<image class="icon" src="/static/icons/not_favorite.png" />
								<text class="count">{{item.count}}</text>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="news">
						<view class="item" v-for="item in newsList" :key="item.id">
							<view class="content">
								<view class="title u-line-2">
									<text>{{item.title}}</text>
								</view>
								<view class="info">
									<text class="name">{{item.author}}</text>
									<text class="time">{{item.createTime}}</text>
								</view>
							</view>
							<view class="image-wrapper">
								<image class="image" :src="item.image" @load="_calcListHeight(1)" />
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import { getAdvertisingList, getDynamicList, getNewsList } from '@/config/api';
	
	export default {
		data() {
			return {
				advertisingList: [],
				dynamicList: [],
				newsList: [],
				current: 0,
				dynamicListHeight: 0,
				newsListHeight: 0
			}
		},
		computed: {
			listSwiperStyle() {
				const height = this.current === 0 ? this.dynamicListHeight : this.newsListHeight;
				return `height: ${height}px`;
			}
		},
		onLoad() {
			this.getAdvertisingList();
			this.getDynamicList();
			this.getNewsList();
		},
		methods: {
			async getAdvertisingList() {
				const list = await getAdvertisingList({ space: '1,2,3' });
				this.advertisingList = list;
			},
			async getDynamicList() {
				const { feeds } = await getDynamicList();
				const { baseURL } = uni.$u.http.config;
				this.dynamicList = feeds.map(item => {
					const { id, images: [image], user: { avatar, name }, feed_content, has_like, like_count } = item;
					return {
						id,
						cover: baseURL + 'files/' + image?.file || '',
						avatar: avatar,
						userName: name,
						content: feed_content,
						favorite: has_like,
						count: like_count
					};
				});
			},
			async getNewsList() {
				const list = await getNewsList();
				const { baseURL } = uni.$u.http.config;
				this.newsList = list.map(item => {
					const { id, image, title, author, created_at } = item;
					return {
						id,
						image: baseURL + 'files/' + image?.id || '',
						title,
						author,
						createTime: created_at,
					};
				});
			},
			handleTap(current) {
				this.current = current;
			},
			handleSwiperChange(e) {
				this.current = e.detail.current;
			},
			_getSiteUrl(url) {
				return '/pages/webview/webview?siteUrl=' + encodeURI(url);
			},
			_calcListHeight(current) {
				this.$nextTick(() => {
					const selector = current === 0 ? '.dynamic' : '.news';
					const query = uni.createSelectorQuery();
					query.select(selector).boundingClientRect(data => {
						if (current === 0) {
							this.dynamicListHeight = data.height;
						} else {
							this.newsListHeight = data.height;
						}
					}).exec();
				})
			}
		}
	}
</script>

<style lang="scss">
	.home {
		min-height: 100vh;
		background-color: #eee;
		
		// 轮播图
		.carousel-wrapper {
			position: relative;
			height: 0;
			padding-top: 50%;
			.carousel {
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
		
		// 导航栏
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
		
		// 推荐、资讯
		.main {
			.header {
				height: 100rpx;
				font-size: 32rpx;
				line-height: 100rpx;
				text-align: center;
				color: #999;
				
				.text {
					& + .text {
						margin-left: 40rpx;
					}
					&.active {
						color: #0050FF;
					}
				}
			}
			.dynamic {
				padding-bottom: 20rpx;
				.item {
					margin: 0 20rpx;
					border-radius: 5px;
					background: #fff;
					box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
					overflow: hidden;
					&:not(:first-child) {
						margin-top: 20rpx;
					}
					.image-wrapper {
						max-height: 50vw;
						overflow: hidden;
						.image {
							width: 100%;
						}
					}
					.content {
						margin: 20rpx;
						word-break: break-all;
						font-size: 28rpx;
					}
					.info {
						display: flex;
						align-items: center;
						column-gap: 20rpx;
						margin: 20rpx;
						.avatar, .icon {
							flex: 0 0 40rpx;
							height: 40rpx;
						}
						.name, .count {
							font-size: 24rpx;
							color: #999;
						}
						.icon {
							margin-left: auto;
						}
					}
				}
			}
			.news {
				background: #fff;
				.item {
					display: flex;
					padding: 32rpx;
					&:not(:first-child) {
						border-top: 1px solid #eee;
					}
					.content {
						display: flex;
						flex-direction: column;
						padding-right: 32rpx;
						.title {
							font-size: 28rpx;
						}
						.info {
							display: flex;
							justify-content: space-evenly;
							margin-top: auto;
							font-size: 24rpx;
							color: #999;
							.time {
								margin-left: auto;
							}
						}
					}
					.image-wrapper {
						flex: 0 0 120rpx;
						margin-left: auto;
						height: 120rpx;
						border-radius: 3px;
						overflow: hidden;
						.image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	}
</style>
