import { logger, consoleTransport } from "react-native-logs";
import UserAuthentication from "../global/UserAuthentication";

const defaultConfig = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: "debug",
  transport: consoleTransport,
  transportOptions: {
    colors: {
      info: "blueBright",
      warn: "yellowBright",
      error: "redBright",
    },
  },
  async: true,
  dateFormat: "time",
  printLevel: true,
  printDate: true,
  enabled: true,
};

const Log = logger.createLogger(defaultConfig);

// Log.debug("Debug config message");
// Log.info({ message: "info config!" });

export default Log;

export function logApiRequest(functionName, url, request, myContext = null) {
  if (myContext && myContext.debugMode) {
    Log.info(
      `\n------------------------------------------\n` +
        `Function Name: ${functionName}\n` +
        `Url: ${url}\n` +
        `Request ${JSON.stringify(request, null, 4)}\n` +
        `------------------------------------------`
    );
  }
}
