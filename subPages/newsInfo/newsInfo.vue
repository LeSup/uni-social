<template>
	<view class="news-info">
		<view class="header">
			<image class="bg" :src="data.image" />
			<view class="content">
				<view class="title">
					<text>{{data.title}}</text>
				</view>
				<view class="info">
					<text class="text">{{data.author}}</text>
					<text class="text">{{data.createTime}}发布</text>
					<text class="text">{{data.readCount}}阅读</text>
				</view>
			</view>
		</view>
		<view class="content">
			<rich-text :nodes="data.content"></rich-text>
		</view>
		<view class="split"></view>
		<comments :params="params" :data="commentsData" :load-comments="loadComments" />
	</view>
</template>

<script>
	import Comments from '@/components/comments';
	import htmlParser from '@/common/html-parser';
	import { getNewsInfo, getNewsComments } from '@/config/api';
	
	export default {
		components: {
			Comments,
		},
		data() {
			return {
				data: {},
				params: {},
				commentsData: {},
				loadComments: getNewsComments
			}
		},
		onLoad({ id }) {
			this.params = { id };
			this.getNewsInfo(id);
		},
		methods: {
			async getNewsInfo(id) {
				const { image, title, author, created_at, hits, content, has_like, digg_count, comment_count } = await getNewsInfo(id);
				const { baseURL } = uni.$u.http.config;
				
				const newContent = content.replace(/@!\[.*\]\((\d*)\)/g, "<img class=\"image\" src='" + baseURL + 'files/$1' + "' />");
				this.data = {
					image: baseURL + 'files/' + image?.id || '',
					title,
					author,
					createTime: created_at,
					readCount: hits,
					content: htmlParser(newContent),
				};
				this.commentsData = {
					favorite: has_like,
					favoriteCount: digg_count,
					commentCount: comment_count
				};
			}
		}
	}
</script>

<style lang="scss">
	.news-info {
		.header {
			position: relative;
			height: 60vw;
			.bg {
				width: 100%;
				height: 100%;
			}
			.content {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				padding: 20rpx;
				background: rgba(0, 0, 0, 0.3);
				backdrop-filter: blur(3px);
				.title {
					font-size: 32rpx;
					font-weight: 700;
					color: #fff;
				}
				.info {
					margin-top: 20rpx;
					font-size: 24rpx;
					color: #fff;
					.text ~ .text {
						margin-left: 8rpx;
					}
				}
			}
		}
		.content {
			padding: 20rpx;
			font-size: 24rpx;
			.image {
				width: 100%
			}
		}
		.split {
			height: 32rpx;
			background: #eee;
		}
	}
</style>
