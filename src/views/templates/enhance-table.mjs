/*
  Wrap the table in a div and override the following CSS values
  to change the look and feel.

  --table-bg-color, default: --grey-2
  --th-bg-color, default: --grey0
  --th-text-color, default: --grey6
  --tbody-border-width, default: 2px
  --tbody-border-color, default --grey3
  --tbody-border-radius, default: 4px
 */

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
