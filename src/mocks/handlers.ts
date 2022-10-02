import { rest } from "msw";
import { LockDTO } from "../types";

const locks: LockDTO[] = [
  {
    lock_id: "3043fde0-3c6d-4913-981f-2607f05fe74e",
    name: "Office Front Door",
    model: "example_model",
    address: "123 Amy Lane, CA, 94110, United States",
  },
  {
    lock_id: "1c33d4cf-e178-4c06-8a9a-aadd6dc5a804",
    model: "example_model",
    address: "999 Louis Lane, CA, 94110, United States",
  },
];

export const handlers = [
  rest.all("https://devicecloud.example.com/*", (req, res, ctx) => {
    if (req.headers.get("Authorization") !== "Bearer MOCK_ACCESS_TOKEN") {
      return res(
        ctx.status(401),
        ctx.json({
          error: "Invalid or missing access token",
        })
      );
    }
  }),

  rest.get("https://devicecloud.example.com/locks", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        locks: locks,
      })
    );
  }),

  rest.get(
    `https://devicecloud.example.com/locks/${locks[1].lock_id}`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(locks[1]));
    }
  ),
];
