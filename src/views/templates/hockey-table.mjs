export default function HockeyTableTemplate({ html }) {
  return html`
    <style>
      table {
        width: 100%;
        font-size: 16px;
      }
      td,
      th {
        padding: 10px;
        text-align: left;
        margin: 0;
      }

      tbody tr:nth-child(2n) {
        background-color: var(--light);
      }

      th {
        position: sticky;
        top: 0;
        background-color: var(--dark-blue);
        color: white;
      }
    </style>

    <slot></slot>

    <script type="module">
      class HockeyTable extends HTMLElement {
        constructor() {
          super()
        }
        connectedCallback() {}
      }
      customElements.define('hockey-table', HockeyTable)
    </script>
  `
}
