import { IAlbum } from '~/models/Album';
import { IDatabaseFields } from './Common';
import { IPhoto } from './Photo';

export interface IUser extends IDatabaseFields {
  name: string;
  email: string;
  accepted_terms: boolean;
  albums: IAlbum[];
  photos: IPhoto[];
}
