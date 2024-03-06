import { child, get, getDatabase,ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../../../components/Button';

interface RankDatas {
  tier: string,
  tierOld: string,
  Nama: string,
  Point: number,
  Reputasi: number
}

export default function Rank() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [rankData, setRankData] = useState<RankDatas[]>([]);
  const [highestSort, setHighestSort] = useState('reputasi');
  const [title, setTitle] = useState('RANK LIST!')
  const [isUpdated, setIsUpdated] = useState(false);

  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);
  const highPoint = () => {setHighestSort('point'); setIsUpdated(!isUpdated); setTitle('RANK LIST POINT!')};
  const highReputasi = () => {setHighestSort('reputasi'); setIsUpdated(!isUpdated); setTitle('RANK LIST!')};

  useEffect(() => {
    const dbsd = ref(getDatabase());
    get(child(dbsd, `dataPengguna/pengguna`))
    .then(async(snapshot) => {
      const Datas:unknown = snapshot.val();
      if(Datas){
        const ranks = Object.entries(Datas)
        .sort(([, a], [, b]) => b[highestSort] - a[highestSort])
        .map(([randomkey, data], index) => {
            let tier = '';
            if (data.reputasi <= 0) {
                tier = "💀BOCAH TOXIC💀";
            } else if (data.reputasi <= 10) {
                tier = "Bronze";
            } else if (data.reputasi <= 20) {
                tier = "Silver";
            } else if (data.reputasi <= 30) {
                tier = "Gold";
            } else if (data.reputasi <= 50) {
                tier = "Platinum";
            } else if (data.reputasi <= 100) {
                tier = "💎Diamond💎";
            } else if (data.reputasi <= 200) {
                tier = "♚CROWN♚";
            } else if (data.reputasi <= 500) {
                tier = "⭐ACE⭐";
            } else if (data.reputasi === 666) {
                tier = "S0N-0F-S4TAN";
            } else if (data.reputasi <= 1000) {
                tier = "🔥CONQUEROR🔥";
            } else if (data.reputasi >= 2000) {
                tier = "👑GOD👑";
            } else {
                tier = "Anak💀Haram";
            }

            let tierOld = '';
            if (data.reputasiS1 <= 0) {
                tierOld = "💀BOCAH TOXIC💀";
            } else if (data.reputasiS1 <= 10) {
                tierOld = "Bronze";
            } else if (data.reputasiS1 <= 20) {
                tierOld = "Silver";
            } else if (data.reputasiS1 <= 30) {
                tierOld = "Gold";
            } else if (data.reputasiS1 <= 50) {
                tierOld = "Platinum";
            } else if (data.reputasiS1 <= 100) {
                tierOld = "💎Diamond💎";
            } else if (data.reputasiS1 <= 200) {
                tierOld = "♚CROWN♚";
            } else if (data.reputasiS1 <= 500) {
                tierOld = "⭐ACE⭐";
            } else if (data.reputasiS1 === 666) {
                tierOld = "S0N-0F-S4TAN";
            } else if (data.reputasiS1 <= 1000) {
                tierOld = "🔥CONQUEROR🔥";
            } else if (data.reputasiS1 >= 2000) {
                tierOld = "👑GOD👑";
            } else {
                tierOld = "Anak💀Haram";
            }
            const Nama = data.nama;
            const Point = data.point;
            const Reputasi = data.reputasi
            return {
              tier,
              tierOld,
              Nama,
              Point,
              Reputasi,
            }
        });
        const RanksDatasArray:RankDatas[] = Object.values(ranks);
        setRankData(RanksDatasArray)
      }
    })
    .catch((err) => {
      console.error(err);
    });

  }, [isPopupVisible, isUpdated, highestSort]);
 
  return (
    <>
      <ArticleCardWrapper className="article-card-wrapper" onClick={openPopup}>
        <Content>
          <Title>Rank</Title>
          <Descriptions>Check Rank Kamu Di Peringkat Keberapa Di Server Kami !</Descriptions>
        </Content>
      </ArticleCardWrapper>
      {isPopupVisible && (
        <PopupForm>
          <PopupContent>
            <PopupTitle >{title}</PopupTitle>
            <WrapperRank>
              {rankData.map((a, i) => {
                return(
                  <>
                    <Descriptions2 key={i}>
                      <ul>
                      <Title2>{a.Nama ? a.Nama : 'Anak Bapa'}</Title2>
                      <li>Point: {(a.Point).toLocaleString()}</li>
                      <li>Tier Season Lalu: <br/>{a.tierOld}</li>
                      <li>Tier Saat Ini: <br/>{a.tier}</li>
                      <li>Reputasi: {(a.Reputasi).toLocaleString()}</li>
                      </ul>
                    </Descriptions2>
                  </>
                )
              })}
              </WrapperRank>
            <br/>
            <ButtonGroup>
              <Button transparent onClick={highPoint}>Sort As Highest Point</Button>
              <Button transparent onClick={highReputasi}>Sort As Highest Reputasi</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button transparent onClick={closePopup}>Close</Button>
            </ButtonGroup>
          </PopupContent>
        </PopupForm>
      )}
    </>
  );
}

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
  min-width: 350px;
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

const Title2 = styled.h4`
  font-size: 1.8rem;
  text-align: left;
  padding-bottom: 0.5rem;
`;

const Descriptions = styled.p`
  font-size: 1.6rem;

  overflow: auto;
  display: -webkit-box;
  opacity: 0.6;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
`;

const Descriptions2 = styled.p`
  font-size: 1.6rem;

  overflow: auto;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
`;

const WrapperRank = styled.div`
  font-size: 1.6rem;
  overflow: auto;
  max-height: 45rem;
  opacity: 0.6;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
`;

const ButtonGroup = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: row;
`