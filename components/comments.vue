<template>
	<view class="comments">
		<view class="title">
			<text>最新评论</text>
		</view>
		<view class="list">
			<view class="item" v-for="item in comments" :key="item.id">
				<view class="user">
					<image class="avatar" :src="item.user.avatar || '/static/images/nopic.png'" />
					<view class="name">{{item.user.name}}</view>
				</view>
				<view class="content">
					{{item.body}}
				</view>
				<view class="date">
					<text>{{item.created_at}}评论</text>
				</view>
			</view>
		</view>
		<view class="function">
			<view class="input">
				<text>说点什么...</text>
			</view>
			<view class="control">
				<image class="icon" src="/static/icons/not_favorite.png" />
				<text class="text">{{data.favoriteCount}}</text>
			</view>
			<view class="control" @tap.stop="scrollToList">
				<image class="icon" src="/static/icons/message.png" />
				<text class="text">{{data.commentCount}}</text>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<button class="control share" open-type="share">
				<image class="icon" src="/static/icons/share.png" />
				<text class="text">分享</text>
			</button>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default {
		name: "comments",
		props: {
			params: {
				type: Object
			},
			data: {
				type: Object
			},
			loadComments: {
				type: Function
			}
		},
		data() {
			return {
				comments: []
			};
		},
		mounted() {
			this._queryApi();
		},
		methods: {
			async _queryApi() {
				const { comments } = await this.loadComments(this.params.id);
				this.comments = comments;
			},
			scrollToList() {
				uni.createSelectorQuery()
					.in(this)
					.select('.title')
					.boundingClientRect(({ top }) => {
						uni.pageScrollTo({
							scrollTop: top
						});
					})
					.exec();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comments {
		padding: 20rpx 20rpx 112rpx 20rpx;
		.title {
			font-size: 28rpx;
			font-weight: 700;
		}
		.item {
			margin-top: 32rpx;
			.user {
				display: flex;
				align-items: center;
				column-gap: 20rpx;
				.avatar {
					flex: 0 0 56rpx;
					height: 56rpx;
				}
				.name {
					font-size: 24rpx;
					font-weight: 700;
					line-height: 40rpx;
				}
			}
			.content {
				margin: 20rpx 0 0 74rpx;
				color: #333;
			}
			.date {
				margin: 16rpx 0 0 74rpx;
				padding-bottom: 12rpx;
				font-size: 24rpx;
				color: #999;
				border-bottom: 2rpx solid #eee;
			}
		}
		.function {
			position: fixed;
			right: 0;
			bottom: 0;
			left: 0;
			display: flex;
			align-items: center;
			column-gap: 32rpx;
			padding: 0 20rpx;
			height: 112rpx;
			font-size: 24rpx;
			background: #fff;
			box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.3);
			.input {
				flex: 1;
				height: 64rpx;
				padding-left: 32rpx;
				line-height: 64rpx;
				color: #999;
				background: #eee;
				border-radius: 32rpx;
			}
			.control {
				display: flex;
				align-items: center;
				column-gap: 12rpx;
				&.share {
					padding: 0;
					font-size: 24rpx;
					background: transparent;
					&::after {
						border: none;
					}
				}
				.icon {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
</style>