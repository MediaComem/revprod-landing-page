import { isInteger } from 'lodash-es';
import log4js from 'log4js';
import { dirname, join as joinPath, resolve as resolvePath } from 'path';
import { fileURLToPath } from 'url';

export const logLevels = ['FATAL', 'ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'];

const __dirname = dirname(fileURLToPath(import.meta.url));
export const root = resolvePath(joinPath(__dirname, '..'));

export async function loadConfig() {
  await loadDotenv();

  const env = process.env.NODE_ENV ?? 'development';

  const host = parseEnvString('REVPROD_LISTEN_HOST', '0.0.0.0');
  const port = parseEnvPort('REVPROD_LISTEN_PORT', 3000);

  const logLevel = parseEnvEnum(
    'REVPROD_LOG_LEVEL',
    logLevels,
    env === 'production' ? 'DEBUG' : 'TRACE',
    value => value.toUpperCase()
  );

  const title = parseEnvString('REVPROD_TITLE', 'The Revolutionary Product');
  const backendBaseUrl = parseEnvString('REVPROD_BACKEND_BASE_URL', '');

  function createLogger(category) {
    const logger = log4js.getLogger(category);
    logger.level = logLevel;
    return logger;
  }

  const logger = createLogger('config');
  logger.info(`Environment: ${env}`);
  logger.info(`Log level: ${logLevel}`);
  logger.info(`Backend base URL: ${backendBaseUrl}`);

  return {
    // Environment,
    env,
    // Server
    host,
    port,
    // Application
    title,
    backendBaseUrl,
    // Functions
    createLogger
  };
}

async function loadDotenv() {
  let dotenv;
  try {
    dotenv = await import('dotenv');
  } catch (err) {
    // Ignore
  }

  if (dotenv) {
    dotenv.config();
  }
}

function getEnvString(varName, required = true) {
  const value = process.env[varName];
  if (required && value === undefined) {
    throw new Error(`$${varName} is required`);
  }

  return value;
}

function parseEnvEnum(varName, allowedValues, defaultValue, coerce) {
  const value = getEnvString(varName, defaultValue === undefined);
  if (value === undefined) {
    return defaultValue;
  }

  const coerced = coerce(value);
  if (!allowedValues.includes(coerced)) {
    throw new Error(
      `$${varName} must be one of ${allowedValues
        .map(allowed => JSON.stringify(allowed))
        .join(', ')}, but its value is ${JSON.stringify(coerced)}`
    );
  }

  return coerced;
}

function parseEnvInt(varName, defaultValue, min, max) {
  const value = getEnvString(varName, defaultValue === undefined);
  if (value === undefined) {
    return defaultValue;
  }

  const parsed = parseInt(value, 10);
  if (
    !isInteger(parsed) ||
    (min !== undefined && value < min) ||
    (max !== undefined && value > max)
  ) {
    throw new Error(
      `$${varName} must be an integer between ${min ?? '-Infinity'} and ${
        max ?? 'Infinity'
      }, but its value is ${JSON.stringify(value)}`
    );
  }

  return parsed;
}

function parseEnvPort(varName, defaultValue) {
  return parseEnvInt(varName, defaultValue, 1, 65_535);
}

function parseEnvString(varName, defaultValue) {
  const value = getEnvString(varName, defaultValue === undefined);
  return value ?? defaultValue;
}
