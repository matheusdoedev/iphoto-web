import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Button, Input, Seo } from '~/components';
import { useAuthGuard } from '~/hooks';
import { InternalPageLayout } from '~/layouts';
import { ICreateAlbumDto } from '~/models/Album';
import AlbumService from '~/services/Album';
import { handleYupValidationError } from '~/utils/functions';

import styles from '~/styles/pages/user/create-album.module.scss';

function CreateAlbum(): JSX.Element {
  useAuthGuard();

  const [formData, setFormData] = useState<ICreateAlbumDto>({
    title: '',
  });

  const router = useRouter();
  const albumService = new AlbumService();

  const handleSubmitCreateAlbum = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const schema = Yup.object().shape({
      title: Yup.string().required('Album title required.'),
    });

    try {
      await schema.validate(formData, {
        abortEarly: false,
      });

      await albumService.postCreateAlbum(formData);

      router.push('/user');
      toast.success('Album created.');
    } catch (error) {
      handleYupValidationError(error as Error);
    }
  };

  return (
    <>
      <Seo title="Create album" />
      <InternalPageLayout
        pageTitle="Create new album"
        pageDescription="Create a new album to insert your photos in"
      >
        <form
          className={styles.CreateAlbumForm}
          onSubmit={handleSubmitCreateAlbum}
        >
          <Input
            name="title"
            label="Title"
            placeholder="Insert the album title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Button type="submit" style={{ maxWidth: '100%' }}>
            Create album
          </Button>
        </form>
      </InternalPageLayout>
    </>
  );
}

export default CreateAlbum;
