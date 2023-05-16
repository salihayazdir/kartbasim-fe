export type ResponseObject<T> = {
  error: ErrorDetails;
  data: T;
};

export type ErrorDetails =
  | false
  | {
      code: string;
      message: string;
    };
