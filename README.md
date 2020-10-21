[![Logo][logo]][repo]

[![npm](https://img.shields.io/npm/v/dropbox-oauth-popup)](https://www.npmjs.com/package/dropbox-oauth-popup)
![npm](https://img.shields.io/npm/dy/dropbox-oauth-popup)
![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hy/dropbox-oauth-popup)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/rogebrd/dropbox-oauth-popup/dropbox)


This is a simple addition built onto the [Dropbox SDK][sdk] that allows for OAuth in the browser to be done via a popup window.

You can view our documentation on [GitHub Pages][documentation].

## Usage

1. Create a new instance of the `DropboxPopup` class

```
const popup = new DropboxPopup({
    clientId: 'XXXXXXXXXX',
    clientSecret: 'XXXXXXXXXX',
    redirectUri: 'https://XXXXXXXXXX'
});
```

2. Run the popup window, giving your callback function for use with the `DropboxAuth` object

```
popup.authUser((auth) => {
    const dbx = new Dropbox(auth);
}
```

## Distributions

If you are using this via a node project compiled into browser assets, you can install via npm

```
npm install --save-dev dropbox-oauth-popup
```

Or you can use it directly in your browser be including the following tag

```
<script src="https://cdn.jsdelivr.net/npm/dropbox-oauth-popup@1.4.0"></script>
```

## License

This package is distributed under the MIT license, please see [LICENSE][license] for more information.

[logo]: https://repository-images.githubusercontent.com/304185097/6579e180-0fd1-11eb-9d46-91db905a363a
[repo]: https://github.com/rogebrd/dropbox-oauth-popup
[sdk]: https://github.com/dropbox/dropbox-sdk-js
[documentation]: https://rogebrd.github.io/dropbox-oauth-popup
[license]: https://github.com/rogebrd/dropbox-oauth-popup/blob/main/LICENSE