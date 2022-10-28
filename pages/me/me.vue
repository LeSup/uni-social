<template>
	<view class="me">
		<view class="wall">
			<image class="light" src="/static/images/hbg.png" />
			<view class="card">
				<image class="bg" src="/static/images/ubg.png" />
				<view class="profile">
					<image class="avatar" src="/static/images/nopic.png" />
					<view class="user">
						<view class="name">你好，游客</view>
						<view class="signature">这个人有点懒，什么都没留下</view>
					</view>
				</view>
				<view class="panel">
					<navigator class="setting" open-type="navigate" url="/subPages/setting/setting">
						<image class="icon" src="/static/icons/setting.png" />
						<text class="text">个人设置</text>
					</navigator>
					<view class="message" @tap="showMessage">
						<image class="icon" src="/static/icons/messge_a.png" />
						<text class="text">我的消息</text>
					</view>
				</view>
			</view>
			<image class="circle" src="/static/images/half-circle.png" />
		</view>
		<view class="dynamic">
			<view class="item" v-for="item in dynamicList" :key="item.id">
				<view class="image-wrapper">
					<image class="image" :src="item.cover" mode="widthFix" />
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
	</view>
</template>

<script>
	import { getDynamicList } from '@/config/api';
	
	const Limit = 5;
	
	export default {
		data() {
			return {
				dynamicList: [],
				hasMoreDynamic: true
			}
		},
		onLoad() {
			this.getDynamicList(true);
		},
		onReachBottom() {
			this.getDynamicList();
		},
		methods: {
			async getDynamicList(reset) {
				if (reset) {
					this.hasMoreDynamic = true;
				} else if (!this.hasMoreDynamic) {
					uni.showToast({
						icon: 'none',
						title: '抱歉，暂无更多数据！'
					});
					return;
				}
				
				const params = {
					limit: Limit,
					after: reset ? undefined : this.dynamicList[this.dynamicList.length - 1]?.id
				};
				const { feeds } = await getDynamicList(params);
				const { baseURL } = uni.$u.http.config;
				const result = feeds.map(item => {
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
				
				uni.showToast({
					icon: 'success',
					title: '数据加载成功！'
				});
				
				if (reset) {
					this.dynamicList = result;
				} else {
					this.dynamicList.push(...result);
				}
				this.hasMoreDynamic = result.length === Limit;
			},
			showMessage() {
				uni.showModal({
					title: '我的消息',
					content: '消息查阅',
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	.wall {
		position: relative;
		height: 46vh;
		background: linear-gradient(#1d293c, #25354b);
		.light {
			position: absolute;
			top: 0;
			left: 0;
			width: 280rpx;
			height: 280rpx;
		}
		.card {
			position: absolute;
			right: 10%;
			bottom: 0;
			left: 10%;
			z-index: 0;
			.bg {
				position: absolute;
				width: 100%;
				height: 100%;
				z-index: -1;
			}
			.profile {
				display: flex;
				padding-top: 32rpx;
				.avatar {
					flex: 0 0 100rpx;
					margin-left: 32rpx;
					height: 100rpx;
				}
				.user {
					display: flex;
					flex-direction: column;
					justify-content: center;
					margin-left: 32rpx;
					.signature {
						margin-top: 16rpx;
						font-size: 24rpx;
						color: #333;
					}
				}
			}
			.panel {
				display: flex;
				column-gap: 20rpx;
				margin: 80rpx 20rpx;
				.setting, .message {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					column-gap: 20rpx;
					padding: 32rpx 0;
					background: #eee;
					border-radius: 3px;
					.icon {
						width: 40rpx;
						height: 40rpx;
					}
					.text {
						font-size: 28rpx;
					}
				}
			}
		}
		.circle {
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 12%;
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
</style>
