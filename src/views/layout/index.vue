<template>
  <div class="layout-container">
    <el-row>
      <el-col
        :xs="22"
        :sm="22"
        :md="18"
        :lg="16"
        :xl="14"
        class="div-container"
      >
        <el-container>
          <el-header
            class="flex justify-between my-3 items-center text-xl select-none"
          >
            <div class="font-bold">
              <span class="mr-1">智慧职教</span>
              <span class="text-[#409EFF]">公共服务平台</span>
            </div>
            <el-button
              @click="loginFn"
              type="primary"
              round
              v-if="!userStore.isLogin"
              >登录</el-button
            >
            <el-button @click="loginFn(false)" type="primary" round v-else
              >退出登录</el-button
            >
          </el-header>
          <el-aside width="auto" class="rounded-lg">
            <el-menu
              :default-active="activeIndex"
              background-color="rgba(255,255,255,0.5)"
              text-color="#303133"
              active-text-color="#409EFF"
              unique-opened
              router
              class="flex"
            >
              <el-menu-item
                v-for="item in tabList"
                :key="item.path"
                :index="item.path"
              >
                {{ item.title }}
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main class="!p-0 !overflow-hidden">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
    <loginDialog ref="loginDialogRef" />
    <el-backtop :bottom="100">
      <div
        style="
          height: 100%;
          width: 100%;
          background-color: var(--el-bg-color-overlay);
          box-shadow: var(--el-box-shadow-lighter);
          text-align: center;
          line-height: 40px;
          color: #1989fa;
        "
      >
        UP
      </div>
    </el-backtop>
  </div>
</template>

<script name="layout" setup>
import { ref } from 'vue'
import loginDialog from '@/components/loginDialog.vue'
import { useUserStoreWidthOut } from '@/store/modules/user'

const tabList = [
  {
    title: '智慧职教icve',
    path: '/course',
  },
  {
    title: '关于本站',
    path: '/about',
  },
]

const activeIndex = ref('/course')
const loginDialogRef = ref(null)
const userStore = useUserStoreWidthOut()

const loginFn = (flag = true) => {
  flag ? (loginDialogRef.value.dialogVisible = true) : userStore.logout()
}
</script>

<style lang="less" scoped>
.layout-container {
  background: url('@/assets/image/background.svg') no-repeat;
  background-size: cover;
  background-position: center top;
  height: 100vh;
  width: 100vw;
}

.div-container {
  height: 100%;
  width: 100%;
  margin: 0 auto;
}

.el-menu {
  border-right: none;
}
</style>
