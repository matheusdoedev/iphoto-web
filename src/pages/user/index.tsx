import Image from 'next/image';
import { FiPlus } from 'react-icons/fi';

import { Button, Footer, Header, Input } from '~/components';

import styles from '~/styles/pages/user/index.module.scss';

function UserIndex(): JSX.Element {
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
          <Button style={{ maxWidth: '100%' }}>
            <FiPlus size={16} color="FFF7ED" />
            Upload photo
          </Button>
          <Button style={{ maxWidth: '100%' }}>
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
