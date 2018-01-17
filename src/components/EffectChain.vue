<template>
  <div>
    <div>
      <label>
        Show signal chain from effect:
        <select v-model="selectedFirstEffect">
          <option v-bind:value="{effectIndex: effectIndex, effect: selectedEffect}" v-for="(selectedEffect, effectIndex) in $parent.selectedEffects">
            {{ selectedEffect.manufacturer }} {{ selectedEffect.model }}
          </option>
        </select>
      </label>
    </div>

    <div v-if="Object.keys(effectChainFromFirstEffect).length">
      <div is="effect-chain-item" v-bind:effect-chain-item="effectChainFromFirstEffect" v-bind:socket="false" v-if="effectChainFromFirstEffect.connectionTo.length">
      </div>
    </div>
  </div>
</template>

<script>
import EffectChainItem from "./effect-chain/EffectChainItem.vue";


export default {
  name: 'EffectChain',
  components: {
    EffectChainItem
  },
  data () {
    return {
      effectsInSelectedChain: [],
      selectedFirstEffect: {},
    }
  },
  props: [],
  computed: {
    effectChainFromFirstEffect: function (){
      let effectChainFromFirstEffect = {};
      this.effectsInSelectedChain = [];
      if (Object.keys(this.selectedFirstEffect).length !== 0){
        effectChainFromFirstEffect = this.$parent.getEffectsConnectedToEffect(this.selectedFirstEffect.effectIndex);
      }
      return effectChainFromFirstEffect;
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">

</style>
