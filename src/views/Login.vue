<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link :to="{ name: 'reg' }">注册</router-link>
          </li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <form method="post">
                <!-- 用户名 -->
                <div class="layui-form-item">
                  <label for="L_email" class="layui-form-label">用户名</label>
                  <validation-provider name="username" rules="required|email" v-slot="{ errors }">
                    <div class="layui-input-inline">
                      <input
                        v-model="username"
                        type="text"
                        name="username"
                        placeholder="请输入用户名"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class="error layui-form-mid">{{ errors[0] }}</div>
                  </validation-provider>
                </div>
                <!-- 密码 -->
                <div class="layui-form-item">
                  <label for="L_pass" class="layui-form-label">密码</label>
                  <validation-provider name="password" rules="required|min:6" v-slot="{ errors }">
                    <div class="layui-input-inline">
                      <input
                        v-model="password"
                        type="password"
                        name="password"
                        placeholder="请输入密码"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class="error layui-form-mid">{{ errors[0] }}</div>
                  </validation-provider>
                </div>
                <!-- 验证码 -->
                <div class="layui-form-item">
                  <label for="L_vercode" class="layui-form-label">验证码</label>
                  <validation-provider name="code" rules="required|length: 5" v-slot="{ errors }">
                    <div class="layui-input-inline">
                      <input
                        v-model="code"
                        type="text"
                        name="vercode"
                        placeholder="请输入验证码"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class="error layui-form-mid">{{ errors[0] }}</div>
                  </validation-provider>
                  <div class="layui-form-mid svg" v-html="svg" @click="changeSvg"></div>
                </div>
                <!-- 登陆按钮 -->
                <div class="layui-form-item">
                  <button class="layui-btn">立即登录</button>
                  <span style="padding-left:20px;">
                    <router-link :to="{ name: 'forget' }">忘记密码？</router-link>
                  </span>
                </div>
                <div class="layui-form-item fly-form-app">
                  <span>或者使用社交账号登入</span>
                  <a
                    href="/app/qq"
                    onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-qq"
                    title="QQ登入"
                  ></a>
                  <a
                    href="/app/weibo/"
                    onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-weibo"
                    title="微博登入"
                  ></a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios';
import { getCode } from '../api/login';
import { ValidationProvider } from 'vee-validate';
import uuid from 'uuid/dist/v4';
// import * as rules from 'vee-validate/dist/rules';
// import zh from 'vee-validate/dist/locale/zh_CN';

// for (const rule in rules) {
//   extend(rule, {
//     ...rules[rule],
//     message: zh.messages[rule]
//   });
// }
export default {
  data() {
    return {
      username: '',
      password: '',
      code: '',
      svg: ''
    };
  },
  components: {
    ValidationProvider
  },
  mounted() {
    let sid = '';
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid');
    } else {
      sid = uuid();
      localStorage.setItem('sid', sid);
    }
    this.$store.commit('setSid', sid);
    console.log(sid);
    this.changeSvg(sid);
  },
  methods: {
    changeSvg() {
      const sid = this.$store.state.sid;
      getCode(sid).then(res => {
        this.svg = res.data;
      });
    }
  }
};
</script>
<style lang="scss">
.svg {
  position: relative;
  top: -16px;
}
.error {
  color: red;
}
</style>
