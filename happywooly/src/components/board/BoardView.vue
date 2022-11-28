<template>
  <b-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card ref="form">
          <v-card-text>
            <v-card-title>{{ article.subject }}</v-card-title>
            <v-divider></v-divider>
            <v-sheet
              cols="12"
              class="ml-5 pa-5"
              ref="content"
              :rounded="rounded"
              auto-grow
              outlined
              height="300"
              width="500"
              >{{ article.content }}
            </v-sheet>
          </v-card-text>
          <v-divider class="mt-1"></v-divider>
          <v-card-actions>
            <v-btn text @click="moveList"> 취소 </v-btn>
            <v-spacer></v-spacer>
            <div v-if="userInfo.uid === article.uid">
              <v-btn color="primary" text @click="moveModifyArticle"> 편집 </v-btn>
              <v-btn color="primary" text @click="deleteArticle"> 삭제 </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" @click="moveList">목록</b-button>
      </b-col>
      <b-col class="text-right" v-if="userInfo.uid === article.uid">
        <b-button variant="outline-info" size="sm" @click="moveModifyArticle" class="mr-2">글수정</b-button>
        <b-button variant="outline-danger" size="sm" @click="deleteArticle">글삭제</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${article.articleno}.
          ${article.subject} [${article.hit}]</h3><div><h6>${article.uid}</div><div>${article.regtime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container> -->
  </b-container>
</template>

<script>
import { getArticle } from "@/api/board";
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "BoardDetail",
  data() {
    return {
      article: {},
    };
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
    message() {
      if (this.article.content) return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    let param = this.$route.params.articleno;
    getArticle(
      param,
      ({ data }) => {
        this.article = data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    moveModifyArticle() {
      this.$router.replace({
        name: "boardmodify",
        params: { articleno: this.article.articleno },
      });
    },
    deleteArticle() {
      if (confirm("정말로 삭제하시겠습니까")) {
        this.$router.replace({
          name: "boarddelete",
          params: { articleno: this.article.articleno },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
  },
};
</script>

<style></style>
