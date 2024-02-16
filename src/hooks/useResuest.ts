import axios from "axios"
import { useEffect, useState } from "react"


export const useRequest = (url: string, params?: any) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<any>('')


    useEffect(() => {
        setLoading(true)
        const request = async () => {
            try {
                const result = await axios.get(url, {
                    params,
                })
                setData(result.data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }

        }
        request()
        console.log(data);
        
    }, [])

    return {loading , error, data}
}