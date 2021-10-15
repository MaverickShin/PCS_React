module.exports = 
{
    user : process.env.MODE_ORACLEDB_USER || "admin",
    password : process.env.MODE_ORACLEDB_PASSWOR || "admin123",
    connectString : process.env.MODE_ORACLE_CONNECTIONSTRING || "admin.cjcqxiuzntvw.ap-northeast-2.rds.amazonaws.com/AWSDB"
}