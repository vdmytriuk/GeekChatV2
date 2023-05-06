import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import {BuildOptions} from "./types/config";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  const {port, paths} = options;

  return {
      port,
      hot: true,
      open: true,
      historyApiFallback: true,
      // static: {
      //     directory: paths.output,
      // },
  }
}