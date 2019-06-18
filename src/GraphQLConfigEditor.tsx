// Libraries
import React, {PureComponent, ChangeEvent} from 'react';

// Types
import {GraphQLOptions} from './types';

import {DataSourcePluginOptionsEditorProps, DataSourceSettings, FormField} from '@grafana/ui';

type GraphQLSettings = DataSourceSettings<GraphQLOptions>;

interface Props extends DataSourcePluginOptionsEditorProps<GraphQLSettings> {}

interface State {}

export class GraphQLConfigEditor extends PureComponent<Props, State> {
  state = {};

  componentDidMount() {}

  onURLChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {onOptionsChange, options} = this.props;
    onOptionsChange({
      ...options,
      url: event.target.value,
      access: 'direct', // HARDCODE For now!
    });
  };

  onAuthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {onOptionsChange, options} = this.props;
    const jsonData = {
      ...options.jsonData,
      authHeader: event.target.value,
    };
    onOptionsChange({...options, jsonData});
  };

  render() {
    const {options} = this.props;
    const {jsonData} = options;

    return (
      <div className="gf-form-group">
        <div className="gf-form">
          <FormField
            label="URL"
            labelWidth={6}
            onChange={this.onURLChange}
            value={options.url}
            tooltip={'NOTE: hit directly via fetch, not proxy'}
            placeholder="GraphQL backend server URL"
          />
        </div>
        <div className="gf-form">
          <FormField
            label="Prefix"
            labelWidth={6}
            onChange={this.onAuthChange}
            value={jsonData.authHeader}
            placeholder="Authentication Header"
          />
        </div>
      </div>
    );
  }
}
