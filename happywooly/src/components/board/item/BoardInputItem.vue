<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            ref="subject"
            v-model="article.subject"
            label="TITLE"
            required
          ></v-text-field>
          <v-col cols="12" sm="12">
            <v-textarea
              ref="content"
              v-model="article.content"
              label="CONTENT"
              auto-grow
              outlined
              rows="11"
              row-height="25"
              shaped
              required
            ></v-textarea>
          </v-col>
        </v-card-text>
        <v-divider class="mt-1"></v-divider>
        <v-card-actions>
          <v-btn text @click="moveList"> 취소 </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="submit" v-if="this.type === 'register'"> 등록 </v-btn>
          <v-btn color="primary" text @click="modifyArticle" v-else> 수정 </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { writeArticle, modifyArticle, getArticle } from "@/api/board";
import { mapState } from "vuex";

const userStore = "userStore";
const houseStore = "houseStore";

export default {
  name: "BoardInputItem",
  data() {
    return {
      article: {
        articleno: 0,
        subject: "",
        content: "",
      },
      isUid: false,
      errorMessages: "",
      formHasErrors: false,
    };
  },
  props: {
    type: { type: String },
  },
  watch: {
    name() {
      this.errorMessages = "";
    },
  },
  created() {
    if (this.type === "modify") {
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
      this.isUid = true;
    }
  },
  computed: {
    ...mapState(houseStore, ["house"]),
    ...mapState(userStore, ["userInfo"]),
    form() {
      return {
        subject: this.article.subject,
        content: this.article.content,
      };
    },
  },
  methods: {
    submit() {
      if (this.article.subject == "" || this.article.content == "") {
        alert("내용을 모두 입력해주세요");
      } else {
        let param = {
          uid: this.userInfo.uid,
          aptCode: this.house.aptCode,
          subject: this.article.subject,
          content: this.article.content,
        };
        writeArticle(
          param,
          ({ data }) => {
            let msg = "등록 처리시 문제가 발생했습니다.";
            if (data === "success") {
              msg = "등록이 완료되었습니다.";
            }
            alert(msg);
            this.moveList();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    modifyArticle() {
      let param = {
        articleno: this.article.articleno,
        uid: this.userInfo.uid,
        subject: this.article.subject,
        content: this.article.content,
      };
      modifyArticle(
        param,
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
  },
};
</script>

<style></style>
