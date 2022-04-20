export default function EnhanceTH({ html, state = {} }) {
  const { classes = '' } = state.attrs
  return html`
    <style>
      :host,
      enhance-th {
        display: contents;
      }
      .th {
        display: table-cell;
        padding: 10px;
        text-align: left;
        margin: 0;
        position: sticky;
        top: 0;
        background-color: var(--th-bg-color, var(--grey0));
        color: var(--th-text-color, var(--grey6));
        font-weight: bold;
      }
    </style>
    <div class="th ${classes}">
      <slot></slot>
    </div>
  `
}
