import { useState, useCallback, useMemo, useEffect, memo } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';

import { FiTrash2 } from 'react-icons/fi';

import { Button, Modal } from '~/components';
import { IPageOptionsRequest, IPagination } from '~/models/Common';
import { IPhoto } from '~/models/Photo';
import { PhotoService } from '~/services';

import styles from './styles.module.scss';

interface IPhotosListProps {
  albumId?: string;
}

function PhotosList({ albumId }: IPhotosListProps): JSX.Element {
  const [confirmPhotoDeleteModal, setConfirmPhotoDeleteModal] = useState(false);
  const [photoId, setPhotoId] = useState('');
  const [photos, setPhotos] = useState<IPagination<IPhoto[]>>({
    data: [],
    lastPage: 0,
    page: 1,
    perPage: 1,
    total: '0',
  });
  const [pageOptions, setPageOptions] = useState<IPageOptionsRequest>({
    page: 1,
  });

  const photoService = useMemo(() => new PhotoService(), []);

  const handleOpenDeletePhotoModal = (deletePhotoId: string): void => {
    setPhotoId(deletePhotoId);
    setConfirmPhotoDeleteModal(true);
  };

  const handleGetUserPhotos = useCallback(async (): Promise<void> => {
    try {
      const response = await photoService
        .getUserPhotos(pageOptions)
        .then((r) => r.data);

      setPhotos(response);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, [pageOptions, photoService]);

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

  const handleLoadMorePhotos = (): void => {
    setPageOptions({ page: pageOptions.page + 1 });
  };

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

  return photos && photos.data && photos.data.length > 0 ? (
    <section className={styles.UserPhotos}>
      {photos.data.map((photo) => (
        <>
          <article key={photo.id} className={styles.UserPhoto}>
            <button
              type="button"
              className={styles.UserPhotoDeleteIcon}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => handleOpenDeletePhotoModal(photo.id)}
            >
              <FiTrash2 size={24} color="#fff7ed" />
            </button>
            <Image
              src={photo.url}
              alt={photo.title}
              width={556.4}
              height={355.5}
              layout="intrinsic"
              loading="lazy"
            />
          </article>
          {Number(photos.page) !== photos.lastPage ||
            (photos.lastPage !== 1 && (
              <Button
                className={styles.LoadMoreButton}
                onClick={handleLoadMorePhotos}
              >
                Load more photos
              </Button>
            ))}
          <Modal
            title="Delete photo"
            modalIsVisible={confirmPhotoDeleteModal}
            setModalIsVisible={setConfirmPhotoDeleteModal}
            footer={<ConfirmDeleteModalFooter />}
          >
            <p>Are you sure that you want to delete that photo?</p>
          </Modal>
        </>
      ))}
    </section>
  ) : (
    <h2 className={styles.NoPhotosFound}>No photos were found.</h2>
  );
}

PhotosList.defaultProps = {
  albumId: undefined,
};

export default PhotosList;
