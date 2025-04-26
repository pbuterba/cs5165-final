import sql from "mssql";

//SQL Database connection configuration
const dbConfig = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    server: process.env.DATABASE_SERVER,
    database: process.env.DATABASE_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const churnLabels = async (context, req) => {
    const hshdNum = req.query.HSHD_NUM || req.body.HSHD_NUM;

    if (!hshdNum) {
        context.res = {
            status: 400,
            body: { message: "Missing or invalid HSHD_NUM parameter" }
        };
        return;
    }

    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('HSHD_NUM', sql.Int, hshdNum)
            .query('SELECT * FROM dbo.churn_labels WHERE HSHD_NUM = @HSHD_NUM');

        // Check if the result is empty
        if (result.recordset.length === 0) {
            context.res = {
                status: 404,
                body: { message: "No data found for the given HSHD_NUM" }
            };
            return;
        }

        context.res = {
            status: 200,
            body: result.recordset,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: { message: 'Failed to query the database', error: error.message }
        };
    } finally {
        sql.close();
    }
};

export default churnLabels;