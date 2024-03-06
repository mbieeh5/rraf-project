import { child, get, getDatabase, ref} from 'firebase/database';
import { database } from '../../firebase';

export default function handler(req, res) {
    const dbd = ref(database); // Inisialisasi database Firebase

    if (req.method === 'POST') {
        const { data } = req.body;
        const noHPDBs = data.noHPDB;
        const PokemonData = data.dataPokemon;
        const DBToUp = ref(database, `dataPengguna/pengguna/${noHPDBs}`);
        get(child(dbd, `dataPengguna/pengguna/${noHPDBs}`))
            .then(async (ss) => {
                const val = ss.val();
                if (val && val.pokemon && val.pokemon.gacoan) {
                    await res.status(200).json({ message: 'Pertarungan Selesai' });
                } else {
                    res.status(404).json({ message: 'Pertarungan Gagal Karena Gacoan Tidak Ada' });
                }
            })
            .catch((err) => {
                res.status(404).json({ message: 'Pertarungan Gagal, Nomor Bukan Pengguna Bot' });
            });
    } else {
        res.status(405).json({ message: 'Metode tidak diizinkan' });
    };
};
