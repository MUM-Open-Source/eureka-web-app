import 'firebase/auth';
import firebaseApp from 'firebase/app';
import { db } from '@/firebase';
import { Notification } from '@/types/FirebaseTypes.interface';
import { sendEmail } from '@/helpers/mailer';

export const sendNotification = async (
    notification: Notification,
    email: boolean = false
) => {
    const docRef = await db.collection('notifications').doc();
    const id = docRef.id;

    const parsedNotification: Notification = {
        id: id, // storing id as attribute
        user_id: notification.user_id,
        category: notification.category,
        title: notification.title,
        read_status: notification.read_status,
        timestamp: notification.timestamp,
    };

    // optional body property
    if ('body' in notification) parsedNotification['body'] = notification.body;

    // write to db
    db.collection('notifications')
        .doc(id)
        .set(parsedNotification)
        .catch(error => {
            console.error('Error adding document: ', error);
        });

    if (email) {
        // get the receiver's name and email from db
        db.collection('users')
            .doc(notification.user_id)
            .get()
            .then(doc => {
                if (doc.exists) {
                    // notification contains a body
                    if ('body' in parsedNotification)
                        sendEmail(
                            doc.data()!.first_name,
                            doc.data()!.social_links.email_id,
                            parsedNotification.title,
                            parsedNotification.body
                        );
                    // notification contains no body
                    else
                        sendEmail(
                            doc.data()!.first_name,
                            doc.data()!.social_links.email_id,
                            parsedNotification.title
                        );
                }
            });
    }
};
