import LayoutDefault from '@/layouts/Default.vue'
import LayoutParentView from '@/layouts/ParentView.vue'
import LayoutInnerLink from '@/layouts/InnerLink.vue'

const viewsModule = import.meta.glob('@/views/**/*.vue')

const layoutsMap: { [key: string]: any } = {
  Default: LayoutDefault,
  ParentView: LayoutParentView,
  InnerLink: LayoutInnerLink,
}

export function createAsyncRoutes(data: any[]) {
  const routes: any[] = []
  for (const item of data) {
    const component = getComponent(item.component)
    const route: any = {
      path: item.path,
      name: item.title,
      component: LayoutDefault,
      children: [
        {
          path: item.path,
          component,
        },
      ],
    }
    routes.push(route)
    if (item.children) {
      route.children = createAsyncRoutes(item.children)
    }
  }
  return routes
}

function getComponent(componentPath: string) {
  const layout = layoutsMap?.[componentPath]
  if (layout) return layout
  const path = componentPath.replace(/^views\/|\.vue$/g, '')
  return viewsModule[`/src/views/${path}.vue`]
}
