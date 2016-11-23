import expect from 'expect';
import mock from './mock';
import {createAgent as userAgent} from '../user-agent';

const mockAgent = mock.data.agent;

describe('User Agent', () => {
    it('agent(userAgentString)', () => {
        expect(userAgent(mockAgent.chrome).isChrome).toBe(true);
        expect(userAgent(mockAgent.chrome).version).toBeGreaterThanOrEqualTo(25);
        expect(userAgent(mockAgent.firefox).isFirefox).toBe(true);
        expect(userAgent(mockAgent.firefox).version).toBeGreaterThanOrEqualTo(41);
        expect(userAgent(mockAgent.opera).isOperaMini).toBe(true);
        expect(userAgent(mockAgent.others).isUnknown).toBe(true);

        expect(userAgent(mockAgent.chrome).isAndroid).toBe(true);
        expect(userAgent(mockAgent.iphone).isIOS).toBe(true);
    });
});
