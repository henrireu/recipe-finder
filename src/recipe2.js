import React, { useState, useEffect } from "react";


export default function Resepti() {
    const [kategoriat, setKategoriat] = useState();
    const [tieto, setTieto] = useState();
    const [ruokatieto, setRuokatieto] = useState();
    


    // muu osio
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

    const lataaKategoria = async (kategoria) => {
        let urlAlku = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
        let kokoUrl = urlAlku + kategoria;
        const res = await fetch(kokoUrl);
        const data = await res.json();
        console.log(data);
        setTieto(data);
    } 

    function ehdollinenRenderointi(ruokaid) {
        if(!ruokatieto) {
            return null;
        } else if (ruokatieto.meals[0].idMeal !== ruokaid){
            return null;
        } 
        else {
            let ainesmitat = [];
            for (let x = 1; x < 21; x++) {
                let ainesmitta = [];

                let ainesosa = ruokatieto.meals[0][`strIngredient${x}`];
                if (ainesosa !== null && ainesosa !== "") {
                    ainesmitta.push(ainesosa);
                }

                let mittasuhde = ruokatieto.meals[0][`strMeasure${x}`];
                if(mittasuhde !== null && mittasuhde !== "") {
                    ainesmitta.push(mittasuhde);
                }

                if (ainesmitta.length === 2) {
                    ainesmitat.push(ainesmitta);
                }
            }
            return (
                <div className="siistittyresepti">
                    <div className="siistittyresepti2">
                        <ul>
                            <h3 classname="aineksetotsikko">Ainekset</h3>
                            {ainesmitat.map((y) => (
                                <li className="ohjeet">
                                    {y[0] + " " + y[1]}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="siistittyresepti2">
                        <h3 classname="aineksetotsikko">Ohjeet</h3>
                        <p className="ohjeet">{ruokatieto.meals[0].strInstructions}</p>
                    </div>
                </div>
            )
        }
    }

    const lataaRuoka = async (ruoka) => {
        let urlAlku = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
        let kokoUrl = urlAlku + ruoka;
        const res = await fetch(kokoUrl);
        const data = await res.json();
        console.log(data);
        setRuokatieto(data);
    }
    

    // tämä on erittäin tärkeä ja ohjelma kaatuu muuten
    if (!kategoriat || !kategoriat.categories) {
        return <p>Loading...</p>;
    }

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
                            <li 
                                className="ruokalistaolio" 
                                key={ruoka.strMeal}
                                onClick={() => lataaRuoka(ruoka.strMeal)}
                            >
                                <div className="harmaus">
                                    <p>{ruoka.strMeal}</p>
                                    <img className="kuva" src={ruoka.strMealThumb}></img>
                                </div>
                                
                                {ehdollinenRenderointi(ruoka.idMeal)}
                            </li>
                        ))}
                    </ul>
                )}           
            </div>
        </div>
    );
}