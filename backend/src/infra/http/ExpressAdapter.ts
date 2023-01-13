import express from "express";
import Http from "./Http";
import cors from "cors"

export default class ExpressAdapter implements Http {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors())
  }

  on(url: string, method: string, fn: any): void {
    this.app[method](url, async function (req: any, res: any) {
        const output = await fn(req.params, req.body)
        res.json(output)
    })
  }

  listen(port: number): void {
    this.app.listen(port)
    console.log(`App running in port: ${port}`)
  }
}
