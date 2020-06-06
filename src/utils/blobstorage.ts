if ( process.env.NODE_ENV !== 'production' ) {
  require( 'dotenv' ).config();
}

import path from 'path';
import storage, { BlobService } from 'azure-storage';
import { Writable } from 'stream';

const blobService = storage.createBlobService();

type ListContainersResult = {
  message: string;
  containers: BlobService.ContainerResult[];
}

const listContainers = async (): Promise<ListContainersResult> => {
  return new Promise( ( resolve, reject ) => {
    blobService.listContainersSegmented( null,
      ( err: Error, data: BlobService.ListContainerResult ) => {
        if ( err ) {
          reject( err );
        } else {
          resolve( {
            message: `${data.entries.length} containers`,
            containers: data.entries
          } );
        }
      }
    );
  } );
};

const createContainer = async ( containerName: string ) => {
  return new Promise( ( resolve, reject ) => {
    blobService.createContainerIfNotExists(
      containerName,
      { publicAccessLevel: 'blob' },
      err => {
        if ( err ) {
          reject( err );
        } else {
          resolve( { message: `Container '${containerName}' created` } );
        }
      }
    );
  } );
};

const uploadString = async (
  containerName: string,
  blobName: string,
  text: string | Buffer
) => {
  return new Promise( ( resolve, reject ) => {
    blobService.createBlockBlobFromText( containerName, blobName, text, err => {
      if ( err ) {
        reject( err );
      } else {
        resolve( { message: `Text "${text}" is written to blob storage` } );
      }
    } );
  } );
};

const uploadLocalFile = async ( containerName: string, filePath: string ) => {
  return new Promise( ( resolve, reject ) => {
    const fullPath = path.resolve( filePath );
    const blobName = path.basename( filePath );
    blobService.createBlockBlobFromLocalFile(
      containerName,
      blobName,
      fullPath,
      err => {
        if ( err ) {
          reject( err );
        } else {
          resolve( { message: `Local file "${filePath}" is uploaded` } );
        }
      }
    );
  } );
};

const listBlobs = async ( containerName: string ) => {
  return new Promise( ( resolve, reject ) => {
    blobService.listBlobsSegmented(
      containerName,
      { nextMarker: "" },
      ( err: Error, data: BlobService.ListBlobsResult ) => {
        if ( err ) {
          reject( err );
        } else {
          resolve( {
            message: `${data.entries.length} blobs in '${containerName}'`,
            blobs: data.entries
          } );
        }
      }
    );
  } );
};

const downloadBlob = async (
  containerName: string,
  blobName: string,
  writeStream: Writable
) => {
  return new Promise( ( resolve, reject ) => {
    blobService.getBlobToStream( containerName, blobName, writeStream, ( err, data ) => {
      if ( err ) {
        reject( err );
      } else {
        resolve( { message: `Blob downloaded "${data}"`, data } );
      }
    } );
  } );
};

const deleteBlob = async ( containerName: string, blobName: string ) => {
  return new Promise( ( resolve, reject ) => {
    blobService.deleteBlobIfExists( containerName, blobName, err => {
      if ( err ) {
        reject( err );
      } else {
        resolve( { message: `Block blob '${blobName}' deleted` } );
      }
    } );
  } );
};

const deleteContainer = async ( containerName: string ) => {
  return new Promise( ( resolve, reject ) => {
    blobService.deleteContainer( containerName, err => {
      if ( err ) {
        reject( err );
      } else {
        resolve( { message: `Container '${containerName}' deleted` } );
      }
    } );
  } );
};

const createContainerIfDoesNotExist = async ( containerName: string ) => {
  const response = await listContainers();
  const containerDoesNotExist = response.containers
    .findIndex( ( container ) => container.name === containerName ) === -1;
  if ( containerDoesNotExist ) {
    await createContainer( containerName );
  }
}

export default {
  listContainers,
  createContainerIfDoesNotExist,
  uploadString,
  uploadLocalFile,
  listBlobs,
  downloadBlob,
  deleteBlob,
  deleteContainer
};
