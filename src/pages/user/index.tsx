import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useRouter } from 'next/router';

import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { Button, Footer, Header, Input, Modal } from '~/components';
import { useAuthGuard } from '~/hooks';
import { PhotoService } from '~/services';

import styles from '~/styles/pages/user/index.module.scss';
import { IPhoto } from '~/models/Photo';

function UserIndex(): JSX.Element {
  useAuthGuard();

  const [photos, setPhotos] = useState<IPhoto[]>();
  const [confirmPhotoDeleteModal, setConfirmPhotoDeleteModal] = useState(false);
  const [photoId, setPhotoId] = useState('');

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

  const handleOpenDeletePhotoModal = (deletePhotoId: string): void => {
    setPhotoId(deletePhotoId);
    setConfirmPhotoDeleteModal(true);
  };

  const handleCloseModal = (): void => {
    setConfirmPhotoDeleteModal(false);
  };

  const handleDeletePhoto = async (): Promise<void> => {
    try {
      await photoService.deletePhotoById(photoId);

      handleGetUserPhotos();
      setConfirmPhotoDeleteModal(false);
      toast.success('Photo deleted.');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const PhotosMemo = useMemo(
    () =>
      photos && photos.length > 0 ? (
        <section className={styles.UserPhotos}>
          {photos.map((photo) => (
            <div className={styles.UserPhoto}>
              <button
                type="button"
                className={styles.UserPhotoDeleteIcon}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => handleOpenDeletePhotoModal(photo.id)}
              >
                <FiTrash2 size={24} color="#fff7ed" />
              </button>
              <img src={photo.url} alt={photo.title} />
            </div>
          ))}
        </section>
      ) : (
        <h2 className={styles.NoPhotosFound}>No photos were found.</h2>
      ),
    [photos],
  );

  const ConfirmDeleteModalFooter = memo(() => (
    <>
      <Button type="button" size="small" secondary onClick={handleCloseModal}>
        Cancel
      </Button>
      <Button type="button" size="small" onClick={handleDeletePhoto}>
        Delete
      </Button>
    </>
  ));

  useEffect(() => {
    handleGetUserPhotos();
  }, [handleGetUserPhotos]);

  return (
    <>
      <section className={styles.UserIndex}>
        <div className={styles.UserIndexContainer}>
          <Header internalPage />
          <section className={styles.UserSearchBar}>
            <Input
              name="search"
              placeholder="Search photos and albums by name"
              aria-label="Search By Name"
            />
            <Button size="fullSize" onClick={handleNavigateToUploadPhoto}>
              <FiPlus size={16} color="FFF7ED" />
              Upload photo
            </Button>
            <Button size="fullSize" onClick={handleNavigateToCreateAlbum}>
              <FiPlus size={16} color="FFF7ED" />
              Add new album
            </Button>
          </section>
          {PhotosMemo}
        </div>
        <Footer />
      </section>

      <Modal
        title="Delete photo"
        modalIsVisible={confirmPhotoDeleteModal}
        setModalIsVisible={setConfirmPhotoDeleteModal}
        footer={<ConfirmDeleteModalFooter />}
      >
        <p>Are you sure that you want to delete that photo?</p>
      </Modal>
    </>
  );
}

export default UserIndex;
