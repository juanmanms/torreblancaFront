
export const ClientesService = () => {
    const apiUrl = process.env.REACT_APP_URL_API;

    const getClients = async (callback) => {
        await fetch(`${apiUrl}clients`, {
            method: 'GET',
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Get clients failed');
            })
            .then((data) => {
                callback(data);
            })
            .catch((error) => {
                console.error('Error getting clients:', error);
            });
    };

    const getAddresses = async (id_client, callback) => {
        await fetch(`${apiUrl}clients/adresses/${id_client}`, {
            method: 'GET',
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Get addresses failed');
            })
            .then((data) => {
                callback(data);
            })
            .catch((error) => {
                console.error('Error getting addresses:', error);
            });
    }

    const sendEmail = async (formData) => {
        const apiKey = 're_gDsCjL5V_KmWshthHqGhtcmxNfsiNxAHk'; // Reemplaza con tu API Key
        const endpoint = 'https://api.resend.com/send';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Correo enviado:', data);
            } else {
                throw new Error('Error al enviar el correo');
            }
        } catch (error) {
            console.error('Error al enviar el correo:', error);
        }
    };

    return {
        getClients,
        getAddresses,
        sendEmail
    };
}

export default ClientesService;
