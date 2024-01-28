import React, { useState, useEffect } from "react";


// KÄY KATSOMASSA my-first-react-app ohjelman pakkaus.jsx koodi.
// sieltä löytyy toimiva hakukenttäehdotus koodi
// sitä täytyy vain soveltaa että hakee tiedon themealdb databasesta
export default function Home() {
    const [loading, setLoading] = useState(false);
    const [resepti, setResepti] = useState();
    const [url, setUrl] = useState('');
    const [hakusana, setHakusana] = useState('');

    // autocomplete haun osio
    //const [kysely, setKysely] = useState('');
    const [ehdotus, setEhdotus] = useState([]);
    const [ekakirjain, setEkakirjain] = useState('');
    const [hakulista, setHakulista] = useState([]);

    // autocomplete haun osio

    // testaan että vaihdan kyselyn kokonaan hakusanaan
    useEffect(() => {
        const fetchEtukirjaindata = async () => {
          try {
            const urlAlku = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
            const kokoUrl = urlAlku + ekakirjain;
            const response = await fetch(kokoUrl);
            const data = await response.json();
    
            const hakulista = [];
    
            for (let x = 0; x < data.meals.length; x++) {
              let tulos = data.meals[x].strMeal;
              hakulista.push(tulos);
            }
    
            setHakulista(hakulista);
          } catch (error) {
            console.error('virhe', error);
          }
        };
    
        if (ekakirjain.length === 1) {
          fetchEtukirjaindata();
        }
    }, [ekakirjain]);

    useEffect(() => {
        const maxSuggestions = 10;
        const filteredSuggestions = hakulista
          .filter(haku => haku.toLowerCase().startsWith(hakusana.toLowerCase()))
          .slice(0, maxSuggestions);
    
        setEhdotus(filteredSuggestions);
    }, [hakusana, hakulista]);
    
    const handleInputChange = (e) => {
        const input = e.target.value;
        setHakusana(input);
    
        if (input.length === 1) {
          const eka = input.charAt(0).toLowerCase();
          setEkakirjain(eka);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setHakusana(suggestion);
        setEhdotus([]); // Tyhjennetään ehdotukset valinnan jälkeen
    };





    //muu osio
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
        let ainesmitat = [];
        for(let x = 1; x <21; x++) {
            let ainesmitta = [];
            let ainesosa = resepti.meals[0][`strIngredient${x}`];
            if (ainesosa !== null && ainesosa !== "") {
                ainesmitta.push(ainesosa);
            }
            let mittasuhde = resepti.meals[0][`strMeasure${x}`];
            if (mittasuhde !== null && mittasuhde !== "") {
                ainesmitta.push(mittasuhde);
            }
            if(ainesmitta.length === 2) {
                ainesmitat.push(ainesmitta);
            }
        }
        return (
            <div className="siistittyresepti">
                <div>
                    <h2 className="testi">{resepti.meals[0].strMeal}</h2>
                    <img className="kuva1" src={resepti.meals[0].strMealThumb}></img>
                </div>
                
                <div className="siistittyresepti2">
                    <h3 className="aineksetotsikko">Tarvittavat ainekset</h3>
                    <ul>
                        {ainesmitat.map((ainesmitta) => (
                            <li className="ohjeet">
                                {ainesmitta[0] + " " + ainesmitta[1]}
                            </li>
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
            <h1 className="isootsikko">Reseptihaku</h1>
            <form>
                <div className="inputcontainer">
                    <input 
                        className="haku" 
                        type="text"
                        value={hakusana}
                        onChange={handleInputChange}    
                    />
                    <button className="haeButton" onClick={(event) => hae(event)}>Hae</button>
                    <ul className="ehdotukset">
                        {ehdotus.map((ehdotus, index) => (
                            <li className="ehdotus" key={index} onClick={() => handleSuggestionClick(ehdotus)}>
                                {ehdotus}
                            </li>
                        ))}
                    </ul>
                </div>        
            </form>
            <div className="ruokaresepti">
                {resepti && resepti.meals && resepti.meals.length === 1 ? (
                    <div>
                        
                        {reseptiSiistitty()}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}