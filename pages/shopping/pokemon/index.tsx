import { child, get, getDatabase, ref  } from 'firebase/database';
import { useEffect, useState } from "react"
import styled from "styled-components"
import AutofitGrid from "components/AutofitGrid"
import Page from "components/Page"
import ShopCard from "components/ShopCardImg"

export default function PokemonShop() {
    
    const [dataMarket, setDataMarket] = useState<unknown[]>([]);
    useEffect(() => {
        const dbd = ref(getDatabase());
        get(child(dbd, `dataData/delay`)).then( async(snapshot) => {
            const val = snapshot.val() || {};
            const dataArray = Object.values(val);
            setDataMarket(dataArray);
        }).catch((error) => console.log(error))
    },[])

    return(
        <Page
        title="Welcome to Pokemon Shop"
        description="Happy Shopping for the best offer"
        >
            <Wrapper>
                <AutofitGrid>
                    {dataMarket.map((a:any, i:number) => {
                        return (
                            <ShopCard 
                            key={i} 
                            ID={i}
                            stock={a.stock}
                            price={a.harga}
                            img={a.img} 
                            title={a.name} 
                            link={'#'}
                            description={a.desc}/>
                            )
                    })}
                </AutofitGrid>
               </Wrapper>
        </Page>
    )
}


const Wrapper = styled.div`

`