export default function EnhanceTHead({ html }) {
  return html`
    <style>
      :host,
      enhance-thead {
        display: contents;
      }
      .enhance-thead {
        display: table-header-group;
      }
    </style>
    <div class="enhance-thead">
      <slot></slot>
    </div>
  `
}
