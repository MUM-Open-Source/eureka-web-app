import {db} from "../firebase";
import {Incubator} from "../types/Incubator";
import store from "@/store";
import firebase from "firebase";

const INCUBATOR_PATH = "incubator";
const USER_PATH = "users";

const workspaceCodeGenerator = () => {
  const code = Math.floor(new Date().getTime() / 1000);
  return code.toString(36);
};

export const createWorkSpace = (
  workshopSettings: Incubator,
  onSuccess: (data: any) => void,
  onError: () => void
) => {
  const code = workspaceCodeGenerator();
  db.collection(INCUBATOR_PATH)
    .doc(code)
    .set({...workshopSettings, code, workspaceOwnerId: store.state.user?.uid})
    .then(() => {
      db.collection(USER_PATH)
        .doc(store.state.user?.uid)
        .update({workspace: firebase.firestore.FieldValue.arrayUnion(code)})
        .then(onSuccess)
        .catch(onError);
    });
};

export const getWorkspace = (
  workspaceCode: string,
  onSuccess: (data: any) => void,
  onError: () => void
) => {
  db.collection(INCUBATOR_PATH)
    .doc(workspaceCode)
    .get()
    .then(onSuccess)
    .catch(onError);
};

export const updateWorkspace = (
  workspaceCode: string,
  updatedData: {[key: string]: any},
  onSuccess: (data: any) => void,
  onError: () => void
) => {
  db.collection(INCUBATOR_PATH)
    .doc(workspaceCode)
    .update(updatedData)
    .then(onSuccess)
    .catch(onError);
};

export const deleteWorkspace = (
  workspaceCode: string,
  onSuccess: (data: any) => void,
  onError: () => void
) => {
  db.collection(INCUBATOR_PATH)
    .doc(workspaceCode)
    .delete()
    .then(() => {
      db.collection(USER_PATH)
        .doc(store.state.user?.uid)
        .update({
          workspace: firebase.firestore.FieldValue.arrayRemove(workspaceCode),
        })
        .then(onSuccess)
        .catch(onError);
    })
    .catch(onError);
};

export const getPersonalWorkspace = (
  userWorkspaceArray: string[],
  onSuccess: (data: any) => void,
  onError: () => void
) => {
  db.collection(INCUBATOR_PATH)
    .where("code", "in", userWorkspaceArray)
    .get()
    .then(onSuccess)
    .catch(onError);
};
