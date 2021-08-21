import 'firebase/auth';
import firebaseApp from 'firebase/app';
import { db, auth } from '@/firebase';
import { Notification } from '@/types/FirebaseTypes.interface';

export const sendNotification = async (user_id: string, props: object) => {
    const docRef = await db.collection('notifications').doc();
    const id = docRef.id;
    const parsedProps: Notification = {
        id: id,
        user_id: user_id,
        category: 'none',
        read_status: false,
        timestamp: firebaseApp.firestore.FieldValue.serverTimestamp() as any, // set as any to override field value type
        ...props, // custom props will override default values
    };
    db.collection('notifications')
        .doc(id)
        .set(parsedProps);
};
