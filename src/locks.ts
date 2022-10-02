import AxiosClient from "./client";
import { LockListingDTO } from "./types";

export default class LocksClient {
  public constructor(private axios: AxiosClient) {}

  public async list(): Promise<LockListingDTO> {
    return this.axios.perform<LockListingDTO>({
      method: "GET",
      url: "/locks",
    });
  }
}
