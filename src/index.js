import agent from './user-agent';
import dom from './dom-helper';
import openScheme from './scheme-helper';

window.pathnerScheme = (options) => {
    const {subject, text} = options;
    const scheme = `path://compose/thought?subject=${encodeURIComponent(subject)}&text=${encodeURIComponent(text)}`;
    openScheme(_.assignIn({scheme}, options, {dom, agent}));
};
