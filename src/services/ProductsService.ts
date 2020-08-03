import { HttpService } from './HttpService';
import { productsLinks, configsLinks } from 'src/configs/links';
import { LocalStorage } from 'quasar';
import { AnyMxRecord } from 'dns';
import { Cities } from 'src/configs/cities';

export class ProductsService {
  http: HttpService;

  constructor() {
    this.http = new HttpService();
  }

  async fetch(): Promise<string[]> {
    const city = LocalStorage.getItem('citySelected') as any;

    return await this.http.post(productsLinks.prod, { city: city.code || 0 });
  }

  async jumpStepProducts(): Promise<Boolean> {
    const res = await this.http.get(configsLinks.prod);
    const city = LocalStorage.getItem('citySelected') as any;
    let jump: Boolean = false;

    if (res.disableBomboniereFormosa == 1 && city.code == Cities.Formosa) {
      jump = true;
    } else if (
      res.disableBomboniereBarreiras == 1 &&
      city.code == Cities.Barreiras
    ) {
      jump = true;
    } else if (res.disableBomboniereLEM == 1 && city.code == Cities.LEM) {
      jump = true;
    } else if (
      res.disableBomboniereGuanambi == 1 &&
      city.code == Cities.Guanambi
    ) {
      jump = true;
    } else if (
      res.disableBomboniereSobradinho == 1 &&
      city.code == Cities.Sobradinho
    ) {
      jump = true;
    }

    return jump;
  }
}
