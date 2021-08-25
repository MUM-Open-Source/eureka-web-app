import firebase from 'firebase';
import {
    User,
    Event,
    Feedback,
    Project,
} from '@/types/FirebaseTypes.interface';
import {
    EventFilter,
    MentorFilter,
    TalentFilter,
} from '@/types/FilterTypes.interface';

export interface NewUser {
    first_name: string;
    last_name: string;
    role: string;
}

export interface ImageToUpload {
    url: string;
    fileName: string;
}

export interface FileUpload {
    url: string;
    fileName: string;
}

export interface ResearchInvolvement {
    research_id: string;
    status_code: number;
    updateLog: number[];
    user_email: string;
    user_id: string;
    user_name: string;
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
    dialog: string[];
    events: Event[];
    talent: User[];
    mentors: User[];
    upload_files: FileUpload;
    feedback: Feedback[];
    liked_events: string[];
    user_waves: string[];
    process_status: boolean;
    waves_from_other_users: string[];
    filters: {
        event: EventFilter;
        talent: TalentFilter;
        mentors: MentorFilter;
    };
}
