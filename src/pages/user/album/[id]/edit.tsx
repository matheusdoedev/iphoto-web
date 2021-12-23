import { useCallback, useState, useEffect, useMemo, FormEvent } from 'react';
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Input, Seo, Button, PhotosList } from '~/components';
import { InternalPageLayout } from '~/layouts';

import { ICreateAlbumDto } from '~/models/Album';
import { AlbumService } from '~/services';

import styles from '~/styles/pages/user/edit-album.module.scss';
import { handleYupValidationError } from '~/utils/functions';

function EditAlbum(): JSX.Element {
  const [formData, setFormData] = useState<ICreateAlbumDto>({
    title: '',
  });

  const albumService = useMemo(() => new AlbumService(), []);
  const router = useRouter();
  const { id } = router.query;

  const handleGetAlbumInfo = useCallback(async (): Promise<void> => {
    try {
      if (typeof id !== 'string') {
        return;
      }

      const data = await albumService
        .getAlbumById(id as string)
        .then((r) => r.data);

      setFormData({ title: data.title });
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, [albumService, id]);

  const handleSubmitEditAlbum = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (typeof id !== 'string') {
      return;
    }

    const schema = Yup.object().shape({
      title: Yup.string().required('Album title required'),
    });

    try {
      await schema.validate(formData, {
        abortEarly: false,
      });

      await albumService.putEditAlbum(id, formData);
      toast.success('Album info updated.');
    } catch (error) {
      handleYupValidationError(error as Error);
    }
  };

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
          <form
            className={styles.EditAlbumDetailsForm}
            onSubmit={handleSubmitEditAlbum}
          >
            <Input
              label="Album title"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <div className={styles.EditAlbumDetailsFormButtons}>
              <Button type="submit">Save</Button>
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
