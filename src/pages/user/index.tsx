import { useState } from 'react';
import { useRouter } from 'next/router';

import { FiPlus } from 'react-icons/fi';

import {
  Button,
  Footer,
  Header,
  Input,
  Seo,
  PhotosList,
  AlbumsList,
} from '~/components';
import { useAuthGuard } from '~/hooks';

import styles from '~/styles/pages/user/index.module.scss';

type TabMenuStatus = 'photos' | 'albums';

function UserIndex(): JSX.Element {
  useAuthGuard();

  const [tabMenuStatus, setTabMenuStatus] = useState<TabMenuStatus>('photos');

  const router = useRouter();

  const handleNavigateToCreateAlbum = (): void => {
    router.push('/user/create-album');
  };

  const handleNavigateToUploadPhoto = (): void => {
    router.push('/user/upload-photo');
  };

  const handleSwapTabMenu = (newStatus: TabMenuStatus): void => {
    setTabMenuStatus(newStatus);
  };

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
          {tabMenuStatus === 'photos' ? <PhotosList /> : <AlbumsList />}
        </div>
        <Footer />
      </section>
    </>
  );
}

export default UserIndex;
