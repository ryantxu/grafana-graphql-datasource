import { DataSourcePlugin } from '@grafana/ui';

import { GraphQLDataSource } from './GraphQLDataSource';
import { GraphQLQueryEditor } from './GraphQLQueryEditor';
import { GraphQLConfigEditor } from './GraphQLConfigEditor';
import { GraphQLOptions, GraphQLQuery } from './types';

export const plugin = new DataSourcePlugin<GraphQLDataSource, GraphQLQuery, GraphQLOptions>(GraphQLDataSource)
  .setConfigEditor(GraphQLConfigEditor)
  .setQueryEditor(GraphQLQueryEditor);
