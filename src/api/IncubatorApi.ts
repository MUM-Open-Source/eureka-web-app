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
    .then(onSuccess)
    .catch(onError);
};

export const getAllStudentWorkspace = async (
  userId: string,
  onSuccess: (data: Incubator[]) => void,
  onError: () => void
) => {
  try {
    const workspaceArray = (
      await db
        .collection(WORKSPACE_MEMBER_PATH)
        .where("userId", "==", userId)
        .get()
    ).docs
      .map((data) => data.data().workspace)
      .slice(0, 10);

    const allWorkspace = (
      await db
        .collection(INCUBATOR_PATH)
        .where("code", "in", workspaceArray)
        .get()
    ).docs.map((data) => data.data());

    onSuccess(allWorkspace as Incubator[]);
  } catch (e) {
    onError();
  }
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
  console.log("Adding workspace to user");
  await db
    .collection(USER_PATH)
    .doc(store.state.user?.uid)
    .update({
      workspace: firebase.firestore.FieldValue.arrayUnion(workspaceCode),
    });

  console.log("Add a new workspace member");
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

  console.log("Update the workspace");
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
