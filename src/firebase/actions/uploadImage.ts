import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { bucket } from "../config";

interface uploadImageActionI {
  file: File;
  type: "PROFILE" | "CHAT_IMAGE";
  id: string;
}

export const uploadImageAction = ({
  file,
  type,
  id,
}: uploadImageActionI): [Promise<void>, string] => {
  const date = new Date();
  let storageRef;
  let imageRef;
  if (type === "PROFILE") {
    imageRef = `images/${type + id}`;
    storageRef = ref(bucket, imageRef);
  } else {
    imageRef = `images/${type + date + file.name}`;
    storageRef = ref(bucket, imageRef);
  }
  const uploadTask = uploadBytesResumable(storageRef, file);

  return [
    new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject("Something went wrong" + error.code);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        },
      );
    }),
    imageRef,
  ];
};
