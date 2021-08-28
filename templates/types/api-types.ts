import { ActionRequestType } from '../common/api-types';
import { HTTP_METHODS, HTTP_RESPONSE_CODES } from '../common/http-types';
import { /*=~ it.EntityName */PublicFields, Create/*=~ it.EntityName */Fields, Update/*=~ it.EntityName */Fields } from './types';

export type PATH = '//*=~ it.EntityKey */s';

export interface ApiCreate/*=~ it.EntityName */ extends ActionRequestType {
  url: [PATH];
  method: HTTP_METHODS.POST;
  data: Create/*=~ it.EntityName */Fields;
  successResponse: {
    /*=~ it.EntityKey */: /*=~ it.EntityName */PublicFields
  };
  failResponse: never;
  failStatus: HTTP_RESPONSE_CODES.FORBIDDEN;
}

export interface ApiGet/*=~ it.EntityName */sList extends ActionRequestType {
  url: [PATH];
  method: HTTP_METHODS.GET;
  successResponse: {
    /*=~ it.EntityKey */s: Array</*=~ it.EntityName */PublicFields>
  };
  failResponse: never
  failStatus: HTTP_RESPONSE_CODES.FORBIDDEN;
}

export interface ApiGetOne/*=~ it.EntityName */ extends ActionRequestType {
  url: [PATH, '/', string];
  method: HTTP_METHODS.GET;
  urlParams: Record<'/*=~ it.EntityName */Id', string | undefined>
  successResponse: {
    /*=~ it.EntityKey */: /*=~ it.EntityName */PublicFields
  }
  failStatus: HTTP_RESPONSE_CODES.FORBIDDEN;
}

export interface ApiUpdate/*=~ it.EntityName */ extends ActionRequestType {
  url: [PATH, '/', string];
  method: HTTP_METHODS.PATCH;
  data: Update/*=~ it.EntityName */Fields;
  successResponse: {
    /*=~ it.EntityKey */: /*=~ it.EntityName */PublicFields;
  }
  failStatus: HTTP_RESPONSE_CODES.FORBIDDEN;
}

export interface ApiDelete/*=~ it.EntityName */ extends ActionRequestType {
  url: [PATH, '/', string];
  method: HTTP_METHODS.DELETE;
  successResponse: never
  failStatus: HTTP_RESPONSE_CODES.FORBIDDEN;
}
