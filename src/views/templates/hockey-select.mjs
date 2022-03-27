export default function HockeyInputTemplate({ html, state = {} }) {
  const { id = '', label = '', required = 'false' } = state.attrs
  return html`
    <div>
      <label for="${id}" class="flex w-full flex-col gap-4">
        <span>${label}:</span>
        <select
          name="${id}"
          required="${required}"
          class="leading5-l pt-3 pb-3 pl-1 pr-1 border-gradient border1 radius0">
          <option value="skater">Skater</option>
          <option value="forward">Forward</option>
          <option value="defence">Defence</option>
          <option value="goalie">Goalie</option>
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
