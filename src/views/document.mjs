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
      <link rel="stylesheet" href="/components/css/ss-standard.css"/>
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
      .bg-light {
        background-color: var(--grey0);
      }
      .bg-lighter {
        background-color: var(--grey-1);
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
      .color-darkest {
        color: var(--grey8)
      }
      .color-dark {
        color: var(--grey7)
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
    </style>
    </head>
    <body class="font-sans color-dark bg-light">
    ${Symbols}
    ${body}
    </body>
  </html>
    `
}
