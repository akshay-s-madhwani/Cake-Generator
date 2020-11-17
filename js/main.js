alert("Happy Birthday Tanya 🎉🎊🎉🎊🎉🎊🎉🎊🎉🎊🎉🎊🎉🎊🎉🎊🎊🎉🎊🎉🎊🎉🎉🎊💐💐💐💐💐💐💐💐💐💐💐💐💐💐💐💐💐💐");
alert("***Instructions***\n\n1. Select One of  the 3 Layer You want to modify \n\n 2.Select the flavour or shape for that Layer, And click again on the option After Selecting it\n\n 3.Click save to save your design and Wish her \n4. Click on View to View others wishes and designs\n Enjoy!!!");
window.onload = () => {

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
document.querySelector("#help").onclick = ()=> alert("***Its A cake generator Where You can create a Cake of your choice with the given shapes and flavours For Tanya, \nSo Go Ahead \nBe Creative!!!\n***Instructions***\n\n1. Select One of  the 3 Layer You want to modify \n\n 2.Select the flavour or shape for that Layer, And click again on the option After Selecting it\n\n 3.Click save to save your design and Wish her \n4. Click on View to View others wishes and designs\n Enjoy!!!");
const container = document.querySelector('#container'); 
const cake = document.querySelector('.saved-collection-wrap');
const display = document.querySelector('.saved-collection-con');
const cake_display = document.querySelector('.saved-display');

const main_opt = document.querySelectorAll('.main-options');
const viewbtn= document.querySelector('.view');
const section = document.querySelectorAll('.select-base');

let lvl1 = document.querySelector('#lvl_1');
let lvl2 = document.querySelector('#lvl_2');
let lvl3 = document.querySelector('#lvl_3');
let top = document.querySelector('#cake-top');

function designChanger(elem){
  let option_val;
  elem != top ?
    elem.classList.add('blink'):elem.classList.remove('blink');
  
  
  for(let j in section){
    section[j].onclick= (e) => {

      let data = section[j].getAttribute('data-opt'); 
      if( j != 4 && j != 6 && j!=7){
        elem.className = data;
      }
      else if(j == 4){
        elem.style.background = e.target.value;
      }
      option_val = e.target.value;
        elem.classList.add(option_val);
         elem.classList.remove('cherry','candle','choc-stick')
         
      if(j === 6 || elem === document.querySelector('#cake-top') || j===document.querySelectorAll('.select-base')[6]){
        elem.classList.remove('cherry')
        elem.classList.remove('candle')
        elem.classList.remove('choc-stick');
        elem.classList.toggle('blink',false)
        option_val = e.target.value;
        elem.classList.add(option_val)
        
      }
     
      }
        }
  }

let activePiece;
main_opt.forEach(function(i) {
  i.onclick = () =>{
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
        designChanger(document.querySelector('#cake-top'));
        break;
    }
  }
})
let saved_cake_wrap = document.querySelector('.saved-cake-wrap');
document.querySelector('.fa-arrow-right').onclick = () => 
  display.style.transform = 'translate(120%, 0)';
document.querySelector('.save').onclick = () => {
cake_display.style.display = 'flex';
saved_cake_wrap.innerHTML = container.innerHTML;
display.style.transform = 'translate(15%, 0)';
}
function previewer(obj){
  
  let container = document.createElement('Div');
  let nameWrap = document.createElement('span');
  let name = document.createElement('p');
  let cakeContainer = document.createElement('div');
  let wishesContainer = document.createElement('div');
  let wishes = document.createElement('p');

  container.className = 'viewable-display';
  nameWrap.className = 'wisher';
  cakeContainer.className = 'saved-cake-wrap container';
  wishesContainer.className = 'wishes-con';
  wishes.className = 'wishes';

  name.innerText = obj.name;
  cakeContainer.innerHTML = obj.cake;
  wishes.innerText = obj.comment;
  if(obj.background ){
    cakeContainer.style.background = obj.background;
  }
  nameWrap.appendChild(name);
  wishesContainer.appendChild(wishes);
  container.appendChild(nameWrap);
  container.appendChild(cakeContainer);
  container.appendChild(wishesContainer);
  document.querySelector('.saved-collection-wrap').appendChild(container);
  
return container;
}
const save = document.querySelector('.upload');
const save_bg = document.querySelector('.bg-img');
const name = document.querySelector('.name');
const wish = document.querySelector('.wishes-con');
let colors = 'rgb(25,25,25)';
              save_bg.onclick = () => {
                let rcol = Math.floor(Math.random()*255);
                let gcol = Math.floor(Math.random()*255);
                let bcol = Math.floor(Math.random()*255);
                 colors = `rgb(${rcol},${gcol},${bcol})`;
                 
                
                saved_cake_wrap.style.background = colors;
                return colors;
              }
              
 const db = firebase.firestore();
  save.onclick = () => {
  if(name.value == null || name.value == undefined ||name.value ===''){
      alert("Your Name is required!!")
  }
  else{
  alert("Please Wait!!")
    const user = {};
    
    user.name = name.value;
    user.cake = container.innerHTML;
    user.comment = wish.value;
    user.background = colors;
   db.collection('tanyaWishes').add(user)
.then(docRef => {alert(`${name.value}\'s Wish Saved \n`)})

.catch(err => {console.log("Error:",err)});
    }
  }
  
  viewbtn.onclick = () =>
{
  
  cake_display.style.display = 'none';
  display.style.transform = 'translate(15%, 0)';
    db.collection('tanyaWishes').get()
    .then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
      previewer(doc.data());
    })
  })
  .catch( err => {console.log(err)})
  
}
}

