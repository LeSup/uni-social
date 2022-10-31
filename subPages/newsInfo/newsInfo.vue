<template>
	<view class="news-info">
		<view class="title">
			1231213
		</view>
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
			<html-parse :content="data.content"></html-parse>
		</view>
		<view class="split"></view>
		<comments :params="params" :data="commentsData" :load-comments="loadComments" />
	</view>
</template>

<script>
	import HtmlParse from '@/components/html-parse/parse';
	import Comments from '@/components/comments';
	import { getNewsInfo, getNewsComments } from '@/config/api';
	
	export default {
		components: {
			HtmlParse,
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
			// #ifdef MP-WEIXIN
			// 微信条件下分享到朋友圈、群组
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
			// #endif
			
			this.params = { id };
			this.getNewsInfo(id);
		},
		methods: {
			async getNewsInfo(id) {
				const { image, title, author, created_at, hits, content, has_like, digg_count, comment_count } = await getNewsInfo(id);
				const { baseURL } = uni.$u.http.config;
				
				const newContent = content.replace(/@!\[.*\]\((\d*)\)/g, "<img class=\"image\" src='" + baseURL + 'files/$1' + "' />")
					.replace(/\s\D\s/g, "<br />");
					
				this.data = {
					image: baseURL + 'files/' + image?.id || '',
					title,
					author,
					createTime: created_at,
					readCount: hits,
					content: newContent,
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

<style lang="scss" scoped>
	/* 引入富文本解析器 */
	@import '@/components/html-parse/parse.css';
	
	.news-info {
		.title {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			height: 80rpx;
			background: #fff;
		}
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
