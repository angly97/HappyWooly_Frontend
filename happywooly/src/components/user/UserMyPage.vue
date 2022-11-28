<template>
  <div class="container">
    <v-card width="50%">
      <v-card-title class="font-weight-regular cyan lighten-4 white--text"> PROFILE </v-card-title>
      <v-card-text style="padding-top: 10px">
        <v-text-field
          v-model="userInfo.name"
          prepend-icon="mdi-rename-box"
          label="NAME"
          color="cyan lighten-4"
        ></v-text-field>
        <v-text-field
          v-model="userInfo.uid"
          prepend-icon="mdi-account"
          label="ID"
          color="cyan lighten-4"
          readonly
        ></v-text-field>
        <v-text-field
          v-model="userInfo.email"
          prepend-icon="mdi-email"
          label="EMAIL"
          color="cyan lighten-4"
        ></v-text-field>
        <b-row style="margin-left: 5px">
          <b-col cols="6" class="alignLeft">
            <v-btn
              class="myPageBtn"
              color="secondary"
              elevation="1"
              plain
              small
              x-small
              @click="update"
              >수정</v-btn
            >
            <v-btn
              class="myPageBtn"
              color="secondary"
              elevation="1"
              plain
              small
              x-small
              @click="del"
              >탈퇴</v-btn
            >
          </b-col>
          <b-col cols="6" class="alignRight">
            <v-btn
              color="secondary"
              class="myPageBtn"
              elevation="1"
              plain
              small
              x-small
              v-b-modal.modal-1
              @click="toMyAreas"
              ><v-icon dark x-small color="deep-orange lighten-1"> mdi-heart </v-icon> 관심지역
              목록</v-btn
            >
          </b-col>
        </b-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { UserMyArea } from "@/components/user/UserMyArea";

const userStore = "userStore";

export default {
  name: "UserMyPage",
  components: {
    UserMyArea,
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(userStore, ["userUpdate", "userDelete"]),
    async update() {
      await this.userUpdate(this.userInfo);
      alert("정보가 수정되었습니다");
    },
    async del() {
      if (confirm("회원탈퇴하시겠습니까")) {
        await this.userDelete(this.userInfo.uid);
        alert("탈퇴되었습니다");
      }
    },
    async toMyAreas() {
      await this.$router.push({ name: "myarea" });
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 15%;
  display: flex;
  justify-content: center;
  align-content: center;
}
.alignRight {
  display: flex;
  justify-content: flex-end;
}
.alignLeft {
  display: flex;
}
.myPageBtn {
  margin: 0 5px;
}
</style>
