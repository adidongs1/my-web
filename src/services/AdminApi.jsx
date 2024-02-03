

const BASE_URL = 'https://api-fe-batch5.neuversity.id/api/admin/login';


const AdminApi = async (username, password) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const data = await response.json();
    return data;
}

export default AdminApi;