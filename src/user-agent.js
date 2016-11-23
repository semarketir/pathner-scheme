const REGEX_CHECK_IOS = /(iphone|ipad|ipod)/i,
    REGEX_CHECK_ANDROID = /android/i;

const REGEX_CHECK_CHROME = /chrome\/(\d+)/i,
    REGEX_CHECK_FIREFOX = /firefox\/(\d+)/i,
    REGEX_CHECK_OPERA = /(opr|opera mini)/i;

export const createAgent = (agentString) => {
    let result;
    let agent = {
        isChrome: false,
        isFirefox: false,
        isOperaMini: false,
        isAndroid: false,
        isIOS: false,
        isUnknown: false,
        version: 0
    };

    if (REGEX_CHECK_ANDROID.exec(agentString)) {
        agent.isAndroid = true;
    } else if (REGEX_CHECK_IOS.exec(agentString)) {
        agent.isIOS = true;
    }

    if ((result = REGEX_CHECK_CHROME.exec(agentString))) {
        agent.isChrome = true;
    } else if ((result = REGEX_CHECK_FIREFOX.exec(agentString))) {
        agent.isFirefox = true;
    } else if (REGEX_CHECK_OPERA.test(agentString)) {
        agent.isOperaMini = true;
    } else {
        agent.isUnknown = true;
    }

    // version is appeared after browser name with '/'. eg: Chrome/43.0.2357.93
    if (result) {
        agent.version = parseFloat(result[1]);
    }

    return agent;
};

export default createAgent(navigator.userAgent);
