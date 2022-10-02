import AxiosClient from "../src/client";
import { expect, test } from "@jest/globals";
import { AccessCodeDTO } from "../src/types";
import AccessCodesClient from "../src/access_codes";

describe("Access codes", () => {
  test("should list access codes of given lock", async () => {
    const http = new AxiosClient(
      "https://devicecloud.example.com/",
      "MOCK_ACCESS_TOKEN"
    );
    const client = new AccessCodesClient(http);
    const response = await client.list("3043fde0-3c6d-4913-981f-2607f05fe74e");

    expect(response.access_codes[0]).toEqual({
      access_code_id: "3043fde0-3c6d-4913-981f-2607f05fe74e",
      lock_id: "3043fde0-3c6d-4913-981f-2607f05fe74e",
      owner_id: "3043fde0-3c6d-4913-981f-2607f05fe74e",
      code: "1234",
      name: "Resident 001 Code",
    } as AccessCodeDTO);

    expect(response.access_codes[1]).toEqual({
      access_code_id: "3043fde0-3c6d-4913-981f-2607f05fe743",
      lock_id: "3043fde0-3c6d-4913-981f-2607f05fe74e",
      owner_id: "3043fde0-3c6d-4913-981f-2607f05fe74e",
      code: "2345",
      name: "Resident 002 Code",
    } as AccessCodeDTO);
  });
});
