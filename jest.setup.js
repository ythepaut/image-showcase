import { setConfig } from "next/config";
import config from "./next.config";
import { TextDecoder, TextEncoder } from "util";

setConfig(config);

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
