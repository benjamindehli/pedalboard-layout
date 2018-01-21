<template>
	<div>
		<h1>Effects</h1>
    <div v-for="manufacturer in manufacturers">
      <p>{{ manufacturer }}</p>
      <router-link v-bind:to="'/effects/' + $store.getters.slug(manufacturer)">
        <p>{{ manufacturer }}</p>
      </router-link>
      <div v-for="effect in $store.getters.effectsFromManufacturer(manufacturer)">
        {{ effect.model }}
        <router-link v-bind:to="'/effects/' + $store.getters.slug(manufacturer) + '/' + $store.getters.slug(effect.model)">
          {{ effect.model }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: 'Effects',
  computed: {
    manufacturers(){
      return this.$store.getters.effectManufacturers
    },
    effects(){
      return this.$store.getters.effects
    }
  }
}
</script>

<style lang="scss">

</style>
