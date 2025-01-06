import { firebaseApp } from "@/config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const UploadImageToFirebaseAndReturnUrls = async (files: File[]) => {
  try {
    // Upload images to Firebase
    const storage = getStorage(firebaseApp);
    const uploadedImagesRefs = await Promise.all(
      files.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        return storageRef;
      })
    );

    // Get the URLs of the uploaded images
    const urls = await Promise.all(
      uploadedImagesRefs.map(async (storageRef) => {
        const url = await getDownloadURL(storageRef);
        return url;
      })
    );

    return urls;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
