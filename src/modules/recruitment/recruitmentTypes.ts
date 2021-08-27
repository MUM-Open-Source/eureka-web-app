export default interface RecruitementStoreState {
    allProjects: Project[];
    projectDetailsPageData: any;
    userInvolvementSubscription: any;
    userInvolvements: ResearchInvolvement[];
    projectDetailsPageStudentSubscription: any;
    projectDetailsPageStudentList: ResearchInvolvement[];
}

export interface ResearchInvolvement {
    research_id: string;
    status_code: number;
    updateLog: number[];
    file_path?: string;
    user_email: string;
    user_id: string;
    user_name: string;
}

export interface Project {
    id: string;
    supervisor_id?: string;
    supervisor?: string | null;
    project_name?: string;
    project_duration?: string;
    project_fields?: string[];
    overview?: string;
    email?: string;
}
