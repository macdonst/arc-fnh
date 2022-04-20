export default function EnhanceTR({ html }) {
  return html`
    <style>
      enhance-tr {
        display: contents;
      }
      .enhance-tr {
        display: table-row;
      }
    </style>
    <div class="enhance-tr">
      <slot></slot>
    </div>
  `
}
