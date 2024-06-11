import mysql from 'mysql';

const pool  = mysql.createPool({
  host: 'jpmotorsgt.com',
  user: 'jpmotors_dtrujillo',
  password: 'Chimichurri2024.',
  database: 'jpmotors_bd'
});

function query(sql, params) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results, fields) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

export { 
  pool, 
  query 
};