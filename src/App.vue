<template>
  <div id="app">
    <div>
      <div is="box" v-bind:metadata="box" v-for="box in boxes"></div>
    </div>

  </div>
</template>

<script>
import Box from "./components/Box.vue";
export default {
  name: 'app',
  data () {
    return {
      boxes: [
      {
        manufacturer: 'Boss',
        model: 'CE-1', 
        dimensions: {width: 260, height: 180}
      },
      {
        manufacturer: 'Roger Mayer',
        model: 'Voodoo-Vibe+', 
        dimensions: {width: 220, height: 150}
      }
      ]
    }
  },
  components: {
    Box
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
*{
  box-sizing: content-box;
}

body{
  font-family: Verdana, Arial, sans-serif;
}
</style>
