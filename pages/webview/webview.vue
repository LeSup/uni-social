<template>
	<web-view :src="siteUrl"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				siteUrl: ''
			}
		},
		onLoad(options) {
			this.siteUrl = decodeURI(options.siteUrl);
		}
	}
</script>

<style>

</style>
