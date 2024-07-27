import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";

interface searchUserActionI {
  username: string;
}

export const searchUserAction = async ({ username }: searchUserActionI) => {
  const userCollectionRef = collection(db, "users");
  const queryRef = query(userCollectionRef, where("username", "==", username));
  const querySnapShort = await getDocs(queryRef);
  return querySnapShort.docs;
};
