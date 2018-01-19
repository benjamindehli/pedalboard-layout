<template>
	<div>
		<h1>Effects</h1>
    <div v-for="(manufacturer, effectManufacturerId) in this.$parent.availableEffects.manufacturers">
      <router-link v-bind:to="'/effects/' + effectManufacturerId">
        <p>{{ manufacturer.name }} ({{ manufacturer.effects.length }})</p>
      </router-link>
      <div v-for="(effect, effectId) in manufacturer.effects">
        <router-link v-bind:to="'/effects/' + effectManufacturerId + '/' + effectId">
          {{ effect.model }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: 'Effects',
	data () {
		return {
    }
  }
}
</script>

<style lang="scss">

</style>
