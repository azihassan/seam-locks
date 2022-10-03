import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

export default class Seam {
  private axios: AxiosInstance;

  public constructor(
    public readonly baseURL: string,
    public readonly accessToken: string
  ) {
    this.axios = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "Door Lock API v0.0.1",
      },
    });
  }

  public async perform<T>(request: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axios.request<T>(request);
      return response.data as T;
    } catch (e) {
      if (e instanceof AxiosError && e.response !== undefined) {
        if (e.response.status == 404) {
          const error = e.response.data as { error: string };
          throw new NotFoundError(error.error);
        }
        if ([401, 403].includes(e.response.status)) {
          const error = e.response.data as { error: string };
          throw new ApiKeyError(error.error);
        }
        if (e.response.status >= 400) {
          throw new SeamError(
            e.response.statusText,
            `An error occurred : ${request.url}`
          );
        }
      }
      throw e;
    }
  }
}

export class SeamError extends Error {
  constructor(public readonly code: string, public readonly message: string) {
    super(message);
  }
}

export class NotFoundError extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}

export class ApiKeyError extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}
