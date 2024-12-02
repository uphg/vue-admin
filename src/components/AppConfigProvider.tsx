import { NConfigProvider, NMessageProvider, NSpin } from 'naive-ui'
import { useThemeStore } from '../stores/theme'

const AppConfigProvider = defineComponent({
  name: 'AppConfigProvider',
  setup(_props, context) {
    const { $loading } = useGlobalLoading()
    const themeStore = useThemeStore() as any
    const spinSlots = {
      description: () => $loading.message,
    }
    themeStore.setColor('#6841ea')
    loadGlobalMessage()

    return () => (
      <NConfigProvider theme-overrides={themeStore.themeOverrides}>
        <NSpin class="min-h-screen" show={$loading.visible} v-slots={spinSlots}>
          <NDialogProvider>
            <NMessageProvider>
              {context.slots.default?.()}
            </NMessageProvider>
          </NDialogProvider>
        </NSpin>
      </NConfigProvider>
    )
  },
})

export default AppConfigProvider
