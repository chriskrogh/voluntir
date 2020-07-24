if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

const account = process.env.ACCOUNT_NAME || "";
const accountKey = process.env.ACCOUNT_KEY || "";

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);

const getDataFromStream = async (readableStream: NodeJS.ReadableStream) => {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    readableStream.on("data", (data) => {
      chunks.push(data);
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

const createContainerIfDoesNotExist = async (containerName: string) => {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  try {
    await containerClient.create()
  } catch (error) {
    console.log(error);
  }
}

const uploadContent = async (
  containerName: string,
  blobName: string,
  content: Buffer
) => {
  const blockBlobClient = blobServiceClient
    .getContainerClient(containerName)
    .getBlockBlobClient(blobName);

  try {
    await blockBlobClient.upload(content, Buffer.byteLength(content));
  } catch(error) {
    console.log(error);
  }
}

const downloadContent = async (
  containerName: string,
  blobName: string,
) => {
  const blockBlobClient = blobServiceClient
    .getContainerClient(containerName)
    .getBlockBlobClient(blobName);

  try {
    const downloadedStream = (await blockBlobClient.download(0))
      .readableStreamBody as NodeJS.ReadableStream;
    return getDataFromStream(downloadedStream);
  } catch(error) {
    console.log(error);
  }
}

const deleteBlob = async (containerName: string, blobName: string) => {
  try {
    await blobServiceClient
      .getContainerClient(containerName)
      .getBlockBlobClient(blobName)
      .delete();
  } catch(error) {
    console.log(error);
  }
}

const deleteContainer = async (containerName: string) => {
  try {
    await blobServiceClient
      .getContainerClient(containerName)
      .delete();
  } catch(error) {
    console.log(error);
  }
}

export default {
  createContainerIfDoesNotExist,
  uploadContent,
  downloadContent,
  deleteBlob,
  deleteContainer
};
