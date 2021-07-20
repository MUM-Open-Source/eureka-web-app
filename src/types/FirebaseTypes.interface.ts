import firebase from 'firebase';

export type UserRoles = 'talent' | 'mentor' | 'admin';

export interface User {
    background: string;
    bio: string;
    created_at: firebase.firestore.FieldValue;
    experience_level: number;
    first_name: string;
    full_name: string;
    id: string;
    image_url: string;
    interests: string[];
    last_login: firebase.firestore.FieldValue;
    last_name: string;
    roles: UserRoles[];
    social_links: {
        email_id: string;
        github_url: string;
        linkedin_url: string;
        website_url: string;
    }
    peer_reviews: {
        peer_reviews_given: firebase.firestore.DocumentReference[];
        peer_reviews_received: firebase.firestore.DocumentReference[];
        peer_rating_count: number;
        peer_rating_sum: number;
    }
}

export interface Event {
    dates: string;
    description: string;
    id: string;
    image_url: string;
    link: string;
    name: string;
    organizer: string;
    type: string;
}

export interface Feedback {
    created_at: firebase.firestore.FieldValue,
    message: string;
    subject: string;
    user_id: string;
    user_name: string;
}

export interface PeerReview {
    team_id: string;
    from_id: string;
    to_id: string;
    date_created: firebase.firestore.FieldValue;
    rating_count: number;
    rating_sum: number;
    responses: {}
    summary: string;
}