import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IEventOfPlateMill } from '@/shared/model/event-of-plate-mill.model';

const baseApiUrl = 'api/event-of-plate-mills';
const baseSearchApiUrl = 'api/_search/event-of-plate-mills?query=';

export default class EventOfPlateMillService {
  public search(query, paginationQuery): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(`${baseSearchApiUrl}${query}&${buildPaginationQueryOpts(paginationQuery)}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public find(id): Promise<IEventOfPlateMill> {
    return new Promise<IEventOfPlateMill>(resolve => {
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

  public create(entity): Promise<IEventOfPlateMill> {
    return new Promise<IEventOfPlateMill>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity): Promise<IEventOfPlateMill> {
    return new Promise<IEventOfPlateMill>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
