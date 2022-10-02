import { rest } from "msw";
import { AccessCodeDTO } from "../types";

const accessCodes: AccessCodeDTO[] = [
  {
    access_code_id: "3043fde0-3c6d-4913-981f-2607f05fe74e",
    lock_id: "3043fde0-3c6d-4913-981f-2607f05fe74e",
    owner_id: "3043fde0-3c6d-4913-981f-2607f05fe74e",
    code: "1234",
    name: "Resident 001 Code",
  },
  {
    access_code_id: "3043fde0-3c6d-4913-981f-2607f05fe743",
    lock_id: "3043fde0-3c6d-4913-981f-2607f05fe74e",
    owner_id: "3043fde0-3c6d-4913-981f-2607f05fe74e",
    code: "2345",
    name: "Resident 002 Code",
  },
  {
    access_code_id: "1c33d4cf-e178-4c06-8a9a-aadd6dc5a804",
    lock_id: "2f072d3d-0f14-421f-acde-2597bb3cc3f0",
    owner_id: "3043fde0-3c6d-4913-981f-2607f05fe74e",
    code: "3456",
    name: "Resident 003 Code",
  },
];

export const accessCodeHandlers = [
  rest.get("https://devicecloud.example.com/access_codes", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        access_codes: accessCodes.filter(
          (c) => c.lock_id === req.url.searchParams.get("lock_id")
        ),
      })
    );
  }),
];
