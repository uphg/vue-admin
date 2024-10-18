import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { Ref } from 'vue'

export type TagsState = Partial<{
  list: Tag[]
}>

export interface Tag {
  name: string
  title: string
  path: string
}

type UseTagsStore = ReturnType<typeof defineStore<'tags', {
  list: Ref<Tag[]>
  active: Ref<string | null>
  addTag: (tag: Tag) => void
  removeTag: (tag: Tag) => void
  setActive: (name: string) => void
}>>

const caches = [
  {
      "name": "MonitorCache",
      "title": "缓存监控",
      "path": "/monitor/cache"
  },
  {
      "name": "Home",
      "title": "首页",
      "path": "/home"
  },
  {
      "name": "SystemUser",
      "title": "用户管理",
      "path": "/system/user"
  },
  {
      "name": "SystemRole",
      "title": "角色管理",
      "path": "/system/role"
  },
  {
      "name": "SystemMenu",
      "title": "菜单管理",
      "path": "/system/menu"
  },
  {
      "name": "SystemDept",
      "title": "部门管理",
      "path": "/system/dept"
  },
  {
      "name": "SystemPost",
      "title": "岗位管理",
      "path": "/system/post"
  },
  {
      "name": "SystemDict",
      "title": "字典管理",
      "path": "/system/dict"
  },
  {
      "name": "SystemConfig",
      "title": "参数设置",
      "path": "/system/config"
  },
  {
      "name": "SystemNotice",
      "title": "通知公告",
      "path": "/system/notice"
  },
  {
      "name": "SystemLogOperlog",
      "title": "操作日志",
      "path": "/system/log/operlog"
  },
  {
      "name": "SystemLogLogininfor",
      "title": "登录日志",
      "path": "/system/log/logininfor"
  },
  {
      "name": "MonitorOnline",
      "title": "在线用户",
      "path": "/monitor/online"
  },
  {
      "name": "MonitorJob",
      "title": "定时任务",
      "path": "/monitor/job"
  },
  {
      "name": "MonitorDruid",
      "title": "数据监控",
      "path": "/monitor/druid"
  },
  {
      "name": "MonitorServer",
      "title": "服务监控",
      "path": "/monitor/server"
  },
  {
      "name": "MonitorCacheList",
      "title": "缓存列表",
      "path": "/monitor/cacheList"
  },
  {
      "name": "ToolBuild",
      "title": "表单构建",
      "path": "/tool/build"
  },
  {
      "name": "ToolGen",
      "title": "代码生成",
      "path": "/tool/gen"
  },
  {
      "name": "ToolSwagger",
      "title": "系统接口",
      "path": "/tool/swagger"
  }
]

export const useTagsStore: UseTagsStore = defineStore('tags', () => {
  const list = ref<Tag[]>(caches)
  const active = ref<string | null>(null)
  function addTag(tag: Tag) {
    const oldTag = list.value.find(t => t.name === tag.name)
    if (oldTag) return
    list.value.push({
      name: tag.name as string,
      title: tag.title as string,
      path: tag.path,
    })
  }

  function removeTag(tag: Tag) {
    list.value = list.value.filter(t => t.name !== tag.name)
  }

  function setActive(name: string) {
    active.value = name
  }

  return { list, active, addTag, removeTag, setActive }
})
