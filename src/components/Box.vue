<template>
  <div 
  v-on:mouseup="destroy" 
  v-on:mousemove="move_elem($event)" 
  v-on:mousedown="dragInit($event)"
  v-bind:style="style" 
  class="box">
  <div>
    <span>{{metadata.manufacturer}}</span>
    <span>{{metadata.model}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'box',
  data () {
    return {
      selected: null,
      x_pos: 0,
      y_pos: 0,
      x_elem: 0,
      y_elem: 0
    }
  },
  props: ['metadata'],
  computed: {
    style: function(){
      let width = 'width: ' + this.metadata.dimensions.width + 'px;';
      let height = 'height: ' + this.metadata.dimensions.height + 'px;';
      return `${width} ${height}`;
    }
  },
  methods: {
    dragInit: function (event) {
      let element = event.target;
      this.selected = element;
      this.x_elem = this.x_pos - this.selected.offsetLeft;
      this.y_elem = this.y_pos - this.selected.offsetTop;
    },
    destroy: function() {
      this.selected = null;
    },
    move_elem: function(e) {
      this.x_pos = document.all ? window.event.clientX : e.pageX;
      this.y_pos = document.all ? window.event.clientY : e.pageY;
      if (this.selected !== null) {
        this.selected.style.left = (this.x_pos - this.x_elem) + 'px';
        this.selected.style.top = (this.y_pos - this.y_elem) + 'px';
      }
    }
  }
}
</script>

<style lang="scss">
.box {
  position:absolute;
  width:120px;
  height:120px;
  background-color:#678;
  border: 1px solid #567;
  color:white;
  padding:15px 20px;
  cursor:move;
}
</style>
