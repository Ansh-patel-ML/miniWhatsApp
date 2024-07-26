import { db } from "@/firebase/config";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { create } from "zustand";

interface usersStoreI {
  currentUser: null | DocumentData;
  fetchUserDetails: (uid: string | undefined) => void;
}

export const useUser = create<usersStoreI>()((set) => ({
  currentUser: null,
  fetchUserDetails: async (uid) => {
    if (!uid) {
      return set({
        currentUser: null,
      });
    }

    try {
      const usersDocRef = doc(db, "users", uid);
      const usersDocSnapShot = await getDoc(usersDocRef);

      if (usersDocSnapShot.exists()) {
        return set({
          currentUser: usersDocSnapShot.data(),
        });
      }
    } catch (error) {
      return set({
        currentUser: null,
      });
    }
  },
}));
