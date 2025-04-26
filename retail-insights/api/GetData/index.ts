import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Connection, Request } from "tedious";

const config = {
  server: process.env.DB_SERVER || "cs5165-server.database.windows.net",
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DB_USER || "prestonisawesome",
      password: process.env.DB_PASS || "Password123!",
    },
  },
  options: {
    database: process.env.DB_NAME || "cs5165-database",
    encrypt: true,
  },
};

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const results: any[] = [];

  const connection = new Connection(config);

  connection.on('connect', (err) => {
    if (err) {
      context.res = {
        status: 500,
        body: `Database connection failed: ${err.message}`,
      };
      context.done();
    } else {
      const sql = 'SELECT TOP 10 * FROM customers'; // <-- Adjust table name if needed
      const request = new Request(sql, (err) => {
        if (err) {
          context.res = {
            status: 500,
            body: `Query failed: ${err.message}`,
          };
        } else {
          context.res = {
            status: 200,
            body: results,
          };
        }
        connection.close();
        context.done();
      });

      request.on('row', (columns) => {
        const row: { [key: string]: any } = {};
        columns.forEach((column) => {
          row[column.metadata.colName] = column.value;
        });
        results.push(row);
      });

      connection.execSql(request);
    }
  });

  connection.connect();
};

export default httpTrigger;
