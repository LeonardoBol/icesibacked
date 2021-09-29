const pool = require('./bdconnect');


const getPersons = async (req, res) => {
    try {
        const response = await pool.query(`SELECT * FROM persona `);
        const clients = response.rows;
        return res.status(200).json(clients)
    }
    catch (e) {
        return res.status(500).json(console.log(e))
    }
}

const getPersonByDocument = async (req, res) => {
    try {

        const {type, document} = req.params;

        const response = await pool.query(`SELECT * FROM persona WHERE documento = $1 AND tipo_documento = $2 `,
        [document, type]);

        const clients = response.rows;
        return res.status(200).json(clients)

    }
    catch (e) {
        return res.status(500).json(console.log(e))
    }
}


const createPerson = async (req, res) => {
    try {

        const { nombre, 
            apellidos,
            tipo_documento, 
            documento, 
            fecha_nac, 
            telefono, 
            correo } = req.body;

        await pool.query(`CALL crear_persona ($1,$2,$3,$4,$5,$6,$7)`, [
            nombre,
            apellidos,
            tipo_documento,
            documento,
            fecha_nac,
            telefono,
            correo
        ])
        return res.status(200).json({ message: 'Persona insertada correctamente' })
    }
    catch (e) {
        res.status(500).json({ message: "Ha ocurrido un error con el servidor" })
    }
}

const deletePerson = async (req, res) => {

    try {

        const {id } = req.params;

        await pool.query(`DELETE FROM persona WHERE consecutivo = $1`,
            [id])

        return res.status(200).json({ message: 'Modificado con éxito' })

    }
    catch (e) {
        return res.status(500).json({ message: "Ha ocurrido un error con el servidor" })
    }
}


module.exports = {
    getPersons,
    getPersonByDocument,
    createPerson
};


