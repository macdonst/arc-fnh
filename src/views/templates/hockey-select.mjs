export default function HockeySelectTemplate({ html, state = {} }) {
  const {
    id = '',
    label = '',
    required = 'false',
    value = 'skater'
  } = state.attrs

  return html`
    <div>
      <label for="${id}" class="flex w-full flex-col gap-4">
        <span class="text-1 mb-2">${label}:</span>
        <select
          name="${id}"
          required="${required}"
          class="leading5-l pt-3 pb-3 pl-1 pr2  radius2 shadow-2">
          <option value="skater" ${value === 'skater' ? 'selected' : ''}>
            Skater
          </option>
          <option value="forward" ${value === 'forward' ? 'selected' : ''}>
            Forward
          </option>
          <option value="defence" ${value === 'defence' ? 'selected' : ''}>
            Defence
          </option>
          <option value="goalie" ${value === 'goalie' ? 'selected' : ''}>
            Goalie
          </option>
        </select>
      </label>
    </div>

    <script type="module">
      class HockeySelect extends HTMLElement {
        constructor() {
          super()
        }
        connectedCallback() {}
      }
      customElements.define('hockey-select', HockeySelect)
    </script>
  `
}
