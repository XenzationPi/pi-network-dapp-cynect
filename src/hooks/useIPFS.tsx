import { useState } from 'react';
import { uploadToIPFS, getIPFSUrl } from '@/lib/ipfs';
import { useToast } from '@/components/ui/use-toast';

export const useIPFS = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const upload = async (file: File) => {
    setIsUploading(true);
    try {
      const ipfsPath = await uploadToIPFS(file);
      const httpUrl = getIPFSUrl(ipfsPath);
      
      toast({
        title: "Upload successful",
        description: "File has been stored on IPFS",
      });

      return { ipfsPath, httpUrl };
    } catch (error) {
      console.error('IPFS upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload file to IPFS. Falling back to default storage.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    upload,
    isUploading,
    getUrl: getIPFSUrl,
  };
};