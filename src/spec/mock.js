let mock = {};

// Mock Variables
mock.data = {
    agent: {
        chrome: 'Mozilla/5.0 (Linux; Android 5.1; SHIELD Android TV Build/LMY47D) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.93 Mobile Safari/537.36',
        opera: 'Opera/9.80 (Android; Opera Mini/7.5.31657/35.5125; U; ms) Presto/2.8.119 Version/11.10',
        firefox: 'Mozilla/5.0 (Android 4.4; Mobile; rv:41.0) Gecko/41.0 Firefox/41.0',
        others: 'Mozilla/5.0 (Linux; U; Android 4.1.1; zh-cn; MI 2SC Build/JRO03L) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 XiaoMi/MiuiBrowser/2.1.1',
        iphone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13C75 Safari/601.1'
    },
    intentScheme: {
        moment: 'intent://moments/576b6876dda481d2c5bad6b2#Intent;scheme=path;package=com.path;S.browser_fallback_url=https%3A%2F%2Fapp.adjust.com%2Fr1ybn5;end;',
        profile: 'intent://users/5448a22d441e1dbb45f27800#Intent;scheme=path;package=com.path;S.browser_fallback_url=https%3A%2F%2Fapp.adjust.com%2Fr1ybn5;end;'
    },
    customScheme: {
        moment: 'path://moments/576b6876dda481d2c5bad6b2',
        profile: 'path://users/5448a22d441e1dbb45f27800'
    }
};

// Mock Dom Helper
mock.dom = {
    frames: {},

    setLocation(newLocation) {
        this.newLocation = newLocation;
    },

    getHiddenIframe(src, onLoad) {
        const iframe = this.frames[src] = {
            src: src,
            style: 'display:none;',
            load: onLoad,
            remove: function () {}
        };
        return iframe;
    },

    fireLoad(src) {
        if (this.frames[src]) {
            this.frames[src].load();
        }
    },

    clear() {
        this.frames = {};
    }
};

export default mock;
