export interface /*=~ it.EntityName */PublicFields {
  name: string,
}

export type Create/*=~ it.EntityName */Fields = Pick</*=~ it.EntityName */PublicFields, 'name'>;

export type Update/*=~ it.EntityName */Fields = Pick</*=~ it.EntityName */PublicFields, 'name'>;
