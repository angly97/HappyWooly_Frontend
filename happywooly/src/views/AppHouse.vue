<template>
  <div>
  <the-header-comp />
  <b-container class="bv-example-row mt-3 text-center">
    <b-row>
      <b-col>
        <house-search-bar></house-search-bar>
      </b-col>
    </b-row>
    <b-row>
      <b-col align="left">
        <house-list></house-list>
      </b-col>
    </b-row>
  </b-container>
  </div>
</template>
<script>
import HouseSearchBar from "@/components/house/HouseSearchBar.vue";
import HouseList from "@/components/house/HouseList.vue";
import TheHeaderComp from "../components/common/TheHeaderComp.vue";
import { mapState } from "vuex";
const houseStore = "houseStore";

export default {
  name: "AppHouse",
  components: {
    HouseSearchBar,
    HouseList,
    TheHeaderComp
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
  },
};
</script>
<style scoped></style>
