import { Trigger } from "deno-slack-api/types.ts";
import { Workflow } from "../workflow.ts";
import env from "../../env.ts"

const trigger: Trigger<typeof Workflow.definition> = {
  type: "scheduled",
  name: "attendance",
  workflow: "#/workflows/attendance",
  "inputs": {
    "channelId": {
      value: `${env.CHANNEL_ID}`,
    },
  },
  schedule: {
    start_time: "2023-06-07T01:00:00Z",
    end_time: "2028-06-02T01:00:00Z",
    timezone: "UTC",
    frequency: {
      type: "weekly",
      on_days: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    },
  },
};

export default trigger;
