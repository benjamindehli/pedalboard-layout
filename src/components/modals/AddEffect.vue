<!--<template>
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
</template>-->

<script>
import AddEffectTemplate from "./AddEffectTemplate.quark";

export default {
  name: 'AddEffect',
  data () {
    return {
      selectedEffectId: {}
    }
  },
  template: AddEffectTemplate,
  props: [],
  mounted: function () {
  },
  watch: {
  },
  computed: {
    effectsOptionList: function () {
      let effectsOptionList = [];
      this.$parent.$parent.availableEffects.manufacturers.forEach(function (manufacturer, manufacturerIndex){
        manufacturer.effects.forEach(function (effect, effectIndex){
          effectsOptionList.push({
            name: effect.manufacturer + ' ' + effect.model,
            value: manufacturerIndex + '-' + effectIndex
          });
        });
      });
      return effectsOptionList;
    }
  },
  methods: {
    addEffect: function () {
      console.log("adding effect");
    },
    getEffectById: function (){
      let indexes = this.selectedEffectId.split("-");
      let manufacturerIndex = indexes[0];
      let effectIndex = indexes[1];
      let selectedEffect = this.$parent.$parent.availableEffects.manufacturers[manufacturerIndex].effects[effectIndex];
      console.log(indexes);
      console.log(selectedEffect);
      this.$parent.$parent.selectedEffects.push(selectedEffect);
    }
  }
}
</script>

<style lang="scss">
.modal{
  color: #333435;
}
</style>
