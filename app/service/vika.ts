import { Service } from 'egg';
import { Vika as VikaSdk } from '@vikadata/vika';
import moment from 'moment';
import { FORMAT_YMDHMS } from '../common/constants';

interface IVikaProps {
  datasheetId: string;
  viewId: string;
}

interface CreateProps extends IVikaProps {
  title: string
}

interface UpdateProps extends IVikaProps {
  recordId: string
  isFinish: boolean
}

interface DeleteProps extends IVikaProps {
  recordId: string
}

export default class Vika extends Service {
  datasheet: any;
  vika: VikaSdk;
  viewId: string;
  datasheetId: string;

  constructor(ctx) {
    super(ctx);
    this.vika = new VikaSdk({
      token: 'usktxAyFwU47Gao1ZFkQ9BS', // TODO: 需要通过环境变量获取
    });

    // this.datasheetId = ctx.query.datasheetId; // 'dstxqoKfMf5dWsAbkB'
    // this.viewId = ctx.query.viewId; // viw0EJZvH8HKH
  }

  async getDatasheetRecords({ datasheetId, viewId }: IVikaProps) {
    try {
      // 查询记录
      const resp = await this.vika.datasheet(datasheetId).records.query({
        viewId,
      });

      if (resp.success) {
        return resp.data.records;
      }
      this.ctx.throw(404, resp.message);
    } catch (error) {
      this.ctx.throw(500, error);
    }
  }

  async create({ datasheetId, title }: CreateProps) {
    const resp = await this.vika.datasheet(datasheetId).records.create([
      {
        fields: {
          待办项: title,
          开始时间: moment().format(FORMAT_YMDHMS),
        },
      },
    ]);

    try {
      if (resp.success) {
        return resp.data.records;
      }
      this.ctx.throw(404, resp.message);
    } catch (error) {
      this.ctx.throw(500, error);
    }
  }

  async update({ datasheetId, isFinish, recordId }: UpdateProps) {
    const resp = await this.vika.datasheet(datasheetId).records.update([
      {
        recordId,
        fields: {
          是否完成: isFinish,
          完成时间: moment().format(FORMAT_YMDHMS),
        },
      },
    ]);

    try {
      if (resp.success) {
        return resp.data.records;
      }
      this.ctx.throw(404, resp.message);
    } catch (error) {
      this.ctx.throw(500, error);
    }
  }

  async delete({ datasheetId, recordId }: DeleteProps) {
    const resp = await this.vika.datasheet(datasheetId).records.delete([recordId]);

    try {
      if (resp.success) {
        return resp.data;
      }
      this.ctx.throw(404, resp.message);
    } catch (error) {
      this.ctx.throw(500, error);
    }
  }
}
