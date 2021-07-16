import {db} from "../firebase";
import {Incubator} from "../types/Incubator";
import store from "@/store";

const INCUBATOR_PATH = "incubator";
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

export const getAllLecturerWorkspace = async (
  userId: string,
  onSuccess: (data: Incubator[]) => void,
  onError: (error: string) => void
) => {
  try {
    const allWorkspace = (
      await db
        .collection(INCUBATOR_PATH)
        .where("workspaceOwnerId", "==", userId)
        .get()
    ).docs.map((data) => data.data());
    onSuccess(allWorkspace as Incubator[]);
  } catch (error) {
    onError("Error Fetching Lecturer Endpoint");
  }
};

export const getAllStudentWorkspace = async (
  userId: string,
  onSuccess: (data: Incubator[]) => void,
  onError: (error: string) => void
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
    onError("Error Fetching Student Workspace");
  }
};

export const studentJoinWorkspace = async ({
  workspaceCode,
  onSuccess,
  sellYourself,
  tags,
  tutorialSlots,
  onError,
}: {
  workspaceCode: string;
  onSuccess: (data: any) => void;
  onError: (error: string) => void;
  sellYourself: string;
  tags: string[];
  tutorialSlots: string[];
}) => {
  db.collection(WORKSPACE_MEMBER_PATH)
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
    })
    .then(onSuccess)
    .catch(() => onError("Error Joining Workspace"));
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
