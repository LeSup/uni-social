<template>
	<view class="dynamic-info">
		<view class="post">
			<view class="header">
				<image class="avatar" :src="data.avatar || '/static/images/nopic.png'" />
				<text class="name">{{data.userName}}</text>
			</view>
			<view class="content">
				<image class="image" mode="widthFix" :src="item" v-for="(item, index) in data.images" :key="index" />
			</view>
			<view class="footer">
				<text class="createTime">{{data.createTime}}</text>
				<text class="count">{{data.viewCount}}阅读</text>
				<text class="count">{{data.favoriteCount}}点赞</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { getDynamicInfo } from '@/config/api';
	
	export default {
		data() {
			return {
				data: {}
			}
		},
		onLoad(options) {
			this.getDynamicInfo(options.id);
		},
		methods: {
			async getDynamicInfo(id) {
				const { user: { avatar, name }, images, created_at, feed_view_count, like_count } = await getDynamicInfo(id);
				const { baseURL } = uni.$u.http.config;
				
				this.data = {
					avatar,
					userName: name,
					images: (images || []).map(i => (baseURL + 'files/' + i?.file || '')),
					createTime: created_at,
					viewCount: feed_view_count,
					favoriteCount: like_count
				};
			}
		}
	}
</script>

<style lang="scss">
	.dynamic-info {
		min-height: 100vh;
		background: #eee;
		.post {
			padding: 20rpx;
			background: #fff;
			.header {
				.avatar {
					width: 80rpx;
					height: 80rpx;
				}
				.name {
					margin-left: 20rpx;
					font-size: 28rpx;
					font-weight: 700;
					vertical-align: 20rpx;
				}
			}
			.content {
				.image {
					margin-top: 20rpx;
					width: 100%;
					box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
					&:last-child {
						margin-bottom: 20rpx;
					}
				}
			}
			.footer {
				display: flex;
				font-size: 24rpx;
				color: #999;
				.createTime {
					margin-right: auto;
				}
				.count ~ .count {
					margin-left: 12rpx;
				}
			}
		}
	}
</style>
