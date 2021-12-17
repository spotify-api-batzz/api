export const mustGetEnv = (key: string) => {
  const envItem = process.env[key];
  if (!envItem) throw new Error(`Key ${key} not present in env`);
  return envItem;
};

export const getEnv = (key: string, defaultValue: any) => {
  const envItem = process.env[key];
  if (!envItem) return defaultValue;
  return envItem;
};
