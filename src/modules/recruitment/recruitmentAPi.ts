import { db } from '@/firebase';
import firebase from 'firebase';

const RESEARCH_INVOLVEMENTS = 'research-involvements';
const PROJECT = 'projects';

const getResearchId = ({
    user_id,
    research_id,
}: {
    user_id: string;
    research_id: string;
}) => `${research_id}${user_id}`;

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
    statusCode: string;
}) =>
    db
        .collection(RESEARCH_INVOLVEMENTS)
        .doc(getResearchId({ user_id, research_id }))
        .update({
            statusCode,
            updateLog: firebase.firestore.FieldValue.arrayUnion(
                firebase.firestore.FieldValue.serverTimestamp()
            ),
        });
