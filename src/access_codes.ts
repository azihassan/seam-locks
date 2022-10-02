import AxiosClient from "./client";
import { AccessCodeListingDTO } from "./types";

export default class AccessCodesClient {
  public constructor(private axios: AxiosClient) {}

  public async list(lockId: string): Promise<AccessCodeListingDTO> {
    return this.axios.perform<AccessCodeListingDTO>({
      method: "GET",
      url: `/access_codes?lock_id=${lockId}`,
    });
  }
}
