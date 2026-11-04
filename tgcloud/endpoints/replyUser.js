import { EndpointError, api } from 'sdk';

// replyUser — an HTTP endpoint of the Mini App.
// Once deployed, it answers at:
//   POST /api/replyUser
export default async function (input, ctx) {
  // ctx.initData is already verified by the platform
  const user = ctx.initData.user
  if (!user) throw new EndpointError('no user in init data', { code: 'NO_USER' })

  api.sendMessage({
    chat_id: user.id,
    text: [
      `Hey, ${user.first_name}!`,
      "Thank you for open this Mini App.",
      "Let's create your amazing app next!",
    ].join(' ')
  })

  return
}