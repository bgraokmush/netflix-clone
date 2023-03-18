import useSWR from 'swr'
import fethcer from '@/lib/fetcher'

const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/current/', fethcer)
    
    return {
        data,
        error,
        isLoading,
        mutate
    }
}


export default useCurrentUser