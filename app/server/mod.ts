import { load as loadEnv } from "loadenv";
import { System } from "modules/system/main.ts";
import { getProcessedEnvs } from "shared/utils/envs.utils.ts";
import { getTestUtil } from "@oh/game-utils";

const envs = getProcessedEnvs({
  version: "__VERSION__",
});

console.log(getTestUtil());

await loadEnv();
System.load(envs);
