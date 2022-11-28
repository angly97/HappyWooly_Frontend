`<template>
  <b-modal id="modal-detail" ref="my-modal" size="lg" :title="house.aptName">
    
    <b-container class="bv-example-row">
      <div id="roadview" ref="roadview" class="roadview" style="width:100%;height:300px;"></div>
      <br>
      <b-row>
        <b-col cols="5">
          <b-alert show variant="warning">
            최근거래가 :
            {{
              (parseInt(house.recentAmount.replace(",", "")) * 10000) | price
            }}원</b-alert
          >
        </b-col>
        <b-col cols="7">
          <b-alert show variant="warning">
            주소 : {{ house.sidoName }} {{ house.gugunName }}
            {{ house.roadName }} {{ house.roadNameBonbun }}
            {{ house.roadNameBubun }}
          </b-alert>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <b-alert show variant="info"
            >전용면적(㎡) : {{ house.area }}
          </b-alert>
        </b-col>
        <b-col cols="4">
          <b-alert show variant="info">층수(층) : {{ house.floor }} </b-alert>
        </b-col>
        <b-col cols="4">
          <b-alert show variant="info"
            >건축년도(년) : {{ house.buildYear }}
          </b-alert>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="6" v-for="(i, j) in infras" :key="j">
          <b-alert show variant="success">
            {{ i.radius }}m 이내 {{ i.name }} : {{ i.cnt }}개
          </b-alert>
        </b-col>
      </b-row>
    </b-container>
    <template #modal-footer>
      <b-button
        pill
        variant="outline-info"
        class="float-right w-20"
        @click="showComment"
      >
        다양한 의견 보러가기
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapState, mapActions } from "vuex";

const houseStore = "houseStore";
const subconditionStore = "subconditionStore";
const KAKAO_API_KEY = process.env.VUE_APP_KAKAOMAP_KEY;

export default {
  name: "HouseDetail",
  computed: {
    ...mapState(houseStore, ["house"]),
    ...mapState(subconditionStore, ["infras", "subConditions"]),
  },
  watch:{
    house(nv){
      // 인프라 리스트 초기화
      this.clearInfraList();
      
      // 연령과 테마에 맞는 하위조건을 파라미터로 하여 해당 정보를 요청
      this.subConditions.forEach((subCondition) => {
        const condition = {
          y: nv.lat,
          x: nv.lng,
          radius: subCondition.radius,
          keyword: subCondition.name,
        };
        // 인프라 정보 요청
        this.getInfraList(condition);
        if (this.kakao && this.kakao.maps) {
          this.initMap();
        } else {
          this.addKakaoMapScript();
        }
      });
    },
  },
  created() {
    // 인프라 리스트 초기화
    this.clearInfraList();
    
    // 연령과 테마에 맞는 하위조건을 파라미터로 하여 해당 정보를 요청
    this.subConditions.forEach((subCondition) => {
      const condition = {
        y: this.house.lat,
        x: this.house.lng,
        radius: subCondition.radius,
        keyword: subCondition.name,
      };
      // 인프라 정보 요청
      this.getInfraList(condition);

      if (this.kakao && this.kakao.maps) {
          this.initMap();
        } else {
          this.addKakaoMapScript();
        }
    });
  },
  methods: {
    ...mapActions(subconditionStore, ["clearInfraList", "getInfraList"]),
    showComment() {
      this.$bvModal.hide("modal-detail");
      this.$router.push({ name: "board" });
    },
    addKakaoMapScript() {
      console.log("addKakaoMapScript called.");
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${KAKAO_API_KEY}&libraries=services`;
      document.head.appendChild(script);
    },
    initMap() {
      console.log("initMap called.");
    
      console.log(this.house);
      let roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
      console.log("11111111111")
      console.log(roadviewContainer);
      let roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
      let roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

      let position = new kakao.maps.LatLng(this.house.lat, this.house.lng);

      // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
      roadviewClient.getNearestPanoId(position, 50, function (panoId) {
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
      });
    },
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
  mounted() {
  },
};
</script>

<style></style>
`