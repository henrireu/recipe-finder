import React, { useState, useEffect } from 'react';

// edistyy mutta ongelmia vielä

export default function Resepti() {
    const [reseptiData, setReseptiData] = useState(null);
    //const [nappiaPainettu, setNappiaPainettu] = useState(false);
    const [naytto, tulevanaytto] = useState(<p>testi</p>);
    const [kategoriat, setKategoriat] = useState("");
    const [kategoria, kategoriax] = useState("");


    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
          .then(response => response.json())
          .then(result => setKategoriat(result))
    },[]);

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
          .then(response => response.json())
          .then(result => kategoriax(result))
    }, []);

    useEffect(() => {
        
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=arrabiata')
          .then(response => response.json())
          .then(result => setReseptiData(result))
        
    },[]);
    
    function datanhaku(event) {
        event.preventDefault();
        console.log(reseptiData);

        const nimi = reseptiData?.meals[0]?.strMeal;
        const listaAineksista = [];
        // algoritmi ainestenhakuun
        for (let x = 1; x < 21; x++) {
            let ainesosa = reseptiData?.meals[0][`strIngredient${x}`];
            if (ainesosa != null && ainesosa !== undefined && ainesosa !== "") {
                listaAineksista.push(ainesosa);
            }
        }

        const kuvaurl = reseptiData?.meals[0].strMealThumb; 
        tulevanaytto(
            <div>
                <h2>{nimi}</h2>
                <img class="kuva" src={kuvaurl}></img>
                <h4>Ainekset:</h4>
                <ul class="ainekset">
                    {listaAineksista.map((aines) => (
                        <li>{aines}</li>
                    ))}
                </ul>
                <h4>Valmistusohje:</h4>
                <p className="valmistusohje">{reseptiData?.meals[0].strInstructions}</p>
            </div>
        );
    }
    //
    function kategoriahaku() {
        console.log(kategoriat);
        console.log(kategoria);
    }
    return(
        <div>
            <h1>Recipe finder</h1>
            <div className="kategoriat">
                
            </div>
            <button onClick={() => kategoriahaku()}>etsi kategoria</button>
            <form>
                <label for="searchInput">Haku:</label>
                <input type="text" id="searchInput" name="searchInput"></input>
                <button onClick={(event) => datanhaku(event)}>Search</button>
            </form>
            {naytto}
        </div>      
    )
}