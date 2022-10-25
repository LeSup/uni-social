<template>
	<view class="setting">
		<u-cell-group>
			<u-cell
			    size="large"
			    title="隐私政策"
			    isLink
			></u-cell>
			<u-cell
			    size="large"
			    title="用户协议"
					isLink
			></u-cell>
		</u-cell-group>
		<view class="button-wrapper">
			<u-button color="#f00" size="large" shape="circle" text="退出登录"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.setting {
		position: relative;
		min-height: 100vh;
		.button-wrapper {
			position: absolute;
			right: 40rpx;
			bottom: 40rpx;
			left: 40rpx;
		}
	}
</style>
