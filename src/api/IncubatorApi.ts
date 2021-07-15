import {db} from "../firebase";
import {Incubator, WorkspaceMember} from "../types/Incubator";
import store from "@/store";
import firebase from "firebase";

const INCUBATOR_PATH = "incubator";
const USER_PATH = "users";
const WORKSPACE_MEMBER_PATH = "workspace_member";

const workspaceCodeGenerator = () => {
  const code = Math.floor(new Date().getTime() / 1000);
  return code.toString(36);
};

export const createWorkSpace = ({
  workshopSettings,
  onError,
  onSuccess,
}: {
  workshopSettings: Incubator;
  onSuccess: (data: any) => void;
  onError?: () => void;
}) => {
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

export const getAllWorkspace = (
  userWorkspaceArray: string[],
  onSuccess: (data: firebase.firestore.QuerySnapshot) => void,
  onError: () => void
) => {
  db.collection(INCUBATOR_PATH)
    .where(
      "code",
      "in",
      userWorkspaceArray.length > 10
        ? userWorkspaceArray.slice(-10)
        : userWorkspaceArray
    )
    .get()
    .then(onSuccess)
    .catch(onError);
};

export const studentJoinWorkspace = async ({
  workspaceCode,
  onSuccess,
  sellYourself,
  tags,
  tutorialSlots,
}: {
  workspaceCode: string;
  onSuccess: (data: any) => void;
  sellYourself: string;
  tags: string[];
  tutorialSlots: string[];
}) => {
  await db
    .collection(USER_PATH)
    .doc(store.state.user?.uid)
    .update({
      workspace: firebase.firestore.FieldValue.arrayUnion(workspaceCode),
    });

  await db
    .collection(WORKSPACE_MEMBER_PATH)
    .doc(`${store.state.user?.uid}${workspaceCode}`)
    .set({
      id: `${store.state.user?.uid}${workspaceCode}`,
      userId: store.state.user?.uid,
      group: null,
      workspace: workspaceCode,
      memberSince: new Date(),
      tutorialSlots,
      sellYourself,
      tags,
    });

  await db
    .collection(INCUBATOR_PATH)
    .doc(workspaceCode)
    .update({
      workspaceMembers: firebase.firestore.FieldValue.arrayUnion(
        `${store.state.user?.uid}${workspaceCode}`
      ),
    });

  onSuccess("success");
};

export const getLiveWorkspace = (
  workspaceCode: string,
  onSuccess: (data: any) => void,
  onError: () => void
) => {
  db.collection(INCUBATOR_PATH)
    .doc(workspaceCode)
    .onSnapshot((doc) => {
      onSuccess(doc.data());
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
