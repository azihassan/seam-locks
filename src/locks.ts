import AxiosClient from "./client";
import { LockDTO, LockListingDTO } from "./types";

export default class LocksClient {
  public constructor(private axios: AxiosClient) {}

  public async list(): Promise<LockListingDTO> {
    return this.axios.perform<LockListingDTO>({
      method: "GET",
      url: "/locks",
    });
  }

  public async get(id: string): Promise<LockDTO> {
    return this.axios.perform<LockDTO>({
      method: "GET",
      url: `/locks/${id}`,
    });
  }
}
