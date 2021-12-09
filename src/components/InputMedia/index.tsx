import { InputHTMLAttributes, useMemo, useCallback, ChangeEvent } from 'react';

import { IMedia, MediaType } from '~/models/Common';

interface IInputMediaProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'accept' | 'type' | 'hidden'
  > {
  name: string;
  mediaType: MediaType;
  onChangeMedia: (fileObject: IMedia) => void;
}

function InputMedia({
  mediaType,
  onChangeMedia,
  name,
  ...rest
}: IInputMediaProps): JSX.Element {
  const acceptMediaMemo = useMemo(() => {
    const imageAccept = 'image/jpeg,image/png';
    const videoAccept = 'video/mp4, video/x-msvideo, video/quicktime';

    if (mediaType === 'image') {
      return imageAccept;
    }
    if (mediaType === 'video') {
      return videoAccept;
    }
    return `${imageAccept},${videoAccept}`;
  }, [mediaType]);

  const handleSetMedia = useCallback(
    (
      { target: { files } }: ChangeEvent<HTMLInputElement>,
      callback: (fileObject: IMedia) => void,
    ) => {
      if (files) {
        const file = files[0];
        const fileObject: IMedia = {
          name: URL.createObjectURL(file),
          type: mediaType,
          file,
        };
        callback(fileObject);
      }
    },
    [mediaType],
  );

  return (
    <input
      type="file"
      id={name}
      name={name}
      accept={acceptMediaMemo}
      {...rest}
      onChange={(e) => handleSetMedia(e, onChangeMedia)}
      hidden
    />
  );
}

export default InputMedia;
