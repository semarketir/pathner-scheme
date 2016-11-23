import expect from 'expect';
import uriHelper from '../uri-helper';

describe('URI Helper', () => {
    it('addAdjustRedirect(url, storeUrl)', () => {
        // Given
        var STORE_URL = 'https://play.google.com/store/apps/details?id=com.path';
        var URL = 'https://app.adjust.com/r1ybn5';

        // When, Then
        expect(uriHelper.addAdjustRedirect(URL, STORE_URL)).toEqual('https://app.adjust.com/r1ybn5?redirect_android=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.path');

        // Given
        URL = 'https://app.adjust.com/r1ybn5?foo=bar';

        // When, Then
        expect(uriHelper.addAdjustRedirect(URL, STORE_URL)).toEqual('https://app.adjust.com/r1ybn5?foo=bar&redirect_android=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.path');
    });
});
