import AxiosClient from "./client";
import { LockDTO, LockListingDTO, OkResponseDTO } from "./types";

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

  public async lock(id: string) {
    return this.axios.perform<OkResponseDTO>({
      method: "POST",
      url: `/locks/${id}/lock`,
    });
  }
}
