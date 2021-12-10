import { Button, Input } from '~/components';
import { useAuthGuard } from '~/hooks';
import { InternalPageLayout } from '~/layouts';

import styles from '~/styles/pages/user/create-album.module.scss';

function CreateAlbum(): JSX.Element {
  useAuthGuard();

  return (
    <InternalPageLayout
      pageTitle="Create new album"
      pageDescription="Create a new album to insert your photos in"
    >
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
    </InternalPageLayout>
  );
}

export default CreateAlbum;
