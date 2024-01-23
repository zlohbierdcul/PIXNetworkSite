export const fetchAppData = async (setAppData, setLoading) => {
    const res = await fetch('http://localhost:3001/api/getAppData', {
        method: 'GET',
    }).then(res => res.json())
    setAppData(res)
    setLoading(false)
};
