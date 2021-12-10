import { AxiosPromise } from 'axios';

import api from '~/config/api';
import { IPhoto, IUpdatePhotoDto } from '~/models/Photo';

class PhotoService {
  private baseUrl = 'photos';

  getUserPhotos(): AxiosPromise<IPhoto[]> {
    return api.get(`${this.baseUrl}/user`);
  }

  getPhotoById(photoId: string): AxiosPromise<IPhoto> {
    return api.get(`${this.baseUrl}/${photoId}`);
  }

  deletePhotoById(photoId: string): AxiosPromise<void> {
    return api.delete(`${this.baseUrl}/${photoId}`);
  }

  updatePhotoById(
    photoId: string,
    data: IUpdatePhotoDto,
  ): AxiosPromise<IPhoto> {
    return api.put(`${this.baseUrl}/${photoId}`, data);
  }

  updatePhotoImageById(photoId: string, data: FormData): AxiosPromise<IPhoto> {
    return api.put(`${this.baseUrl}/image/${photoId}`, data);
  }

  postCreatePhoto(data: IUpdatePhotoDto): AxiosPromise<IPhoto> {
    return api.post(`${this.baseUrl}`, data);
  }
}

export default PhotoService;
