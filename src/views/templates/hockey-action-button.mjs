export default function HockeyActionButtonTemplate({ html, state = {} }) {
  const {
    action = '',
    icon = '',
    label = '',
    type = 'button',
    variant = 'quiet'
  } = state.attrs
  const innerText = `${
    icon !== ''
      ? `<div class="mr-2 inline-block">
          <hockey-icon style="width: 1rem; height: 1rem;" class="color-fill-dark color-fill-darkest" icon="${icon}"></hockey-icon>
         </div>`
      : ``
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
        ? 'pt-1 pb-1 pl-1 pr-1 inline-flex justify-center bg-lighter radius2 shadow-1-hover'
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
