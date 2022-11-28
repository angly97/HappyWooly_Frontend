<template>
  <div class="background" >
    <div id="logo">
      <div style="color:white; font-size: 20px; margin-top:250px;">아이를 즐겁게, 똑똑하게, 건강하게 키울 수 있는 우리집을 위해</div><br>
      <img src="../assets/logo.png" style="width: 50%; height:50%;" /><br>
      
      <v-btn
        rounded
        style="
          width: 10%;
          height: 50px; 
          font-size: 25px;  
          background-color: rgba( 255, 255, 255, 0.8 ); 
          color: #1B5E20
          display: inline-block;
          text-decoration:none; "
        v-if="!userInfo"
        :to="{ name : 'login'}"
      >
        시작하기
      </v-btn>
      <v-btn
        rounded
        style="
          width: 10%;
          height: 50px; 
          font-size: 25px;  
          background-color: rgba( 255, 255, 255, 0.8 ); 
          color: #1B5E20
          display: inline-block;
          text-decoration:none;"
        v-if="userInfo"
        :to="{ name : 'house'}"
      >
        시작하기
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(userStore, ["isLogin", "userInfo"]),
  },
}
</script>

<style scoped>
.background{
  height: 100vh;
  width: 100%;
  overflow: hidden;
  margin:0;
  background-image: url("../assets/homeBackgroundImg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  
};
#logo{
  height: 300px;
  width: 300px;
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%, -50%);
};

*{
  background-color:aliceblue;
}


</style>