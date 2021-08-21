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
emailjs.init('user_fcZ3Ep0aGzqaRMBleNUhF');
console.log('Email Js Init');

/** Used to test emailjs client */
export function sendTrialEmail() {
    emailjs
        .send(process.env.VUE_APP_EMAILJS_SERVICE_ID, 'template_s1biv3m', {
            receiver_email: 'eurekaqh88@gmail.com',
            sender_name: 'Eureka Dev Console',
            receiver_name: 'Eureka Receiver',
            message: 'Hello from EmailJS',
        })
        .then(
            result => console.log('SUCCESS!', result),
            error => console.log('FAILED...', error)
        );
}

/** Used to test send an email to a particular receiver */
export function sendEmail(
    templateId: string,
    parameters: Record<string, string>
) {
    emailjs
        .send(process.env.VUE_APP_EMAILJS_SERVICE_ID, templateId, parameters)
        .then(
            result => console.log('SUCCESS!', result),
            error => console.log('FAILED...', error)
        );
}
