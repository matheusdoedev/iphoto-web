import { Button, Footer, Header, Input } from '~/components';

import styles from '~/styles/pages/user/create-album.module.scss';

function CreateAlbum(): JSX.Element {
  return (
    <section className={styles.CreateAlbum}>
      <div className={styles.CreateAlbumContainer}>
        <Header internalPage />
        <section className={styles.CreateAlbumContent}>
          <div className={styles.CreateAlbumPageTitleBlock}>
            <h1 className={styles.CreateAlbumTitle}>Create new album</h1>
            <p className={styles.CreateAlbumText}>
              Create a new album to insert your photos in
            </p>
          </div>
          <form className={styles.CreateAlbumForm}>
            <Input
              name="title"
              label="Title"
              placeholder="Insert the album title"
            />
            <Button type="submit" style={{ maxWidth: '100%' }}>
              Create album
            </Button>
          </form>
        </section>
      </div>
      <Footer />
    </section>
  );
}

export default CreateAlbum;
