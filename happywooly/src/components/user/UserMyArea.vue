<template>
  <div class="Mycontainer">
    <v-card style="width: 700px">
      <v-card-title class="font-weight-regular cyan lighten-4 white--text">
        나의 관심지역
      </v-card-title>
      <v-card-text style="padding-top: 20px">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">시/도</th>
                <th class="text-center">구/군</th>
                <th class="text-center">동</th>
                <th class="text-center">연령대</th>
                <th class="text-center">양육테마</th>
                <th class="text-center"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in areas" :key="item.mid">
                <td>{{ item.sidoName }}</td>
                <td>{{ item.gugunName }}</td>
                <td>{{ item.dongName }}</td>
                <td>{{ item.age }}</td>
                <td>{{ item.theme }}</td>
                <td class="center">
                  <v-btn
                    class="myPageBtn"
                    color="secondary"
                    elevation="1"
                    plain
                    small
                    x-small
                    @click="searchApt(item)"
                    >검색</v-btn
                  >
                  <v-btn
                    class="myPageBtn"
                    color="secondary"
                    elevation="1"
                    plain
                    small
                    x-small
                    @click="deleteArea(item.mid)"
                    >삭제</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <v-data-table :headers="headers" :items="houses" :items-per-page="10" style="width: 600px">
      <template v-slot:item="{ item }">
        <tr v-b-modal.modal-detail @click="showDetail(item)">
          <td>{{ item.aptName }}</td>
          <td>{{ item.recentAmount }}</td>
          <td>{{ item.floor }}</td>
          <td>{{ item.area }}</td>
          <td>{{ item.buildYear }}</td>
        </tr>
      </template>
    </v-data-table>

    <!--detail 모달 컴포넌트 -->
    <house-detail v-if="detailOn"></house-detail>
  </div>
</template>

<script>
import HouseDetail from "@/components/house/HouseDetail.vue";
import { mapState, mapActions, mapMutations } from "vuex";

const userStore = "userStore";
const myareaStore = "myareaStore";
const houseStore = "houseStore";
const subconditionStore = "subconditionStore";

export default {
  components: { HouseDetail },
  name: "UserMyArea",
  data() {
    return {
      headers: [
        {
          text: "아파트명",
          align: "start",
          sortable: false,
          value: "aptName",
        },
        { text: "최근거래가(만원)", value: "recentAmount" },
        { text: "층수(층)", value: "floor" },
        { text: "전용면적(㎡)", value: "area" },
        { text: "건축년도(년)", value: "buildYear" },
      ],
      detailOn: false,
    };
  },
  created() {
    this.CLEAR_APT_LIST();
    this.areaList(this.userInfo.uid);
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
    ...mapState(myareaStore, ["areas"]),
    ...mapState(houseStore, ["houses"]),
  },
  methods: {
    ...mapActions(houseStore, ["getHouseList", "detailHouse"]),
    ...mapActions(myareaStore, ["areaList", "areaDelete"]),
    ...mapActions(subconditionStore, ["getSubConditionList"]),
    ...mapMutations(subconditionStore, ["CLEAR_INFRA_LIST"]),
    ...mapMutations(houseStore, ["CLEAR_APT_LIST"]),
    async deleteArea(mid) {
      await this.areaDelete(mid);
      this.CLEAR_APT_LIST();
      this.$router.go(this.$router.currentRoute);
    },
    searchApt(house) {
      this.CLEAR_INFRA_LIST();
      this.getHouseList(house.dongCode);
      this.getSubConditionList({ age: house.age, theme: house.theme });
    },
    showDetail(house) {
      this.detailOn = true;
      this.detailHouse(house);
    },
  },
};
</script>

<style scoped>
.Mycontainer {
  width: 1500px;
  margin-left: -100px;
  margin-top: 8%;
  display: flex;
  align-content: center;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
