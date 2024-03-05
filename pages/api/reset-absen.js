//import { child, get, getDatabase,ref, update } from 'firebase/database';


export default function handler(req, res) {
    const dbd = ref(getDatabase());
    if(req.method === 'POST'){
        const {data} = req.body;
        res.status(200).json({message: data.noHPDB});
        /*const noHPDBs = data.noHPDB;
        const DBToUp = ref(getDatabase(), `dataPengguna/pengguna/${noHPDBs}`);
        get(child(dbd, `dataPengguna/pengguna/${noHPDBs}`))
          .then((ss) =>{
            const point = ss.val().point;
            const absenweb = ss.val().absenWeb;
            if(point){
              if(absenweb){
                const pointToUp = point + 10000;
                update(DBToUp,{point: pointToUp, absenWeb: false});
                res.status(200).json({message: 'Absen Berhasil'});
                setTimeout(() => {
                  update(DBToUp,{absenWeb: true});
                }, 6*60*60*1000);
              }else{
                  if(absenweb === false){
                      res.status(200).json({message: 'Udah Absen Bro'});
                    }else{
                        res.status(200).json({message: 'Pencet Lagi Bro'});
                        update(DBToUp,{absenWeb: true});
                }
              }
            }else{
                res.status(404).json({message: 'Gagal Absen Nomor Bukan Pengguna Bot'});
            }
        })
        .catch((err) => {
              res.status(404).json({message: 'Gagal Absen Nomor Bukan Pengguna Bot'});
          });*/
          
    }else{
        res.status(405).json({message: 'Metode tidak diizinkan'});
    };
};


