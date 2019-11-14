import Vue from 'vue'
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

Sentry.init({
  dsn: 'https://5932c29f39d34a268020291d0bc65c18@sentry.io/1800883',
  integrations: [new Integrations.Vue({Vue, attachProps: true})],
});