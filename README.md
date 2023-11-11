### Note: If the select tag doesn't open options on click, Please disable all extensions because any extensions that can alter the DOM can cause hydration error! (ex: Adblock, Dark Reader)

### Lưu ý: nếu click vào thẻ select mà ko hiện ra options, xin hãy disable extensions của trình duyệt vì những extensions có chức năng thay đổi DOM sẽ làm lỗi chức năng hydration (chức năng đồng bộ UI phía client và server) của framework (vd như Extensions Adblock, Dark Reader)

# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
