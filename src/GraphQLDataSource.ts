// Types
import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
} from '@grafana/ui';

import {
  DataFrame,
  isDataFrame,
  toDataFrame,
} from '@grafana/data';

import truncate from 'lodash/truncate';

import {GraphQLQuery, GraphQLOptions} from './types';
import jsonata from 'jsonata';

export class GraphQLDataSource extends DataSourceApi<GraphQLQuery, GraphQLOptions> {
  constructor(private instanceSettings: DataSourceInstanceSettings<GraphQLOptions>) {
    super(instanceSettings);
  }

  getQueryDisplayText(query: GraphQLQuery) {
    if (!query.request || !query.request.query) {
      return 'Missing Query';
    }
    return truncate(query.request.query, {length: 20});
  }

  query(options: DataQueryRequest<GraphQLQuery>): Promise<DataQueryResponse> {
    const all = options.targets.map(q => this.doSingleQuery(q));
    return Promise.all(all).then(data => {
      return {data};
    });
  }

  async doSingleQuery(query: GraphQLQuery): Promise<DataFrame> {
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query.request),
    };
    // Add Authorization header
    if (this.instanceSettings.jsonData.authHeader) {
      (opts.headers as any).Authorization = this.instanceSettings.jsonData.authHeader;
    }

    const res = await fetch(this.instanceSettings.url!, opts);
    let json = await res.json();
    if (query.jsonata) {
      json = jsonata(query.jsonata).evaluate(json);
    }

    // Make sure it looks like DataFrame
    if (isDataFrame(json)) {
      return json as DataFrame;
    }
    return toDataFrame(json);
  }

  testDatasource() {
    const url = this.instanceSettings.url;
    if (!url) {
      return Promise.resolve({
        status: 'warn',
        message: 'Missing URL',
      });
    }

    return fetch(url, {
      method: 'GET',
    }).then((response: any) => {
      console.log('RESPONSE', response);
      return {
        status: 'success',
        message: 'OK',
      };
    });
  }
}
