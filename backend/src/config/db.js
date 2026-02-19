import pg from 'pg';

export const pool = new pg.Pool({
    user:'root', 
    host:'localhost',
    password: 'root',
    database: 'ventas_db',
    port: '5432'
});

// pool.query('SELECT NOW()').then(result => {
//     console.log(result);
// });
