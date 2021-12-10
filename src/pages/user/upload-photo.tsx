/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import Image from 'next/image';

import { Button, Input, InputMedia, Select } from '~/components';
import { useAuthGuard } from '~/hooks';
import { InternalPageLayout } from '~/layouts';
import { IMedia, UpdatedLogo } from '~/models/Common';

import styles from '~/styles/pages/user/upload-photo.module.scss';

function UploadPhoto(): JSX.Element {
  useAuthGuard();

  const [uploadPhoto, setUploadPhoto] = useState<UpdatedLogo>();

  const handleChangeUploadPhoto = (fileObject: IMedia): void => {
    setUploadPhoto(fileObject);
  };

  return (
    <InternalPageLayout
      pageTitle="Upload a new photo"
      pageDescription="Save a new photo"
    >
      <form className={styles.UploadPhotoForm}>
        <label htmlFor="upload_photo" className={styles.UploadPhotoField}>
          <Image
            src="/assets/icons/camera-black.svg"
            alt="Upload de Imagem"
            width={53}
            height={49}
            layout="fixed"
          />
          <p>Upload new photo</p>
          <InputMedia
            name="upload_photo"
            mediaType="image"
            onChangeMedia={handleChangeUploadPhoto}
          />
        </label>
        <Input name="title" label="Photo title" id="title" />
        <Select name="album" label="Album" id="album" options={[]} />
        <Button type="submit" style={{ maxWidth: '100%' }}>
          Save photo
        </Button>
      </form>
    </InternalPageLayout>
  );
}

export default UploadPhoto;
