<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{ name: 'login' }">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <form method="post">
                <div class="layui-form-item">
                  <label for="L_email" class="layui-form-label">用户名</label>
                  <ValidationProvider name="用户名" rules="required|email" v-slot="{ errors }">
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
                    <div class="layui-form-mid layui-word-aux">将会成为您唯一的登入名</div>
                  </ValidationProvider>
                </div>
                <div class="layui-form-item">
                  <label for="L_username" class="layui-form-label">昵称</label>
                  <ValidationProvider name="昵称" rules="required" v-slot="{ errors }">
                    <div class="layui-input-inline">
                      <input
                        v-model="name"
                        type="text"
                        name="name"
                        placeholder="请输入昵称"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class="error layui-form-mid">{{ errors[0] }}</div>
                  </ValidationProvider>
                </div>
                <div class="layui-form-item">
                  <label for="L_pass" class="layui-form-label">密码</label>
                  <ValidationProvider name="密码" rules="required|min:6" v-slot="{ errors }">
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
                    <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                  </ValidationProvider>
                </div>
                <div class="layui-form-item">
                  <label for="L_repass" class="layui-form-label">确认密码</label>
                  <div class="layui-input-inline">
                    <input
                      type="password"
                      name="repass"
                      placeholder="请确认密码"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="L_vercode" class="layui-form-label">验证码</label>
                  <ValidationProvider name="验证码" rules="required|length: 5" v-slot="{ errors }">
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
                  </ValidationProvider>
                  <div class="layui-form-mid svg" v-html="svg" @click="changeSvg"></div>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn" lay-filter="*" lay-submit>立即注册</button>
                </div>
                <div class="layui-form-item fly-form-app">
                  <span>或者直接使用社交账号快捷注册</span>
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
import axios from 'axios';
import { ValidationProvider, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import zh from 'vee-validate/dist/locale/zh_CN';
for (const rule in rules) {
  extend(rule, {
    ...rules[rule],
    message: zh.messages[rule]
  });
}
export default {
  data() {
    return {
      username: '',
      name: '',
      password: '',
      code: '',
      svg: ''
    };
  },
  components: {
    ValidationProvider
  },
  mounted() {
    this.changeSvg();
  },
  methods: {
    changeSvg() {
      const svgapi = 'http://localhost:8641/getCaptcha';
      axios.get(svgapi).then(res => {
        this.svg = res.data.data;
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
