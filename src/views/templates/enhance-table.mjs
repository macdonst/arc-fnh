export default function EnhanceTable({ html, state = {} }) {
  const { width = '100%' } = state.attrs
  return html`
    <style>
      :host,
      enhance-table {
        display: inline-block;
        width: ${width};
      }
      .enhance-table {
        display: table;
        border-collapse: separate;
      }
    </style>

    <div class="mt-1 mb-1 bg-lighter radius2 shadow0 pt-2 pb-2">
      <div class="enhance-table w-full hoverTable">
        <slot></slot>
      </div>
    </div>
  `
}
