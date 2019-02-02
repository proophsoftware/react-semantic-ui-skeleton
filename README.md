# react-semantic-ui-skeleton

React + Redux + Semantic UI Skeleton with Typescript

Based on [Create React App](https://github.com/facebook/create-react-app).

This application uses [semantic ui themes](https://semantic-ui.com/usage/theming.html). Take a look at the `semantic` folder.
**Note:** We have to copy the themes from the nodes_modules package `semantic-ui` to `semantic` manually after updates to get the latest assets.

## Configuration
After you have copied these sources to your project you may want to change some default values.
This is a list of files which contains default values.

- `app.env.dist`: url
- `package.json`: change name, configure [proxy](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development) for dev
- `public/index.html`: change title
- `public/manifest.json`: change name
- `src/api/ConfiguredAxios.ts`: base API url
- `src/notify.tsx`: change logo
- `src/reducer.ts`: add your reducers
- `src/serviceWorker.ts`: notification text
- `docker-compose.yml.dist`: Docker Dev Env (f.e. join backend network)

## Frontend build
We have a two stage build.

> All assets are put to `src/theme` folder and referenced via TS files. The webpack loader does the rest.

- First we have to build semantic ui theme which is used in `index.ts` file and compiled to `src/theme/semantic`
  - If you change something in the `semantic` folder you have to compile the semantic theme and after that the react app.
- Second we build our react application

## Prerequisites
You have to manually install the dependencies and to compile the semantic ui theme.

```bash
docker run --rm -i -v $(pwd):/app sandrokeil/typescript yarn install

docker run --rm -i -v $(pwd):/app sandrokeil/typescript yarn run semantic
```

Now you can start the development server and open [http://localhost:3000/](http://localhost:3000/) in your favourite browser.

```
$ docker run --rm --env-file=app.env.dist -i -p "4000:4000" -p "3000:3000" -v $(pwd):/app sandrokeil/typescript yarn start
```

## Testing
```
docker run --rm --env-file=app.env.dist -i -v $(pwd):/app sandrokeil/typescript yarn test
```

## Production build
```
docker run --rm --env-file=app.env.dist -i -v $(pwd):/app sandrokeil/typescript yarn run build
```

## Links

- [Feature like module structure](https://www.robinwieruch.de/tips-to-learn-react-redux/#folderOrganization)
- [Redux 4 + TypeScript: A type-safe approach](https://resir014.xyz/posts/2018/07/06/redux-4-plus-typescript/)
- [A Strongly-Typed Redux Action Pattern for TypeScript 2.4+](https://spin.atomicobject.com/2017/07/24/redux-action-pattern-typescript/)
- [Turning Requirements into React/Redux Code](https://decembersoft.com/posts/turning-requirements-into-react-redux-code/)
- [Higher Order Components (HOCs)](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e)
- [Use a Render Prop!](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)
- [React is Slow, React is Fast](https://marmelab.com/blog/2017/02/06/react-is-slow-react-is-fast.html)
- [Curated tutorial and resource links for React / Redux](https://github.com/markerikson/react-redux-links)

## Browser extensions

- Install [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)
- Install [react-extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

## TODO

- The package [`recompose`](https://github.com/acdlite/recompose) is deprecated in favour of React Hooks, but it's not released yet.