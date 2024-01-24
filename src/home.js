import React, { useState, useEffect } from "react";

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [resepti, setResepti] = useState();
    const [url, setUrl] = useState('');

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                setResepti(data);
            } catch (error) {
                console.error('Error:', error);
            }
            setLoading(false);
        }
        fetchData();
    }, [url]);

    function hae(event) {
        event.preventDefault();
        setUrl('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
        console.log(resepti);
    }

    if(loading === true) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="home">
            <h1 className="homeotsikko">Reseptihaku</h1>
            <form>
                <div className="inputcontainer">
                    <input className="haku" type="text"></input>
                    <button className="haeButton" onClick={(event) => hae(event)}>Hae</button>
                </div>        
            </form>
        </div>
    )
}