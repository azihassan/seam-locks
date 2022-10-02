import { rest } from "msw";
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
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
