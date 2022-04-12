export default function HockeyTableTemplate({ html }) {
  return html`
    <style>
      table {
        width: 100%;
        font-size: 16px;
        margin: 10px 0px 10px 0px;
        background-color: var(--grey-2);
      }
      tbody {
        border-radius: 4px;
        border-width: 2px;
        border-color: var(--grey3);
      }
      td,
      th {
        padding: 10px;
        text-align: left;
        margin: 0;
      }
      tbody tr:nth-child(2n) {
        background-color: var(--grey1);
      }
      th {
        position: sticky;
        top: 0;
        background-color: var(--grey0);
        color: var(--grey6);
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
