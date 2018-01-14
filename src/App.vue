<template>
  <div id="app">
    <main-navigation></main-navigation>
    <main id="mainContent">

      <div class="main-content">
        <div>
          <label>
            Show signal chain from effect:
            <select v-model="selectedFirstEffect">
              <option v-bind:value="{effectIndex: effectIndex, effect: selectedEffect}" v-for="(selectedEffect, effectIndex) in selectedEffects">
                {{ selectedEffect.manufacturer }} {{ selectedEffect.model }}
              </option>
            </select>
          </label>
        </div>

        <div v-if="Object.keys(effectChainFromFirstEffect).length">
          <div is="effect-chain-item" v-bind:effect-chain-item="effectChainFromFirstEffect" v-if="effectChainFromFirstEffect.connectedTo.length">
          </div>
        </div>


        <label><input type="checkbox" v-model="showConnections" />Show connections</label>
        <div is="pedal-board" v-bind:metadata="pedalBoard"></div>
        <div is="effect" 
        v-bind:effect-index="effectIndex"
        v-bind:metadata="effect" v-for="(effect, effectIndex) in selectedEffects"></div>
      </div>
    </main>
  </div>
</template>

<script>
import * as quark from 'quark-gui';
import MainNavigation from './components/MainNavigation.vue';
import PedalBoard from "./components/PedalBoard.vue";
import Effect from "./components/Effect.vue";
import EffectChainItem from "./components/EffectChainItem.vue";
export default {
  name: 'app',
  components: {
    MainNavigation,
    PedalBoard,
    Effect,
    EffectChainItem
  },
  data () {
    return {
      availableEffects: {
        manufacturers: [
        {name: 'Boss', effects: require("./data/effects/boss.json")},
        {name: 'Dallas Arbiter', effects: require("./data/effects/dallas-arbiter.json")},
        {name: 'Diamond', effects: require("./data/effects/diamond.json")},
        {name: 'Digitech', effects: require("./data/effects/digitech.json")},
        {name: 'Electro-Harmonix', effects: require("./data/effects/electro-harmonix.json")},
        {name: 'Fender', effects: require("./data/effects/fender.json")},
        {name: 'Mojo Hand FX', effects: require("./data/effects/mojo-hand-fx.json")},
        {name: 'Origin Effects', effects: require("./data/effects/origin-effects.json")},
        {name: 'Roger Mayer', effects: require("./data/effects/roger-mayer.json")},
        {name: 'VanAmps', effects: require("./data/effects/van-amps.json")},
        {name: 'Xotic', effects: require("./data/effects/xotic.json")}
        ]
      },
      selectedEffects: [],
      selectedFirstEffect: {},
      effectsInSelectedChain: [],
      pedalBoard: {
        dimensions: {width: 930, depth: 570},
        backgroundColor: "#555555",
        zoom: 100
      },
      connections: [],
      availableConnections: [],
      showConnections: false
    }
  },
  computed: {
    effectChainFromFirstEffect: function (){

      let effectChainFromFirstEffect = {};
      this.effectsInSelectedChain = [];

      if (Object.keys(this.selectedFirstEffect).length !== 0){
        effectChainFromFirstEffect.manufacturer = this.selectedFirstEffect.effect.manufacturer;
        effectChainFromFirstEffect.model = this.selectedFirstEffect.effect.model;
        effectChainFromFirstEffect.connectedTo = [];
        effectChainFromFirstEffect.connectedFrom = {};
        
        let effectIndex = this.selectedFirstEffect.effectIndex;

        this.selectedFirstEffect.effect.sockets.forEach(function (socket, socketIndex){
          let socketId = effectIndex + "-" + socketIndex;
          let effectsConnectedToEffect = this.getEffectsConnectedToEffect(socketId);
          if (effectsConnectedToEffect.length){
            effectChainFromFirstEffect.connectedTo = effectsConnectedToEffect;
            effectChainFromFirstEffect.connectedFrom = socket;
          }
        }.bind(this));
      }

      return effectChainFromFirstEffect;
    }
  },
  methods: {
    getConnectionToValueBySocketId: function (socketId) {
      let connectionToValue = null;
      this.connections.forEach(function (connection){
        if (connection.connectionFrom == socketId){
          connectionToValue = connection.connectionTo;
          return;
        }
      });
      return connectionToValue;
    },
    getEffectsConnectedToEffect: function (socketId){
     let allEffectsConnectedToEffect = [];
     if (!this.effectsInSelectedChain.includes(socketId)){

        // Get socket connection
        let connectedSocketId = this.getConnectionToValueBySocketId(socketId);

       // If socket has connection
       if (connectedSocketId !== null){
        this.effectsInSelectedChain.push(socketId);

        let connectedIndexes = connectedSocketId.split("-");
        let connectedEffectIndex = connectedIndexes[0];
        let connectedEffect = this.getSelectedEffectBySocketId(connectedSocketId);

        let effectConnectedToEffect = {
          manufacturer: connectedEffect.manufacturer,
          model: connectedEffect.model,
          connectedTo: [],
          connectedFrom: {}
        }

        connectedEffect.sockets.forEach(function (socket, socketIndex){
          let connectedSocketId = connectedEffectIndex + "-" + socketIndex;

          let connectedTo = this.getEffectsConnectedToEffect(connectedSocketId);
          if (connectedTo.length){

            effectConnectedToEffect.connectedTo = connectedTo;
            effectConnectedToEffect.connectedFrom = socket;
          }

        }.bind(this));

        allEffectsConnectedToEffect.push(effectConnectedToEffect);
      }

    }

    return allEffectsConnectedToEffect;
  },
  getSelectedEffectBySocketId: function (socketId){
    let indexes = socketId.split("-");
    let effectIndex = indexes[0];
    let selectedEffect = this.selectedEffects[effectIndex];
    return selectedEffect;
  },

  changeConnection: function(connectionFrom, connectionTo){
    let hasAllreadyConnectionFrom = false;
    let hasAllreadyConnectionTo = false;
    let hasNewConnectionTo = connectionTo.length;
    let connections = this.connections;

    connections.forEach(function (connection, connectionIndex){
        // Remove previous mirror connection
        if (connection.connectionTo == connectionFrom){
          connections.splice(connectionIndex, 1);
          this.connections.splice(connectionIndex, 1);
        }
      }.bind(this));


    connections.forEach(function (connection, connectionIndex){
      if (!hasNewConnectionTo){
          // Remove connection
          if (connection.connectionFrom == connectionFrom){
            this.connections.splice(connectionIndex, 1);
            return;
          }
        }else{
          // Update connection
          if (connection.connectionFrom == connectionFrom){
            this.connections[connectionIndex].connectionTo = connectionTo;
            hasAllreadyConnectionFrom = true;
          }

          // Update mirror connection
          if (connection.connectionFrom == connectionTo){
            this.connections[connectionIndex].connectionTo = connectionFrom
            hasAllreadyConnectionTo = true;
          }
        }
      }.bind(this));

    if (!hasAllreadyConnectionFrom && hasNewConnectionTo){
        // New Connection
        this.connections.push({
          connectionFrom: connectionFrom,
          connectionTo: connectionTo
        });
      }
      if (!hasAllreadyConnectionTo && hasNewConnectionTo){
        // New mirror connection
        this.connections.push({
          connectionFrom: connectionTo,
          connectionTo: connectionFrom
        });
      }
    },
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
