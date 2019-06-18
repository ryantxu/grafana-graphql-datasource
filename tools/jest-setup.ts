import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jquery';
import $ from 'jquery';

configure({adapter: new Adapter()});

const global = window as any;
global.$ = global.jQuery = $;

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key: string) => {
      return store[key];
    },
    setItem: (key: string, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

global.localStorage = localStorageMock;
