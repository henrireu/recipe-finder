import React, { useState, useEffect } from "react";


export default function Resepti() {
    const [kategoriat, setKategoriat] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
                const data = await response.json();
                console.log(data);
                setKategoriat(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, []);

    // tämä on erittäin tärkeä ja ohjelma kaatuu muuten
    if (!kategoriat || !kategoriat.categories) {
        return <p>Loading...</p>;
    }

    /*console.log(kategoriat.categories[0].strCategory);
    kategoriat.categories.map((katsku) => (
        console.log(katsku.strCategory)
    ));*/

    return (
        <div>
            <h1>Kategoriat</h1>
            <div className="kategoriat">
                {kategoriat.categories.map((katsku) => (
                    <div>
                        <p>{katsku.strCategory}</p>
                        <img className="kategoriakuvat" src={katsku.strCategoryThumb}></img>
                    </div>
                ))}
            </div>
        </div>
    );
}