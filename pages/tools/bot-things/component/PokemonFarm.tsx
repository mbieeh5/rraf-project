import { child, get, getDatabase,ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../../../components/Button';
import ButtonGroup from '../../../../components/ButtonGroup';


interface PokemonData {
  ATTACK: number,
  DEFENSE: number,
  EXP: number, 
  HP: number,
  LVL: number,
  MAXHP: number,
  SPEED: number,
  TYPE: string,
  namaPokemon: string,
}

export default function PokemonFarm() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [dataPokemon, setDataPokemon] = useState<PokemonData[]>([]);
  const [isDataAdded, setIsDataAdded] = useState(false);
  const [noHp, setNoHp] = useState('');
  const [title, setTitle] = useState(""); 
  const noHPDB = `${noHp}_c_us`;
  
  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);
  
  async function HandlerNoHP(noHP : string){
    const RegexNo0 = /^0/;
    const noHP62 = noHP.replace(RegexNo0, '62');
    setNoHp(noHP62);
  }
  
  useEffect(() => {
    const noHPDBs = `${noHp}_c_us`;
    const dbsd = ref(getDatabase());
    get(child(dbsd, `dataPengguna/pengguna/${noHPDBs}`))
    .then(async(snapshot) => {
      const Datas = snapshot.val();
      const Pokemon = Datas.pokemon;
      const Gacoan = Pokemon.gacoan;
      const namaPokemon = Pokemon.gacoan.namaPokemon;
      if(Datas){
        if(Pokemon.gacoan){
          setTitle(namaPokemon);
          const ArrayGacoan: PokemonData[] = Object.values({Gacoan});
          setDataPokemon(ArrayGacoan);
          setIsDataAdded(true);
        }else{
          setTitle('Gacoan Belum Di Set');
          setTimeout(() => {setPopupVisible(false)},2000)
          setDataPokemon([]);
          setIsDataAdded(false);
        }
      }
      else{
        setTitle("Nomor bukan pengguna BOT ETMC");
        setIsDataAdded(false);
        setDataPokemon([]);
      }
    })
    .catch((err) => {
      setTitle("Masukan Nomor Dengan Benar");
      setIsDataAdded(false);
      setDataPokemon([]);
    });

  }, [noHp, isPopupVisible]);
  
  const Fight = async () => {
    const dataToSend = {noHPDB, dataPokemon}
      try {
        const response = await fetch('/api/pokemon-farm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({data: dataToSend})
        });
        const responseData = await response.json();
        setTitle(responseData.message);
      } catch(error){
        console.error(error);
      }
  };

  return (
    <>
      <ArticleCardWrapper className="article-card-wrapper" onClick={openPopup}>
        <Content>
          <Title>Pokemon Farm</Title>
          <Descriptions>Fight Pokemon mu di sini Sampai Level Max!</Descriptions>
        </Content>
      </ArticleCardWrapper>
      {isPopupVisible && (
        <PopupForm>
          <PopupContent>
            <PopupTitle >{title}</PopupTitle>
            <Descriptions>
             Masukan Nomor HP :<br/>
              <Input type='number' placeholder='6281234567891' value={noHp} onChange={(e) => HandlerNoHP(e.target.value)} />
            </Descriptions>
            <Descriptions>Data Pokemon
              {dataPokemon.map((a, i) => {
                return(
                <WrapperPokemonData key={i}>
                  <li>Name: {a.namaPokemon}</li>
                  <li>Level: {a.LVL}</li>
                  <li>Type: {a.TYPE}</li>
                  <li>EXP: {(a.EXP).toLocaleString()}</li>
                  <li>MaxHP: {(a.MAXHP).toLocaleString()}</li>
                  <li>HP: {(a.HP).toLocaleString()}</li>
                  <li>Attack: {(a.ATTACK).toLocaleString()}</li>
                  <li>Defense: {(a.DEFENSE).toLocaleString()}</li>
                  <li>Speed: {(a.SPEED).toLocaleString()}</li>
                </WrapperPokemonData>
                  )
              })}
            </Descriptions>
            <br/>
            <ButtonGroup>
              <Button transparent onClick={closePopup}>Close</Button>
              <Button disabled={!isDataAdded} onClick={() => Fight!()} transparent>FIGHT!</Button>
            </ButtonGroup>
          </PopupContent>
        </PopupForm>
      )}
    </>
  );
}



const Input = styled.input`
  border: 1px solid rgb(var(--inputBackground));
  background: rgb(var(--inputBackground));
  color: rgb(var(--text))
  border-radius: 0.6rem;
  max-width: 21.5rem;
  max-height: 3rem;
  font-size: 1.6rem;
  padding: 1.8rem;
  box-shadow: var(--shadow-md);

  &:focus {
    outline: none;
    box-shadow: var(--shadow-lg);
  }
`;

const PopupForm = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  `;
  
  const PopupContent = styled.div`
  background: white;
  padding: 2rem;
  min-width: 250px;
  min-height: 150px;
  background: rgb(var(--cardBackground));
  border-radius: 0.6rem;
  text-align: left;
`;

const PopupTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const ArticleCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 35rem;
  overflow: hidden;
  text-decoration: none;
  border-radius: 0.6rem;
  background: rgb(var(--cardBackground));
  cursor: pointer;
  color: rgb(var(--text));
  padding-bottom: 3rem;
`;

const Content = styled.div`
  margin-top: 2rem;
  text-align:center;
  & > * {
    margin-top: 1rem;
  }
`;

const Title = styled.h4`
  font-size: 1.8rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const WrapperPokemonData = styled.div`
padding-top: 2rem;
`

const Descriptions = styled.p`
  font-size: 1.6rem;
  text-overflow: ellipsis;
  opacity: 0.6;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
`;
