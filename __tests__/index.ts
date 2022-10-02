import AxiosClient from "../src/client";
import LocksClient from "../src/locks";
import { expect, test } from "@jest/globals";
import { LockDTO } from "../src/types";
import { AxiosError } from "axios";

describe("Door Locks", () => {
  test("should fail with invalid access token", async () => {
    const http = new AxiosClient(
      "https://devicecloud.example.com/",
      "INVALID_ACCESS_TOKEN"
    );
    const client = new LocksClient(http);
    try {
      await client.list();
      expect(true).toBe(false);
    } catch (e: unknown) {
      expect(e).toBeInstanceOf(AxiosError);
      const error = e as AxiosError;
      expect(error.response?.status).toBe(401);
      expect(error.response?.data).toEqual({
        error: "Invalid or missing access token",
      });
    }
  });

  test("should list door locks", async () => {
    const http = new AxiosClient(
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
    } as LockDTO);

    expect(response.locks[1]).toEqual({
      lock_id: "1c33d4cf-e178-4c06-8a9a-aadd6dc5a804",
      name: undefined,
      model: "example_model",
      address: "999 Louis Lane, CA, 94110, United States",
    } as LockDTO);
  });
});
