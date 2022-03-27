export default function HockeyInputTemplate({ html, state = {} }) {
  const {
    id = '',
    label = '',
    type = 'text',
    required = 'false',
    value = ''
  } = state.attrs
  return html`
    <div>
      <label for="${id}" class="flex w-full flex-col gap-4">
        <span>${label}:</span>
        <input
          type="${type}"
          name="${id}"
          ${required === 'true' ? `required` : ``}
          value="${value}"
          ${(type === 'checkbox') & (value === 'true') ? 'checked' : ''}
          class="leading5-l pt-3 pb-3 pl-1 pr-1 border-gradient border1 radius0" />
      </label>
    </div>

    <script type="module">
      class HockeyInput extends HTMLElement {
        constructor() {
          super()
        }
        connectedCallback() {}
      }
      customElements.define('hockey-input', HockeyInput)
    </script>
  `
}
