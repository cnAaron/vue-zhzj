<template>
  <div class="courselist-container mb-10">
    <el-empty
      description="未登录"
      :image="error500"
      :image-size="200"
      v-if="!userStore.isLogin"
    />
    <template v-else>
      <el-row :gutter="6" v-if="courseList?.length">
        <el-col
          :xs="24"
          :sm="12"
          :xl="8"
          v-for="(item, index) in courseList"
          :key="index"
        >
          <courseTemplate :courseInfo="item" :isLoading="!item" />
        </el-col>
      </el-row>
      <el-empty
        v-else
        description="暂无课程"
        :image="error500"
        :image-size="200"
      />
    </template>
  </div>
</template>

<script name="courseList" setup>
import error500 from '@/assets/image/500.png'
import { useUserStoreWidthOut } from '@/store/modules/user'
import courseTemplate from '@/views/course/courseTemplate.vue'
import { courseList as courseListFn } from '@/apis'
import { ref, watchEffect } from 'vue'

const userStore = useUserStoreWidthOut()

const courseList = ref([])

courseList.value = Array(10).fill(null)

const getCourseList = async () => {
  const list = await courseListFn({ token: userStore.getUserInfo.token })
  courseList.value = list
}

watchEffect(() => {
  userStore.isLogin
    ? getCourseList()
    : (courseList.value = Array(10).fill(null))
})
</script>

<style lang="less" scoped></style>
