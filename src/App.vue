<template>
  <div>
    <ToDoContainer />
  </div>
</template>

<script>
import ToDoContainer from './components/ToDoContainer.vue';

export default {
  name: 'App',
  components: {
    ToDoContainer
}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}
#app {
  min-height: 100vh;
  width:100%;
  background: #FF6666;
  color:#fff;
  padding:2rem 1rem;
}
</style>
