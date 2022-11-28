<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TheHeaderComp from "./components/common/TheHeaderComp.vue";

export default {
  components: { TheHeaderComp },
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style>
* {
  font-family: "EF_Diary", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
@font-face {
  font-family: "EF_Diary";
  src: url("assets/fonts/EF_Diary.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Cafe24Ssurround";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24Ssurround.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
#logo{
  text-align: center;
}
</style>
