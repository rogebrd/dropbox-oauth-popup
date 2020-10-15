# Dropbox OAuth Popup Window
[![npm](https://img.shields.io/npm/v/dropbox-oauth-popup)](https://www.npmjs.com/package/dropbox-oauth-popup)

This is a simple addition built onto the [Dropbox SDK](https://github.com/dropbox/dropbox-sdk-js) that allows for OAuth in the browser to be done via a popup window.

# Usage

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

# Distributions

If you are using this via a node project compiled into browser assets, you can install via npm

```
npm install --save-dev dropbox-oauth-popup
```

Or you can use it directly in your browser be including the following tag

```
<script src="https://cdn.jsdelivr.net/npm/dropbox-oauth-popup@1.0.0"></script>
```