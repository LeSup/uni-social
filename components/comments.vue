<template>
	<view class="comments">
		<view class="function">
			<view class="input">
				<text>说点什么...</text>
			</view>
			<view class="control">
				<image class="icon" src="/static/icons/not_favorite.png" />
				<text class="text">{{data.favoriteCount}}</text>
			</view>
			<view class="control">
				<image class="icon" src="/static/icons/message.png" />
				<text class="text">{{data.commentCount}}</text>
			</view>
			<view class="control">
				<image class="icon" src="/static/icons/share.png" />
				<text class="text">分享</text>
			</view>
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
				
			};
		},
		mounted() {
			this._queryApi();
		},
		methods: {
			async _queryApi() {
				const result = await this.loadComments(this.params.id);
				console.log('result', result);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comments {
		padding-bottom: 112rpx;
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
				.icon {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
</style>