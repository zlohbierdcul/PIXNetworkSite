export const fetchAppData = async (setAppData, setLoading) => {
    const res = await fetch('http://localhost:3001/api/getAppData', {
        method: 'GET',
    }).then(res => res.json())
    setAppData(res)
    setLoading(false)
};


export const updateAppData = async (newAppData) => {
    const data = {
        appData: newAppData,
    }
    fetch("http://localhost:3001/api/updateAppData", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
}
