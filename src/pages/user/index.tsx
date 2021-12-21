import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

import { Button, Footer, Header, Input, Modal, Seo } from '~/components';
import { useAuthGuard } from '~/hooks';
import { IPhoto } from '~/models/Photo';
import { IPageOptionsRequest, IPagination } from '~/models/Common';
import { AlbumService, PhotoService } from '~/services';

import styles from '~/styles/pages/user/index.module.scss';
import { IAlbum } from '~/models/Album';

type TabMenuStatus = 'photos' | 'albums';

function UserIndex(): JSX.Element {
  useAuthGuard();

  const [photos, setPhotos] = useState<IPagination<IPhoto[]>>({
    data: [],
    lastPage: 0,
    page: 1,
    perPage: 1,
    total: '0',
  });
  const [albums, setAlbums] = useState<IPagination<IAlbum[]>>({
    data: [],
    lastPage: 0,
    page: 1,
    perPage: 1,
    total: '0',
  });
  const [pageOptions, setPageOptions] = useState<IPageOptionsRequest>({
    page: 1,
  });
  const [confirmPhotoDeleteModal, setConfirmPhotoDeleteModal] = useState(false);
  const [confirmAlbumDeleteModal, setConfirmAlbumDeleteModal] = useState(false);
  const [photoId, setPhotoId] = useState('');
  const [albumId, setAlbumId] = useState('');
  const [tabMenuStatus, setTabMenuStatus] = useState<TabMenuStatus>('photos');

  const photoService = useMemo(() => new PhotoService(), []);
  const albumService = useMemo(() => new AlbumService(), []);
  const router = useRouter();

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

  const handleGetUserAlbums = useCallback(async (): Promise<void> => {
    try {
      const response = await albumService
        .getUserAlbums(pageOptions)
        .then((r) => r.data);

      setAlbums(response);
    } catch (error) {
      toast.error('Error on load albums.');
    }
  }, [albumService, pageOptions]);

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

  const handleOpenDeleteAlbumModal = (deleteAlbumId: string): void => {
    setAlbumId(deleteAlbumId);
    setConfirmAlbumDeleteModal(true);
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

  const handleDeleteAlbum = async (): Promise<void> => {
    try {
      await albumService.deleteAlbumById(albumId);

      handleGetUserAlbums();
      setConfirmAlbumDeleteModal(false);
      toast.success('Album deleted.');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleSwapTabMenu = (newStatus: TabMenuStatus): void => {
    setTabMenuStatus(newStatus);
  };

  const PhotosMemo = useMemo(
    () =>
      photos && photos.data && photos.data.length > 0 ? (
        <section className={styles.UserPhotos}>
          {photos.data.map((photo) => (
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
          ))}
        </section>
      ) : (
        <h2 className={styles.NoPhotosFound}>No photos were found.</h2>
      ),
    [photos],
  );

  const AlbumsMemo = useMemo(
    () =>
      albums && albums.data && albums.data.length > 0 ? (
        <section className={styles.UserPhotos}>
          {albums.data.map((album) => (
            <article key={album.id} className={styles.UserPhoto}>
              <button
                type="button"
                className={styles.UserPhotoDeleteIcon}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => handleOpenDeleteAlbumModal(album.id)}
              >
                <FiTrash2 size={24} color="#fff7ed" />
              </button>
              <Image
                src="/assets/images/album-mock-cover.jpg"
                alt={album.title}
                width={556.4}
                height={355.5}
                layout="intrinsic"
                loading="lazy"
              />
              <h2 className={styles.UserAlbumTitle}>{album.title}</h2>
            </article>
          ))}
        </section>
      ) : (
        <h2 className={styles.NoPhotosFound}>No albums were found.</h2>
      ),
    [albums],
  );
  const ConfirmDeleteModalFooter = memo(() => (
    <>
      <Button type="button" size="small" secondary onClick={handleCloseModal}>
        Cancel
      </Button>
      <Button
        type="button"
        size="small"
        onClick={
          tabMenuStatus === 'photos' ? handleDeletePhoto : handleDeleteAlbum
        }
      >
        Delete
      </Button>
    </>
  ));

  const handleLoadMorePhotos = (): void => {
    setPageOptions({ page: pageOptions.page + 1 });
  };

  useEffect(() => {
    if (tabMenuStatus === 'photos') {
      handleGetUserPhotos();
    }
    handleGetUserAlbums();
  }, [handleGetUserAlbums, handleGetUserPhotos, tabMenuStatus]);

  return (
    <>
      <Seo title="Index" />
      <section className={styles.UserIndex}>
        <div className={styles.UserIndexContainer}>
          <Header internalPage />
          <section className={styles.UserSearchBar}>
            <Input
              name="search"
              placeholder="Search photos and albums by name"
              aria-label="Search By Name"
              containerStyle={styles.UserSearchInput}
            />
            <Button size="fullSize" onClick={handleNavigateToUploadPhoto}>
              <FiPlus size={16} color="#FFF7ED" />
              Upload photo
            </Button>
            <Button size="fullSize" onClick={handleNavigateToCreateAlbum}>
              <FiPlus size={16} color="#FFF7ED" />
              Add new album
            </Button>
          </section>
          <nav className={styles.UserTabNavigation}>
            <ul className={styles.UserTabMenu}>
              <li>
                <button
                  className={styles.UserTabMenuButton}
                  style={{
                    borderBottom:
                      tabMenuStatus === 'photos' ? '3px solid #025d8f' : '',
                    color: tabMenuStatus === 'photos' ? '#025d8f' : '',
                  }}
                  type="button"
                  onClick={() => handleSwapTabMenu('photos')}
                >
                  Photos
                </button>
              </li>
              <li>
                <button
                  className={styles.UserTabMenuButton}
                  style={{
                    borderBottom:
                      tabMenuStatus === 'albums' ? '3px solid #025d8f' : '',
                    color: tabMenuStatus === 'albums' ? '#025d8f' : '',
                  }}
                  type="button"
                  onClick={() => handleSwapTabMenu('albums')}
                >
                  Albums
                </button>
              </li>
            </ul>
          </nav>
          {tabMenuStatus === 'photos' ? (
            <>
              {PhotosMemo}
              {Number(photos.page) !== photos.lastPage ||
                (photos.lastPage !== 1 && (
                  <Button
                    className={styles.LoadMoreButton}
                    onClick={handleLoadMorePhotos}
                  >
                    Load more photos
                  </Button>
                ))}
            </>
          ) : (
            <>
              {AlbumsMemo}
              {Number(albums.page) !== albums.lastPage ||
                (albums.lastPage !== 1 && (
                  <Button
                    className={styles.LoadMoreButton}
                    onClick={handleLoadMorePhotos}
                  >
                    Load more photos
                  </Button>
                ))}
            </>
          )}
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

      <Modal
        title="Delete album"
        modalIsVisible={confirmAlbumDeleteModal}
        setModalIsVisible={setConfirmAlbumDeleteModal}
        footer={<ConfirmDeleteModalFooter />}
      >
        <p>Are you sure that you want to delete that album?</p>
      </Modal>
    </>
  );
}

export default UserIndex;
