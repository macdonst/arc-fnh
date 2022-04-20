export default function EnhanceTable({ html, state = {} }) {
  // "--table-bg-color: blue; --th-bg-color: red; --th-text-color: white;">

  const { width = '100%' } = state.attrs
  return html`
    <style>
      :host,
      enhance-table {
        display: inline-block;
        width: ${width};
      }
      .enhance-table-wrapper {
        margin: 10px 0px 10px 0px;
        background-color: var(--table-bg-color, var(--grey-2));
      }
      .enhance-table {
        display: table;
        width: 100%;
        border-collapse: separate;
      }
    </style>

    <div class="enhance-table-wrapper">
      <div class="enhance-table">
        <slot></slot>
      </div>
    </div>
  `
}
