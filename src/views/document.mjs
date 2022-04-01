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
        color: var(--grey8)
      }
      .color-fill-darkest,
      .color-fill-darkest:hover {
        fill: var(--grey8);
      }
      .color-dark {
        color: var(--grey7)
      }
      .color-fill-dark {
        fill: var(--grey7);
      }
      .border-gradient {
        border-color: var(--blue);
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
        background-image: linear-gradient(var(--grey7), var(--grey7)),
            linear-gradient(-135deg, transparent 50%, var(--light-blue) 50%),
            linear-gradient(-225deg, transparent 50%, var(--light-blue) 50%),
            linear-gradient(var(--light-blue) 42%, var(--dark-blue) 42%);
        background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
        background-size: 1px 100%, 20px 22px, 20px 22px, 20px 100%;
        background-position: right 20px center, right bottom, right bottom, right bottom;
      }
      .fancy-select:hover {
        background-image: linear-gradient(var(--dark-blue), var(--dark-blue)),
            linear-gradient(-135deg, transparent 50%, var(--dark-blue) 50%),
            linear-gradient(-225deg, transparent 50%, var(--dark-blue) 50%),
            linear-gradient(var(--dark-blue) 42%, var(--light-blue) 42%);
      }
      .fancy-select:active {
        background-image: linear-gradient(var(--dark-blue), var(--dark-blue)),
            linear-gradient(-135deg, transparent 50%, var(--dark-blue) 50%),
            linear-gradient(-225deg, transparent 50%, var(--dark-blue) 50%),
            linear-gradient(var(--dark-blue) 42%, var(--light-blue) 42%);
        color: var(--light-blue);
        border-color: var(--dark-blue);
        background-color: var(--dark-blue);
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
