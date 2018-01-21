<template>
	<div>
		<h1>{{ manufacturer }}</h1>
		<div v-for="effect in effectsFromManufacturer">
			<router-link v-bind:to="'/effects/' + $store.getters.slug(manufacturer) + '/' + $store.getters.slug(effect.model)">
				{{ effect.model }}
			</router-link>
		</div>

	</div>
</template>

<script>
export default {
	name: 'EffectManufacturer',
	computed: {
		manufacturer(){
			return this.$store.getters.effectManufacturerFromSlug(this.$route.params.effectManufacturerId)
		},
		effectsFromManufacturer(){
			return this.$store.getters.effectsFromManufacturer(this.manufacturer)
		}
	}
}
</script>

<style lang="scss">

</style>
