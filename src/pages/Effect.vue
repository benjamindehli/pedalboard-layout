<template>
	<div>
		<h1>{{ effect.model }}</h1>
	</div>
</template>

<script>
export default {
	name: 'Effect',
	computed: {
		manufacturer(){
			return this.$store.getters.effectManufacturerFromSlug(this.$route.params.effectManufacturerId)
		},
		effect(){
			return this.$store.getters.effectFromSlugs({
				effectManufacturer: this.$route.params.effectManufacturerId, 
				effectModel: this.$route.params.effectId
			})
		}
	}
}
</script>

<style lang="scss">

</style>
