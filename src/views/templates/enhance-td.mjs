export default function EnhanceTD({ html, state }) {
  const { width } = state.attrs
  return html`
    <style>
      :host,
      enhance-td {
        display: contents;
      }
    </style>
    <div
      class="display-table-cell display-contents pt-1 pb-1 pr0 pl0 m-none text-left text-decoration-inherit"
      ${width ? `style="width: ${width};"` : ''}>
      <slot></slot>
    </div>
  `
}
