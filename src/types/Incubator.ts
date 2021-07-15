export type Incubator = {
  code?: string;
  name?: string;
  groups?: string[];
  workspaceOwnerId?: string;
  maxMemberPerTeam: number;
  maxNumberOfTeams?: number;
  teamCreationDeadline: Date;
  teamAdjourningDate?: Date;
  tags: IncubatorArray[];
  workspaceMembers?: string[];
  peerReviewDurationInDays: number;
  tutorialSlots: IncubatorArray[];
};

export type WorkspaceMember = {
  id: string;
  userId: string;
  group?: string;
  workspace: string;
  memberSince: Date;
  tags: IncubatorArray[];
  tutorialSlots: string[];
  sellYourself: string;
};

export type Group = {
  groupId: string;
  groupName: string;
  groupFormDate: Date;
  workspaceId: string;
  groupMembers: string[];
};

export type IncubatorArray = {
  id: number;
  label: string;
  value: number;
};
