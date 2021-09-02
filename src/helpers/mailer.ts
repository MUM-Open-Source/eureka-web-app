import emailjs from 'emailjs-com';

/** GuideLine to sending email
 *
 * 1. Log into emailJS with Eureka credentials
 * 2. Navigate to Email Template
 * 3. Create New template
 * 4. Setup template and replace key message with dynamic variable {{}}
 * 5. Take Note for the template id and setup function
 */

// initiate emailjs client
emailjs.init(process.env.VUE_APP_EMAILJS_USER_ID);
console.log('Email Js Init');

/** Used to send an email to a particular receiver */
export function sendEmail(
    receiver_name: string,
    receiver_email: string,
    title: string,
    body: string = ''
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
        .then((response: any) =>
            console.log('SUCCESS!', response.status, response.text)
        )
        .catch((error: any) => console.log('FAILED...', error));
}
