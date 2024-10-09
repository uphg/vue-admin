import { isNil } from 'lodash-es'
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
  return createRoutes(routes)
}

function createRoutes(routes: any[]) {
  const result: any[] = []
  for (const route of routes) {
    const { component, children, onlyChild, visible, ...rest } = route
    const newComponent = getComponent(component)
    const item: any = {
      component: newComponent,
      ...rest,
    }

    if (children) {
      item.children = createRoutes(children)
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
  return createMenus(routes)
}

function createMenus(routes: any[], parentPaths: string[] = []) {
  const menus: any[] = []
  for (const route of routes) {
    const { path, name, meta, onlyChild, children, hidden, ...rest } = (route?.onlyChild ? getOnlyChildMenu(route) : route) ?? {}
    if (hidden === true) continue
    const pathList = [...parentPaths, path]
    console.log('pathList')
    console.log(pathList)
    const newPath = pathJoin(pathList)
    const item: any = {
      label: meta?.title,
      key: name,
      path: newPath,
      type: 'item',
      ...rest,
    }
    if (children) {
      item.type = 'submenu'
      item.children = createMenus(children, pathList)
    }
    menus.push(item)
  }
  return menus
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
