<template>
	<div>
		<h1>{{ effect.manufacturer }} {{ effect.model }}</h1>

	</div>
</template>

<script>
export default {
	name: 'Effect',
	data () {
		return {
			effect: this.$parent.availableEffects.manufacturers[this.$route.params.effectManufacturerId].effects[this.$route.params.effectId],
			effectId: this.$route.params.effectId

		}
	}
}
</script>

<style lang="scss">

</style>
