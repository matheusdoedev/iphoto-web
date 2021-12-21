/* eslint-disable jsx-a11y/label-has-associated-control */
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import * as Yup from 'yup';
import { serialize } from 'object-to-formdata';
import { toast } from 'react-toastify';

import { Button, Input, InputMedia, Select, Seo } from '~/components';
import { useAuthGuard } from '~/hooks';
import { InternalPageLayout } from '~/layouts';
import { IAlbum } from '~/models/Album';
import { IMedia, UpdatedLogo } from '~/models/Common';
import { IUpdatePhotoDto, IUpdatePhotoImageDto } from '~/models/Photo';
import { AlbumService, PhotoService } from '~/services';
import { handleYupValidationError } from '~/utils/functions';

import styles from '~/styles/pages/user/upload-photo.module.scss';

function UploadPhoto(): JSX.Element {
  useAuthGuard();

  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [formData, setFormData] = useState<IUpdatePhotoDto>(
    {} as IUpdatePhotoDto,
  );
  const [uploadPhoto, setUploadPhoto] = useState<UpdatedLogo>();

  const photoService = new PhotoService();
  const albumService = useMemo(() => new AlbumService(), []);
  const router = useRouter();

  const handleGetUserAlbums = useCallback(async (): Promise<void> => {
    try {
      const data = await albumService.getAllUserAlbums().then((r) => r.data);

      setAlbums(data);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, [albumService]);

  const handleCreatePhoto = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const schema = Yup.object().shape({
      title: Yup.string().required('Photo title required.'),
      albumId: Yup.string(),
    });

    try {
      if (!uploadPhoto || !uploadPhoto.file) {
        throw new Error('Photo image is required.');
      }

      await schema.validate(formData, {
        abortEarly: false,
      });

      const { id: photoId } = await photoService
        .postCreatePhoto(formData)
        .then((r) => r.data);

      const photoData = serialize<IUpdatePhotoImageDto>({
        image: uploadPhoto.file,
      });

      await photoService.updatePhotoImageById(photoId, photoData);

      router.back();
      toast.success('Photo created.');
    } catch (error) {
      handleYupValidationError(error as Error);
    }
  };

  const handleChangeUploadPhoto = (fileObject: IMedia): void => {
    setUploadPhoto(fileObject);
  };

  const AlbumsOptionsMemo = useMemo(
    () =>
      albums
        ? albums.map((album) => ({ label: album.title, value: album.id }))
        : [],
    [albums],
  );

  useEffect(() => {
    handleGetUserAlbums();
  }, [handleGetUserAlbums]);

  return (
    <>
      <Seo title="Upload photo" />
      <InternalPageLayout
        pageTitle="Upload a new photo"
        pageDescription="Save a new photo"
      >
        <label htmlFor="upload_photo" className={styles.UploadPhotoField}>
          {!uploadPhoto ? (
            <>
              <Image
                src="/assets/icons/camera-black.svg"
                alt="Upload de Imagem"
                width={60}
                height={49}
                layout="fixed"
              />
              <p>Upload new photo</p>
            </>
          ) : (
            <img
              src={uploadPhoto.name}
              alt={formData.title ?? uploadPhoto.name}
              className={styles.UploadPhotoImageUploaded}
            />
          )}
          <InputMedia
            name="upload_photo"
            mediaType="image"
            onChangeMedia={handleChangeUploadPhoto}
          />
        </label>
        <form className={styles.UploadPhotoForm} onSubmit={handleCreatePhoto}>
          <Input
            name="title"
            label="Photo title*"
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            name="album"
            label="Album"
            id="album"
            options={AlbumsOptionsMemo}
            value={formData.albumId}
            onChange={(e) =>
              setFormData({ ...formData, albumId: e.target.value })
            }
          />
          <Button type="submit" size="fullSize">
            Save photo
          </Button>
        </form>
      </InternalPageLayout>
    </>
  );
}

export default UploadPhoto;
