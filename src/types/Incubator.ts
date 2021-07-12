export type Incubator = {
  code: string;
  name: string;
  workspaceOwnerId: string;
  maxMemberPerTeam: number;
  maxNumberOfTeams?: number;
  teamCreationDeadline: Date;
  teamAdjourningDate?: Date;
  peerReviewDurationInDays: number;
  workspaceMembers: string[];
  groups: string[];
  tags: IncubatorArray[];
  tutorialSlots: IncubatorArray[];
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
