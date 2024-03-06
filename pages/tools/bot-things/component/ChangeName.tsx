import { child, get, getDatabase,ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../../../components/Button';
import ButtonGroup from '../../../../components/ButtonGroup';


export default function ChangeName() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [noHp, setNoHp] = useState('');
  const [namaPengguna, setNamaPengguna] = useState('');
  const [namaPenggunaBaru, setNamaPenggunaBaru] = useState('');
  const [title, setTitle] = useState("Absen Bro");
  const [isNamaPengguna, setIsNamaPengguna] = useState(false);
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
      if(Datas){
        setNamaPengguna(Datas.nama);
        setTitle('Silahkan Ganti Nama');
        setIsNamaPengguna(true);
      }
      else{
        setNamaPengguna('');
        setTitle("Nomor bukan pengguna BOT ETMC");
      }
    })
    .catch((err) => {
      setNamaPengguna('');
      setTitle("Masukan Nomor Dengan Benar");
    });

  }, [noHp, isPopupVisible]);
  
  const Update = async () => {
    if(namaPenggunaBaru){
      const dataToSend = {noHPDB, namaPenggunaBaru}
      try {
        const response = await fetch('/api/change-name', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({data: dataToSend})
        });
        const responseData = await response.json();
        setTitle(responseData.message);
        setTimeout(() =>{
          setPopupVisible(false);
        },2000)
      } catch(error){
        console.error(error);
      }
    }else{
      setTitle("Masukan Nama Baru")
    }
  };

  return (
    <>
      <ArticleCardWrapper className="article-card-wrapper" onClick={openPopup}>
        <Content>
          <Title>Change Name</Title>
          <Descriptions>Ganti Nama Gratis Daripada di WA Bayar 5000 point wkwkw</Descriptions>
        </Content>
      </ArticleCardWrapper>
      {isPopupVisible && (
        <PopupForm>
          <PopupContent>
            <PopupTitle >{title}</PopupTitle>
            <Descriptions>Nama Saat ini: </Descriptions>
            <Input value={namaPengguna || "Silahkan Masukan Nomor"} placeholder='Silahkan Masukan Nomor' readOnly />
            <Descriptions>Ganti Nama Menjadi: </Descriptions>
            <Input disabled={!isNamaPengguna} placeholder='Masukan Nama Baru' value={namaPenggunaBaru} onChange={(e) => setNamaPenggunaBaru(e.target.value)} />
            <Descriptions>
              Nomor HP :<br/>
              <Input type='number' placeholder='6281234567891' value={noHp} onChange={(e) => HandlerNoHP(e.target.value)} />
            </Descriptions>
            <br/>
            <ButtonGroup>
              <Button transparent onClick={closePopup}>Close</Button>
              <Button disabled={!isNamaPengguna} onClick={() => Update()} transparent>Update</Button>
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

const Descriptions = styled.p`
  font-size: 1.6rem;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  opacity: 0.6;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
`;
