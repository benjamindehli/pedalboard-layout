<script>
import AddEffectTemplate from "./AddEffectTemplate.quark";

export default {
  name: 'AddEffect',
  data () {
    return {
      selectedEffectId: {}
    }
  },
  template: AddEffectTemplate,
  computed: {
    effectsOptionList: function () {
      let effectsOptionList = [];
      this.$parent.$parent.availableEffects.manufacturers.forEach(function (manufacturer, manufacturerIndex){
        manufacturer.effects.forEach(function (effect, effectIndex){
          effectsOptionList.push({
            name: effect.manufacturer + ' ' + effect.model,
            value: manufacturerIndex + '-' + effectIndex
          });
        });
      });
      return effectsOptionList;
    }
  },
  methods: {
    getEffectById: function (){
      let indexes = this.selectedEffectId.split("-");
      let manufacturerIndex = indexes[0];
      let effectIndex = indexes[1];
      let selectedEffect = this.$parent.$parent.availableEffects.manufacturers[manufacturerIndex].effects[effectIndex];
      this.$parent.$parent.selectedEffects.push(selectedEffect);
    }
  }
}
</script>

<style lang="scss">
.modal{
  color: #333435;
}
</style>
