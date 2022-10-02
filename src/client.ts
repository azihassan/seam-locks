import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export default class AxiosClient {
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
    const response = await this.axios.request<T>(request);
    return response.data;
  }
}
