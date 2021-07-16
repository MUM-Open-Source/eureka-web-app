import firebase from 'firebase';
import { User, Event, Feedback } from '@/types/FirebaseTypes.interface';
import { EventFilter, MentorFilter, TalentFilter } from '@/types/FilterTypes.interface';

export interface NewUser {
    first_name: string;
    last_name: string;
    role: string;
}

export interface ImageToUpload {
    url: string;
    fileName: string;
}

export interface AppState {
    user: firebase.User | null;
    isSideNavCollapsed: boolean;
    isLoading: boolean;
    is_under_maintenance: boolean;
    user_data: User | null;
    is_new_user_data_available: boolean;
    user_image: string;
    upload_image: ImageToUpload;
    new_img_url: string;
    is_new: boolean;
    events: Event[];
    talent: User[];
    mentors: User[];
    feedback: Feedback[];
    liked_events: string[];
    user_waves: string[];
    waves_from_other_users: string[];
    filters: {
        event: EventFilter;
        talent: TalentFilter;
        mentors: MentorFilter;
    };
    notifications: any[];
    defaultNotificationCategories: string[];
}
