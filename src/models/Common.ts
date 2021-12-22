export type MediaType = 'image' | 'video' | 'image/video';

export interface IMedia {
  name: string;
  type?: MediaType;
  file?: File;
}

export type Logo = Omit<IMedia, 'type'>;

export type UpdatedLogo = Pick<Logo, 'name'> & Partial<Omit<Logo, 'name'>>;

export interface IDatabaseFields {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface IPageOptionsRequest {
  page: number;
  perPage?: number;
}

export interface IPhotoOptionsRequest extends IPageOptionsRequest {
  albumId?: string;
}

export interface IPagination<T> {
  total?: string;
  perPage?: number;
  page?: number;
  lastPage?: number;
  data?: T;
}
