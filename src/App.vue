<template>
  <div id="app">
    <div>
     <div>
      <p>Pedalboard</p>
      <label>Width:<input type="number" min="0" v-model="pedalBoard.dimensions.width" />mm</label>
      <label>Depth: <input type="number" min="0" v-model="pedalBoard.dimensions.height" />mm</label>
      <label>Color: <input type="color" v-model="pedalBoard.backgroundColor" /></label>
    </div>
    <label><input type="checkbox" v-model="showConnections" />Show connections</label>
    <div>
      <p>Add pedal:</p>
      <label>
        Manufacturer:
        <select v-model="newEffect.manufacturer">
          <option v-bind:value="manufacturer" v-for="manufacturer in availableEffects.manufacturers">
            {{ manufacturer.name }}
          </option>
        </select>
      </label>
      <label>
        Model:
        <select v-model="newEffect.selectedEffect">
          <option v-bind:value="effect" v-for="effect in newEffect.manufacturer.effects">{{ effect.model }}</option>
        </select>
      </label>
      <button v-bind:disabled="disableAddPedalButton" v-on:click="addEffect">Add pedal</button>

    </div>
    <div is="pedal-board" v-bind:metadata="pedalBoard"></div>
    <div v-for="(manufacturer, manufacturerIndex) in selectedEffects.manufacturers">
      <div is="box" 
      v-bind:effect-index="effectIndex"
      v-bind:manufacturer-index="manufacturerIndex" 
      v-bind:metadata="effect" v-for="(effect, effectIndex) in manufacturer.effects"></div>
    </div>
  </div>
</div>
</template>

<script>
import PedalBoard from "./components/PedalBoard.vue";
import Effect from "./components/Effect.vue";
export default {
  name: 'app',
  components: {
    PedalBoard,
    Effect
  },
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
        dimensions: {width: 930, height: 570},
        backgroundColor: "#555555"
      },
      connections: {},
      availableConnections: [],
      showConnections: false
    }
  },
  computed: {
    disableAddPedalButton: function() {
      let hasSelectedEffect = Object.keys(this.newEffect.selectedEffect).length !== 0 || this.newEffect.selectedEffect.constructor !== Object;
      let hasSelectedManufacturer = this.newEffect.manufacturer.name.length;
      return !hasSelectedManufacturer || !hasSelectedEffect;
    }
  },
  mounted: function (){
    this.availableConnections = this.getAvailableConnections();
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
    },
    getAvailableConnections: function () {
      let availableConnections = [];
      this.selectedEffects.manufacturers.forEach(function(manufacturer, manufacturerIndex){
        manufacturer.effects.forEach(function (effect, effectIndex){
          let sockets = [];
          effect.sockets.forEach(function(socket, socketIndex){
            sockets.push({
              name: socket.name,
              binding: {
                manufacturerIndex: manufacturerIndex,
                effectIndex: effectIndex,
                socketIndex: socketIndex
              }
            });
          });
          availableConnections.push({
            manufacturer: effect.manufacturer,
            model: effect.model,
            sockets: sockets
          })
        })
      });
      return availableConnections;
    },
    getIdFromConnectionBinding: function(binding){
      return `${binding.manufacturerIndex}-${binding.effectIndex}-${binding.socketIndex}`;
    },
    changeConnection: function (connectionFrom, connectionTo){
      let connectionFromBinding = connectionFrom.socket.binding;
      let connectionToBinding = connectionTo.socket.binding;
      this.connections[this.getIdFromConnectionBinding(connectionFromBinding)] = this.getIdFromConnectionBinding(connectionToBinding);
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
