export default {
  name: 'extendRender',
  props: {
    render: Function
  },
  render: function (h) {
    return this.render(h)
  }
}
