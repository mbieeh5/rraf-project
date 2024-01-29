import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AutofitGrid from "components/AutofitGrid";
import Button from "components/Button";

interface PokemonStat {
    base_stat : number;
    stat:{
        name: string;
    };
}

export default function PokemonWiki() {
  const [dataPokemon, setDataPokemon] = useState([]);
  const [dataPokemonStatic, setDataPokemonStatic] = useState<PokemonStat[]>([]);
  const [showMore, setShowMore] = useState(10);
  const [counterNext, setCounterNext] = useState(0);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=${counterNext}&limit=${showMore}`)
      .then((data) => {
        setDataPokemon(data.data.results);
        const promises = data.data.results.map((pokemon : any) =>
          axios.get(pokemon.url).then((datas) => datas.data.stats)
        );

        Promise.all(promises)
          .then((statsData) => {
            setDataPokemonStatic(statsData.flat());
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [counterNext, showMore]);

  function counterPrevious() {
    if (counterNext <= 0) {
      setCounterNext(counterNext + 0);
    } else {
      setCounterNext(counterNext - 1);
    }
  }

  return (
    <>
      <H1>POKEMON WIKI</H1>
      <Wrapper>
        {dataPokemon.map((data : any, i) => {
          const stats = dataPokemonStatic || [];
          return (
            <div key={i}>
              <p>Name : {data.name}</p>
              <p>Stats: {stats.map((stat: any) => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}</p>
            </div>
          );
        })}
        <AutofitGrid>
          <Button onClick={(e) => counterPrevious()}>Previous</Button>
          <Button onClick={(e) => setCounterNext(counterNext + showMore)}>Next</Button>
          <Button onClick={(e) => setShowMore(showMore + 10 || counterNext + 5)}>Show More</Button>
        </AutofitGrid>
      </Wrapper>
    </>
  );
}

const H1 = styled.h1`
  font-size: 30px;
  text-align: center;
`;

const Wrapper = styled.div``;
