import { auth, db, storage } from '@/firebase';
import firebase from 'firebase';
import { RESEARCH_APPLY, RESEARCH_INTEREST } from '../constants';

const RESEARCH_INVOLVEMENTS = 'research_involvements';
const PROJECT = 'projects';

const getResearchId = ({
    user_id,
    research_id,
}: {
    user_id: string;
    research_id: string;
}) => `${user_id}${research_id}`;

export const getAllProjects = async () =>
    (await db.collection(PROJECT).get()).docs.map(p => ({
        id: p.id,
        ...p.data(),
    }));

export const createProject = ({
    project_name,
    project_duration,
    project_fields,
    overview,
}: {
    project_name: string;
    project_duration: string;
    project_fields: string[];
    overview: string;
    supervisor: string;
    supervisor_id: number;
    email: string;
}) => {
    return db.collection(PROJECT).add({
        project_name,
        project_duration,
        overview,
        supervisor: auth.currentUser!.displayName,
        supervisor_id: auth.currentUser!.uid,
        project_fields,
        email: auth.currentUser!.email,
    });
};

export const updateProject = ({
    id,
    project_name,
    project_duration,
    project_fields,
    overview,
}: {
    id: number;
    project_name: string;
    project_duration: string;
    project_fields: string[];
    overview: string;
}) => {
    return db
        .collection(PROJECT)
        .doc(`${id}`)
        .update({
            project_name,
            project_duration,
            overview,
            supervisor: auth.currentUser!.displayName,
            supervisor_id: auth.currentUser!.uid,
            project_fields,
            email: auth.currentUser!.email,
        });
};

export const deleteProject = ({ id }: { id: number }) => {
    console.log(id);
    return db
        .collection(PROJECT)
        .doc(`${id}`)
        .delete();
};

export const getRealtimeStudentInvolvements = async ({
    user_id,
    onSnapshot,
}: {
    user_id: string;
    onSnapshot: Function;
}) => {
    return db
        .collection(RESEARCH_INVOLVEMENTS)
        .where('user_id', '==', user_id)
        .onSnapshot(snapshot =>
            onSnapshot(snapshot.docs.map(doc => doc.data()))
        );
};

export const getProjectRealtimeStudentInvolvements = async ({
    research_id,
    onSnapshot,
}: {
    research_id: string;
    onSnapshot: Function;
}) => {
    return db
        .collection(RESEARCH_INVOLVEMENTS)
        .where('research_id', '==', research_id)
        .onSnapshot(snapshot =>
            onSnapshot(snapshot.docs.map(doc => doc.data()))
        );
};

export const getLecturerRealtimeStudentInvolvement = ({
    supervisor_id,
    onSnapshot,
}: {
    supervisor_id: string;
    onSnapshot: Function;
}) => {
    return db
        .collection(PROJECT)
        .where('supervisor_id', '==', supervisor_id)
        .onSnapshot(snapshot =>
            onSnapshot(snapshot.docs.map(doc => doc.data()))
        );
};

export const updateStudentInvolvements = async ({
    user_id,
    research_id,
    statusCode,
}: {
    user_id: string;
    research_id: string;
    statusCode: number;
}) =>
    db
        .collection(RESEARCH_INVOLVEMENTS)
        .doc(getResearchId({ user_id, research_id }))
        .update({
            statusCode,
            updateLog: firebase.firestore.FieldValue.arrayUnion({
                time: new Date(),
                status: statusCode,
            }),
        });

export const studentInterested = async ({
    user_id,
    research_id,
    user_email,
    user_name,
}: {
    user_id: string;
    research_id: string;
    user_email: string;
    user_name: string;
}) => {
    return db
        .collection(RESEARCH_INVOLVEMENTS)
        .doc(getResearchId({ user_id, research_id }))
        .set({
            user_id,
            research_id,
            user_email,
            user_name,
            statusCode: RESEARCH_INTEREST,
            updateLog: firebase.firestore.FieldValue.arrayUnion({
                time: new Date(),
                status: RESEARCH_INTEREST,
            }),
        });
};

export const studentUploadDocuments = async ({
    user_id,
    research_id,
    user_name,
    files,
}: {
    user_id: string;
    user_name: string;
    research_id: string;
    files: { metadata: any; file: any; filename: any }[];
}) => {
    const filesLinks = await uploadDocuments({
        user_id,
        research_id,
        files,
        user_name,
    });
    return await db
        .collection(RESEARCH_INVOLVEMENTS)
        .doc(getResearchId({ user_id, research_id }))
        .update({
            statusCode: RESEARCH_APPLY,
            files: filesLinks,
            updateLog: firebase.firestore.FieldValue.arrayUnion({
                time: new Date(),
                status: RESEARCH_APPLY,
            }),
        });
};
export const uploadDocuments = async ({
    user_id,
    research_id,
    files,
    user_name,
}: {
    user_id: string;
    research_id: string;
    files: { metadata: any; file: any; filename: any }[];
    user_name: string;
}) => {
    return await Promise.all(
        files.map(async file => {
            const document = await storage
                .ref()
                .child(
                    `documents/${user_id}/${research_id}/${user_name}-${file.filename}`
                )
                .put(file.file, file.metadata);
            return await document.ref.getDownloadURL();
        })
    );
};
