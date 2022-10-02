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
