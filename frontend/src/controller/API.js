
export const fetchAppData = async (setAppData, setLoading) => {
    console.log("fetching data")
    const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + '/api/getAppData',
        {
            method: 'GET',
        }
    ).then((res) => res.json());
    setAppData(res);
    setLoading(false);
};

export const updateAppData = async (newAppData) => {
    const data = {
        appData: newAppData,
    };

    return await fetch(import.meta.env.VITE_BACKEND_URL + '/api/updateAppData', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};
