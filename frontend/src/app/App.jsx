import Raven from 'raven-js';
import initApp from './appInit.jsx';

if($SENTRY) {
    Raven.config($SENTRY_DSN, {
        release: $VERSION
    }).install();
    Raven.setTagsContext($RUNNING_CONTEXT);
} else {
    console.warn("Sentry: Disabled logging via buildConfig variable.");
}

initApp(document);