export default function EnhanceTD({ html }) {
  return html`
    <style>
      :host,
      enhance-td {
        display: contents;
      }
      .enhance-td {
        display: table-cell;
        padding: 10px;
        text-align: left;
        margin: 0;
      }
    </style>
    <div class="enhance-td">
      <slot></slot>
    </div>
  `
}
