import { URLPattern } from "urlpattern-polyfill";

type Route =
  | {
      route: URLPattern;
      handler: Handler<any>;
    }
  | {
      route: URLPattern;
      router: Router;
    };

interface Resp {
  statusCode: number;
  body: string;
  headers: Record<string, any>;
}
interface Req<T> {
  params: T;
  headers: Record<string, string>;
}
type Handler<T> = (req: Req<T>) => Resp;

export interface Event {
  path: string;
  body: string | null;
  headers: Record<string, any>;
}

export class Router {
  private routes: Route[] = [];

  private setRoute(route: string, routerOrHandler: Router | Handler<any>) {
    if (routerOrHandler instanceof Router) {
      const urlPattern = new URLPattern({ pathname: route });
      this.routes.push({ route: urlPattern, router: routerOrHandler });
      return;
    }
    const urlPattern = new URLPattern({ pathname: route });
    this.routes.push({ route: urlPattern, handler: routerOrHandler });
  }

  get(route: string, router: Router);
  get(route: string, handler: Handler<any>);
  get(route: string, routerOrHandler: Router | Handler<any>) {
    this.setRoute(route, routerOrHandler);
  }

  post(route: string, router: Router);
  post(route: string, handler: Handler<any>);
  post(route: string, routerOrHandler: Router | Handler<any>) {
    this.setRoute(route, routerOrHandler);
  }

  handle(event: Event, params: Record<string, string> = {}) {
    // const path = currentPath ?? event.path;
    console.log("----");
    for (const route of this.routes) {
      console.log(params);
      console.log(route.route.pathname);
      const pathParts = route.route.pathname.split("/");
      console.log(pathParts.length);
      const pLength = pathParts.length;
      const index = Object.keys(params).length;
      const path = event.path
        .split("/")
        .slice(index, pLength + index)
        .join("/");
      console.log(pathParts);
      console.log(path);
      const match = route.route.exec(`http://w.com${path}`);
      if (!match) {
        continue;
      }

      const allParams = {
        ...params,
        ...match.pathname.groups,
      };

      if ("router" in route) {
        return route.router.handle(event, allParams);
      }

      const req: Req<any> = {
        headers: event.headers,
        params: allParams,
      };

      console.log("yay");

      route.handler(req);
    }
  }
}
