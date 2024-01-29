import html2canvas from "html2canvas";
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import ButtonGroup from "components/ButtonGroup";
import Page from "components/Page"


export default function Sum() {
  const [dataA, setDataA] = useState<string[]>([]);
  const [dataB, setDataB] = useState<number[]>([]);
  const [dataC, setDataC] = useState<number[]>([]);

  useEffect(() => {
    const savedDataA = localStorage.getItem('dataA');
    const savedDataB = localStorage.getItem('dataB');
    const savedDataC = localStorage.getItem('dataC');

    if (savedDataA && savedDataB && savedDataC) {
      setDataA(JSON.parse(savedDataA));
      setDataB(JSON.parse(savedDataB));
      setDataC(JSON.parse(savedDataC));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dataA', JSON.stringify(dataA));
    localStorage.setItem('dataB', JSON.stringify(dataB));
    localStorage.setItem('dataC', JSON.stringify(dataC));
  }, [dataA, dataB, dataC]);

  const addEntry = () => {
    setDataA([...dataA, ""]);
    setDataB([...dataB, 0]);
    setDataC([...dataC, 0]);
  };

  const calculateTotal = () => {
    const totalItems = dataB.reduce((acc, val) => acc + val, 0);
    const totalPrice = dataB.reduce((acc, val, index) => acc + val * dataC[index], 0);

    const formattedDataC = dataC.map((value) => value.toLocaleString('id-ID', {style: 'currency', currency: "IDR"}));
    const formattedTotalPrice = totalPrice.toLocaleString('id-ID', {style: 'currency', currency: "IDR"});

    return { totalItems, totalPrice, formattedDataC, formattedTotalPrice };
  };

  function randomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
  
  const clearData = () => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus semua data?");
    if (isConfirmed) {
      setDataA([]);
      setDataB([]);
      setDataC([]);
    }
  }

  const removeRow = (index: number) => {
    const newDataA = [...dataA];
    const newDataB = [...dataB];
    const newDataC = [...dataC];

    newDataA.splice(index, 1);
    newDataB.splice(index, 1);
    newDataC.splice(index, 1);

    setDataA(newDataA);
    setDataB(newDataB);
    setDataC(newDataC);
  }

  const DownloadAsPNG = () => {
    const tableElement = document.querySelector('table');
  
    if (tableElement) {
      html2canvas(tableElement).then((canvas) => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `table-${randomString(8)}.png`;
  
        const downloadWrapper = document.createElement('div');
        downloadWrapper.appendChild(canvas);
        downloadWrapper.style.display = 'none';
  
        const totalItemDiv = document.createElement('div');
        totalItemDiv.textContent = `Total Item: ${calculateTotal().totalItems}`;
        totalItemDiv.style.textAlign = 'right';
        totalItemDiv.style.marginTop = '10px';
  
        const totalHargaDiv = document.createElement('div');
        totalHargaDiv.textContent = `Total Harga: ${calculateTotal().totalPrice.toLocaleString('id-ID', {style: 'currency', currency: "IDR"})}`;
        totalHargaDiv.style.textAlign = 'right';
  
        downloadWrapper.appendChild(totalItemDiv);
        downloadWrapper.appendChild(totalHargaDiv);
  
        const mergedCanvas = document.createElement('canvas');
        mergedCanvas.width = canvas.width;
        mergedCanvas.height = canvas.height + totalItemDiv.offsetHeight + totalHargaDiv.offsetHeight;
        const mergedContext = mergedCanvas.getContext('2d');
        if(mergedContext){
          mergedContext.drawImage(canvas, 0, 0);
          mergedContext.font = '16px Arial';
          mergedContext.fillText(`Total Item: ${calculateTotal().totalItems}`, 10, canvas.height + 20);
          mergedContext.fillText(`Total Harga: ${calculateTotal().totalPrice.toLocaleString('id-ID', {style: 'currency', currency: "IDR"})}`, 10, canvas.height + 40);
        }else(
          alert('Context is null. gagal mengunduh')
        )
  
        // Mengunduh gambar yang berisi total item dan total harga
        const mergedImage = mergedCanvas.toDataURL('image/png');
        link.href = mergedImage;
        link.download = `table-${randomString(8)}.png`;
  
        link.click();
      });
    }
  };

  return (
      <Page title="Penambahan & Penjumlahan">
    <Wrapper>
      <SumSection>
        <Table>
          <thead>
            <tr>
              <th>Nama Barang</th>
              <th>Jumlah Barang</th>
              <th>Harga</th>
              <th>Total</th>
              <th>Hapus Item</th>
            </tr>
          </thead>
          <tbody>
            {dataA.map((item, index) => (
              <tr key={index}>
                <td>
                  <Input
                    type="text"
                    value={dataA[index]}
                    onChange={(e) => {
                      const newDataA = [...dataA];
                      newDataA[index] = e.target.value;
                      setDataA(newDataA);
                    }}
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    value={dataB[index]}
                    onChange={(e) => {
                      const newDataB = [...dataB];
                      newDataB[index] = parseInt(e.target.value, 10);
                      setDataB(newDataB);
                    }}
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    value={dataC[index]}
                    onChange={(e) => {
                      const newDataC = [...dataC];
                      newDataC[index] = parseInt(e.target.value, 10);
                      setDataC(newDataC);
                    }}
                  />
                </td>
                <td>{(dataB[index] * dataC[index]).toLocaleString('id-ID', {style: "currency", currency: "IDR"})}</td>
                <td>
                  <RemoveButton onClick={() => removeRow(index)}>Hapus</RemoveButton>
                </td>
              </tr>
            ))}
              <tr>
    <td>Total Item</td>
        <td>{calculateTotal().totalItems}</td>
        <td>Total Harga</td>
        <td>{calculateTotal().totalPrice.toLocaleString('id-ID', {style: 'currency', currency: "IDR"})}</td>
              </tr>
          </tbody>
        </Table>
      </SumSection>
        {/*<WrapperTotal>
          <TotalLabel>Total Harga:</TotalLabel>
          <TotalValue>{calculateTotal().totalPrice.toLocaleString('id-ID', {style: 'currency', currency: "IDR"})}</TotalValue>
        </WrapperTotal>
        <br />
        <WrapperTotal>
          <TotalLabel>Total Barang:</TotalLabel>
          <TotalValue>{calculateTotal().totalItems}</TotalValue>
                  </WrapperTotal>*/}
        <ButtonGroup>
          <AddButton onClick={addEntry}>Tambah Baris</AddButton>
          <ClearButton onClick={clearData}>Hapus Semua Baris</ClearButton>
          <DownloadButton onClick={DownloadAsPNG}>Unduh Sebagai PNG</DownloadButton>
        </ButtonGroup>
    </Wrapper>
  </Page>
  );
}

const Input = styled.input`
border: 1px solid rgb(var(--inputBackground));
max-width: 16rem;
`

const RemoveButton = styled.button`
background-color: red;
color:white;
border: none;
border-radius: 8px;
padding: 5px;
`
const SumSection = styled.section`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  overflow-x: auto;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  min-width: 100%;
  white-space: nowrap;

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;

    @media (max-width: 768px) {
      padding: 6px;
    }
  }

  th {
    font-size: 18px;
    @media (max-width: 768px) {
      font-size: 16px; 
    }
  }

  td {
    font-size: 16px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

const Wrapper = styled.div`
  margin: 0.5rem;
  align-items: center;
`;

const AddButton = styled.button`
  margin: 1rem 0;
  font-size: 2rem;
  padding: 0.5rem 1rem;
  background-color: #0074D9;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 9.5px;
  `;
  
  const ClearButton = styled.button`
  margin: 1rem 0;
  font-size: 2rem;
  padding: 0.5rem 1rem;
  background-color: #0074D9;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 9.5px;
  `;
  
  const DownloadButton = styled.button`
margin: 1rem 0;
padding: 0.5rem 1rem;
  font-size: 2rem;
background-color: #0074D9;
color: white;
border: none;
border-radius: 9.5px;
cursor: pointer;
`;