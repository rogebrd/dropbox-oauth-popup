import { DropboxAuth } from 'dropbox';

/**
 * This function is meant to run on page load and is in charge
 * of dispatching messages from the popup window back to the
 * main window.
 */
function dispatchResult() {
  const params = window.location.search;
  if (window.opener) {
    // send them to the opening window
    window.opener.postMessage(params);
    // close the popup
    window.close();
  }
}

window.addEventListener('load', dispatchResult);

const windowName = 'Dropbox OAuth';
const defaultWindowOptions = {
  toolbar: 'no',
  menubar: 'no',
  width: 600,
  height: 800,
  top: 100,
  left: 100,
};

/**
 * @class DropboxPopup
 * @classdesc The DropboxPopup class is to provide a simple popup window to preform OAuth in.
 * @param {object} options
 * @param {string} options.clientId - The client id for your app.
 * @param {string} [options.clientSecret] - The client secret for your app.
 * @param {string} [options.redirectUri] - The redirect Uri to return to once auth is complete.
 * @param {string} [options.tokenAccessType] - type of token to request.  From the following:
 * legacy - creates one long-lived token with no expiration
 * online - create one short-lived token with an expiration
 * offline - create one short-lived token with an expiration with a refresh token
 * @param {Array<string>} [options.scope] - scopes to request for the grant
 * @param {string} [options.includeGrantedScopes] - whether or not to include
 * previously granted scopes.
 * From the following:
 * user - include user scopes in the grant
 * team - include team scopes in the grant
 * Note: if this user has never linked the app, include_granted_scopes must be None
 * @param {boolean} [options.usePKCE] - Whether or not to use Sha256 based PKCE.
 * PKCE should be only use on client apps which doesn't call your server.
 * It is less secure than non-PKCE flow but can be used if you are unable to safely
 * retrieve your app secret
 * @param {object} [windowOptions]
 * @param {number} [windowOptions.width] - The width of the popup window in pixels.
 * @param {number} [windowOptions.height] - The height of the popup window in pixels.
 * @param {number} [windowOptions.top] - The number of pixels from the top of the screen.
 * @param {number} [windowOptions.left] - The number of pixels from the left side of the screen.
 * @param {object} [windowOptions.additionalParams] - Any additional parameters desired to be used
 * with the window.open() command. Note, by default, we add the parameters toolbar=no and menubar=no
 * in order to ensure this opens as a popup.
 */
export default class DropboxPopup {
  constructor(options, windowOptions) {
    this.clientId = options.clientId;
    this.redirectUri = options.redirectUri;
    this.clientSecret = options.clientSecret || '';
    this.tokenAccessType = options.tokenAccessType || 'offline';
    this.scope = options.scope || null;
    this.includeGrantedScopes = options.includeGrantedScopes || 'none';
    this.usePKCE = options.usePKCE || false;

    this.authObject = new DropboxAuth({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
    });

    this.state = Math.random().toString(36).substring(7);

    // Set window options with format of key=value,key=value...
    const overlayedWindowOptions = Object.assign(defaultWindowOptions, windowOptions);
    this.windowOptions = '';
    Object.keys(overlayedWindowOptions).forEach((key) => {
      if (this.windowOptions === '') {
        this.windowOptions = `${key}=${overlayedWindowOptions[key]}`;
      } else {
        this.windowOptions = this.windowOptions.concat(`, ${key}=${overlayedWindowOptions[key]}`);
      }
    });
  }

  /**
   * The main function to handle authentication via a popup window.
   *
   * @param {Function} callback - The callback function which will utilize the DropboxAuth object.
   * @returns {void}
   */
  authUser(callback) {
    window.removeEventListener('message', this.handleRedirect);
    this.callback = callback;
    this.callback.bind(this);
    const authUrl = this.authObject.getAuthenticationUrl(this.redirectUri, this.state, 'code', this.tokenAccessType, this.scope, this.includeGrantedScopes, this.usePKCE);
    const popupWindow = window.open(authUrl, windowName, this.windowOptions);
    popupWindow.focus();

    window.addEventListener('message', (event) => this.handleRedirect(event), false);
  }

  /**
   * The function in charge of handling the redirect once the popup has completed.
   *
   * @param {MessageEvent} event - The incoming message from the popup window.
   * @returns {void}
   */
  handleRedirect(event) {
    const { data } = event;
    const urlParams = new URLSearchParams(data);
    const code = urlParams.get('code');
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
