<template>
	<div>
		<h1>Instruments</h1>
    <ul>
      <li v-for="instrument in instruments">
        <router-link v-bind:to="'/instruments/' + instrument.id">{{ instrument.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
	name: 'Instruments',
	data () {
		return {
      instruments: [
      {id: '0', name: 'Hohner Clavinet'},
      {id: '1', name: 'Hammond C3'},
      {id: '2', name: 'Fender Rhodes'}
      ]
    }
  }
}
</script>

<style lang="scss">

</style>
