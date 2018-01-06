<template>
  <div v-bind:style="pedalBoardStyle" class="pedal-board">
    <div>
     
    </div>
  </div>
</template>

<script>
export default {
  name: 'pedal-board',
  data () {
    return {
    }
  },
  props: ['metadata'],
  computed: {
    pedalBoardStyle: function(){
      let width = 'width: ' + this.metadata.dimensions.width + 'px;';
      let height = 'height: ' + this.metadata.dimensions.height + 'px;';
      let backgroundColor = 'backgroundColor:' + this.metadata.backgroundColor + ';';
      return `${width} ${height} ${backgroundColor}`;
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.pedal-board {
  position: absolute;
  color:white;
  padding:0;
}
</style>
