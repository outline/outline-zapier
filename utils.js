// utils.js
function getBaseUrl(bundle) {
    // Use the user-supplied URL or fallback to the default.
    return bundle.authData.instance_url || 'https://app.getoutline.com';
}

module.exports = { getBaseUrl };
