import Router from '@koa/router';
import { ensureUser, ensureCaptcha } from '../../middleware/user';
import {
  // createUser,
  sampleAction,
} from './controller';

export function use/*=~ it.ModuleName */ConfigureRouter(router: Router) {
  router.post('//*=~ it.Path */', ensureCaptcha, sampleAction);
}
