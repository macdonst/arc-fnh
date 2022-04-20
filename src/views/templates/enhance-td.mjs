export default function EnhanceTD({ html }) {
  return html`
    <style>
      :host,
      enhance-td {
        display: contents;
      }
      .enhance-td {
        display: table-cell;
      }
    </style>
    <div class="enhance-td p-1 m-none text-left">
      <slot></slot>
    </div>
  `
}
