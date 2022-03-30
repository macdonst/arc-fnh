export default function HockeyActionButtonTemplate({ html, state = {} }) {
  const {
    action = '',
    icon = '',
    label = '',
    type = 'button',
    variant = 'quiet'
  } = state.attrs
  const innerText = `${
    icon !== '' ? `<span class="ss-icon ss-${icon}"></span>` : ``
  }
  ${
    label !== ''
      ? `<span class="items-center self-center justify-center">${label}</span>`
      : ``
  }`

  let button = ''
  if (type === 'link') {
    button = `<a href="${action}" class="mr-1 ${
      variant !== 'quiet'
        ? 'radius1 border2 border-dark bg-light pt-2 pb-2 pl-2 pr-2'
        : ''
    }">${innerText}</a>`
  } else {
    button = `<form method="post" action="${action}" class="mr-1">
    <slot></slot>
    <button>
      ${innerText}
    </button>
  </form>`
  }

  return html`
    ${button}

    <script type="module">
      class HockeyActionButton extends HTMLElement {
        constructor() {
          super()
        }
        connectedCallback() {}
      }
      customElements.define('hockey-action-button', HockeyActionButton)
    </script>
  `
}
