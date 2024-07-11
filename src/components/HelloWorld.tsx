const HelloWorld = defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(props) {
    return () => (
      <div>
        <h2 class="c-blue-600">{props.msg}</h2>
      </div>
    )
  }
})

export default HelloWorld
