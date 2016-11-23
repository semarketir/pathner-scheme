export default {
    setLocation(newLocation) {
        location.href = newLocation;
    },

    getHiddenIframe(src, onLoad) {
        return $('<iframe />', {
            src: src,
            style: 'display:none;',
            load: onLoad
        });
    }
};
