export type TAttemptData = {
  email: string;
  password: string;
};

export type RTAttempt = {
  access_token: string;
  expiresIn: string;
};

export interface IAuthenticationService {
  attempt: (data: TAttemptData) => Promise<RTAttempt>;
}
