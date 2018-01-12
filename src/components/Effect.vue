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
  <div v-show="$parent.showConnections">
    <div v-for="(socket, socketIndex) in metadata.sockets">
      <div is="socket" v-bind:socket="socket" v-bind:socket-index="socketIndex"></div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import Socket from "./effect/Socket.vue";

export default {
  name: 'effect',
  components: {
    Socket
  },
  data () {
    return {
      selected: null,
      x_pos: 0,
      y_pos: 0,
      x_elem: 0,
      y_elem: 0,
      rotate: 0,
      sockets: []
    }
  },
  props: ['metadata', 'effectIndex'],
  computed: {
    socketsStyle: function(){
      let paddingTop = this.metadata.socketsPlacement.top ? '15px' : 0;
      let paddingRight = this.metadata.socketsPlacement.right ? '15px' : 0;
      let paddingBottom = this.metadata.socketsPlacement.bottom ? '15px' : 0;
      let paddingLeft = this.metadata.socketsPlacement.left ? '15px' : 0;

      return `transform: rotate(${this.rotate}deg); padding: ${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft};`;
    },
    boxStyle: function(){
      let width = 'width: ' + this.metadata.dimensions.width * (this.$parent.pedalBoard.zoom/100) + 'px;';
      let height = 'height: ' + this.metadata.dimensions.depth * (this.$parent.pedalBoard.zoom/100) + 'px;';

      let foregroundColor = 'color: ' + this.metadata.foregroundColor + ';';
      let backgroundColor = 'background-color: ' + this.metadata.backgroundColor + ';';

      return `${width} ${height} ${foregroundColor} ${backgroundColor}`;
    }
  },
  methods: {
    findAncestor: function (el, cls) {
      while ((el = el.parentElement) && !el.classList.contains(cls));
      return el;
    },
    dragInit: function (event) {
      if (event.target.classList.contains('sockets')) return;
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
  box-sizing: border-box;
}
</style>
