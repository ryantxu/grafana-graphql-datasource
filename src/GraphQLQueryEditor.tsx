// Libraries
import React, { PureComponent, ChangeEvent } from 'react';

// Types
import { GraphQLDataSource } from './GraphQLDataSource';
import { GraphQLQuery, GraphQLOptions } from './types';

import { QueryEditorProps } from '@grafana/ui';

type Props = QueryEditorProps<GraphQLDataSource, GraphQLQuery, GraphQLOptions>;

interface State {}

export class GraphQLQueryEditor extends PureComponent<Props, State> {
  onJSONataChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, jsonata: event.target.value });
  };

  onQueryChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { onChange, query } = this.props;
    const request = {
      ...query.request,
      query: event.target.value,
    };
    onChange({ ...query, request });
  };

  onVariablesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { onChange, query } = this.props;
    const request = {
      ...query.request,
      variables: event.target.value ? JSON.parse(event.target.value) : undefined,
    };
    onChange({ ...query, request });
  };

  render() {
    const { query } = this.props;
    let { request } = query;
    if (!request) {
      request = {
        query: '{ }',
      };
    }

    return (
      <div className="gf-form">
        <div className="gf-form" style={{ display: 'block', width: '100%' }}>
          <h5>Query</h5>
          <textarea value={request.query} onChange={this.onQueryChange} className="gf-form-input" rows={5} />
        </div>

        <div className="gf-form" style={{ display: 'block', width: '100%' }}>
          <h5>Variables</h5>
          <textarea value={JSON.stringify(request.variables)} onChange={this.onVariablesChange} className="gf-form-input" rows={5} />
        </div>
        <div className="gf-form" style={{ display: 'block', width: '100%' }}>
          <h5>JSONata</h5>
          <textarea value={query.jsonata} onChange={this.onJSONataChange} className="gf-form-input" rows={5} />
        </div>
      </div>
    );
  }
}
