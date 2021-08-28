import * as yup from 'yup';
import { Create/*=~ it.EntityName */Fields } from './types';

export const create/*=~ it.EntityName */Schema: yup.SchemaOf<Create/*=~ it.EntityName */Fields> = yup.object().shape({
  name: yup.string().required(),
});
