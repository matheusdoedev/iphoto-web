import { AxiosPromise } from 'axios';

import api from '~/config/api';
import { IAlbum, ICreateAlbumDto } from '~/models/Album';
import { IPageOptionsRequest, IPagination } from '~/models/Common';

class AlbumService {
  private baseUrl = 'albums';

  private perPageDefault = 8;

  postCreateAlbum(data: ICreateAlbumDto): AxiosPromise<IAlbum> {
    return api.post(`${this.baseUrl}`, data);
  }

  getAllUserAlbums(): AxiosPromise<IAlbum[]> {
    return api.get(`${this.baseUrl}/user/all`);
  }

  getUserAlbums(
    { page }: IPageOptionsRequest = {
      page: 1,
    },
  ): AxiosPromise<IPagination<IAlbum[]>> {
    return api.get(`${this.baseUrl}/user`, {
      params: {
        page,
        perPage: this.perPageDefault,
      },
    });
  }

  getAlbumById(albumId: string): AxiosPromise<IAlbum> {
    return api.get(`${this.baseUrl}/${albumId}`);
  }

  deleteAlbumById(albumId: string): AxiosPromise<void> {
    return api.delete(`${this.baseUrl}/${albumId}`);
  }
}

export default AlbumService;
