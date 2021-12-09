import { IDatabaseFields } from './Common';
import { IPhoto } from './Photo';
import { IUser } from './User';

export interface IAlbum extends IDatabaseFields {
  title: string;
  user: IUser;
  photos: IPhoto[];
}
