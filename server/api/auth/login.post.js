import { getUserByUsername } from '../../db/users';
import { generateTokens, sendRefreshToken } from '~/server/utils/jwt';
import { userTransformer } from '~/server/transformers/user';
import { createRefreshToken } from '~/server/db/refreshToken';
import bcrypt from 'bcrypt';
import { sendError } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password } = body;

  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Ivalid params',
      })
    );
  }

  const user = await getUserByUsername(username);

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Username or password is invalid',
      })
    );
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Username or password is invalid',
      })
    );
  }

  const { accessToken, refreshToken } = generateTokens(user);

  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  });

  sendRefreshToken(event, refreshToken);

  return {
    access_token: accessToken,
    user: userTransformer(user),
  };
});
