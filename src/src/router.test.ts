import { Router, Event } from "./router";

describe("Router", () => {
  test("route matching works", () => {
    const mock = jest.fn();
    const router = new Router();

    router.get("/:route/:bob", mock);
    router.handle({ path: "/packa/wata" } as Event);

    expect(mock).toHaveBeenCalled();
  });

  test("route handlers are sent the right params", () => {
    const mock = jest.fn();
    const router = new Router();

    router.get("/:route/:bob", mock);
    router.handle({
      path: "/packa/wata",
      headers: { auth: true },
      body: "123",
    });

    const params = { route: "packa", bob: "wata" };
    expect(mock).toHaveBeenCalledWith({ params, headers: { auth: true } });
  });

  test("route handlers", () => {
    const mock = jest.fn();
    const router = new Router();

    router.get("/:route/:bob", mock);
    router.handle({
      path: "/packa/wata",
      headers: { auth: true },
      body: "123",
    });

    const params = { route: "packa", bob: "wata" };
    expect(mock).toHaveBeenCalledWith({ params, headers: { auth: true } });
  });

  test.only("recursive routers work", () => {
    const mock = jest.fn();
    const personRouter = new Router();
    const actionRouter = new Router();
    const propertyRouter = new Router();

    personRouter.get("/:person", actionRouter);

    actionRouter.get("/:action", propertyRouter);

    propertyRouter.get("/:property", mock);
    propertyRouter.get("/plim/:plim", mock);

    // personRouter.handle({
    //   path: "/tom/smells/shoes",
    //   headers: { auth: true },
    //   body: "123",
    // });

    personRouter.handle({
      path: "/tom/smells/shoes/plim/sols",
      headers: { auth: true },
      body: "123",
    });

    // expect(mock).toHaveBeenNthCalledWith(1, {
    //   params: { property: "shoes", person: "tom", action: "smells" },
    //   headers: { auth: true },
    // });

    expect(mock).toHaveBeenNthCalledWith(1, {
      params: {
        property: "shoes",
        person: "tom",
        plim: "sols",
        action: "smells",
      },
      headers: { auth: true },
    });
  });
});
