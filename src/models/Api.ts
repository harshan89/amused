import { ContentType } from "../networking/FetchClient";

export interface RequestOptions {
  path: string;
  query?: { [x: string]: string };
  isAuthRequired?: boolean;
  contentType?: ContentType;
}

export interface RequestOptionsWithBody extends RequestOptions {
  body?: any;
}

export interface ApiError {
  error: {
    code: string;
    title?: string;
    detail?: string;
  };
}
