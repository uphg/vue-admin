import LayoutDefault from '@/layouts/Default.vue'
import LayoutParentView from '@/layouts/ParentView.vue'
import LayoutInnerLink from '@/layouts/InnerLink.vue'

const viewsModule = import.meta.glob('@/views/**/*.vue')

const layoutsMap = {
  Default: LayoutDefault,
  ParentView: LayoutParentView,
  InnerLink: LayoutInnerLink,
}

export function createAsyncRoutes(data: any[]) {
  // import.meta.glob('@/views/**/*.vue')
  const routes: any[] = []
  for (const item of data) {
    const route: any = {
      path: item.path,
      name: item.title,
      component: LayoutDefault,
      children: [
        {
          path: '',
          component: getComponent(item.component),
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
  if (layoutsMap[componentPath])
    return layoutsMap[componentPath]

  const path = componentPath.replace(/^views\/|\.vue$/g, '')
  return viewsModule[`@/views/${componentPath}.vue`]
}
