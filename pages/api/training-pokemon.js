import { child, get, getDatabase, ref, update } from 'firebase/database';
import { database } from '../../firebase';

export default function handler(req, res) {
    const dbd = ref(database);
    const getRandomStatIncrease = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      
      if (req.method === 'POST') {
          const { data } = req.body;
          const noHPDBs = data.noHPDB;
          const TT = data.trainingTicket;
          const PokemonData = data.pokemonData[0];
        const DBGA = ref(database, `dataPengguna/pengguna/${noHPDBs}/pokemon/gacoan`);
        const DBTT = ref(database, `dataPengguna/pengguna/${noHPDBs}/pokemon/inventory`);
        get(child(dbd, `dataPengguna/pengguna/${noHPDBs}`))
        .then(async (ss) => {
            const val = ss.val();
            if (val && val.pokemon && val.pokemon.gacoan) {
                if(TT >= 1){
                    const MAXHP = getRandomStatIncrease(10, 100);
                    const ATTACK = getRandomStatIncrease(10, 100);
                    const DEFENSE = getRandomStatIncrease(10, 100);
                    const SPEED = getRandomStatIncrease(10, 100);
                    await update(DBGA, {
                        MAXHP: PokemonData.MAXHP + MAXHP,
                        ATTACK: PokemonData.ATTACK + ATTACK,
                        DEFENSE: PokemonData.DEFENSE + DEFENSE,
                        SPEED: PokemonData.SPEED + SPEED,
                    });
                        const usedTT = TT - 1;
                        await update(DBTT, {trainingTicket: usedTT})
                        await res.status(200).json({ message: 'DONE' });
                    }else{
                        await res.status(200).json({ message: 'Gagal Training Ticketmu Habis' });
                    }
                } else {
                    res.status(404).json({ message: 'Training Gagal Karena Gacoan Tidak Ada' });
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(404).json({ message: 'Training Gagal, Nomor Bukan Pengguna Bot' });
            });
    } else {
        res.status(405).json({ message: 'Metode tidak diizinkan' });
    };
};
