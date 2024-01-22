import React, { useState, useEffect } from 'react';

// datanhaku onnistuu nyt mutta sivun toiminnoissa ei ole mitään järkeä :D

function palautaRuoka(ruoka) {
    return (
        <p>{ruoka}</p>
    )
}

export default function Resepti() {
    const [reseptiData, setReseptiData] = useState(null);
    const [nappiaPainettu, setNappiaPainettu] = useState(false);


    useEffect(() => {
        
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=arrabiata')
          .then(response => response.json())
          .then(result => setReseptiData(result))
        
    },[]);
    
    function datanhaku() {
        setNappiaPainettu(true);
    }
    //
    return(
        <div>
            <button onClick={() => datanhaku()}>moroo</button>
            {nappiaPainettu && palautaRuoka(reseptiData?.meals[0]?.strMeal)}
            <p>testi</p>
        </div>      
    )
}