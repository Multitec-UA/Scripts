const readXlsxFile = require('read-excel-file/node');
const axios = require('axios');
const file_path = './miembros.xlsx';

const endpoin_create = 'http://localhost:5001/multitecapi/us-central1/app/api/crear-miembro';

const read_data = () => {
    const members_list = [];
    readXlsxFile(file_path).then((rows) => {
        let header = true;
        rows.forEach(row => {
            if (!header) {
                const miembro = {
                    numero_socio: row[0],
                    nombre: row[1],
                    dni: row[2],
                    email: row[5],
                    telefono: row[7],
                    fecha_ingreso: row[3],
                    ultimo_pago: row[8],
                    condicion_universitaria: row[4],
                    telegram: row[6],
                    talla: row[10]
                };
                members_list.push(miembro);
            }
            header = false;
        });
    }).then(res => {
        members_list.forEach(el => {
            axios.post(endpoin_create, el)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
    })
}

read_data();
