import UrlPattern from 'url-pattern';
import { decodeAccessToken } from '../utils/jwt';
import { sendError } from 'h3';
import { getUserByID } from '../db/users';
export default defineEventHandler(async (event) => {
  const endpoints = ['/api/auth/user'];

  const isHandled = endpoints.some((endpoint) => {
    const pattern = new UrlPattern(endpoint);

    return pattern.match(event.req.url);
  });
  if (!isHandled) {
    return;
  }
  const token = event.req.headers['authorization']?.split(' ')[1];

  const decoded = decodeAccessToken(token);
  if (!decoded) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'unauthorized',
      })
    );
  }
  try {
    const userId = decoded.userId;
    const user = await getUserByID(userId);
    event.context.auth = { user };
  } catch (error) {
    return;
  }
});
