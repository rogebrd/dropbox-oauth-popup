import { DropboxAuth } from 'dropbox';

function dispatchResult() {
  const params = window.location.href;
  if (window.opener) {
    // send them to the opening window
    window.opener.postMessage(params);
    // close the popup
    window.close();
  }
}

window.addEventListener('load', dispatchResult);

const popupFeatures = 'toolbar=no, menubar=no, width=600, height=800, top=100, left=100';
const popupName = 'Dropbox OAuth';
export default class DropboxPopup {
  constructor(options) {
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.authObject = new DropboxAuth({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
    });
    this.redirectUri = options.redirectUri;
    this.codeOffset = this.redirectUri.length + 7; // format is `${redirectUri}/?code={code}
  }

  authUser(callback) {
    window.removeEventListener('message', this.handleRedirect);
    this.callback = callback;
    this.callback.bind(this);
    const authUrl = this.authObject.getAuthenticationUrl(this.redirectUri, '', 'code', 'offline');
    const popupWindow = window.open(authUrl, popupName, popupFeatures);
    popupWindow.focus();

    window.addEventListener('message', (event) => this.handleRedirect(event), false);
  }

  handleRedirect(event) {
    const { data } = event;
    const code = data.substring(this.codeOffset);
    this.authObject.getAccessTokenFromCode(this.redirectUri, code)
      .then((response) => {
        const { result } = response;
        this.authObject.setAccessToken(result.access_token);
        this.authObject.setRefreshToken(result.refresh_token);
        this.authObject.setAccessTokenExpiresAt(new Date(Date.now() + result.expires_in));
        this.callback(this.authObject);
      })
      .catch((error) => {
        throw error;
      });
  }
}
