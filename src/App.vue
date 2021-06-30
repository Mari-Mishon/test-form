<template>
  <TestForm />
</template>

<script>
import TestForm from "./components/TestForm.vue";

export default {
  name: "App",
  components: {
    TestForm,
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  background-color: #f1f1f1;
}

input:not([type=checkbox]){
  padding: 10px;
  width: 100%;
  font-size: 17px;
  font-family: Raleway;
  border: 1px solid #aaaaaa;
}

input.invalid {
  background-color: #ffdddd;
}

select {
    @extend %input_selector;
  }

label {
  text-align: left;
}


button {
  background-color: #4CAF50;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 17px;
  font-family: Raleway;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

#prevBtn {
  background-color: #bbbbbb;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
