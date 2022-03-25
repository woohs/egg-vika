import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.resources('vika', '/api/v1/vika', app.controller.vika);
  router.get('/', controller.home.index);

};
