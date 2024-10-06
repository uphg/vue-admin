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

/**
 * 创建侧边栏菜单
 * @param _routes 路由数据
 * @returns 侧边栏菜单数据
 */
export function createSidebarMenus(data: any[]) {
  const routes = cloneJSON(data)
  return createMenus(routes)
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

function createMenus(routes: any[], parentPaths: string[] = []) {
  const menus: any[] = []
  for (const route of routes) {
    const { path, name, meta, children, ...rest } = route
    const pathList = [...parentPaths, path]
    const newPath = pathJoin(pathList)
    const item: any = {
      label: meta.title,
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

function pathJoin(paths: string[]) {
  return paths.filter(Boolean).join('/')
}
