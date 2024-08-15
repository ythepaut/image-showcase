import { setConfig } from "next/config";
import config from "./next.config";
import { TextDecoder, TextEncoder } from "util";
import "@testing-library/jest-dom/jest-globals";

setConfig(config);

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
