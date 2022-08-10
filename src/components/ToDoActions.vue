<template>
  <button>
    <img :src="require('../assets/' + image)" alt="">
  </button>
</template>

<script>
export default {
    props:{
        image:{
            type:String
        }
    }
}
</script>

<style scoped>
button{
    background: transparent;
    border: none;
}

button > img{
    max-width:20px;
}
</style>