import { stackMiddlewares } from '@/middlewares/stackHandler';
import dbMiddleware from './middlewares/dbMiddleware';
import langMiddleware from './middlewares/langMiddleware';

export default stackMiddlewares([dbMiddleware, langMiddleware]);
