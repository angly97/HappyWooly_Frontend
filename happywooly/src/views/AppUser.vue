<template>
  <div class="userback">
    <the-header-comp />
    <b-container class="bv-example-row mt-3 text-center">
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import TheHeaderComp from "../components/common/TheHeaderComp.vue";
export default {
  components: { TheHeaderComp },
  name: "AppUser",
};
</script>

<style scoped>
.underline-steelblue {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(72, 190, 233, 0.3) 30%);
}
</style>
