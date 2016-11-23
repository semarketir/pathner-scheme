export default {
    /**
     * Adjust provide options for redirected to a specific location using the following redirect parameters.
     * @see https://docs.adjust.com/en/tracker-generation/#redirecting-per-specific-platform
     *
     * @param url
     * @param storeUrl
     * @returns {string|*}
     */
    addAdjustRedirect(url, storeUrl) {
        url += (url.split('?')[1] ? '&' : '?') + 'redirect_android=' + encodeURIComponent(storeUrl);
        return url;
    }
};
