import {
  DefaultBodyType,
  PathParams,
  ResponseComposition,
  rest,
  RestContext,
  RestRequest,
} from "msw";
import { LockDTO } from "../types";

const locks: LockDTO[] = [
  {
    lock_id: "3043fde0-3c6d-4913-981f-2607f05fe74e",
    name: "Office Front Door",
    model: "example_model",
    address: "123 Amy Lane, CA, 94110, United States",
    properties: {
      locked: false,
    },
  },
  {
    lock_id: "1c33d4cf-e178-4c06-8a9a-aadd6dc5a804",
    model: "example_model",
    address: "999 Louis Lane, CA, 94110, United States",
    properties: {
      locked: true,
    },
  },
];

export const handlers = [
  rest.get("https://devicecloud.example.com/locks", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        locks: locks,
      })
    );
  }),

  rest.get(`https://devicecloud.example.com/locks/:id`, (req, res, ctx) => {
    const lock = getLockByIdOrThrow404(req.params.id as string, req, res, ctx);
    if (lock === undefined) {
      return;
    }
    return res(ctx.status(200), ctx.json(lock));
  }),

  rest.post(
    `https://devicecloud.example.com/locks/:id/lock`,
    (req, res, ctx) => {
      const lock = getLockByIdOrThrow404(
        req.params.id as string,
        req,
        res,
        ctx
      );
      if (lock === undefined) {
        return;
      }
      lock.properties.locked = true;
      return res(
        ctx.status(200),
        ctx.json({
          ok: true,
        })
      );
    }
  ),

  rest.post(
    `https://devicecloud.example.com/locks/:id/unlock`,
    (req, res, ctx) => {
      const lock = getLockByIdOrThrow404(
        req.params.id as string,
        req,
        res,
        ctx
      );
      if (lock === undefined) {
        return;
      }
      lock.properties.locked = false;
      return res(
        ctx.status(200),
        ctx.json({
          ok: true,
        })
      );
    }
  ),
];

const getLockByIdOrThrow404 = (
  id: string,
  req: RestRequest<DefaultBodyType, PathParams<string>>,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext
): LockDTO | undefined => {
  const lock = locks.find((l) => l.lock_id === id);
  if (lock === undefined) {
    res(
      ctx.status(404),
      ctx.json({
        error: `Lock ${req.params.id} not found`,
      })
    );
  }
  return lock;
};
