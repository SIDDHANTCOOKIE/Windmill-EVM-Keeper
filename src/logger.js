const LEVEL_TO_PRIORITY = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40
};

function serializeMeta(meta) {
  if (meta === undefined) {
    return "";
  }

  if (typeof meta === "string") {
    return ` ${meta}`;
  }

  try {
    return ` ${JSON.stringify(meta)}`;
  } catch {
    return " [unserializable-meta]";
  }
}

export function createLogger(level = "info") {
  const threshold = LEVEL_TO_PRIORITY[level] ?? LEVEL_TO_PRIORITY.info;

  function log(entryLevel, message, meta) {
    if (LEVEL_TO_PRIORITY[entryLevel] < threshold) {
      return;
    }

    const line = `[${new Date().toISOString()}] [${entryLevel}] ${message}${serializeMeta(meta)}`;
    if (entryLevel === "error") {
      console.error(line);
    } else if (entryLevel === "warn") {
      console.warn(line);
    } else {
      console.log(line);
    }
  }

  return {
    debug: (message, meta) => log("debug", message, meta),
    info: (message, meta) => log("info", message, meta),
    warn: (message, meta) => log("warn", message, meta),
    error: (message, meta) => log("error", message, meta)
  };
}
