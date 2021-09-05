// import React from 'react'
// import Document, { Html, Head, Main, NextScript } from 'next/document';
// import { ServerStyleSheet } from 'styled-components'

// export default class MyDocument extends Document {

//     // styled components ssr 
//     static async getInitialProps(ctx) {
//         const sheet = new ServerStyleSheet();
//         const originalRenderPage = ctx.renderPage;
//         try {
//           ctx.renderPage = () => originalRenderPage({
//             enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
//           });
//           const initialProps = await Document.getInitialProps(ctx);
//           return {
//             ...initialProps,
//             styles: (
//               <>
//                 {initialProps.styles}
//                 {sheet.getStyleElement()}
//               </>
//             ),
//           };
//         } catch (error) {
//           console.error(error);
//         } finally {
//           sheet.seal();
//         }
//       }

//     // 아래가 기본꼴. _app.js 위에 _document.js가 있고 여기에 ssr하면 됨. 여기에서 html head body 수정가능
//     // https://polyfill.io/  에서 폴리필 체크해서 복사하고 NextScript 얘보다 위에 폴리필 등록
//     render() {
//         return (
//             <Html>
//                 <Head />
//                 <body>
//                     <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019"></script>
//                     <Main />
//                     <NextScript />
//                 </body>
//             </Html>
//         )
//     }
// }

import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}