<template>
  <div>
    <the-header-comp />
    <b-container class="bv-example-row mt-3 text-center">
      <b-row>
        <b-col class="aptName">
          {{ house.aptName }}
        </b-col>
      </b-row>
    </b-container>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState } from "vuex";
import TheHeaderComp from "../components/common/TheHeaderComp.vue";

const houseStore = "houseStore";

export default {
  components: { TheHeaderComp },
  name: "AppBoard",
  computed: {
    ...mapState(houseStore, ["house"]),
  },
};
</script>
<style scoped>
.aptName {
  padding: 3% 0 0 0;
  font-size: 25px;
  font-weight: 100;
  color: rgb(125, 125, 146);
}
</style>
