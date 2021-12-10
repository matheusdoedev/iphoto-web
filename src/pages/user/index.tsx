import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { FiPlus } from 'react-icons/fi';

import { Button, Footer, Header, Input } from '~/components';

import styles from '~/styles/pages/user/index.module.scss';
import { useAuthGuard } from '~/hooks';

function UserIndex(): JSX.Element {
  useAuthGuard();

  const router = useRouter();

  const handleNavigateToCreateAlbum = (): void => {
    router.push('/user/create-album');
  };

  const handleNavigateToUploadPhoto = (): void => {
    router.push('/user/upload-photo');
  };

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
        <section className={styles.UserPhotos}>
          <Image
            src="/assets/images/photo-mock.jpg"
            alt="Foto"
            width={419}
            height={351}
            layout="responsive"
          />
          <Image
            src="/assets/images/photo-mock.jpg"
            alt="Foto"
            width={419}
            height={351}
            layout="responsive"
          />
          <Image
            src="/assets/images/photo-mock.jpg"
            alt="Foto"
            width={419}
            height={351}
            layout="responsive"
          />
          <Image
            src="/assets/images/photo-mock.jpg"
            alt="Foto"
            width={419}
            height={351}
            layout="responsive"
          />
          <Image
            src="/assets/images/photo-mock.jpg"
            alt="Foto"
            width={419}
            height={351}
            layout="responsive"
          />
          <Image
            src="/assets/images/photo-mock.jpg"
            alt="Foto"
            width={419}
            height={351}
            layout="responsive"
          />
          <Image
            src="/assets/images/photo-mock.jpg"
            alt="Foto"
            width={419}
            height={351}
            layout="responsive"
          />
          <Image
            src="/assets/images/photo-mock.jpg"
            alt="Foto"
            width={419}
            height={351}
            layout="responsive"
          />
          <Image
            src="/assets/images/photo-mock.jpg"
            alt="Foto"
            width={419}
            height={351}
            layout="responsive"
          />
          <Image
            src="/assets/images/photo-mock.jpg"
            alt="Foto"
            width={419}
            height={351}
            layout="responsive"
          />
          <Image
            src="/assets/images/photo-mock.jpg"
            alt="Foto"
            width={419}
            height={351}
            layout="responsive"
          />
          <Image
            src="/assets/images/photo-mock.jpg"
            alt="Foto"
            width={419}
            height={351}
            layout="responsive"
          />
        </section>
      </div>
      <Footer />
    </section>
  );
}

export default UserIndex;
