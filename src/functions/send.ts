import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";

export const SendFunction = DefineFunction({
  callback_id: "send",
  title: "Send",
  description: "Send message",
  source_file: "src/functions/send.ts",
  input_parameters: {
    properties: {
      message: {
        type: Schema.types.string,
      },
      channelId: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["channelId"],
  },
});

export default SlackFunction(SendFunction, ({ inputs, token }) => {
  const client = SlackAPI(token, {});
  client.chat.postMessage({
    channel: inputs.channelId,
    text: inputs.message,
    attachments: []
  });
  return {
    outputs: {},
  };
});
