import { IConfig } from "./types/overall.types";

const config: IConfig = {
  server: {
    url: import.meta.env.VITE_SERVER_URL,
  },
};

export default config;
