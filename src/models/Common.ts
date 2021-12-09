export type MediaType = 'image' | 'video' | 'image/video';

export interface IMedia {
  name: string;
  type?: MediaType;
  file?: File;
}

export type Logo = Omit<IMedia, 'type'>;

export type UpdatedLogo = Pick<Logo, 'name'> & Partial<Omit<Logo, 'name'>>;

export interface IDatabaseFields {
  id: number;
  created_at: string;
  updated_at: string;
}
