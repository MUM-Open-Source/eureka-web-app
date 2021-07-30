import emailjs from 'emailjs-com';

console.log('Email Js Init');
emailjs.init('user_fcZ3Ep0aGzqaRMBleNUhF');

export function sendTrialEmail() {
    emailjs
        .send(process.env.VUE_APP_EMAILJS_SERVICE_ID, 'template_s1biv3m', {
            receiver_email: 'wtan0095@student.monash.edu',
            sender_name: 'Eureka Dev Console',
            receiver_name: 'Wei Chun',
            message: 'Hello from EmailJS',
        })
        .then(
            result => console.log('SUCCESS!', result),
            error => console.log('FAILED...', error)
        );
}
