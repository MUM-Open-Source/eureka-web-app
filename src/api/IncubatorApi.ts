import {db} from "../firebase";
import {Incubator} from "../types/Incubator";

const INCUBATOR_PATH = "incubator";

const workspaceCodeGenerator = () => {
  const code = Math.floor(new Date().getTime() / 1000);
  return code.toString(36);
};

export const createWorkSpace = (workshopSettings: Incubator) => {
  const code = workspaceCodeGenerator();
  db.collection(INCUBATOR_PATH)
    .doc(code)
    .set({...workshopSettings, code});
};

export const getWorkspace = (workspaceCode: string) => {
  db.collection(INCUBATOR_PATH)
    .doc(workspaceCode)
    .get()
    .then((data) => {
      console.log(data);
    });
};

export const updateWorkspace = (
  workspaceCode: string,
  updatedData: {[key: string]: any}
) => {
  db.collection(INCUBATOR_PATH)
    .doc(workspaceCode)
    .update(updatedData);
};

export const deleteWorkspace = (workspaceCode: string) => {
  db.collection(INCUBATOR_PATH)
    .doc(workspaceCode)
    .delete();
};
