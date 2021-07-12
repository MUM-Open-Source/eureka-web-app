import {db} from "../firebase";
import {Incubator} from "../types/Incubator";

const workspaceCodeGenerator = () => {
  const code = Math.floor(new Date().getTime() / 1000);
  return code.toString(36);
};

export const createWorkSpace = (workshopSettings: Incubator) => {
  const code = workspaceCodeGenerator();
  db.collection("incubator")
    .doc(code)
    .set({...workshopSettings, code})
    .then((data: any) => {
      console.log(data);
    });
};

export const deleteWorkspace = (workspaceCode: string) => {
  db.collection("incubator")
    .doc(workspaceCode)
    .delete();
};
