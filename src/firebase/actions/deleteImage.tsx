import { ref, deleteObject } from "firebase/storage";
import { bucket } from "../config";

interface deleteImageActionI {
  imagePath: string;
}

export const deleteImageAction = ({ imagePath }: deleteImageActionI) => {
  const desertRef = ref(bucket, imagePath);
  return deleteObject(desertRef);
};
