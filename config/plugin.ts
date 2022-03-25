import { EggPlugin } from 'egg';

const plugin: EggPlugin = {};

plugin.validate = {
  enable: true,
  package: 'egg-validate',
};


export default plugin;
