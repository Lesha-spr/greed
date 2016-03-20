import {WebResource} from './../WebResource.js';

const DATA = {
  mock: true
};

let mockInstance = new WebResource();

mockInstance.request = () => {
  return new Promise((resolve, reject) => process.nextTick(() => resolve(DATA)));
};

export default mockInstance;