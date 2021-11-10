import express from 'express';
import createError from 'http-errors';
import log4js from 'log4js';
import { join as joinPath } from 'path';

import { root } from './config.js';
import router from './routes.js';

export function createApplication(config) {
  const app = express();
  const logger = config.createLogger('app');

  app.set('config', config);
  app.set('env', config.env);
  app.set('port', config.port);

  // Use https://pugjs.org for templates.
  app.set('views', joinPath(root, 'views'));
  app.set('view engine', 'ejs');

  // Log requests.
  app.use(log4js.connectLogger(logger, { level: 'DEBUG' }));

  // Serve static files from the public directory.
  app.use(express.static(joinPath(root, 'public')));

  // Set the title for all pages, including the error page.
  app.use(provideTitleToViews(config.title));

  // Plug in application routes.
  app.use('/', router);

  // Catch 404 and forward to the global error handler.
  app.use((req, res, next) => {
    next(createError(404));
  });

  // Global error handler
  app.use((err, req, res, next) => {
    logger.warn(err);

    // Set locals, only providing error in development.
    res.locals.message = err.message ?? 'An unexpected error occurred';
    res.locals.status = err.status ?? 500;
    res.locals.stack = config.env === 'development' ? err.stack : '-';

    // Render the error page.
    res.status(err.status || 500);
    res.render('error');
  });

  return app;
}

function provideTitleToViews(title) {
  return (req, res, next) => {
    res.locals.title = title;
    next();
  };
}
