<template>
  <el-dialog v-model="dialogVisible" :width="useAutoWidth()" draggable>
    <h1 class="px-2 text-center mb-10">Login</h1>
    <div class="px-10">
      <el-form
        label-position="right"
        label-width="auto"
        :model="userFrom"
        :rules="rules"
        status-icon
        ref="loginFormRef"
      >
        <el-form-item label="账号" prop="userName">
          <el-input v-model="userFrom.userName" />
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input v-model="userFrom.passWord" />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            @click="submitForm(loginFormRef)"
            round
            class="!w-[100%]"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import useAutoWidth from '@/hooks/useAutoWidth'
import { useUserStoreWidthOut } from '@/store/modules/user'
import { loginUser } from '@/apis'

const dialogVisible = ref(false)
const loginFormRef = ref(null)
const userStore = useUserStoreWidthOut()

const rules = {
  userName: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
  ],
  passWord: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
}

const userFrom = reactive({
  userName: '',
  passWord: '',
})

const loading = ref(false)

const submitForm = async (formRef) => {
  try {
    loading.value = true
    await formRef.validate()
    const res = await loginUser(userFrom)
    userStore.setUserInfo({ ...res, ...userFrom })
    ElNotification({
      title: 'Success',
      message: `登录成功！ ${userFrom.userName}`,
      type: 'success',
      showClose: false,
    })
  } catch (error) {
  } finally {
    formRef.resetFields()
    loading.value = false
    dialogVisible.value = false
  }
}

defineExpose({ dialogVisible })
</script>
