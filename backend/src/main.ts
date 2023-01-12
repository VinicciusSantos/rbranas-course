import OrderDAODatabase from "./infra/dao/orderDAODatabase";
import PgPromiseConnectionAdapter from "./infra/database/PgPromiseConnectionAdapter";
import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import RouteConfig from "./infra/http/RouteConfig";

const expressAdapter = new ExpressAdapter();

const connection = new PgPromiseConnectionAdapter();
const repositoryFactory = new DatabaseRepositoryFactory(connection);

const OrderDAO = new OrderDAODatabase(connection)

new RouteConfig(expressAdapter, repositoryFactory, OrderDAO)

expressAdapter.listen(3000);
