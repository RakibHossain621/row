import Document, {
  Html, Head, Main, NextScript
} from 'next/document';
import { settingService } from '@services/setting.service';

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const resp = await settingService.all();
    const settings = resp.data;
    return {
      ...initialProps,
      settings
    };
  }

  render() {
    const { settings } = this.props as any;
    return (
      <Html>
        <Head>
          <link rel="icon"  href={settings.favicon || '/static/favicon-32x32.png'} sizes="32x32" />
          <link rel="shortcut icon" href={settings.favicon || "/static/favicon.ico"} />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
          <link rel="manifest" href="/static/site.webmanifest" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta charSet="utf-8" />
          <script src="https://unpkg.com/video.js@7.8.3/dist/video.js" />
          <script src="https://unpkg.com/@videojs/http-streaming@1.13.3/dist/videojs-http-streaming.js" />
          <script src="https://webrtc.github.io/adapter/adapter-latest.js" />
          <link
            href="https://unpkg.com/video.js@7.8.3/dist/video-js.css"
            rel="stylesheet"
          />
          <script src="/lib/webrtc_adaptor.js" />
        </Head>
        <body className='antialiased font-inter'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
