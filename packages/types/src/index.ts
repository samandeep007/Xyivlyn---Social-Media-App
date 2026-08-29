export type UserId = string;

export type UserStatus =
  | 'offline'
  | 'online'
  | 'searching'
  | 'in_conversation';

export interface PublicUserProfile {
  id: UserId;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  interests: string[];
}
