import { Input, Seo, Button } from '~/components';
import { InternalPageLayout } from '~/layouts';

import styles from '~/styles/pages/user/edit-album.module.scss';

function EditAlbum(): JSX.Element {
  return (
    <>
      <Seo title="Edit album" />
      <InternalPageLayout
        pageTitle="Edit album"
        pageDescription="Edit the details and manage a album"
      >
        <section className={styles.EditAlbumContent}>
          <h2 className={styles.EditAlbumSubtitle}>Details</h2>
          <form className={styles.EditAlbumDetailsForm}>
            <Input label="Album title" name="title" />
            <div className={styles.EditAlbumDetailsFormButtons}>
              <Button>Save</Button>
              <Button secondary style={{ color: 'red', background: 'none' }}>
                Delete album
              </Button>
            </div>
          </form>
          <h2 className={styles.EditAlbumSubtitle}>Photos</h2>
        </section>
      </InternalPageLayout>
    </>
  );
}

export default EditAlbum;
