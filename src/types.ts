export interface LockDTO {
  lock_id: string;
  name?: string;
  model: string;
  address: string;
}

export interface LockListingDTO {
  locks: LockDTO[];
}
