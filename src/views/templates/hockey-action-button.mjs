export default function HockeyActionButtonTemplate({ html, state = {} }) {
  const { action = '', icon = '', label = '', type = 'button' } = state.attrs
  const innerText = `${
    icon !== '' ? `<span class="ss-icon ss-${icon}"></span>` : ``
  }
  ${label !== '' ? `<span>${label}</span>` : ``}`

  let button = ''
  if (type === 'link') {
    button = `<a href="${action}">${innerText}</a>`
  } else {
    button = `<form method="post" action="${action}" class="mr-1">
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
