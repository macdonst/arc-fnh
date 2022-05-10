export default function EnhanceTable({ html, state = {} }) {
  const { width = '100%' } = state.attrs
  return html`
    <style>
      :host,
      enhance-table {
        display: inline-block;
        width: ${width};
      }
    </style>

    <div class="mt-1 mb-1 bg-lighter radius2 shadow0 pt-2 pb-2">
      <div class="display-table border-separate w-full hoverTable">
        <slot></slot>
      </div>
    </div>
  `
}
