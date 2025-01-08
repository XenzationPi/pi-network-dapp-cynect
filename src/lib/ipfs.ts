import { create } from 'ipfs-http-client';

// Using Infura's IPFS gateway for reliability
const projectId = 'YOUR_INFURA_PROJECT_ID';
const projectSecret = 'YOUR_INFURA_PROJECT_SECRET';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

export const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

export const uploadToIPFS = async (file: File): Promise<string> => {
  try {
    const added = await ipfs.add(file);
    return `ipfs://${added.path}`;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
};

export const getIPFSUrl = (ipfsPath: string): string => {
  if (!ipfsPath) return '';
  // Convert IPFS URI to HTTP URL using a reliable gateway
  const path = ipfsPath.replace('ipfs://', '');
  return `https://ipfs.io/ipfs/${path}`;
};