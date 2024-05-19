import request from '@/utils/request'

/**
 * @name 登录
 * @param {*} params  登录参数
 * @returns promise
 */
export const loginUser = (params) =>
  request({
    url: '/token',
    method: 'GET',
    params,
  })

/**
 * @name 课程列表
 * @param {*} params
 * @returns promise
 */
export const courseList = (params) =>
  request({
    url: '/course/list',
    method: 'GET',
    params,
  })
