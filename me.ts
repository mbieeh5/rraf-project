



interface Rraf {
    feeling: string;
    mood: boolean;
    heart: number;
    health: number;
}

function RrafLife(startFrom: Rraf) {

    const feeling: string = startFrom.feeling;
    const mood: boolean = startFrom.mood;
    const heart: number = startFrom.heart;
    let health: number = startFrom.health;

        function FallingInLove(
            feeling: string, 
            mood: boolean, 
            heart: number):void {
            if(mood === !false){
                if(feeling === 'good'){
                    mood = !true;
                    heart++;
                }else if(feeling === "bad"){
                    mood = !false;
                    heart--;
                }else{
                    feeling = "better";
                }
            }    
        }
    FallingInLove(feeling, mood, heart);

        for (health; heart <= 49; health--) {
                return health;
        }
}
let setDate;
const calendarDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const calendarMonth = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];


const date = new Date();
const hari = calendarDays[date.getDay()];
const tanggal = date.getDate();
const bulan = calendarMonth[date.getMonth()];

setDate(`${hari}, ${tanggal} ${bulan}`);



const startFrom = {
    feeling: "good",
    mood: true,
    heart: 100,
    health: 100
}


RrafLife(startFrom)