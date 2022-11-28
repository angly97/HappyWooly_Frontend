<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col cols="2"></b-col>
      <b-col cols="8">
        <div class="text-right ma-2">
          <v-btn rounded color="cyan lighten-4" dark @click="moveWrite()">글쓰기</v-btn>
        </div>
        <b-table :items="articles" :fields="fields" @row-clicked="viewArticle">
          <template #cell(subject)="data">
            <router-link :to="{ name: 'boardview', params: { articleno: data.item.articleno } }">
              {{ data.item.subject }}
            </router-link>
          </template>
        </b-table>
      </b-col>
      <b-col cols="2"></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { listArticle } from "@/api/board";
import { mapState } from "vuex";

const houseStore = "houseStore";
export default {
  name: "BoardList",
  data() {
    return {
      articles: [],
      fields: [
        { key: "articleno", label: "no.", tdClass: "tdClass" },
        { key: "subject", label: "title", tdClass: "tdSubject" },
        { key: "uid", label: "author", tdClass: "tdClass" },
        { key: "regtime", label: "time", tdClass: "tdClass" },
        { key: "hit", label: "view", tdClass: "tdClass" },
      ],
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
      aptCode: this.house.aptCode,
    };
    listArticle(
      param,
      ({ data }) => {
        this.articles = data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  computed: {
    ...mapState(houseStore, ["house"]),
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardwrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "boardview",
        params: { articleno: article.articleno },
      });
    },
  },
};
</script>

<style scoped>
.v-application a {
  color: #414141;
}
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>
