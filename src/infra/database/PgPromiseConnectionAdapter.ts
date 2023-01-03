import Connection from "./Connection";
import pgp from "pg-promise"

export default class PgPromiseConnectionAdapter implements Connection {
    pgp: any;

    constructor () {
        this.pgp = pgp()("postgres://umtwzsda:UGR41HPAU8yMuHplEe0bLwqTKF1EJtTF@motty.db.elephantsql.com/umtwzsda")
    }

    query(statement: string, params?: any[]): Promise<any> {
          return this.pgp.query(statement, params)      
    }
}