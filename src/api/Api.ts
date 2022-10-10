import { config } from "../config/cocktailApiConfig";
import { RequestOptions, RequestOptionsWithBody } from "../models/Api";
import FetchClient from "../networking/FetchClient";

export const NO_NETWORK_ERROR = {
  status: 500,
  error: {
    code: "NO_NETWORK_ERROR",
  },
};

class Api {
  fetchClient!: FetchClient;

  constructor() {
    this.fetchClient = new FetchClient(config.api.apiRoot);
  }

  async get<T>(opts: RequestOptions) {
    return this.fetchClient.doRequest<T>({
      method: "get",
      path: opts.path,
      query: opts.query,
      contentType: opts.contentType,
    });
  }

  async post<T>(opts: RequestOptionsWithBody) {
    return this.fetchClient.doRequest<T>({
      method: "post",
      path: opts.path,
      body: opts.body,
      query: opts.query,
      contentType: opts.contentType,
    });
  }

  async put<T>(opts: RequestOptionsWithBody) {
    return this.fetchClient.doRequest<T>({
      method: "put",
      path: opts.path,
      body: opts.body,
      query: opts.query,
    });
  }

  async delete<T>(opts: RequestOptionsWithBody) {
    return this.fetchClient.doRequest<T>({
      method: "delete",
      path: opts.path,
      body: opts.body,
      query: opts.query,
    });
  }
}

export default Api;
