export type Incubator = {
  code?: string;
  name?: string;
  groups?: string[];
  workspaceOwnerId?: string;
  maxMemberPerTeam: number;
  maxNumberOfTeams?: number;
  teamCreationDeadline: Date;
  teamAdjourningDate?: Date;
  tags: string[];
  workspaceMembers?: string[];
  peerReviewDurationInDays: number;
  tutorialSlots: string[];
};

export type WorkspaceMember = {
  id: string;
  userId: string;
  group?: string;
  workspace: string;
  memberSince: Date;
  tags: string[];
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
