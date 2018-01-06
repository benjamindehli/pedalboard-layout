<template>
  <div id="app">
    <div>
      <div>

        <select v-model="newEffect.manufacturer">
          <option v-bind:value="manufacturer" v-for="manufacturer in availableEffects.manufacturers">
            {{ manufacturer.name }}
          </option>
        </select>
        <select v-model="newEffect.selectedEffect">
          <option v-bind:value="effect" v-for="effect in newEffect.manufacturer.effects">{{ effect.model }}</option>
        </select>
        <button v-bind:disabled="disableAddPedalButton" v-on:click="addEffect">Add pedal</button>

      </div>
      <div is="pedal-board" v-bind:metadata="pedalBoard"></div>
      <div v-for="manufacturer in selectedEffects.manufacturers">
        <div is="box" v-bind:manufacturer="manufacturer.name" v-bind:metadata="box" v-for="box in manufacturer.effects"></div>
      </div>
    </div>
  </div>
</template>

<script>
import PedalBoard from "./components/PedalBoard.vue";
import Box from "./components/Box.vue";
export default {
  name: 'app',
  data () {
    return {
      availableEffects: {
        manufacturers: [
        {name: 'Boss', effects: require("./data/effects/boss.json")},
        {name: 'Diamond', effects: require("./data/effects/diamond.json")},
        {name: 'Electro-Harmonix', effects: require("./data/effects/electro-harmonix.json")},
        {name: 'Origin Effects', effects: require("./data/effects/origin-effects.json")},
        {name: 'Roger Mayer', effects: require("./data/effects/roger-mayer.json")},
        {name: 'Xotic', effects: require("./data/effects/xotic.json")}
        ]
      },
      selectedEffects: {
        manufacturers: []
      },
      newEffect: {
        manufacturer: {
          name: '',
          effects: []
        },
        selectedEffect: {}
      },
      pedalBoard: {
        dimensions: {width: 930, height: 570}
      }
    }
  },
  components: {
    PedalBoard,
    Box
  },
  computed: {
    disableAddPedalButton: function() {
      let hasSelectedEffect = Object.keys(this.newEffect.selectedEffect).length !== 0 || this.newEffect.selectedEffect.constructor !== Object;
      let hasSelectedManufacturer = this.newEffect.manufacturer.name.length;
      return !hasSelectedManufacturer || !hasSelectedEffect;
    }
  },
  methods: {
    addEffect: function(){
      this.availableEffects.manufacturers.forEach(function(availableManufacturer){
        if (availableManufacturer.name == this.newEffect.manufacturer.name){
          let hasSelectedEffectsFromManufaturer = false;
          
          if (this.selectedEffects.manufacturers.length){
            this.selectedEffects.manufacturers.forEach(function(selectedManufacturer, index){
              if (selectedManufacturer.name == this.newEffect.manufacturer.name){
                this.selectedEffects.manufacturers[index].effects.push(this.newEffect.selectedEffect);
                hasSelectedEffectsFromManufaturer = true;
              }
            }.bind(this));
          }

          if (!hasSelectedEffectsFromManufaturer){
            this.selectedEffects.manufacturers.push({
              name: this.newEffect.manufacturer.name,
              effects: [this.newEffect.selectedEffect]
            });
          }
        }
      }.bind(this));
    }
  }
}
</script>

<style lang="scss">
*{
  box-sizing: content-box;
}

body{
  font-family: Verdana, Arial, sans-serif;
}
</style>
