// Libraries
import React, {PureComponent, ChangeEvent} from 'react';

// Types
import {GraphQLDataSource} from './GraphQLDataSource';
import {GraphQLQuery, GraphQLOptions} from './types';

import {QueryEditorProps, FormField} from '@grafana/ui';

type Props = QueryEditorProps<GraphQLDataSource, GraphQLQuery, GraphQLOptions>;

interface State {}

export class GraphQLQueryEditor extends PureComponent<Props, State> {
  onJSONataChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {onChange, query} = this.props;
    onChange({...query, jsonata: event.target.value});
  };

  render() {
    const {query} = this.props;

    return (
      <div className="gf-form">
        <FormField
          label="JSONata"
          labelWidth={6}
          onChange={this.onJSONataChange}
          value={query.jsonata}
          tooltip={'Transform the results'}
          placeholder="transform..."
        />
      </div>
    );
  }
}
