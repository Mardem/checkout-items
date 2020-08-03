import { HttpService } from './HttpService';
import { LocalStorage } from 'quasar';
import { ticketsLinks } from 'src/configs/links';

export class TicketsService {
  http: HttpService;

  constructor() {
    this.http = new HttpService();
  }

  async fetch(): Promise<string[]> {
    const city = LocalStorage.getItem('citySelected') as any;

    return await this.http.post(ticketsLinks.prod, { city: city.code || 0 });
  }
}
