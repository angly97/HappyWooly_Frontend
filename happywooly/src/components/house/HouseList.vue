<template>
  <div id="search-result">
    <div id="map"></div>

    <v-data-table :headers="headers" :items="houses" :items-per-page="10">
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
import { mapState, mapActions } from "vuex";
import HouseDetail from "./HouseDetail.vue";

const houseStore = "houseStore";

export default {
  name: "HouseList",
  components: {
    HouseDetail,
  },
  data() {
    return {
      map: null,
      markers: [],
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
    };
  },
  computed: {
    ...mapState(houseStore, ["houses", "lat", "lng", "detailOn"]),
  },
  watch: {
    /* 지도 이동 & 마커 찍기 */
    lat: function () {
      // 이동된 지도 다시 출력
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(this.lat, this.lng, 16),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);

      // 마커 찍기
      // 현재 표시된 마커가 있다면 마커에 등록된 map을 없앰
      if (this.markers.length > 0) {
        this.markers.forEach((item) => {
          item.setMap(null);
        });
      }

      // 마커 표시
      this.houses.forEach((house) => {
        const marker = new kakao.maps.Marker({
          map: this.map,
          position: new kakao.maps.LatLng(house.lat, house.lng, 16),
          title: `${house.aptName}\n${house.recentAmount}만원\t${house.area}평`,
        });
        this.markers.push(marker);
      });
    },
  },
  created() {
    this.getDetailOn(false);
  },
  methods: {
    ...mapActions(houseStore, ["detailHouse", "getDetailOn"]),
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(this.lat, this.lng, 16),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);
    },
    showDetail(house) {
      this.getDetailOn(true);
      this.detailHouse(house);
    },
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}&libraries=services`;
      script.addEventListener("load", () => {
        kakao.maps.load(this.initMap);
      });

      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  },
};
</script>

<style>
#map {
  width: 50%;
  height: 520px;
}
#search-result {
  display: flex;
  justify-content: space-between;
}
</style>
