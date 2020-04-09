export type TAttemptData = {
  email: string;
  password: string;
  username: string;
};

export type RTAttempt = {
  access_token: string;
  expiresIn: string;
};

export interface ISignUpService {
  attempt: (data: TAttemptData) => Promise<RTAttempt>;
}
