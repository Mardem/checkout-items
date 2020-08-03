import { HttpService } from './HttpService';
import { locale } from 'src/configs/calendar';

export default class DaysService {
  http: HttpService;
  constructor() {
    this.http = new HttpService();
  }

  async fetch() {
    return await this.http.get(locale.urlDayProd);
  }
}
