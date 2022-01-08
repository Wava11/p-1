## `./components`
This directory contains common components for different pages of the application.

## `./entities`
This directory contains:
1.  Types common to frontend and backend
2.  Backend logic

## `./pages`
This directory defines the routing of the application.
Each subdirectory defines a router and its `index.ts` should `export default` a function that handles the `/` route of the router.
### `./pages/api`
This directory defines the backend http API.

## Code of Conduct
1.  Minimal amount of dependencies
2.  Plan first, then test, and finally implement

_____


> This project uses [`next-pwa`](https://github.com/shadowwalker/next-pwa) to create a progressive web app (PWA) powered by [Workbox](https://developers.google.com/web/tools/workbox/).