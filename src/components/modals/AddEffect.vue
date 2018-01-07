<template>
  <div class="modal">

   <p>Add pedal:</p>
        <label>
          Manufacturer:
          <select v-model="$parent.$parent.newEffect.manufacturer">
            <option v-bind:value="manufacturer" v-for="manufacturer in $parent.$parent.availableEffects.manufacturers">
              {{ manufacturer.name }}
            </option>
          </select>
        </label>
        <label>
          Model:
          <select v-model="$parent.$parent.newEffect.selectedEffect">
            <option v-bind:value="effect" v-for="effect in $parent.$parent.newEffect.manufacturer.effects">{{ effect.model }}</option>
          </select>
        </label>
        <button v-bind:disabled="$parent.$parent.disableAddPedalButton" v-on:click="$parent.$parent.addEffect">Add pedal</button>
 </div>
</template>

<script>
export default {
  name: 'AddEffect',
  data () {
    return {
    }
  },
  props: [],
  mounted: function () {
  },
  watch: {
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss">
.modal{
  color: #333435;
}
</style>
