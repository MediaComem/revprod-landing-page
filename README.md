# The Revolutionary Product - Landing Page

Landing page for The Revolutionary Product, a multi-component web application to
illustrate [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
and [reverse proxying](https://en.wikipedia.org/wiki/Reverse_proxy).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

- [Requirements](#requirements)
- [Development](#development)
- [Production](#production)
- [Configuration](#configuration)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Requirements

- [Node.js][node] 18.x

## Development

```bash
# Clone and move into the repository
git clone https://github.com/MediaComem/revprod-landing-page.git
cd revprod-landing-page

# Install dependencies
npm ci

# Run the application in development mode
npm run dev
```

## Production

```bash
# Clone and move into the repository
git clone https://github.com/MediaComem/revprod-landing-page.git
cd revprod-landing-page

# Install dependencies
npm install --production

# Run the application in development mode
REVPROD_BACKEND_BASE_URL=https://revprod.example.com node ./bin.js
```

## Configuration

The application can be configured using the following environment variables:

| Variable                   | Default value                            | Description                                                     |
| :------------------------- | :--------------------------------------- | :-------------------------------------------------------------- |
| `REVPROD_BACKEND_BASE_URL` | -                                        | The public URL at which the revprod backend can be accessed.    |
| `REVPROD_LISTEN_HOST`      | `0.0.0.0`                                | The IP address to listen to (use `0.0.0.0` for any IP address). |
| `REVPROD_LISTEN_PORT`      | `3000`                                   | The port to listen on.                                          |
| `REVPROD_TITLE`            | `The Revolutionary Product`              | The title displayed in the navbar.                              |
| `REVPROD_LOG_LEVEL`        | `DEBUG` in production, `TRACE` otherwise | The highest level of log messages to output.                    |

> In development mode, you can also put these settings in a `.env` file in the
> repository. See the `.env.sample` file.

[cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[node]: https://nodejs.org
