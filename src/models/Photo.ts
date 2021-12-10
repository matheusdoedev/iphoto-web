import { IAlbum } from '~/models/Album';
import { IDatabaseFields } from '~/models/Common';
import { IUser } from '~/models/User';

export interface IPhoto extends IDatabaseFields {
  title: string;
  url: string;
  image_key?: string;
  user: IUser;
  album: IAlbum;
}

export interface IUpdatePhotoDto {
  title: string;
  albumId: string;
}

export interface IUpdatePhotoImageDto {
  image: File;
}
