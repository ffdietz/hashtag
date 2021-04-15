import React, { useState, useEffect } from 'react'
import  { 
    select,
} from 'd3';

export default function DefsPattern (props) {

    const [data, setData] = useState([]);

    function getData() {
        setData(data);
    }

    useEffect(() => {
        getData();
    },[data]);

    return (
        <defs>
            {data.map(item => (
                <li key={item.id}>{item}</li>
            ))}
        </defs>
    )
}
