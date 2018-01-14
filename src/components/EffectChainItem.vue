<template>
  <span>
    <span v-if="effectChainItem.connectedTo.length" v-for="effect in effectChainItem.connectedTo">
      {{ effectChainItem.manufacturer }} {{ effectChainItem.model }} ({{ effectChainItem.connectedFrom.name }})
      <span v-if="effect.connectedTo.length"> --> </span>
      <span v-if="effect.connectedTo.length" is="effect-chain-item" v-bind:effect-chain-item="effect">
      </span>
    </span>
  </span>
</template>

<script>
import EffectChainItem from "./EffectChainItem.vue";

export default {
  name: 'EffectChainItem',
  components: {
    EffectChainItem
  },
  data () {
    return {
    }
  },
  props: ['effectChainItem'],
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss">

</style>
