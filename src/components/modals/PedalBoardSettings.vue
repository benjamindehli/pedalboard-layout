<template>
  <div class="modal">
    <label>Width:<input type="number" min="0" v-model="$parent.$parent.pedalBoard.dimensions.width" />mm</label>
   <label>Depth: <input type="number" min="0" v-model="$parent.$parent.pedalBoard.dimensions.height" />mm</label>
   <label>Color: <input type="color" v-model="$parent.$parent.pedalBoard.backgroundColor" /></label>
   <label>Zoom: <input type="number" v-model="$parent.$parent.pedalBoard.zoom" /></label>
 </div>
</template>

<script>
export default {
  name: 'PedalBoardSettings',
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
