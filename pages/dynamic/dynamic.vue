<template>
	<view class="dynamic">
		<view class="container" v-for="(group, index) in list" :key="index">
			<view class="content-wrapper">
				<view class="content" :class="{rtl: index % 2 === 1}">
					<navigator class="navigator" :url="'/subPages/dynamicInfo/dynamicInfo?id=' + item.id" v-for="item in group" :key="item.id">
						<image class="image" :src="item.cover" />
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getDynamicList } from '@/config/api';
	
	const Limit = 12;
	const GroupLen = 6;
	
	export default {
		data() {
			return {
				dynamicList: [],
				hasMoreDynamic: true,
			}
		},
		computed: {
			list() {
				const result = [];
				let start = 0;
				while (start <= this.dynamicList.length - 1) {
					result.push(this.dynamicList.slice(start, start + GroupLen));
					start += GroupLen;
				}
				return result;
			}
		},
		onLoad() {
			this.getDynamicList(true);
		},
		onPullDownRefresh() {
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
					const { id, images: [image] } = item;
					return {
						id,
						cover: baseURL + 'files/' + image?.file || '',
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dynamic {
		min-height: 100vh;
		background-color: #eee;
		.container {
			margin: 20rpx;
			border-radius: 5px;
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
			overflow: hidden;
			.content-wrapper {
				position: relative;
				height: 0;
				padding-top: 100%;
				.content {
					position: absolute;
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
					display: grid;
					grid-template: 1fr 1fr 1fr / 1fr 1fr 1fr;
					grid-gap: 4rpx;
					background-color: rgba(0, 0, 0, 0.3);
					&.rtl {
						.navigator {
							&:nth-child(1) {
								grid-area: 1 / 1 / 2 / 2;
							}
							&:nth-child(2) {
								grid-area: 1 / 2 / 3 / 4;
							}
							&:nth-child(3) {
								grid-area: 2 / 1 / 3 / 2;
							}
						}
					}
					.navigator {
						&:nth-child(1) {
							grid-area: 1 / 1 / 3 / 3;
						}
						&:nth-child(2) {
							grid-area: 1 / 3 / 2 / 4;
						}
						&:nth-child(3) {
							grid-area: 2 / 3 / 3 / 4;
						}
						&:nth-child(4) {
							grid-area: 3 / 1 / 4 / 2;
						}
						&:nth-child(5) {
							grid-area: 3 / 2 / 4 / 3;
						}
						&:nth-child(6) {
							grid-area: 3 / 3 / 4 / 4;
						}
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
