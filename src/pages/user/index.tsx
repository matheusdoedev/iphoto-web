import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { Button, Footer, Header, Input } from '~/components';
import { useAuthGuard } from '~/hooks';
import { PhotoService } from '~/services';

import styles from '~/styles/pages/user/index.module.scss';
import { IPhoto } from '~/models/Photo';

function UserIndex(): JSX.Element {
  useAuthGuard();

  const [photos, setPhotos] = useState<IPhoto[]>();

  const photoService = useMemo(() => new PhotoService(), []);
  const router = useRouter();

  const handleGetUserPhotos = useCallback(async (): Promise<void> => {
    try {
      const response = await photoService.getUserPhotos().then((r) => r.data);

      setPhotos(response);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, [photoService]);

  const handleNavigateToCreateAlbum = (): void => {
    router.push('/user/create-album');
  };

  const handleNavigateToUploadPhoto = (): void => {
    router.push('/user/upload-photo');
  };

  const PhotosMemo = useMemo(
    () =>
      photos && photos.length > 0 ? (
        <section className={styles.UserPhotos}>
          {photos.map((photo) => (
            <Image
              src={photo.url}
              alt={photo.title}
              width={419}
              height={351}
              layout="responsive"
            />
          ))}
        </section>
      ) : (
        <h2 className={styles.NoPhotosFound}>No photos were found.</h2>
      ),
    [photos],
  );

  useEffect(() => {
    handleGetUserPhotos();
  }, [handleGetUserPhotos]);

  return (
    <section className={styles.UserIndex}>
      <div className={styles.UserIndexContainer}>
        <Header internalPage />
        <section className={styles.UserSearchBar}>
          <Input
            name="search"
            placeholder="Search photos and albums by name"
            aria-label="Search By Name"
          />
          <Button
            style={{ maxWidth: '100%' }}
            onClick={handleNavigateToUploadPhoto}
          >
            <FiPlus size={16} color="FFF7ED" />
            Upload photo
          </Button>
          <Button
            style={{ maxWidth: '100%' }}
            onClick={handleNavigateToCreateAlbum}
          >
            <FiPlus size={16} color="FFF7ED" />
            Add new album
          </Button>
        </section>
        {PhotosMemo}
      </div>
      <Footer />
    </section>
  );
}

export default UserIndex;
