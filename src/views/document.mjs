import Symbols from './symbols.mjs'
export default function Document(body = '') {
  return /* html */ `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="/components/css/styles.css"/>
      <style>
      .bg-gradient {
        background-image: var(--bg-gradient)
      }
      .heading-size {
        font-size: clamp(2.5rem, 15vw, 8rem);
      }
      .sparkle-size {
        font-size: clamp(0rem, 10vw, 4rem);
      }
      .bg-darkblue,
      .bg-hover-dark-blue:hover {
        background-color: var(--dark-blue);
      }
      .bg-blue,
      .bg-blue:active {
        background-color: var(--blue);
      }
      .bg-lightblue,
      .bg-lightblue:active {
        background-color: var(--light-blue);
      }
      .bg-dark {
        background-color: var(--grey4);
      }
      .bg-light {
        background-color: var(--grey0);
      }
      .bg-lighter {
        background-color: var(--grey-1);
      }
      .bg-hover-lightest:hover {
        background-color: var(--grey-2);
      }
      .color-hover-white:hover {
        color: var(--white);
      }
      .color-light {
        color: var(--light);
      }
      .color-blue {
        color: var(--blue);
      }
      .color-white {
        color: var(--white);
      }
      .color-fill-white {
        fill: var(--white);
      }
      .color-darkest,
      .color-hover-darkest:hover {
        color: var(--grey8);
      }
      .color-fill-darkest,
      .color-fill-darkest:hover {
        fill: var(--grey8);
      }
      .color-grey {
        color: var(--grey6);
      }
      .color-dark {
        color: var(--grey7);
      }
      .color-fill-dark {
        fill: var(--grey7);
      }
      .color-fill-dark:hover {
        fill: var(--grey8);
      }
      .border-gradient {
        border-color: var(--grey6);
      }
      .border-dark {
        border-color: var(--grey3);
      }
      .max-w-form {
        max-width: 21.78rem;
      }
      .strikethrough {
        text-decoration: line-through
      }
      .icon {
          height: 4rem;
          width: 4rem;
      }
      .fancy-select {
        appearance: none;
        background-image: linear-gradient(var(--grey8), var(--grey8)),
            linear-gradient(-135deg, transparent 50%, var(--grey3) 50%),
            linear-gradient(-225deg, transparent 50%, var(--grey3) 50%),
            linear-gradient(var(--grey3) 42%, var(--grey6) 42%);
        background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
        background-size: 1px 100%, 20px 22px, 20px 22px, 20px 100%;
        background-position: right 20px center, right bottom, right bottom, right bottom;
      }
      .fancy-select:hover {
        background-image: linear-gradient(var(--grey6), var(--grey6)),
            linear-gradient(-135deg, transparent 50%, var(--grey6) 50%),
            linear-gradient(-225deg, transparent 50%, var(--grey6) 50%),
            linear-gradient(var(--grey6) 42%, var(--grey3) 42%);
      }
      .fancy-select:active {
        background-image: linear-gradient(var(--grey6), var(--grey6)),
            linear-gradient(-135deg, transparent 50%, var(--grey6) 50%),
            linear-gradient(-225deg, transparent 50%, var(--grey6) 50%),
            linear-gradient(var(--grey6) 42%, var(--grey3) 42%);
        color: var(--grey3);
        border-color: var(--blue);
        background-color: var(--grey6);
      }
      .menu-open {
        top: 2.8rem;
      }
      .menu-closed {
        top: -20rem;
      }
      .shadow0 {
        box-shadow: 12px 12px 24px #7b7b7b, -12px -12px 24px #ffffff;
      }
      .shadow-1 {
        box-shadow: 3px 3px 6px #7b7b7b, -3px -3px 6px #ffffff;
      }
      .shadow-1-hover {
        box-shadow: 3px 3px 6px #7b7b7b, -3px -3px 6px #ffffff;
      }
      .shadow-1-hover:hover {
        box-shadow: inset 3px 3px 6px #7b7b7b, inset -3px -3px 6px #ffffff;
      }
      .shadow-2 {
        box-shadow: inset 2px 2px 5px #7b7b7b, inset -3px -3px 7px #fff;
      }
      .max-width0 {
        max-width: 1140px;
      }
      .max-width-1 {
        max-width: 920px;
      }
      .max-width-2 {
        max-width: 540px;
      }
      .max-width-3 {
        max-width: 350px;
      }
      .hoverTable enhance-tbody .enhance-tbody enhance-tr .enhance-tr:hover {
        background-color: var(--grey1);
      }
      @media only screen and (max-width: 27.5em) {
        .unseen {
          display: none;
        }
      }
    </style>
    </head>
    <body class="font-sans color-dark bg-light">
    ${Symbols}
    ${body}
    </body>
  </html>
    `
}
