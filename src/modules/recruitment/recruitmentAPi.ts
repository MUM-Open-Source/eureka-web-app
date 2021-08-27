import { db, storage } from '@/firebase';
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
    files,
}: {
    user_id: string;
    research_id: string;
    files: { metadata: any; file: any; filename: any }[];
}) => {
    const filesLinks = await uploadDocuments({ user_id, research_id, files });
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
}: {
    user_id: string;
    research_id: string;
    files: { metadata: any; file: any; filename: any }[];
}) => {
    return files.map(async file => {
        const document = await storage
            .ref()
            .child(`documents/${user_id}/${research_id}-${file.filename}`)
            .put(file.file, file.metadata);
        return await document.ref.getDownloadURL();
    });
};
