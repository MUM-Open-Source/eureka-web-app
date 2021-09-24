import emailjs from 'emailjs-com';

// initiate emailjs client
emailjs.init(process.env.VUE_APP_EMAILJS_USER_ID);

/** Used to send an email to a particular receiver */
export function sendEmail(
    receiver_name: string,
    receiver_email: string,
    title: string,
    body: string = '' // body is an optional parameter
) {
    emailjs
        .send(
            process.env.VUE_APP_EMAILJS_SERVICE_ID,
            process.env.VUE_APP_EMAILJS_TEMPLATE_ID,
            {
                receiver_name: receiver_name,
                receiver_email: receiver_email,
                title: title,
                body: body,
            }
        )
        .catch((error: any) =>
            console.log("Couldn't send email notification.", error)
        );
}
