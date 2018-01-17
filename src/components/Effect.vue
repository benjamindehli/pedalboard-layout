<template>
  <div 
  
  v-on:mousedown="dragInit($event)"
  v-bind:style="socketsStyle"
  class="sockets">
  <div 
  v-bind:style="boxStyle" 
  class="box">
  <div class="noselect">
    <span class="manufacturer-name">{{metadata.manufacturer}}</span>
    <span class="model-name">{{metadata.model}}</span>
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
      rotate: 0,
      sockets: []
    }
  },
  props: ['metadata', 'effectIndex'],
  computed: {
    socketsStyle: function(){
      let paddingTop = this.metadata.socketsPlacement.back ? '15px' : 0;
      let paddingRight = this.metadata.socketsPlacement.right ? '15px' : 0;
      let paddingBottom = this.metadata.socketsPlacement.front ? '15px' : 0;
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
    
    dragInit: function (event) {
      if (event.target.classList.contains('sockets')) return;
      let element = this.$parent.findAncestor(event.target, 'sockets');
      element.style.zIndex = 5;

      let x_pos = document.all ? window.event.clientX : event.pageX;
      let y_pos = document.all ? window.event.clientY : event.pageY;

      this.$parent.selected = element;
      this.$parent.selectedPosition.x_elem = x_pos - this.$parent.selected.offsetLeft;
      this.$parent.selectedPosition.y_elem = y_pos - this.$parent.selected.offsetTop;
    },
    
    
  }
}
</script>

<style lang="scss">
@import "./src/style/abstracts/all";
.sockets{
  position:absolute;
  background-color: rgba(100,110,200,.3);
}
.box {
  background-color:#678;
  color:white;
  border: 1px solid rgba(0, 0, 0, .07);
  padding:6px;
  cursor:move;
  box-sizing: border-box;
    @include transition(box-shadow .4s cubic-bezier(.25, .8, .25, 1), filter .4s cubic-bezier(.25, .8, .25, 1));
    
  &:active{
   @include raised(3);
  }
  &:hover{
    filter: brightness(110%);
  }
  .manufacturer-name{
    font-size: 12px;
    display: block;
  }
  .model-name{
    font-size: 14px;
    display: block;
  }
}
</style>
