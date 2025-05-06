import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";

import { controllers } from "app/domain";
import { IService } from "types/services";

export class Tcp implements IService {
  private static instance: Tcp;

  private routePrefix = "/api";
  public server = express();

  constructor() {
    if (!Tcp.instance) {
      Tcp.instance = this;
    }
    return Tcp.instance;
  }

  async init() {
    const { server, routePrefix } = this;

    server.use(express.json());

    useExpressServer(server, {
      routePrefix,
      controllers,
      cors: true,
      defaultErrorHandler: true,
      validation: false,
    });

    return new Promise<boolean>((resolve) => {
      server.listen(4000, () => {
        console.log("Tcp service started on port 4000");

        return resolve(true);
      });
    });
  }
}
