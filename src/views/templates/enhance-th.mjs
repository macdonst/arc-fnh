export default function EnhanceTH({ html, state }) {
  const { width } = state.attrs
  return html`
    <style>
      :host,
      enhance-th {
        display: contents;
      }
    </style>
    <div
      class="display-table-cell pt-1 pb-1 pr0 pl0 m-none text-left sticky font-bold color-grey top0"
      ${width ? `style="width: ${width};"` : ''}>
      <slot></slot>
    </div>
  `
}
