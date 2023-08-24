import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { HistoryFunction } from "./functions/history.ts";
import { ExtractFunction } from "./functions/extract.ts";
import { SendFunction } from "./functions/send.ts";
import env from "../env.ts"

export const Workflow = DefineWorkflow({
  callback_id: "attendance",
  title: "Attendance Workflow",
  input_parameters: {
    properties: {
      channelId: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["channelId"],
  },
});

const historyStep = Workflow.addStep(HistoryFunction, {
  channelId: env.PUNCH_CHANNEL_ID
});

const extractStep = Workflow.addStep(ExtractFunction, {
  history: historyStep.outputs.history
});


Workflow.addStep(SendFunction, {
  channelId: Workflow.inputs.channelId,
  message: extractStep.outputs.message
});

export default Workflow;