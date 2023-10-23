//! 1 - TÜM KOLTUKLARIN KAPSAYISICI OLAN DİVİ ÇEK
//! 2- CONTAINERA CLICK EVENTİ EKLE
// const container=document.getElementsByClassName('container')   ---------- BU YÖNTEMLE DE ÇEKİLEBİLİR (CLASS NAME)

const container = document.querySelector(".container");

// console.log(container)  -- HTML TARAFINDAN ÇEKİLEN VERİNİN GÖRÜNTÜSÜ

const infoText = document.querySelector(".infoText");
// console.log(infoText)

const movieList = document.querySelector("#movie");
//console.log(movieList)

const seatCount = document.getElementById("count");
//console.log(seatCount)

const totalAmount = document.getElementById("amount");
//console.log(totalAmount)

const seats=document.querySelectorAll('.seat:not(.reserved)')
//console.log(seats)


const saveToDatabase=(index)=>{
   // console.log('data', index)

   localStorage.setItem('seatsIndex', JSON.stringify(index));

   //FİLM VERİSİ KAYDI

    localStorage.setItem('movieIndex', JSON.stringify(movieList.selectedIndex))

};

const getFromDatabase=()=>{

    const dbSelectedSeats=JSON.parse(localStorage.getItem('seatsIndex'))
    //console.log(dbSelectedSeats)

    if(dbSelectedSeats!==null){
        seats.forEach((seat,index)=>{
    
    if(dbSelectedSeats.includes(index)){
        seat.classList.add('selected')
    }

        });
    }

    const dbSelectedMovie=JSON.parse(localStorage.getItem('movieIndex'))
    movieList.selectedIndex=dbSelectedMovie
};

getFromDatabase()



const createIndex=()=>{

    let allSeatsArray=[]
    
    seats.forEach((seat)=>{
        allSeatsArray.push(seat)
    })

   // console.log(allSeatsArray)

   const allSelectedSeatsArray=[]
   const allSelectedSeats=container.querySelectorAll('.seat.selected')

   allSelectedSeats.forEach((selectedSeat)=>{
    allSelectedSeatsArray.push(selectedSeat)
   })

   //console.log(allSeatsArray)

   const selectedSeatsIndex=allSelectedSeatsArray.map((selectedSeat)=>{
    //console.log(allSeatsArray.indexOf(selectedSeat))

    return allSeatsArray.indexOf(selectedSeat)

   })

   //console.log(selectedSeatsIndex)

   saveToDatabase(selectedSeatsIndex)

}




const calculateTotal = () => {
    createIndex()
   
  //    console.log('hesaplama çalıştı')

  let selectedSeatsCount = container.querySelectorAll(".seat.selected").length;
  //console.log(selectedSeatsCount)

  seatCount.innerText = selectedSeatsCount;
  //console.log(count)
  totalAmount.innerText = selectedSeatsCount * movieList.value;
  //console.log(totalAmount)

  const seats=document.querySelectorAll('.seat:not(.reserved)')
  // console.log(seats)

 



  if (selectedSeatsCount > 0) {
    infoText.classList.add("open");
  } else {
    infoText.classList.remove("open");
  }
};
calculateTotal();

container.addEventListener("click", (pointerEvent) => {
  //    console.log(container) ------- CONTAINER TIKLANDI
  //    console.log(pointerEvent.target.offsetParent)  // -------- srcElement içerisinde  =>  parentElement =>  target   (offsetParent İLE BİR ÜST ELEMANI ALIYOR)
  //    pointerEvent.target.offsetParent  ---------- ÇOK UZUN OLDUĞU İÇİN Bİ DEĞİŞKENE ATAYALIM

  const clickedSeat = pointerEvent.target.offsetParent;

  if (
    clickedSeat.classList.contains("seat") &&
    !clickedSeat.classList.contains("reserved")
  ) {
    clickedSeat.classList.toggle("selected");
  }

  calculateTotal();
});

movieList.addEventListener('change',()=>{
    calculateTotal()
})