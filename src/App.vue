<template>

  <div id="app" v-on:mousemove="move_elem($event)" v-on:mouseup="destroy($event)">
    <main-navigation></main-navigation>
    <main id="mainContent">
      <div class="main-content">
        <div is="effect-chain"></div>
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
import EffectChain from "./components/EffectChain.vue";
export default {
  name: 'app',
  components: {
    MainNavigation,
    PedalBoard,
    Effect,
    EffectChain
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
        {name: 'Kingsley', effects: require("./data/effects/kingsley.json")},
        {name: 'Mojo Hand FX', effects: require("./data/effects/mojo-hand-fx.json")},
        {name: 'Neo Instruments', effects: require("./data/effects/neo-instruments.json")},
        {name: 'Origin Effects', effects: require("./data/effects/origin-effects.json")},
        {name: 'Roger Mayer', effects: require("./data/effects/roger-mayer.json")},
        {name: 'VanAmps', effects: require("./data/effects/van-amps.json")},
        {name: 'Xotic', effects: require("./data/effects/xotic.json")}
        ]
      },
      selected: null,
      selectedPosition: {
        x_elem: 0,
        y_elem: 0
      },
      selectedEffects: [],
      pedalBoard: {
        dimensions: {width: 930, depth: 570},
        backgroundColor: "#555555",
        zoom: 100
      },
      connections: [],
      availableConnections: [],
      showConnections: false,

    }
  },
  methods: {
    move_elem: function(event) {
      let x_pos = document.all ? window.event.clientX : event.pageX;
      let y_pos = document.all ? window.event.clientY : event.pageY;
      if (this.selected !== null) {
       this.selected.style.left = (x_pos - this.selectedPosition.x_elem) + 'px';
       this.selected.style.top = (y_pos - this.selectedPosition.y_elem) + 'px';
     }
   },
   destroy: function(event) {
    let element = this.findAncestor(event.target, 'sockets');
    if (element !== null){
     element.style.zIndex = 1;
     this.selected = null;
   }
 },
 findAncestor: function (el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el;
},
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
getEffectConnectedToSocket: function (socketFromId, socketIdsInChain){
  socketIdsInChain = socketIdsInChain !== undefined ? socketIdsInChain : [];
  socketIdsInChain.push(socketFromId);

      // Get socket connection
      let effectConnectedToSocket = null;
      let connectedSocketId = this.getConnectionToValueBySocketId(socketFromId);
      if (connectedSocketId !== null && !socketIdsInChain.includes(connectedSocketId)){
        let connectedEffectIndex = this.getSelectedEffectIndexBySocketId(connectedSocketId);
        let socketFrom = this.getSelectedSocketBySocketId(socketFromId);
        effectConnectedToSocket = this.getEffectsConnectedToEffect(connectedEffectIndex, socketIdsInChain, socketFrom);
      }
      return effectConnectedToSocket;
    },
    getEffectsConnectedToEffect: function (effectFromIndex, socketIdsInChain, socketFrom){
      socketIdsInChain = socketIdsInChain !== undefined ? socketIdsInChain : [];
      socketFrom = socketFrom !== undefined ? socketFrom : null;

      let effectFrom = this.selectedEffects[effectFromIndex];
      
      let effectsConnectedToEffect = {
        manufacturer: effectFrom.manufacturer,
        model: effectFrom.model,
        connectionTo: [],
        connectionFrom: socketFrom
      }
      effectFrom.sockets.forEach(function (socket, socketIndex){
        let socketFromId = effectFromIndex + '-' + socketIndex;
        if (!socketIdsInChain.includes(socketFromId)){
          let connectedEffect = this.getEffectConnectedToSocket(socketFromId, socketIdsInChain);
          if (connectedEffect !== null){
            effectsConnectedToEffect.connectionTo.push({socket: socket, connectedEffect: connectedEffect});
          }
        }
      }.bind(this));
      return effectsConnectedToEffect;
    },
    getSelectedEffectBySocketId: function (socketId){
      let indexes = socketId.split("-");
      let effectIndex = indexes[0];
      let selectedEffect = this.selectedEffects[effectIndex];
      return selectedEffect;
    },
    getSelectedEffectIndexBySocketId: function (socketId){
      let indexes = socketId.split("-");
      let selectedEffectIndex = indexes[0];
      return selectedEffectIndex;
    },
    getSelectedSocketBySocketId: function (socketId){
      let indexes = socketId.split("-");
      let effectIndex = indexes[0];
      let socketIndex = indexes[0];
      let selectedSocket = this.selectedEffects[effectIndex].sockets[effectIndex];
      return selectedSocket;
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
