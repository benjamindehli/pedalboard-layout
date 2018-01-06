<template>
  <div id="app">
    <div>
      <div is="pedal-board" v-bind:metadata="pedalBoard"></div>
      <div v-for="manufacturer in manufacturers">
        <div is="box" v-bind:manufaturer="manufacturer.name" v-bind:metadata="box" v-for="box in manufacturer.effects"></div>
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
      manufacturers: [
      {name: 'Boss', effects: require("./data/effects/boss.json")},
      {name: 'Diamond', effects: require("./data/effects/diamond.json")},
      {name: 'Roger Mayer', effects: require("./data/effects/roger-mayer.json")},
      {name: 'Xotic', effects: require("./data/effects/xotic.json")}
      ],
      pedalBoard: {
        dimensions: {width: 930, height: 570}
      }
    }
  },
  components: {
    PedalBoard,
    Box
  },
  methods: {
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
