declare module 'helmet' {
  import type { RequestHandler } from 'express';

  interface Helmet {
    (options?: Record<string, unknown>): RequestHandler;
  }

  const helmet: Helmet;
  export default helmet;
}
