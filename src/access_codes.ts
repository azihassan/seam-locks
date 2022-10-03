import Seam from "./client";
import { AccessCodeDTO, AccessCodeListingDTO, OkResponseDTO } from "./types";

export default class AccessCodesClient {
  public constructor(private axios: Seam) {}

  public async list(lockId: string): Promise<AccessCodeListingDTO> {
    return this.axios.perform<AccessCodeListingDTO>({
      method: "GET",
      url: `/access_codes?lock_id=${lockId}`,
    });
  }

  public async get(id: string): Promise<AccessCodeDTO> {
    return this.axios.perform<AccessCodeDTO>({
      method: "GET",
      url: `/access_codes/${id}`,
    });
  }

  public remove(id: string): Promise<OkResponseDTO> {
    return this.axios.perform<OkResponseDTO>({
      method: "DELETE",
      url: `/access_codes/${id}`,
    });
  }
}
