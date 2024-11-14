import { NEl } from "naive-ui"

const BaseButton = defineComponent({
  name: 'BaseButton',
  props: {
    msg: String
  },
  setup(props, context) {
    return () => (
      <NEl>
        {}
      </NEl>
    )
  }
})

export default BaseButton
