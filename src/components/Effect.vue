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
  <div v-show="$parent.showConnections" v-for="socket in sockets">
    <label>
      {{ socket.name }}
      <select v-model="socket.value">
        <optgroup v-bind:label="availableConnection.manufacturer + ' ' + availableConnection.model" v-for="availableConnection in $parent.availableConnections">
          <option v-bind:value="{
            manufacturer: availableConnection.manufacturer, 
            model: availableConnection.model, 
            socket: socket
          }" v-for="socket in availableConnection.sockets">{{ socket.name }}</option>
        </optgroup>
      </select>
    </label>
  </div>

</div>
</div>
</template>

<script>
export default {
  name: 'effect',
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
  props: ['metadata', 'effectIndex', 'manufacturerIndex'],
  mounted: function () {
    this.$parent.availableConnections = this.$parent.getAvailableConnections();
    this.metadata.sockets.forEach(function(socket){
      this.sockets.push({
        name: socket.name,
        value: {}
      });
    }.bind(this));
  },
  watch: {
    sockets: {
      handler: function(sockets) {
        sockets.forEach(function(socket, socketIndex){
          let connectionFrom = {
            manufacturer: this.metadata.manufacturer,
            model: this.metadata.model,
            socket: {
              binding: {
                effectIndex: this.effectIndex,
                manufacturerIndex: this.manufacturerIndex,
                socketIndex: socketIndex
              },
              name: socket.name
            }
          };
          let connectionTo = {
            manufacturer: socket.value.manufacturer,
            model: socket.value.model,
            socket: socket.value.socket
          };
          if (connectionTo.socket){
            this.$parent.changeConnection(connectionFrom, connectionTo);
          }
        }.bind(this));
        
      },
      deep: true
    } 
  },
  computed: {
    socketsStyle: function(){
      let paddingTop = this.metadata.socketsPlacement.top ? '15px' : 0;
      let paddingRight = this.metadata.socketsPlacement.right ? '15px' : 0;
      let paddingBottom = this.metadata.socketsPlacement.bottom ? '15px' : 0;
      let paddingLeft = this.metadata.socketsPlacement.left ? '15px' : 0;

      return `transform: rotate(${this.rotate}deg); padding: ${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft};`;
    },
    boxStyle: function(){
      let width = 'width: ' + this.metadata.dimensions.width + 'px;';
      let height = 'height: ' + this.metadata.dimensions.height + 'px;';

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
}
</style>
