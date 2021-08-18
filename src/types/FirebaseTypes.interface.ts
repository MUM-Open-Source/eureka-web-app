import firebase from 'firebase';

export type UserRoles =
    | 'talent'
    | 'mentor'
    | 'admin'
    | 'student'
    | 'staff'
    | 'public';

export interface User {
    background?: string;
    bio?: string;
    created_at: firebase.firestore.FieldValue;
    experience_level?: number;
    first_name: string;
    full_name: string;
    id: string;
    image_url: string;
    interests?: string[];
    last_login: firebase.firestore.FieldValue;
    last_name: string;
    roles: UserRoles[];
    social_links: {
        email_id: string;
        github_url?: string;
        linkedin_url?: string;
        website_url?: string;
    };
    groups: string[] ;

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

export interface Project {
    id: string;
    project_name: string;
    project_duration: string;
    project_fields: string[];
}

export interface Feedback {
    created_at: firebase.firestore.FieldValue;
    message: string;
    subject: string;
    user_id: string;
    user_name: string;
}

export interface Message {
    from: string | null ;
    sender_full_name: string ; 
    type: string;
    payload: string; // can be text or media files
    group_id: string ;
    timestamp: string | null ;
}

export interface Group {
    created_at: firebase.firestore.FieldValue;
    created_by: string ;
    modified_at: firebase.firestore.FieldValue;;
    admin_id: string ;
    id: string ;
    members: string[] ;
    name: string | null; //team name
    is_team: boolean | null ;
    recent_message: Message | null ;
}
