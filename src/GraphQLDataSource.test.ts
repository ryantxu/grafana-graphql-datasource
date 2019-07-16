import { GraphQLDataSource } from './GraphQLDataSource';
import { GraphQLOptions, GraphQLQuery } from './types';
import { DataSourceInstanceSettings, PluginMeta, DataQueryRequest } from '@grafana/ui';

describe('GraphQLDatasource', () => {
  const instanceSettings: DataSourceInstanceSettings<GraphQLOptions> = {
    id: 1,
    type: 'x',
    name: 'xxx',
    url: 'hello',
    meta: {} as PluginMeta,
    jsonData: {},
  };

  describe('when querying', () => {
    test('should give error with no query defined', () => {
      const ds = new GraphQLDataSource(instanceSettings);
      const query = {
        refId: 'Z',
      } as GraphQLQuery;

      const options = {
        targets: [query],
      } as DataQueryRequest<GraphQLQuery>;

      // Missing path
      return ds
        .query(options)
        .then(rsp => {
          expect(true).toBeFalsy(); // FAIL!
        })
        .catch(reason => {
          expect(reason).toMatchSnapshot();
        });
    });
  });
});
