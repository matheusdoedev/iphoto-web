import { useCallback, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import { Input, Seo, Button, PhotosList } from '~/components';
import { InternalPageLayout } from '~/layouts';

import styles from '~/styles/pages/user/edit-album.module.scss';
import { AlbumService } from '~/services';
import { ICreateAlbumDto } from '~/models/Album';

function EditAlbum(): JSX.Element {
  const [formData, setFormData] = useState<ICreateAlbumDto>({
    title: '',
  });

  const albumService = useMemo(() => new AlbumService(), []);
  const router = useRouter();
  const { id } = router.query;

  const handleGetAlbumInfo = useCallback(async (): Promise<void> => {
    try {
      const data = await albumService
        .getAlbumById(id as string)
        .then((r) => r.data);

      setFormData({ title: data.title });
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, [albumService, id]);

  useEffect(() => {
    handleGetAlbumInfo();
  }, [handleGetAlbumInfo]);

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
            <Input
              label="Album title"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <div className={styles.EditAlbumDetailsFormButtons}>
              <Button>Save</Button>
              <Button secondary style={{ color: 'red', background: 'none' }}>
                Delete album
              </Button>
            </div>
          </form>
          <h2 className={styles.EditAlbumSubtitle}>Photos</h2>
          <PhotosList albumId={id as string} />
        </section>
      </InternalPageLayout>
    </>
  );
}

export default EditAlbum;
