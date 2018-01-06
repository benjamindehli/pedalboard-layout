<template>
  <div 
  v-on:mouseup="destroy" 
  v-on:mousemove="move_elem($event)" 
  v-on:mousedown="dragInit($event)"
  v-bind:style="socketsStyle"
  class="sockets">
  <div 
  v-bind:style="boxStyle" 
  class="box">
  <div>
    <span>{{metadata.manufacturer}}</span>
    <span>{{metadata.model}}</span>
  </div>
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
    socketsStyle: function(){
      let paddingTop = this.metadata.sockets.top ? '15px' : 0;
      let paddingRight = this.metadata.sockets.right ? '15px' : 0;
      let paddingBottom = this.metadata.sockets.bottom ? '15px' : 0;
      let paddingLeft = this.metadata.sockets.left ? '15px' : 0;
      
      return `padding: ${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft};`;
    },
    boxStyle: function(){
      let width = 'width: ' + this.metadata.dimensions.width + 'px;';
      let height = 'height: ' + this.metadata.dimensions.height + 'px;';
      return `${width} ${height}`;
    }
  },
  methods: {
    findAncestor: function (el, cls) {
      while ((el = el.parentElement) && !el.classList.contains(cls));
      return el;
    },
    dragInit: function (event) {
      let element = this.findAncestor(event.target, 'sockets');
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
.sockets{
  position:absolute;
  background-color: rgba(100,110,200,.3);
}
.box {
  background-color:#678;
  border: 1px solid #567;
  color:white;
  padding:15px 20px;
  cursor:move;
}
</style>
