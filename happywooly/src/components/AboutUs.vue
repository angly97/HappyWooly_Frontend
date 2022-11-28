<template>
  <div>
    <the-header-comp />
    <div class="curContainer">
      <div style="width: 40%">
        <img src="@/assets/images/eco-house.png" style="width: 70px; height: 70px" alt="" />
        <v-card height="90%">
          <v-card-text>
            <div>FOR YOUR CHILDREN.</div>
            <h2 class="mt-8 mb-8">해피우리란,</h2>
            <p>
              `행복`을 뜻하는 해피와 `울타리`를 의미하는 우리를 합친 말로,<br />
              아이들이 행복하게 자라날 수 있는 집을 의미합니다.
            </p>
            <div class="text--primary">
              원하는 지역의 아파트 매매 정보를 제공하고,<br />
              이에 더하여 자녀의 연령대 그리고 자녀를 어떻게 키우고 싶은지와 같은 테마 또한 설정할
              수 있습니다.<br />
              설정한 연령대와 테마에 따라 조회할 수 있는 아파트 주변 인프라 정보도 달라집니다.<br />
            </div>
            <br />
            <div class="text--primary">
              저희의 서비스를 통해 소중한 자녀에게 가장 완벽한 집을 선택하실 수 있습니다.<br />
            </div>
            <br />
            <hr />
            <b-row style="font-size: 12px">
              <b-col cols="2">ADDRESSS</b-col
              ><b-col cols="10">서울 강남구 테헤란로 212 5층 501호</b-col>
              <b-col cols="2">EMAIL</b-col><b-col cols="5">angly97@naver.com</b-col
              ><b-col cols="5">tmdgml1754@naver.com</b-col> <b-col cols="2">GitHub</b-col
              ><b-col cols="5">https://github.com/angly97</b-col
              ><b-col cols="5">https://github.com/tmdgml1754</b-col>
            </b-row>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeaderComp from "../components/common/TheHeaderComp.vue";
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "AboutUs",
  components: {
    TheHeaderComp,
  },
  data() {
    return {
      reveal: false,
    };
  },
  computed: {
    ...mapState(userStore, ["isLogin", "userInfo"]),
  },
};
</script>

<style scoped>
.curContainer {
  display: flex;
  justify-content: space-around;
  margin-top: 5%;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
pre {
  font-family: "EF_Diary";
}
</style>
