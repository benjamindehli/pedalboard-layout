<template>
  <div>
    <label>
      {{ socket.name }}
      <select v-on:change="changeConnection($event.target.value)" v-bind:value="socketValue">
        <option v-bind:disabled="isDisabled(socket.value)" v-bind:value="socket.value" v-for="socket in availableConnectionOptions">{{ socket.name }}</option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: 'socket',
  data () {
    return {
    }
  },
  props: ['socket', 'socketIndex'],
  computed: {
    availableConnectionOptions: function () {
      let availableConnectionOptions = [{name: "Unplugged", value: ""}];
      this.$parent.$parent.selectedEffects.forEach(function (effect, effectIndex){
        effect.sockets.forEach(function (socket, socketIndex){
          if (effectIndex !== this.$parent.effectIndex || socketIndex !== this.socketIndex){
            availableConnectionOptions.push({
              name: effect.manufacturer + ' ' + effect.model + ' - ' + socket.name,
              value: effectIndex + '-' + socketIndex
            });
          }
        }.bind(this));
      }.bind(this));
      return availableConnectionOptions;
    },
    socketValue: function () {
      let socketValue = "";
      let socketId = this.$parent.effectIndex + '-' + this.socketIndex;
      this.$parent.$parent.connections.forEach(function (connection){
        if (connection.connectionFrom == socketId){
          socketValue = connection.connectionTo;
        }
      });
      return socketValue;
    }
  },
  methods: {
    changeConnection: function (connectionTo) {
      this.$parent.$parent.changeConnection(this.$parent.effectIndex + '-' + this.socketIndex, connectionTo);
    },
    isDisabled: function (connectionTo){
      let isDisabled = false;
      this.$parent.$parent.connections.forEach(function (connection){
        if (connection.connectionFrom == connectionTo || connection.connectionTo == connectionTo){
          isDisabled = true;
          return;
        }
      });
      return isDisabled;
    }
  }
}
</script>

<style lang="scss">

</style>
