import { Controller } from 'egg';

const getRule = {
  datasheetId: 'string',
  viewId: 'string',
};

const createRule = {
  ...getRule,
  title: 'string',
};

const updateRule = {
  ...getRule,
  recordId: 'string',
  isFinish: 'boolean',
};

const deleteRule = {
  ...getRule,
  recordId: 'string',
};

export default class VikaController extends Controller {
  public async index() {
    const { ctx } = this;
    const params = {
      datasheetId: ctx.query.datasheetId,
      viewId: ctx.query.viewId,
    };
    ctx.validate(getRule, ctx.request.query);
    const vikaList = await ctx.service.vika.getDatasheetRecords(params);
    ctx.body = vikaList;
  }

  async create() {
    const { ctx } = this;
    const params = {
      datasheetId: ctx.query.datasheetId,
      viewId: ctx.query.viewId,
      title: ctx.request.body.title,
    };
    ctx.validate(createRule, params);
    const res = await ctx.service.vika.create(params);
    ctx.body = res;
    ctx.status = 201;
  }

  async update() {
    const { ctx } = this;
    const params = {
      datasheetId: ctx.query.datasheetId,
      viewId: ctx.query.viewId,
      recordId: ctx.params?.id,
      isFinish: ctx.request.body?.isFinish,
    };
    ctx.validate(updateRule, params);
    const res = await ctx.service.vika.update(params);
    ctx.body = res;
  }

  async destroy() {
    const { ctx } = this;
    const params = {
      datasheetId: ctx.query.datasheetId,
      viewId: ctx.query.viewId,
      recordId: ctx.params.id,
    };
    ctx.validate(deleteRule, params);
    const res = await ctx.service.vika.delete(params);
    ctx.body = res;
  }
}
