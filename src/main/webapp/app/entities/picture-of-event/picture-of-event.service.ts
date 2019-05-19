import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IPictureOfEvent } from '@/shared/model/picture-of-event.model';

const baseApiUrl = 'api/picture-of-events';
const baseSearchApiUrl = 'api/_search/picture-of-events?query=';

export default class PictureOfEventService {
  public search(query, paginationQuery): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(`${baseSearchApiUrl}${query}&${buildPaginationQueryOpts(paginationQuery)}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public find(id): Promise<IPictureOfEvent> {
    return new Promise<IPictureOfEvent>(resolve => {
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

  public create(entity): Promise<IPictureOfEvent> {
    return new Promise<IPictureOfEvent>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity): Promise<IPictureOfEvent> {
    return new Promise<IPictureOfEvent>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
