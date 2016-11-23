import expect from 'expect';

import {createAgent as userAgent} from '../user-agent';
import openScheme, {openByIframe, isSupportingIntent} from '../scheme-helper';

import mock from './mock';

const mockData = mock.data;
const mockAgent = mockData.agent;

const STORE = {
    appleStoreUrl: 'https://app.adjust.com/ixp049',
    googleStoreUrl: 'https://app.adjust.com/r1ybn5',
    googleStoreUrlWithParams: 'https://app.adjust.com/r1ybn5?foo=bar',
    androidStoreUrl: 'https://play.google.com/store/apps/details?id=com.path'
};

describe('Open Scheme', () => {
    beforeEach(() => {
        mock.dom.clear();
    });

    it('isSupportingIntent(userAgent)', () => {
        expect(isSupportingIntent(userAgent(mockAgent.chrome))).toBe(true);
        expect(isSupportingIntent(userAgent(mockAgent.firefox))).toBe(true);
        expect(isSupportingIntent(userAgent(mockAgent.opera))).toBe(true);
        expect(isSupportingIntent(userAgent(mockAgent.others))).toBe(false);
    });

    it('openByIframe(scheme, storeUrl) : load scheme', () => {
        // Given
        const SCHEME = mockData.customScheme.profile;

        // When
        openByIframe(mock.dom, SCHEME, STORE);
        mock.dom.fireLoad(SCHEME);

        // Then
        expect(mock.dom.newLocation).toEqual(SCHEME);
    });

    it('openByIframe(scheme, storeUrl) : load store', function (done) {
        this.timeout(3100);

        // Given
        const SCHEME = mockData.customScheme.moment;

        // When
        openByIframe(mock.dom, SCHEME, STORE);

        // Then
        setTimeout(function () {
            expect(mock.dom.newLocation).toEqual(STORE);
            done();
        }, 3000);
    });

    it('openScheme(scheme, storeUrl) : iphone case', () => {
        // Given
        const SCHEME = mockData.customScheme.profile;
        const AGENT_STRING = mockAgent.iphone;

        // When
        openScheme({
            dom: mock.dom,
            agent: userAgent(AGENT_STRING),
            scheme: SCHEME,
            store: STORE,
            unsupportedHandler() {
                mock.dom.setLocation(SCHEME);
            }
        });

        // Then
        expect(mock.dom.newLocation).toEqual(SCHEME);
    });

    it('openScheme(scheme, storeUrl) : intent case', () => {
        // Given
        const SCHEME = mockData.customScheme.moment;
        const AGENT_STRING = mockAgent.firefox;

        // When
        openScheme({
            dom: mock.dom,
            agent: userAgent(AGENT_STRING),
            scheme: SCHEME,
            store: STORE
        });

        // Then
        expect(mock.dom.newLocation).toEqual(mockData.intentScheme.moment);
    });

    it('openScheme(scheme, storeUrl) : scheme case', () => {
        // Given
        const SCHEME = mockData.customScheme.profile;
        const AGENT_STRING = mockAgent.others;

        // When
        openScheme({
            dom: mock.dom,
            agent: userAgent(AGENT_STRING),
            scheme: SCHEME,
            store: STORE
        });
        mock.dom.fireLoad(SCHEME);

        // Then
        expect(mock.dom.newLocation).toEqual(SCHEME);
    });


    it('openScheme(scheme, storeUrl) : not loaded', function (done) {
        this.timeout(3100);
        // Given
        const CUSTOM = mockData.customScheme.moment;
        const AGENT_STRING = mockAgent.others;

        // When
        openScheme({
            dom: mock.dom,
            agent: userAgent(AGENT_STRING),
            scheme: CUSTOM,
            store: STORE
        });

        // Then
        setTimeout(function () {
            expect(mock.dom.newLocation).toEqual(STORE.googleStoreUrl);
            done();
        }, 3000);
    });
});
