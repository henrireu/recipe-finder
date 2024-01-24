import React, { useState, useEffect } from "react";

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [resepti, setResepti] = useState();
    const [url, setUrl] = useState('');
    const [hakusana, setHakusana] = useState('');

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
        let urlRunko = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        let urlKoko = urlRunko + hakusana;
        setUrl(urlKoko);
    }

    //toimii hyvin. pientä hienosäätöä kaipaa css
    function reseptiSiistitty() {
        let ainekset = [];
        let mittasuhteet = [];
        for(let x = 1; x <21; x++) {
            let ainesosa = resepti.meals[0][`strIngredient${x}`];
            if (ainesosa !== null && ainesosa !== "") {
                ainekset.push(ainesosa);
            }
            let mittasuhde = resepti.meals[0][`strMeasure${x}`];
            if (mittasuhde !== null && mittasuhde !== "") {
                mittasuhteet.push(mittasuhde);
            }
        }
        return (
            <div className="siistittyresepti">
                <div className="siistittyresepti2">
                    <h3 className="aineksetotsikko">Tarvittavat ainekset</h3>
                    <ul>
                        {ainekset.map((aines) => (
                            <li>{aines}</li>
                        ))}
                    </ul>
                </div>
                <div className="siistittyresepti2">
                    <h3 className="aineksetotsikko">Mittasuhteet</h3>
                    <ul>
                        {mittasuhteet.map((mitta) => (
                            <li>{mitta}</li>
                        ))}
                    </ul>
                </div>
                <div className="siistittyresepti2">
                    <h3 className="aineksetotsikko">Ohjeet</h3>
                    <p className="ohjeet">{resepti.meals[0].strInstructions}</p>
                </div>
            </div>
        )
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
                    <input 
                        className="haku" 
                        type="text"
                        value={hakusana}
                        onChange={(e) => setHakusana(e.target.value)}
                    />
                    <button className="haeButton" onClick={(event) => hae(event)}>Hae</button>
                </div>        
            </form>
            <div className="ruokaresepti">
                {resepti && resepti.meals && resepti.meals.length === 1 ? (
                    <div>
                        <h2 className="testi">{resepti.meals[0].strMeal}</h2>
                        {reseptiSiistitty()}
                    </div>
                ) : (
                    <div>
                        <p className="testi">Ei löytynyt reseptiä</p>
                    </div>
                )}
            </div>
        </div>
    )
}