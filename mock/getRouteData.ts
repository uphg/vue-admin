import { isNil, omit } from 'lodash-es'
import { createRequest } from './create'
import { treeMap } from '@/utils/treeMap'
import { capitalize } from '@/utils/capitalize'

interface RouteItem {
  name: string
  path: string
  redirect: string
  component: string
  visible: boolean
  onlyChild: boolean
  meta: {
    cached: boolean
    title: string
    icon: string
    link: string | null
  }
  children?: RouteItem[]
}

/**
 * 获取后台路由数据
 * @returns 见 https://doc.ruoyi.vip/ruoyi-vue/document/qdsc.html#路由配置
 */
export function apiGetRouteData() {
  const data = handleRouteData(routeDate)
  return createRequest({ code: 200, data })
}

// const routeItem = {
//   name: 'System',
//   path: '/system',
//   redirect: 'noRedirect',
//   component: 'Layout',
//   visible: true,
//   onlyChild: true,
//   meta: {
//     title: '系统管理',
//     icon: 'system',
//     cached: true,
//     link: null,
//   },
//   children: [
//     {
//       name: 'User',
//       path: 'user',
//       component: 'system/user/index',
//     },
//   ],
// }

const routeDate = [
  {
    name: 'System',
    path: '/system',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    alwaysShow: true,
    meta: {
      title: '系统管理',
      icon: 'system',
      noCache: false,
      link: null,
    },
    children: [
      {
        name: 'User',
        path: 'user',
        hidden: false,
        component: 'system/user/index',
        meta: {
          title: '用户管理',
          icon: 'user',
          noCache: false,
          link: null,
        },
      },
      {
        name: 'Role',
        path: 'role',
        hidden: false,
        component: 'system/role/index',
        meta: {
          title: '角色管理',
          icon: 'peoples',
          noCache: false,
          link: null,
        },
      },
      {
        name: 'Menu',
        path: 'menu',
        hidden: false,
        component: 'system/menu/index',
        meta: {
          title: '菜单管理',
          icon: 'tree-table',
          noCache: false,
          link: null,
        },
      },
      {
        name: 'Dept',
        path: 'dept',
        hidden: false,
        component: 'system/dept/index',
        meta: {
          title: '部门管理',
          icon: 'tree',
          noCache: false,
          link: null,
        },
      },
      {
        name: 'Post',
        path: 'post',
        hidden: false,
        component: 'system/post/index',
        meta: {
          title: '岗位管理',
          icon: 'post',
          noCache: false,
          link: null,
        },
      },
      {
        name: 'Dict',
        path: 'dict',
        hidden: false,
        component: 'system/dict/index',
        meta: {
          title: '字典管理',
          icon: 'dict',
          noCache: false,
          link: null,
        },
      },
      {
        name: 'Config',
        path: 'config',
        hidden: false,
        component: 'system/config/index',
        meta: {
          title: '参数设置',
          icon: 'edit',
          noCache: false,
          link: null,
        },
      },
      {
        name: 'Notice',
        path: 'notice',
        hidden: false,
        component: 'system/notice/index',
        meta: {
          title: '通知公告',
          icon: 'message',
          noCache: false,
          link: null,
        },
      },
      {
        name: 'Log',
        path: 'log',
        hidden: false,
        redirect: 'noRedirect',
        component: 'ParentView',
        alwaysShow: true,
        meta: {
          title: '日志管理',
          icon: 'log',
          noCache: false,
          link: null,
        },
        children: [
          {
            name: 'Operlog',
            path: 'operlog',
            hidden: false,
            component: 'monitor/operlog/index',
            meta: {
              title: '操作日志',
              icon: 'form',
              noCache: false,
              link: null,
            },
          },
          {
            name: 'Logininfor',
            path: 'logininfor',
            hidden: false,
            component: 'monitor/logininfor/index',
            meta: {
              title: '登录日志',
              icon: 'logininfor',
              noCache: false,
              link: null,
            },
          },
        ],
      },
    ],
  },
  {
    name: 'Monitor',
    path: '/monitor',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    alwaysShow: true,
    meta: {
      title: '系统监控',
      icon: 'monitor',
      noCache: false,
      link: null,
    },
    children: [
      {
        name: 'Online',
        path: 'online',
        hidden: false,
        component: 'monitor/online/index',
        meta: {
          title: '在线用户',
          icon: 'online',
          noCache: false,
          link: null,
        },
      },
      {
        name: 'Job',
        path: 'job',
        hidden: false,
        component: 'monitor/job/index',
        meta: {
          title: '定时任务',
          icon: 'job',
          noCache: false,
          link: null,
        },
      },
      {
        name: 'Druid',
        path: 'druid',
        hidden: false,
        component: 'monitor/druid/index',
        meta: {
          title: '数据监控',
          icon: 'druid',
          noCache: false,
          link: null,
        },
      },
      {
        name: 'Server',
        path: 'server',
        hidden: false,
        component: 'monitor/server/index',
        meta: {
          title: '服务监控',
          icon: 'server',
          noCache: false,
          link: null,
        },
      },
      {
        name: 'Cache',
        path: 'cache',
        hidden: false,
        component: 'monitor/cache/index',
        meta: {
          title: '缓存监控',
          icon: 'redis',
          noCache: false,
          link: null,
        },
      },
      {
        name: 'CacheList',
        path: 'cacheList',
        hidden: false,
        component: 'monitor/cache/list',
        meta: {
          title: '缓存列表',
          icon: 'redis-list',
          noCache: false,
          link: null,
        },
      },
    ],
  },
  {
    name: 'Tool',
    path: '/tool',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    alwaysShow: true,
    meta: {
      title: '系统工具',
      icon: 'tool',
      noCache: false,
      link: null,
    },
    children: [
      {
        name: 'Build',
        path: 'build',
        hidden: false,
        component: 'tool/build/index',
        meta: {
          title: '表单构建',
          icon: 'build',
          noCache: false,
          link: null,
        },
      },
      {
        name: 'Gen',
        path: 'gen',
        hidden: false,
        component: 'tool/gen/index',
        meta: {
          title: '代码生成',
          icon: 'code',
          noCache: false,
          link: null,
        },
      },
      {
        name: 'Swagger',
        path: 'swagger',
        hidden: false,
        component: 'tool/swagger/index',
        meta: {
          title: '系统接口',
          icon: 'swagger',
          noCache: false,
          link: null,
        },
      },
    ],
  },
]

function handleRouteData(routeData: any, namespace: string[] = []): RouteItem[] {
  const result: RouteItem[] = []
  for (const route of routeData) {
    const { name, hidden, alwaysShow, meta, children, redirect, ...rest } = route ?? {}
    const nameArr = [...namespace, name]
    const newName = createName(nameArr)
    const item = {
      ...rest,
      name: newName,
      onlyChild: !(alwaysShow ?? false),
      redirect: redirect === 'noRedirect' ? void 0 : redirect,
      meta: {
        ...(meta ? omit(meta, ['noCache']) : {}),
        cached: !(meta?.noCache ?? false),
      },
    }
    if (route.children) {
      item.children = handleRouteData(route.children, nameArr)
    }
    result.push(item)
  }
  return result
}

function createName(namespace: string[]): string {
  return namespace.reduce((acc, cur) => `${acc}${capitalize(cur)}`, '')
}
