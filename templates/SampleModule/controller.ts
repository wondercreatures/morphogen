import CONFIG from '../../config';
import { ActionRequestType, cleanAction } from '../../project-types/common/api-types';

export const sampleAction: cleanAction<ActionRequestType> = async (ctx, next) => {
  ctx.body = {
  };

  await next();
};
