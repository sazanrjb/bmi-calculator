<template>
  <div id="app" class="container">
    <bmi-calculator></bmi-calculator>
  </div>
</template>

<script>
import BmiCalculator from './components/BmiCalculator.vue'
import 'bulma/css/bulma.css'

export default {
  name: 'app',
  components: {
    BmiCalculator,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
