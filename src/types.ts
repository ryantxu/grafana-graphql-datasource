import {DataQuery, DataSourceJsonData} from '@grafana/ui';

export interface GraphQL {
  query: string;
  variables?: any;
}

export interface GraphQLQuery extends DataQuery {
  request: GraphQL;
  jsonata?: string;
}

export interface GraphQLOptions extends DataSourceJsonData {
  authHeader?: string;
}
