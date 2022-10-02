export interface LockDTO {
  lock_id: string;
  name?: string;
  model: string;
  address: string;
  properties: LockPropertiesDTO;
}

export interface LockPropertiesDTO {
  locked: boolean;
}

export interface LockListingDTO {
  locks: LockDTO[];
}

export interface OkResponseDTO {
  ok: boolean;
}

export interface AccessCodeDTO {
  access_code_id: string;
  lock_id: string;
  owner_id: string;
  code: string;
  name: string;
}

export interface AccessCodeListingDTO {
  access_codes: AccessCodeDTO[];
}
