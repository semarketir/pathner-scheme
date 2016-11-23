import uriHelper from './uri-helper';

const STORE = {
    GOOGLE_STORE_URL: 'https://app.adjust.com/r1ybn5',
    ANDROID_STORE_URL: 'https://play.google.com/store/apps/details?id=com.path'
};

let timeoutId;
const WAITING_TIME = 1500,
    EXPIRE_TIME = (WAITING_TIME * 2);

/**
 * In browser doesn't support intent scheme Url will be loaded by iframe
 */
export const openByIframe = (dom, scheme, storeUrl) => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    // Iframe will be used to open scheme Url when browser doesn't support intent
    const iframeObject = dom.getHiddenIframe(scheme, () => {
        clearTimeout(timeoutId);
        dom.setLocation(scheme);
    });

    const startTimestamp = new Date().getTime();

    timeoutId = setTimeout(() => {
        const endTimestamp = new Date().getTime();
        // This check prevents opening the store url after EXPIRE_TIME
        if ((endTimestamp - startTimestamp) >= EXPIRE_TIME) return;

        iframeObject.remove();
        dom.setLocation(storeUrl);
    }, WAITING_TIME);

    $('body').append(iframeObject);
};

/**
 * Check browser for supporting intent.
 * - Chrome for Android from versions 25 and later is no longer possible to launch an Android app by setting an iframe's src attribute
 * - Firefox for Android from version 41 and later is supporting to Open Android applications from a web page via Intent URIs
 * - Opera Mini for Android from version 11 and later is supporting to Open Android applications from a web page via Intent URIs
 * @see:
 * - https://developer.chrome.com/multidevice/android/intents
 * - https://www.mozilla.org/en-US/firefox/android/41.0/releasenotes
 * - https://www.opera.com/docs/specs/presto29/#changes
 * - https://dev.opera.com/extensions/match-patterns/
 */
export const isSupportingIntent = (agent) => {
    if (agent.isChrome && agent.version > 24) {
        return true;
    } else if (agent.isFirefox && agent.version > 40) {
        return true;
    } else if (agent.isOperaMini) {
        return true;
    }
    return false;
};

/**
 * Open scheme url. If app doesn't install, redirect to store.
 * @param {string} scheme
 * @param {{dom, agent, scheme, ?unsupportedHandler}} store
 */
export const openScheme = (options) => {
    const {dom, agent, scheme, unsupportedHandler} = options;

    if (!agent.isAndroid) {
        if (_.isFunction(unsupportedHandler)) {
            unsupportedHandler();
        }
    } else {
        let googleStoreUrl = STORE.GOOGLE_STORE_URL,
            androidStoreUrl = STORE.ANDROID_STORE_URL;

        //In browser support intent scheme Url will be loaded by intent scheme
        if (isSupportingIntent(agent)) {
            /**
             * Chrome at Android cannot resolve fallback market scheme from adjust; redirect params is appended to handle it.
             * @see http://stackoverflow.com/questions/28266051/android-play-store-market-link-is-no-longer-working/28279849#28279849
             */
            if (agent.isAndroid && agent.isChrome) {
                googleStoreUrl = uriHelper.addAdjustRedirect(googleStoreUrl, androidStoreUrl);
            }
            const pathScheme = scheme.split('://');
            /**
             * Look at S.browser_fallback_url syntax
             * @see https://developer.chrome.com/multidevice/android/intents#syntax
             */
            const intentUri = `intent://${pathScheme[1]}#Intent;scheme=${pathScheme[0]};package=com.path;S.browser_fallback_url=${encodeURIComponent(googleStoreUrl)};end;`;

            dom.setLocation(intentUri);
        } else {
            openByIframe(dom, scheme, googleStoreUrl);
        }
    }
};

export default openScheme;
