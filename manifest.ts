import { Manifest } from "deno-slack-sdk/mod.ts";
import { Workflow } from "./src/workflow.ts";

export default Manifest({
  name: "Attendance",
  description: "Attendance Bot",
  icon: "assets/icon.png",
  workflows: [Workflow],
  outgoingDomains: [],
  botScopes: [
    "app_mentions:read",
    "chat:write",
    "chat:write.public",
    "channels:history",
    "groups:history",
    "mpim:history",
    "im:history"
  ],
});
