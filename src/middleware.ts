import { stackMiddlewares } from '@/middlewares/stackHandler';
import dbMiddleware from './middlewares/dbMiddleware';
import authMiddleware from './middlewares/authMiddleware';
import langMiddleware from './middlewares/langMiddleware';

export default stackMiddlewares({
	lang: langMiddleware,
	db: dbMiddleware,
	auth: authMiddleware,
});
