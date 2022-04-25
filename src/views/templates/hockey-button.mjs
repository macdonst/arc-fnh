export default function HockeyButton({ html, state = {} }) {
  const { attrs } = state
  const { icon } = attrs
  return html`
    <button
      class="mr-1 pt-1 pb-1 pl-1 pr-1 inline-flex justify-center bg-lighter radius2 shadow-1-hover">
      <div class="mr-2 inline-block">
        <hockey-icon
          icon=${icon}
          style="width: 1rem; height: 1rem;"
          class="color-fill-dark color-fill-darkest"></hockey-icon>
      </div>
      <slot></slot>
    </button>
  `
}
