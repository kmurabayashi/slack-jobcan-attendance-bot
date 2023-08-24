import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";

export const HistoryFunction = DefineFunction({
  callback_id: "history",
  title: "History",
  description: "get History from specified channel",
  source_file: "src/functions/history.ts",
  input_parameters: {
    properties: {
      channelId: {
        type: Schema.types.string,
      },
    },
    required: [],
  },
  output_parameters: {
    properties: {
      history: {
        type: Schema.types.string,
      },
    },
    required: ["history"],
  },
});

export default SlackFunction(HistoryFunction, async ({ inputs, token }) => {
  const date = new Date() ;
  const truncate_date = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  const client = SlackAPI(token, {});
  const response = await client.conversations.history({
    channel: inputs.channelId,
    oldest: `${(truncate_date.getTime() / 1000) - ( 60 * 60 * 5) }`,
  })
  const history = response.messages.map((message: { text: string; }) => message.text).join()

  return {
    outputs: {
      history,
    },
  };
});
