export default function EnhanceTBody({ html }) {
  return html`
    <style>
      :host,
      enhance-tbody {
        display: contents;
      }
      .enhance-tbody {
        display: table-row-group;
      }
    </style>
    <div class="enhance-tbody">
      <slot></slot>
    </div>
  `
}
