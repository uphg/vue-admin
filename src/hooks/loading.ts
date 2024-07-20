export let $loading: {
  visible: boolean
  message: string | null
  start: (message?: string) => void
  stop: () => void
} | null = null

const defaultMessage = '加载中...'

export function useGlobalLoading() {
  $loading = $loading ?? reactive({
    visible: false,
    message: null as string | null,
    start,
    stop,
  })

  return { $loading }
}

function start(message?: string) {
  $loading!.message = message ?? defaultMessage
  $loading!.visible = true
}

function stop() {
  $loading!.message = null
  $loading!.visible = false
}
