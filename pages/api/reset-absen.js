import { child, get,ref, update } from 'firebase/database';
import { database } from '../../firebase';


export default function handler(req, res) {
    const dbd = ref(database);
    if(req.method === 'POST'){
        const {data} = req.body;
        const noHPDBs = data.noHPDB;
        const DBToUp = ref(database, `dataPengguna/pengguna/${noHPDBs}`);
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
              res.status(404).json({message: 'Gagal Absen Nomor Bukan Pengguna Bot1'});
          });
          
    }else{
        res.status(405).json({message: 'Metode tidak diizinkan'});
    };
};


