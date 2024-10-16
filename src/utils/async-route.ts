import { cloneJSON } from './cloneJSON'
import LayoutDefault from '@/layouts/Default.vue'
import LayoutParentView from '@/layouts/ParentView.vue'
import LayoutInnerLink from '@/layouts/InnerLink.vue'

const viewsModule = import.meta.glob('@/views/**/*.vue')

const layoutsMap: { [key: string]: any } = {
  Layout: LayoutDefault,
  ParentView: LayoutParentView,
  InnerLink: LayoutInnerLink,
}

/**
 * 创建异步路由
 * @param data 路由数据
 * @returns 异步路由数据
 */
export function createAsyncRoutes(data: any[]) {
  const routes = cloneJSON(data)
  return baseCreateRoutes(routes)
}

function baseCreateRoutes(routes: any[]) {
  const result: any[] = []
  for (const route of routes) {
    const { component, children, onlyChild, visible, ...rest } = route
    const newComponent = getComponent(component)
    const item: any = {
      component: newComponent,
      ...rest,
    }

    if (children) {
      item.children = baseCreateRoutes(children)
    }
    result.push(item)
  }
  return result
}

/**
 * 创建侧边栏菜单
 * @param data 路由数据
 * @returns 侧边栏菜单数据
 */
export function createSidebarMenus(data: any[]) {
  const routes = cloneJSON(data)
  return baseCreateMenus(routes)
}

function baseCreateMenus(routes: any[], parentPaths: string[] = [], matchs: any[] = []) {
  const menus: any[] = []
  for (const route of routes) {
    const { path, name, meta, onlyChild, children, hidden, ...rest } = (route?.onlyChild ? getOnlyChildMenu(route) : route) ?? {}
    // if (hidden === true) continue
    const pathList = [...parentPaths, path]

    const newPath = pathJoin(pathList)
    const item: any = {
      label: meta?.title,
      key: name,
      path: newPath,
      type: 'item',
      show: hidden !== true,
      matchs: [...matchs, { meta, path, name }],
      ...rest,
    }
    if (children) {
      item.type = 'submenu'
      item.children = baseCreateMenus(children, pathList, item.matchs)
    }
    menus.push(item)
  }
  return menus
}

export function createSidebarMenuMap(data: any[], map: Map<string, any> = new Map()) {
  // menus to map
  const menus = createSidebarMenus(data)
  for (const menu of menus) {
    map.set(menu.key, menu)
    if (menu.children) {
      createSidebarMenuMap(menu.children, map)
    }
  }
  return map
}

function getComponent(componentPath: string) {
  const layout = layoutsMap?.[componentPath]
  if (layout) return layout
  const path = componentPath.replace(/^views\/|\.vue$/g, '')
  return viewsModule[`/src/views/${path}.vue`]
}

function getOnlyChildMenu(route: any) {
  if (!route.children?.length) return route
  let child = route
  while (child?.children?.length) {
    const visibleChildren = child.children.filter((item: any) => item.hidden !== true)
    if (visibleChildren.length === 0) break
    child = visibleChildren[0]
  }
  return child
}

function pathJoin(paths: string[]) {
  return `/${paths.filter(isUnnil).join('/').replace(/^\//, '')}`
}

function isUnnil(value: any) {
  return value !== undefined && value !== null
}
