export default function EnhanceTH({ html }) {
  return html`
    <style>
      :host,
      enhance-th {
        display: contents;
      }
      .th {
        display: table-cell;
      }
    </style>
    <div class="th p0 m-none text-left sticky font-bold color-grey top0">
      <slot></slot>
    </div>
  `
}
