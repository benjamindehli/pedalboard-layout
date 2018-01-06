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
      return `${width} ${height}`;
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.pedal-board {
  position: absolute;
  background-color:#999;
  border: 1px solid #888;
  color:white;
  padding:0;
}
</style>
