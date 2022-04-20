export default function EnhanceTBody({ html }) {
  return html`
    <style>
      :host,
      enhance-tbody {
        display: contents;
      }
      .enhance-tbody {
        display: table-row-group;
      }
      .enhance-tbody enhance-tr .enhance-tr enhance-td:first-child .enhance-td {
        border-left: var(--tbody-border-width, 2px) solid
          var(--tbody-border-color, var(--grey3));
      }
      .enhance-tbody enhance-tr .enhance-tr enhance-td:last-child .enhance-td {
        border-right: var(--tbody-border-width, 2px) solid
          var(--tbody-border-color, var(--grey3));
      }
      .enhance-tbody enhance-tr:first-child .enhance-tr enhance-td .enhance-td {
        border-top: var(--tbody-border-width, 2px) solid
          var(--tbody-border-color, var(--grey3));
      }
      .enhance-tbody enhance-tr:last-child .enhance-tr enhance-td .enhance-td {
        border-bottom: var(--tbody-border-width, 2px) solid
          var(--tbody-border-color, var(--grey3));
      }
      .enhance-tbody
        enhance-tr:first-child
        .enhance-tr
        enhance-td:first-child
        .enhance-td {
        border-top-left-radius: var(--tbody-border-radius, 4px);
      }
      .enhance-tbody
        enhance-tr:first-child
        .enhance-tr
        enhance-td:last-child
        .enhance-td {
        border-top-right-radius: 4px;
      }
      .enhance-tbody
        enhance-tr:last-child
        .enhance-tr
        enhance-td:first-child
        .enhance-td {
        border-bottom-left-radius: 4px;
      }
      .enhance-tbody
        enhance-tr:last-child
        .enhance-tr
        enhance-td:last-child
        .enhance-td {
        border-bottom-right-radius: 4px;
      }
    </style>
    <div class="enhance-tbody">
      <slot></slot>
    </div>
  `
}
