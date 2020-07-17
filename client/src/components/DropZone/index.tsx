import type { WithStyles, Theme } from '@material-ui/core/styles';

import React, { useCallback } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { useDropzone } from 'react-dropzone';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import ParagraphText from 'components/typography/ParagraphText';

const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    minHeight: 100,
    borderRadius: theme.spacing(1),
    border: '1px dotted black',
    cursor: 'pointer'
  },
  textContainer: {
    marginTop: theme.spacing(1)
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%'
  }
});

interface Props extends WithStyles<typeof styles> {
  callback?: (id: string) => void;
  background?: string;
  multiple?: boolean;
}

function DropZone({ classes, callback, background, multiple = false }: Props) {
  const onDrop = useCallback((files: File[]) => {
    console.log(files);
    if(callback) {
      callback('');
    }
  }, [ callback ]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={classes.container} {...getRootProps()}>
      <input {...getInputProps()} multiple={multiple} />
      {background ? (
        <img
          alt="upload"
          src={background}
          className={classes.image}
        />
      ) : (
        <>
          <ImageSearchIcon />
          <div className={classes.textContainer}>
            <ParagraphText text={isDragActive ? '' : 'Drag files or click here to upload'} align='center' />
          </div>
        </>
      )}
    </div>
  );
}

export default withStyles(styles)(DropZone);
