import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import env from "../../env.ts"

export const ExtractFunction = DefineFunction({
  callback_id: "extract",
  title: "Extract",
  description: "Extract message from body",
  source_file: "src/functions/extract.ts",
  input_parameters: {
    properties: {
      history: {
        type: Schema.types.string,
      },
    },
    required: ["history"],
  },
  output_parameters: {
    properties: {
      message: {
        type: Schema.types.string,
      },
    },
    required: [],
  },
});

export default SlackFunction(ExtractFunction, ({ inputs }) => {
  const members = env.MEMBER_LIST
  const punch_in_members = []
  const not_punch_in_members = []

  for(const member of members) {
    const punch_in_status = inputs.history.includes(`<@${member.slack_id}> 打刻しました`)
    if (punch_in_status){
      punch_in_members.push(member["name"])
    } else {
      not_punch_in_members.push(member["name"])
    }
  }

  let message = ''

  if (punch_in_members.length > 0) {
    message = message + `<@${env.MANAGER}> ${punch_in_members}は打刻済です`
  }

  if (not_punch_in_members.length > 0) {
    message = message + `${not_punch_in_members}は未打刻です`
  }

  return {
    outputs: {
      message
    },
  };
});
