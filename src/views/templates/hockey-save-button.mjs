export default function HockeySaveButtonTemplate({ html }) {
  return html`
    <div class="text-right">
      <button
        class="bg-blue bg-hover-dark-blue color-white pt-1 pb-1 pr0 pl0 radius1">
        Save
      </button>
    </div>

    <script type="module">
      class HockeySaveButton extends HTMLElement {
        constructor() {
          super()
        }
        connectedCallback() {}
      }
      customElements.define('hockey-save-button', HockeySaveButton)
    </script>
  `
}
