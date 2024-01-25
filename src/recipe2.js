import React, { useState, useEffect } from "react";


export default function Resepti() {
    const [kategoriat, setKategoriat] = useState();
    const [tieto, setTieto] = useState();

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

    /*const testausta = async () => {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
        const data = await res.json();
        setTieto(data);
    }*/

    const lataaKategoria = async (kategoria) => {
        let urlAlku = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
        let kokoUrl = urlAlku + kategoria;
        const res = await fetch(kokoUrl);
        const data = await res.json();
        console.log(data);
        setTieto(data);
    } 
    

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
            <h1 className="isootsikko">Kategoriat</h1>
            <div className="kategoriat">
                {kategoriat.categories.map((katsku) => (
                    <div 
                        key={katsku.strCategory}
                        className="kategoriaolio"
                        onClick={() => lataaKategoria(katsku.strCategory)}
                    >
                        <p className="kategoriatekstit">{katsku.strCategory}</p>
                        <img className="kategoriakuvat" src={katsku.strCategoryThumb}></img>
                    </div>
                ))}
            </div>
            <div>
                {(!tieto) ? (
                    <p></p>
                ) : (
                    <ul className="ruokalista">
                        {tieto.meals.map((ruoka) => (
                            <li className="ruokalistaolio" key={ruoka.strMeal}>
                                <p>{ruoka.strMeal}</p>
                                <img className="kuva" src={ruoka.strMealThumb}></img>
                            </li>
                        ))}
                    </ul>
                )}           
            </div>
        </div>
    );
}