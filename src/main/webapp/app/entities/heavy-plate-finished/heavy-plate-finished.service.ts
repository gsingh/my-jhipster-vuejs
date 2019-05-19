import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IHeavyPlateFinished } from '@/shared/model/heavy-plate-finished.model';

const baseApiUrl = 'api/heavy-plate-finisheds';
const baseSearchApiUrl = 'api/_search/heavy-plate-finisheds?query=';

export default class HeavyPlateFinishedService {
  public search(query, paginationQuery): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(`${baseSearchApiUrl}${query}&${buildPaginationQueryOpts(paginationQuery)}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public find(id): Promise<IHeavyPlateFinished> {
    return new Promise<IHeavyPlateFinished>(resolve => {
      axios.get(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public retrieve(paginationQuery?: any): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(baseApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public delete(id): Promise<any> {
    return new Promise<any>(resolve => {
      axios.delete(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public create(entity): Promise<IHeavyPlateFinished> {
    return new Promise<IHeavyPlateFinished>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity): Promise<IHeavyPlateFinished> {
    return new Promise<IHeavyPlateFinished>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
