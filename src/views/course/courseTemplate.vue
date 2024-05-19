<template>
  <div
    class="flex h-[110px] p-2 bg-white mt-2 shadow-sm rounded-md"
    v-if="isLoading"
  >
    <el-skeleton style="width: 100%">
      <template #template>
        <div class="flex h-full">
          <el-skeleton-item variant="image" style="width: 40%; height: 100%" />
          <div class="flex-1 flex flex-col pl-2">
            <el-skeleton-item variant="text" style="width: 100%; height: 10%" />
            <el-skeleton-item variant="text" style="width: 80%" class="mt-1" />
            <el-skeleton-item variant="text" style="width: 70%" class="mt-1" />
            <el-skeleton-item variant="text" style="width: 60%" class="mt-1" />
            <el-skeleton-item variant="text" style="width: 20%" class="mt-1" />
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
  <div
    v-else
    class="flex h-[110px] p-2 bg-white mt-2 shadow-sm rounded-md relative"
  >
    <el-image
      class="w-[40%] mr-2 overflow-hidden"
      :src="courseInfo.imgUrl"
      fit="fill"
    />
    <div class="w-[60%] flex flex-col font-bold">
      <div class="overflow-hidden whitespace-nowrap text-overflow-ellipsis">
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="getCourseType(courseInfo.courseName).title"
          placement="top-start"
        >
          {{ getCourseType(courseInfo.courseName).title }}
        </el-tooltip>
      </div>
      <div class="mt-1 flex justify-end">
        <el-button
          type="primary"
          size="small"
          round
          @click="gotoCourse"
          :disabled="
            typeObj[getCourseType(courseInfo.courseName).type] === 'MOOC'
          "
          >查看活动</el-button
        >
      </div>

      <div class="mt-1 flex justify-end">
        <el-button type="primary" size="small" round @click="handleCopy"
          >复制信息</el-button
        >
      </div>
      <div class="mt-1 flex justify-end">
        <el-button type="primary" size="small" round :disabled="true"
          >考试/作业/测验</el-button
        >
      </div>
    </div>
    <el-tag type="warning" effect="dark" round class="absolute left-2 top-2">
      {{ typeObj[getCourseType(courseInfo.courseName).type] }}
    </el-tag>
  </div>
</template>

<script name="courseTemplate" setup>
import useCopyText from '@/hooks/useCopyText'
import { ref, toRefs, computed } from 'vue'
import { useUserStoreWidthOut } from '@/store/modules/user'
import router from '@/router'

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: () => true,
  },
  courseInfo: {
    type: Object,
    default: () => {},
  },
})

const { courseInfo } = toRefs(props)

const userStore = useUserStoreWidthOut()

const typeObj = {
  zhzj: '智慧职教',
  mooc: 'MOOC',
}
const getCourseType = (givenString) => {
  let match = givenString.match(/\[(.*?)\]/)
  let contentInsideBrackets = match ? match[1] : ''
  let title = ''
  if (contentInsideBrackets) {
    title = givenString.replace(`[${contentInsideBrackets}]`, '').trim()
  } else {
    title = givenString
  }
  return {
    type: contentInsideBrackets,
    title: title,
  }
}

const { copyText } = useCopyText()
const textToCopy = computed(
  () =>
    `${courseInfo.value?.courseName}丨${courseInfo.value?.courseId} ${userStore.getUserInfo?.userName} ${userStore.getUserInfo?.passWord}`
)

const handleCopy = () => copyText(textToCopy.value)

const gotoCourse = () => {
  router.push({
    path: '/active',
    query: {
      courseId: courseInfo.value.courseId,
    },
  })
}
</script>

<style lang="less" scoped>
:deep(.el-image__inner) {
  border-radius: 5%;
  transition: 0.6s;
  overflow: hidden;
  &:hover {
    transform: scale(1.2);
  }
}
</style>
