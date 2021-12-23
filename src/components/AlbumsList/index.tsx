import { useState, useCallback, useMemo, useEffect, memo } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { toast } from 'react-toastify';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

import { Button, Modal } from '~/components';
import { IAlbum } from '~/models/Album';
import { IPageOptionsRequest, IPagination } from '~/models/Common';
import { AlbumService } from '~/services';

import styles from './styles.module.scss';

function AlbumsList(): JSX.Element {
  const [albumId, setAlbumId] = useState('');
  const [confirmAlbumDeleteModal, setConfirmAlbumDeleteModal] = useState(false);
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

  const albumService = useMemo(() => new AlbumService(), []);
  const router = useRouter();

  const handleNavigateToEditAlbum = useCallback(
    (albumIdParam: string): void => {
      router.push(`/user/album/${albumIdParam}/edit`);
    },
    [router],
  );

  const handleLoadMoreAlbums = (): void => {
    setPageOptions({ page: pageOptions.page + 1 });
  };

  const handleOpenDeleteAlbumModal = (deleteAlbumId: string): void => {
    setAlbumId(deleteAlbumId);
    setConfirmAlbumDeleteModal(true);
  };

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

  const handleCloseModal = (): void => {
    setConfirmAlbumDeleteModal(false);
  };

  const ConfirmDeleteModalFooter = memo(() => (
    <>
      <Button type="button" size="small" secondary onClick={handleCloseModal}>
        Cancel
      </Button>
      <Button type="button" size="small" onClick={handleDeleteAlbum}>
        Delete
      </Button>
    </>
  ));

  useEffect(() => {
    handleGetUserAlbums();
  }, [handleGetUserAlbums]);

  return albums && albums.data && albums.data.length > 0 ? (
    <>
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
            <button
              type="button"
              className={styles.UserPhotoEditIcon}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => handleNavigateToEditAlbum(album.id)}
            >
              <FiEdit size={24} color="#fff7ed" />
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
      {Number(albums.page) !== albums.lastPage ||
        (albums.lastPage !== 1 && (
          <Button
            className={styles.LoadMoreButton}
            onClick={handleLoadMoreAlbums}
          >
            Load more albums
          </Button>
        ))}
      <Modal
        title="Delete album"
        modalIsVisible={confirmAlbumDeleteModal}
        setModalIsVisible={setConfirmAlbumDeleteModal}
        footer={<ConfirmDeleteModalFooter />}
      >
        <p>Are you sure that you want to delete that album?</p>
      </Modal>
    </>
  ) : (
    <h2 className={styles.NoPhotosFound}>No albums were found.</h2>
  );
}

export default AlbumsList;
