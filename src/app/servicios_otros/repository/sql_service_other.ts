const sql_service_other = {
    FIND_ALL: `SELECT * FROM servicios_otros`,
    FIND_BY_ID: `SELECT * FROM servicios_otros WHERE cod_servicio = $1`
}

export default sql_service_other;