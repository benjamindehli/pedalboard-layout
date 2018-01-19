<template>
	<div>
		<h1>{{ manufacturer.name }}</h1>
		<div v-for="(effect, effectId) in manufacturer.effects">
			<router-link v-bind:to="'/effects/' + effectManufacturerId + '/' + effectId">
				{{ effect.model }}
			</router-link>
		</div>

	</div>
</template>

<script>
export default {
	name: 'EffectManufacturer',
	data () {
		return {
			manufacturer: this.$parent.availableEffects.manufacturers[this.$route.params.effectManufacturerId],
			effectManufacturerId: this.$route.params.effectManufacturerId
		}
	}
}
</script>

<style lang="scss">

</style>
