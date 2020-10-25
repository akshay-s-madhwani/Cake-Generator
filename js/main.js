window.onload = () => {
// let lvl1 , lvl2 , lvl3 , cake_top , section , main_opt , sqr_round , circle , glazed , kitkat , same_size , default;
var firebaseConfig = {
  apiKey: "AIzaSyBmKWrOJoQHM2LLii9GoREwJd6f9AueMSk",
  authDomain: "musicplayer-d52c0.firebaseapp.com",
  databaseURL: "https://musicplayer-d52c0.firebaseio.com",
  projectId: "musicplayer-d52c0",
  storageBucket: "musicplayer-d52c0.appspot.com",
  messagingSenderId: "389642363261",
  appId: "1:389642363261:web:f7d3f1a25a1f69da42ec14",
  measurementId: "G-MFP4119Y6T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = firebase.app();

const container = document.querySelector('#container'); 
const cake = document.querySelector('.saved-collection-wrap');
const display = document.querySelector('.saved-collection-con');

const main_opt = document.querySelectorAll('.main-options');
const viewbtn= document.querySelector('.view');
const section = document.querySelectorAll('.select-base');
console.log(section);

function designChanger(elem){
  let option_val;
  if(elem !== top ){
    elem.classList.add('blink');
  }
  for(let j in section){
    section[j].onclick = (e) => {
      let data = section[j].getAttribute('data-opt'); 
      if( j != 4 && j != 6 && j!=7){
        elem.className = data;
        console.log(elem.classList)
      }
      else if(j == 4){
        elem.style.background = e.target.value;
      }
      else if(j ==6 && elem === top){
        elem.classList.remove('strawberry','candle','choc-stick');
        elem.classList.toggle('blink',false)
        option_val = e.target.value;
        elem.classList.add(option_val)
      }
      else if( j !==4 && e.target.value != null &&elem === top){
        option_val = e.target.value;
      }
      if(option_val != null){ 
        elem.classList.add(option_val);
        elem.classList.toggle('blink',false)
      }
      }
    }
  }
let lvl1 = document.querySelector('#lvl_1');
let lvl2 = document.querySelector('#lvl_2');
let lvl3 = document.querySelector('#lvl_3');
let top = document.querySelector('#cake-top');
let activePiece;
main_opt.forEach(function(i) {
  i.onclick = () => {
    switch(i){
      case document.querySelectorAll('.main-options')[0]:
        activePiece = lvl1;
        designChanger(activePiece);
        break;
      case document.querySelectorAll('.main-options')[1]:
        activePiece = lvl2;
        designChanger(activePiece);
        break;
      case document.querySelectorAll('.main-options')[2]:
        activePiece = lvl3;
        designChanger(activePiece);
        break;
      case document.querySelectorAll('.main-options')[3]:
        activePiece = top;
        designChanger(activePiece);
        break;
    }
  }
})
document.querySelector('.fa-arrow-right').onclick = () => 
  display.style.transform = 'translate(120%, 0)';
document.querySelector('.save').onclick = () => {
cake.innerHTML = container.innerHTML;
console.log(cake.innerHTML);
display.style.transform = 'translate(15%, 0)';
}
function previewer(obj){
  
  let container = document.createElement('Div');
  let nameWrap = document.createElement('span');
  let name = document.createElement('p');
  let cakeContainer = document.createElement('div');
  let wishesContainer = document.createElement('div');
  let wishes = document.createElement('p');

  container.className = 'saved-display viewable-display';
  nameWrap.className = 'wisher';
  cakeContainer.className = 'saved-cake-wrap container';
  wishesContainer.className = 'wishes-con';
  wishes.className = 'wishes';

  name.innerText = obj.name;
  cakeContainer.innerHTML = obj.cake;
  wishes.innerText = obj.comments;
  if(obj.background ){
    cakeContainer.style.background = obj.background;
  }
  nameWrap.appendChild(name);
  wishesContainer.appendChild(wishes);
  container.appendChild(nameWrap);
  container.appendChild(cakeContainer);
  container.appendChild(wishesContainer);
  display.appendChild(container);
  console.log(container);
return container;
}
const save = document.querySelector('.upload');
const save_bg = document.querySelector('.bg-img');
const name = document.querySelector('.name').value;
const wish = document.querySelector('.wishes-con');
let colors;
              save_bg.onclick = () => {
                let rcol = Math.floor(Math.random()*255);
                let gcol = Math.floor(Math.random()*255);
                let bcol = Math.floor(Math.random()*255);
                 colors = `rgb(${rcol},${gcol},${bcol})`;
                console.log(colors);
                cake.style.background = colors;
                return colors;
              }
 const db = firebase.firestore();
  save.onclick = () => {
    const user = new Object();
    if(name === null || name === undefined){
      return alert("Name Field is required");
    }
    user.name = name;
    user.cake = container.innerHTML;
    user.comment = wish.value;
    user.background = colors;
    console.log(user);
db.collection('wishes').add(user)
.then(docRef => {console.log("New Wish Id", docRef.id)})
.catch(err => {console.log("Error:",err)});
    
  }
  function getData(){
    db.collection('wishes').get()
    .then((querySnapshot) => {
       querySnapshot.forEach((data) => {
      previewer(data.data());
      console.log(data.data());
    })
  })
  .catch( err => {console.log(err)})
  }
  viewbtn.onclick = () =>
{
  console.log(cake,display)
  display.style.display = 'hidden';
  display.style.transform = 'translate(15%, 0)';
  getData();
}
}

