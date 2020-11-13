# Upgrading the OAuth Popup

This document shows you how to upgrade to the latest version of the popup, accomodating any breaking changes introduced by major version updates. If you find any issues with either this guide on upgrading or the changes introduced in the new version, please see file an issue.

# Upgrading from v1.X.X to v2.X.X

## Updating from callbacks to promises

We have updated the library to use the newer promises over callbacks. Previously this would have looked like this:

```
var popup = new DropboxPopup();
popup.authUser((auth) => {
    // Do logic with auth
});
```

This now becomes:

```
var popup = new DropboxPopup();
popup.authUser().then((auth) => {
    // Do logic with auth
}).catch((error) => {
    // Handle Error
});
```

## Timeout Functionality

We have also added timeout functionality. When attempting to authenticate, we will timeout and throw an error if the request is not fulfilled in the time specified. The default is 5 minutes but can be configured to any time in milliseconds.

