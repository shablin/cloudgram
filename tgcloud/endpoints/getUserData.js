import { EndpointError } from 'sdk';

// getUserData — an HTTP endpoint of the Mini App.
// Once deployed, it answers at:
//   POST /api/getUserData
export default async function (input, ctx) {
  // ctx.initData is already verified by the platform

  const user = ctx.initData.user
  if (!user) throw new EndpointError('no user in init data', { code: 'NO_USER' })

  return {
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name ?? '',
      username: user.username ?? '',
    }
  }
}
