export default function EnhanceTD({ html, state }) {
  const { width } = state.attrs
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
    <div
      class="enhance-td pt-1 pb-1 pr0 pl0 m-none text-left"
      ${width ? `style="width: ${width};"` : ''}>
      <slot></slot>
    </div>
  `
}
