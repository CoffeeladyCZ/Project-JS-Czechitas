import { Carousel } from './components/carousel/carousel.js';
import { Day } from './components/day/day.js';

const carousel = document.querySelector('app-carousel');

fetch('http://localhost:3000/news.json')
    .then(serverResponse => serverResponse.text())
    .then(responseText => {
        const data = JSON.parse(responseText);
        carousel.populateNewsCarousel(data.articles);
    });

const mainContent = document.querySelector('section.main-content');

const currentDate = new Date();
const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

for (let i = 1; i < maxDate; i++) {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
    mainContent.appendChild(new Day(dayDate));
}

const openModalButton = document.querySelector('#open-modal');
openModalButton.addEventListener('click', () => {
    showDayModal().then((result) => console.log(result)); // 3. na základě toho se "vypíše" výsledek, který jsem zaškrtla nebo nezaškrtla
});

function showDayModal() {
    const promiseResult = new Promise((resolve, reject) => {                             // promise - STUDY
        const template = document.querySelector('#modal-template');
        const modal = template.content.cloneNode(true);

        const closeAction = (event) => {                                                 // funkce vytažená do proměnné
            const child = document.querySelector('section.modal-container');
            document.body.removeChild(child);            
            resolve(null);                               // 1. pošle prázdnou hodnotu, když zmáčknu křížek nebo cancel
        };

        modal.querySelector('#close-modal').addEventListener('click', closeAction); 
        
        modal.querySelector('#cancel-button').addEventListener('click', closeAction);

        modal.querySelector('#save-button').addEventListener('click', () => {
            const formRef = document.querySelector('#modal-form');
            const formData = new FormData(formRef);
            const isHoliday = formData.get('isHoliday') === 'on';
            resolve({isHoliday : isHoliday})             // 2. pošle daný objekt, když zaškrtnu checkbox
        }); 

        document.body.appendChild(modal);
    });

    return promiseResult;
}






// ukazkovy kod:

// function hideTheThing(event) {
//     event.target.style.display = 'none';
// }
// document.querySelectorAll('app-day').forEach(day => day.addEventListener('click', hideTheThing));

// const text = 'ashdf';
// const cislo = 3;

// const automobil = {
//     pocetMistKSezeni: 5,
//     barvaKaroserie: 'cervena'
// };

// console.log(automobil.barvaKaroserie);

// class Operenec {

//     constructor(volani) {
//         this.zvuk = volani;
//     }

//     vydejZvuk() {
//         console.log('delka zvuku', this.zvuk.length);
//         console.log(this.zvuk);
//     }

// }

// class Kacer extends Operenec {
//     constructor() {
//         super('kva kva');
//         console.log(this.zvuk);
//     }

//     plavPoJezirku() {
//         console.log('plavu plavu');
//     }
// }

// class Kohout extends Operenec {
//     hlasVychodSlunce() {
//         console.log('vychazi');
//     }
// }

// const kacer = new Kacer();

// kacer.vydejZvuk();

// const kohout = new Kohout('kikiriki');

// kohout.vydejZvuk();
