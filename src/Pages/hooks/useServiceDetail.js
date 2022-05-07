import { useEffect, useState } from "react";

const useServiceDetail = serviceId => {
    const [service, setService] = useState({});

    useEffect(() => {
        const url = `https://sleepy-plains-85482.herokuapp.com/service/${serviceId}`;

        fetch(url)
            .then(res => res.json())
            .then(data => setService(data))
    }, [serviceId])
    
    return [service, setService]
}

export default useServiceDetail;