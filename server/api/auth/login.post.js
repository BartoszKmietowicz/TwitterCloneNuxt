import { getUserByUsername } from '~/server/db/users';
import { generateTokens } from '~/server/utils/jwt';
import bcrypt from 'bcrypt';
import { userTransformer } from '~/server/transformers/user';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password } = body;
  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Invalid Params',
      })
    );
  }

  const user = await getUserByUsername(username);

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!user || !checkPassword) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'invalid username or password',
      })
    );
  }
  const { refreshToken, accessToken } = generateTokens(user);
  return {
    access_token:accessToken,
		user:userTransformer(user)
  };
});
