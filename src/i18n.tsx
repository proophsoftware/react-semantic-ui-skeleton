import i18n from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';

const resources = require('i18next-resource-store-loader!./i18n/index.js');

const detectionOptions = {
    // order and from where user language should be detected
    order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

    // cache user language on
    caches: ['localStorage', 'cookie'],
    excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
};

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LngDetector)
    // pass the i18n instance to the react-i18next components.
    // Alternative use the I18nextProvider: https://react.i18next.com/components/i18nextprovider
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        detection: detectionOptions,
        fallbackLng: 'en',
        debug: true,

        resources: resources,

        // special options for react-i18next
        // learn more: https://react.i18next.com/components/i18next-instance
        react: {
            wait: true,
        },
    });

export default i18n;