<template>
  <div v-if="effectChainItem" class="effectChainItem">
    <span>
      - {{ effectChainItem.manufacturer }} {{ effectChainItem.model }} 
      <span v-if="effectChainItem.connectionFrom !== null">({{ effectChainItem.connectionFrom.name }})</span> 
      <span class="badge">effect</span>
    </span>
    <br />
    <div class="connections">
      <div class="effectChainConnection" v-if="effectChainItem.connectionTo.length" v-for="connection in effectChainItem.connectionTo">
        <span>- {{ connection.socket.name }}: <span class="badge">socket</span></span>
        <div is="effect-chain-item" v-bind:effect-chain-item="connection.connectedEffect"></div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'EffectChainItem',
  data () {
    return {
    }
  },
  props: ['effectChainItem', 'socket'],
}
</script>

<style lang="scss">
.effectChainItem{
  margin-left: 7.5px;
  border: 1px solid #bcd;
  padding: 0 0 15px 7.5px;
  line-height: 24px;
}
.effectChainConnection{
  padding-left: 15px;
}
.connections{
  padding-left: 15px;

}
.badge{
  background-color: #ddd;
  font-size: 12px;
  border-radius: 4px;
  padding: 2px 6px;
  vertical-align: middle;
}
</style>
