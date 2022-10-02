import { rest } from "msw";
import { setupServer } from "msw/node";
import { accessCodeHandlers } from "./access_codes";
import { lockHandlers } from "./locks";

export const server = setupServer(...lockHandlers, ...accessCodeHandlers);
server.use(
  rest.all("https://devicecloud.example.com/*", (req, res, ctx) => {
    if (req.headers.get("Authorization") !== "Bearer MOCK_ACCESS_TOKEN") {
      return res(
        ctx.status(401),
        ctx.json({
          error: "Invalid or missing access token",
        })
      );
    }
  })
);
