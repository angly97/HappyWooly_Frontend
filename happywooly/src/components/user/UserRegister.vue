<template>
  <div>
    <div class="login">
      <div class="form">
        <h2>회원가입</h2>
        <b-alert show variant="danger" v-if="isLoginError"
          >아이디 또는 비밀번호를 확인하세요.</b-alert
        >
        <div class="form-field">
          <label for="login-mail"><i class="fa fa-user"></i></label>
          <input
            id="uid"
            type="text"
            name="id"
            placeholder="ID"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required
            v-model="uid"
          />
          <svg>
            <use href="#svg-check" />
          </svg>
        </div>
        <div class="form-field">
          <label for="login-password"><i class="fa fa-lock"></i></label>
          <input
            id="login-password"
            type="password"
            name="password"
            placeholder="Password"
            pattern=".{6,}"
            required
            v-model="pw"
          />
          <svg>
            <use href="#svg-check" />
          </svg>
        </div>
        <div class="form-field">
          <label for="login-name"><i class="fa fa-lock"></i></label>
          <input
            id="login-name"
            type="text"
            name="name"
            placeholder="Name"
            required
            v-model="name"
          />
          <svg>
            <use href="#svg-check" />
          </svg>
        </div>
        <div class="form-field">
          <label for="login-email"><i class="fa fa-lock"></i></label>
          <input
            id="login-email"
            type="text"
            name="email"
            placeholder="Email"
            required
            v-model="email"
          />
          <svg>
            <use href="#svg-check" />
          </svg>
        </div>
        <button type="submit" class="button" @click="regist">
          <div class="arrow-wrapper">
            <span class="arrow"></span>
          </div>
          <p class="button-text">SIGN UP</p>
        </button>
      </div>
      <div class="finished">
        <svg>
          <use href="#svg-check" />
        </svg>
      </div>
    </div>

    <!-- //--- ## SVG SYMBOLS ############# -->
    <svg style="display: none">
      <symbol id="svg-check" viewBox="0 0 130.2 130.2">
        <polyline points="100.2,40.2 51.5,88.8 29.8,67.5 " />
      </symbol>
    </svg>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

const userStore = "userStore";
const today = new Date();

export default {
  name: "UserRegister",
  data() {
    return {
      uid: null,
      pw: null,
      name: null,
      email: null,
      token: "",
      createdTime: today.toISOString().replace("T", " ").substring(0, 19),
    };
  },
  created() {
    this.SET_IS_LOGIN_ERROR(false);
  },
  computed: {
    ...mapState(userStore, ["isLoginError"]),
  },
  methods: {
    ...mapActions(userStore, ["userRegist"]),
    ...mapMutations(userStore, ["SET_IS_LOGIN_ERROR"]),
    async regist() {
      if (!this.uid || !this.pw || !this.name || !this.email) {
        alert("모든 내용을 입력해주세요");
        return;
      }

      let user = {
        uid: this.uid,
        pw: this.pw,
        name: this.name,
        email: this.email,
        token: this.token,
        createdTime: this.createdTime,
      };

      await this.userRegist(user);
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Roboto:400,300);
$primary: #b2ebf2;
$secondary: #b2ebf2;
$lighter: #9596a2;
$light: #3d4256;
$dark: #1e2137;
$bg1: #333342;
$bg2: #4d4e63;
$border-radius: 12px;

body {
  background: linear-gradient(135deg, $bg2, $bg1);
  height: 100vh;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
}

//--- ## FORM #############
.login {
  width: 420px;
  background: #ffffff;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  border-radius: $border-radius;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &:before {
    content: "";
    position: absolute;
    background: transparent;
    bottom: 45px;
    right: 40px;
    width: 55px;
    height: 55px;
    z-index: 5;
    transition: all 0.6s ease-in-out, background 0s ease;
  }
  .form {
    display: block;
    position: relative;
    h2 {
      background: #f5f5fa;
      display: block;
      box-sizing: border-box;
      width: 100%;
      margin: 0 0 30px 0;
      padding: 40px;
      font-weight: 200;
      color: $lighter;
      font-size: 19px;
    }
    .form-field {
      display: flex;
      align-items: center;
      height: 55px;
      margin: 0 40px 30px 40px;
      border-bottom: 1px solid $lighter;
      label {
        width: 10px;
        padding: 0 15px 0 0;
        color: $lighter;
      }
      input {
        width: 100%;
        background: transparent;
        color: $lighter;
        padding: 15px;
        border: 0;
        margin: 0;
        & + svg {
          width: 35px;
          width: 35px;
          fill: none;
          stroke: $primary;
          stroke-width: 7;
          stroke-linecap: round;
          stroke-dasharray: 1000;
          stroke-dashoffset: -100;
          transition: all 0.3s ease-in-out;
        }
        &:valid + svg {
          stroke-dashoffset: 0;
        }
        &:focus {
          outline: none;
        }
      }
      *::placeholder {
        color: $lighter;
      }
    }
    .button {
      width: 100%;
      position: relative;
      cursor: pointer;
      box-sizing: border-box;
      padding: 0 40px 45px 40px;
      margin: 0;
      border: 0;
      background: transparent;
      outline: none;
      .arrow-wrapper {
        transition: all 0.45s ease-in-out;
        position: relative;
        margin: 0;
        width: 100%;
        height: 55px;
        right: 0;
        float: right;
        background: linear-gradient(90deg, $secondary, $primary);
        box-shadow: 0 3px 20px rgba($primary, 0.4);
        border-radius: $border-radius;
        .arrow {
          position: absolute;
          top: 50%;
          margin: auto;
          transition: all 0.45s ease-in-out;
          right: 35px;
          width: 15px;
          height: 2px;
          background: none;
          transform: translateY(-50%);
          &:before {
            position: absolute;
            content: "";
            top: -4px;
            right: 0;
            width: 8px;
            height: 8px;
            border-top: 2px solid #fff;
            border-right: 2px solid #fff;
            transform: rotate(45deg);
          }
        }
      }
      .button-text {
        transition: all 0.45s ease-in-out;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding: 0;
        margin: 0;
        color: #fff;
        line-height: 55px;
        text-align: center;
        text-transform: uppercase;
      }
    }
  }
  .finished {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 7;
    svg {
      width: 100px;
      width: 100px;
      fill: none;
      stroke: #fff;
      stroke-width: 7;
      stroke-linecap: round;
      stroke-dasharray: 1000;
      stroke-dashoffset: -100;
      transition: all 0.3s ease-in-out 0.5s;
    }
  }
  &.loading {
    .form {
      .button {
        .arrow-wrapper {
          width: 55px;
          animation: sk-rotateplane 1.2s infinite ease-in-out 0.5s;
          .arrow {
            background: #fff;
            transform: translate(15px, 0);
            opacity: 0;
            transition: opacity 0.3s ease-in-out 0.5s;
          }
        }
        .button-text {
          color: $lighter;
        }
      }
    }
  }
  &.active {
    &:before {
      bottom: 0;
      right: 0;
      background: linear-gradient(90deg, $secondary, $primary);
      border-radius: $border-radius;
      height: 100%;
      width: 100%;
    }
    .form {
      .button {
        .arrow-wrapper {
          animation-iteration-count: 1;
        }
      }
    }
    .finished {
      svg {
        stroke-dashoffset: 0;
      }
    }
  }
}

@-webkit-keyframes sk-rotateplane {
  0% {
    transform: perspective(120px);
  }
  50% {
    transform: perspective(120px) rotateY(180deg);
  }
  100% {
    transform: perspective(120px) rotateY(180deg) rotateX(180deg);
  }
}
</style>
