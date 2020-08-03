const axios = require('axios').default;

export class HttpService {
  async get(url: string, config?: {}): Promise<any> {
    const request = await axios.get(url, config);
    return request.data;
  }

  async post(url: string, data: {}, configs?: {}): Promise<any> {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    const request = await axios.post(url, data, configs);
    return request.data;
  }
}
