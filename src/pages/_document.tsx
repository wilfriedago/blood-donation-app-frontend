import Document, { Head, Html, Main, NextScript } from 'next/document';

import { AppConfig } from '@/AppConfig';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={AppConfig.locale} className="h-full bg-gray-50">
        <Head />
        <body className="font-sans text-gray-600 antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
