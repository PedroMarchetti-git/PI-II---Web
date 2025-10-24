module.exports = {
    user: process.env.ORA_USER || 'system',
    password: process.env.ORA_PASSWORD || 'admin',
    connectString: process.env.ORA_CONNECT_STRING || 'localhost:1521/xe',
};
