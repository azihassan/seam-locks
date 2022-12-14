import Seam, { ApiKeyError, NotFoundError } from "../src/client";
import LocksClient from "../src/locks";
import { expect, test } from "@jest/globals";
import { LockDTO } from "../src/types";

describe("Door Locks", () => {
  test("should fail with invalid access token", async () => {
    const http = new Seam(
      "https://devicecloud.example.com/",
      "INVALID_ACCESS_TOKEN"
    );
    const client = new LocksClient(http);
    try {
      await client.list();
      expect(true).toBe(false);
    } catch (e: unknown) {
      expect(e).toBeInstanceOf(ApiKeyError);
      const error = e as ApiKeyError;
      expect(error.message).toEqual("Invalid or missing access token");
    }
  });

  test("should list door locks", async () => {
    const http = new Seam(
      "https://devicecloud.example.com/",
      "MOCK_ACCESS_TOKEN"
    );
    const client = new LocksClient(http);
    const response = await client.list();

    expect(response.locks[0]).toEqual({
      lock_id: "3043fde0-3c6d-4913-981f-2607f05fe74e",
      name: "Office Front Door",
      model: "example_model",
      address: "123 Amy Lane, CA, 94110, United States",
      properties: {
        locked: false,
      },
    } as LockDTO);

    expect(response.locks[1]).toEqual({
      lock_id: "1c33d4cf-e178-4c06-8a9a-aadd6dc5a804",
      name: undefined,
      model: "example_model",
      address: "999 Louis Lane, CA, 94110, United States",
      properties: {
        locked: true,
      },
    } as LockDTO);
  });

  test("should get lock by ID", async () => {
    const http = new Seam(
      "https://devicecloud.example.com/",
      "MOCK_ACCESS_TOKEN"
    );
    const client = new LocksClient(http);
    const response = await client.get("1c33d4cf-e178-4c06-8a9a-aadd6dc5a804");

    expect(response).toEqual({
      lock_id: "1c33d4cf-e178-4c06-8a9a-aadd6dc5a804",
      name: undefined,
      model: "example_model",
      address: "999 Louis Lane, CA, 94110, United States",
      properties: {
        locked: true,
      },
    } as LockDTO);
  });

  test("when getting lock by invalid ID should return 404", async () => {
    const http = new Seam(
      "https://devicecloud.example.com/",
      "MOCK_ACCESS_TOKEN"
    );
    const client = new LocksClient(http);

    try {
      await client.get("921093102");
      expect(true).toBe(false);
    } catch (e: unknown) {
      expect(e).toBeInstanceOf(NotFoundError);
      const error = e as NotFoundError;
      expect(error.message).toEqual("Lock 921093102 not found");
    }
  });

  test("should lock", async () => {
    const http = new Seam(
      "https://devicecloud.example.com/",
      "MOCK_ACCESS_TOKEN"
    );
    const client = new LocksClient(http);
    const response = await client.lock("3043fde0-3c6d-4913-981f-2607f05fe74e");
    expect(response.ok).toBe(true);

    const lock = await client.get("3043fde0-3c6d-4913-981f-2607f05fe74e");
    expect(lock.properties.locked).toBeTruthy();
  });

  test("should unlock", async () => {
    const http = new Seam(
      "https://devicecloud.example.com/",
      "MOCK_ACCESS_TOKEN"
    );
    const client = new LocksClient(http);
    const response = await client.unlock(
      "1c33d4cf-e178-4c06-8a9a-aadd6dc5a804"
    );
    expect(response.ok).toBe(true);

    const lock = await client.get("1c33d4cf-e178-4c06-8a9a-aadd6dc5a804");
    expect(lock.properties.locked).toBeFalsy();
  });
});
