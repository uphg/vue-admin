const BaseButton = defineComponent({
  name: 'BaseButton',
  props: {
    type: String
  },
  setup(props, context) {
    return () => <button class="g-base-button">{context.slots.default?.()}</button>
  }
})


export default BaseButton