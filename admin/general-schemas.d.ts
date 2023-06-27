import { Attribute, Utils, Common } from '@strapi/strapi';

// Helper used to add an ID attribute to another type
type WithID = { id: number };

// Custom GetRelationAttributeValue implementation for the content api
type ContentAPIRelationValue<T extends Attribute.Attribute> = T extends Attribute.Relation<
  infer A,
  infer B,
  infer C
>
  ? B extends `${string}Many`
    ? ResponseCollection<C>
    : Response<C>
  : never;

type Media = {
  name: string;
  width: number;
  height: number;
  size: number;
  url: string;
  alt?: string;
  caption?: string;
};

type MediaDataWrapper = {
  attributes: Media;
};

// Custom GetMediaAttributeValue implementation for the content api
type ContentAPIMediaValue<T extends Attribute.Attribute> = T extends Attribute.Media<
  unknown,
  infer R
>
  ? R extends true
    ? { data?: MediaDataWrapper[] }
    : { data?: MediaDataWrapper }
  : never;

// Custom GetDynamicZoneAttributeValue implementation for the content api
type ContentAPIDynamicZoneValue<T extends Attribute.Attribute> = T extends Attribute.DynamicZone<
  infer C
>
  ? Array<
      Utils.Array.Values<C> extends infer P
        ? P extends Common.UID.Schema
          ? GetAttributesValues<P> & { __component: P } & WithID
          : never
        : never
    >
  : never;

// Custom GetMediaAttributeValue implementation for the content api
type ContentAPIDateValue<T extends Attribute.Attribute> = T extends Attribute.Date ? Date : never;

// Aggregation of all the custom content api's custom value resolvers
type ContentAPIValueResolvers<T extends Attribute.Attribute> =
  | Attribute.GetBigIntegerValue<T>
  | Attribute.GetBooleanValue<T>
  | Attribute.GetComponentValue<T>
  | Attribute.GetDecimalValue<T>
  | Attribute.GetEnumerationValue<T>
  | Attribute.GetEmailValue<T>
  | Attribute.GetFloatValue<T>
  | Attribute.GetIntegerValue<T>
  | Attribute.GetJsonValue<T>
  | Attribute.GetPasswordValue<T>
  | Attribute.GetRichTextValue<T>
  | Attribute.GetStringValue<T>
  | Attribute.GetTextValue<T>
  | Attribute.GetUIDValue<T>
  | Attribute.GetDateTimeValue<T>
  | Attribute.GetTimeValue<T>
  | Attribute.GetTimestampValue<T>
  | ContentAPIDynamicZoneValue<T>
  | ContentAPIRelationValue<T>
  | ContentAPIDateValue<T>
  | ContentAPIMediaValue<T>;

// Custom GetAttributeValue implementation based on specific content api rules
// If the given attribute isn't handled by the custom resolvers, then it'll fallback
// to the base implementation and its resolvers
type GetValue<T extends Common.UID.Schema, U extends Attribute.GetKeys<T>> = Attribute.Get<
  T,
  U
> extends infer P
  ? P extends Attribute.Attribute
    ? ContentAPIValueResolvers<P>
    : never
  : never;

// Get the list of allowed attributes' names for the content api
// Removes privates and password fields for now
// note: creatorsFields are already handled since their private value is dynamic (set at content-type loading & dumped into the schemas typings)
type GetAllowedAttributesKey<T extends Common.UID.Schema> = Attribute.GetAll<T> extends infer A
  ? keyof Omit<A, Utils.Object.KeysBy<A, Attribute.Private | Attribute.Password>>
  : never;

export type MediaAttributeContent<
  T extends Attribute.MediaKind,
  M extends boolean
> = ContentAPIMediaValue<Attribute.Media<T, M>>;

// Custom GetAttributesValues implementation which includes specific
// content API logic (sanitation, custom value resolvers, etc...)
export type GetAttributesValues<T extends Common.UID.Schema> = {
  [key in GetAllowedAttributesKey<T>]?: GetValue<T, key>;
};

// Wrapper which contains the id/attributes couple, used to type the responses' data property
interface DataWrapper<T extends Common.UID.Schema | null = null> extends WithID {
  attributes: T extends Common.UID.Schema ? GetAttributesValues<T> : unknown;
}

// Represent a response structure for a single entity
export interface Response<T extends Common.UID.Schema> {
  data: DataWrapper<T> | null;
}

// Represent a response structure for an entity collection
export interface ResponseCollection<T extends Common.UID.Schema> {
  data: DataWrapper<T>[] | null;
  meta: CollectionMetadata;
}

export interface CollectionMetadata {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
