export type AuthUser = {
  id: string;
  email: string;
};

export type AccessTokenPayload = {
  sub: string;
  email: string;
  type: 'access';
};

export type RefreshTokenPayload = {
  sub: string;
  sid: string;
  type: 'refresh';
};
