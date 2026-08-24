import { firebaseApp } from "@/config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const readFileAsDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const UploadImageToFirebaseAndReturnUrls = async (files: File[] = []) => {
  if (!files.length) {
    return [];
  }

  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (
    !storageBucket ||
    storageBucket.includes("undefined") ||
    storageBucket.includes("your-storage-bucket")
  ) {
    return await Promise.all(files.map(readFileAsDataUrl));
  }

  try {
    const storage = getStorage(firebaseApp);
    const uploadedImagesRefs = await Promise.all(
      files.map(async (file) => {
        const safeFileName = file.name
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^a-zA-Z0-9._-]/g, "");

        const storageRef = ref(
          storage,
          `images/${Date.now()}-${Math.random().toString(16).slice(2)}-${safeFileName || "media"}`
        );

        await uploadBytes(storageRef, file);
        return storageRef;
      })
    );

    const urls = await Promise.all(
      uploadedImagesRefs.map(async (storageRef) => {
        return await getDownloadURL(storageRef);
      })
    );

    return urls;
  } catch (error: unknown) {
    console.warn(
      "Firebase Storage quota exceeded or unavailable. Falling back to data URL encoding.",
      error
    );
    try {
      return await Promise.all(files.map(readFileAsDataUrl));
    } catch (fallbackErr) {
      console.error("Failed to process fallback images:", fallbackErr);
      return [];
    }
  }
};
