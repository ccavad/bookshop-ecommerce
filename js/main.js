/* 
    VARIABLES 
*/
const dropdownbtn = document.querySelector("#dropdownbtn");
const dropdownContent = document.querySelector(".dropdown-content");
const mehsullar = document.querySelector("#mehsullar");
const prtswitch = document.querySelector("#prtswitch");
const navMenuBtns = document.querySelectorAll(".navMenuBtn");
const sections = document.querySelectorAll("section");
const hdbottom = document.querySelector(".header-bottom");
const nav_menu = document.querySelector(".nav_menu");
const hamburgerbtn = document.querySelector("#hamburgerbtn");

const mehsullarCont = document.querySelector(".mehsullar-container");
const mehsullar_btns = document.querySelectorAll(".mehsullar-btns button");
const books_all = document.querySelector("#books_all");
const books_eng = document.querySelector("#books_eng");
const books_tr = document.querySelector("#books_tr");

const cartbtn = document.querySelector("#cart_btn");
const sebetCont = document.querySelector("#sebet .container");
const sebetclosebtn = document.querySelector("#sebetclosebtn");
const aside = document.querySelector("aside");
const overlay = document.querySelector(".overlay");
const hdcartcount = document.querySelector("#cart-count");
const sebetToplamQiymetEl = document.querySelector("aside .checkout h3");

let sebetToplamQiymet = 0;
let startingCartCount = 0;

const checkoutbtn = document.querySelector("#checkoutbtn");

function firstTimeSaveLocal() {
    let localGetKitablar = JSON.parse(localStorage.getItem("kitablar"));
    let localGetToplamQiymet = JSON.parse(localStorage.getItem("sebetToplamQiymet"));
    let localGetCartCount = JSON.parse(localStorage.getItem("startingCartCount"));

    if (localGetKitablar === null) {
        localStorage.setItem("kitablar", JSON.stringify(kitablar));
    }

    if (localGetToplamQiymet === null) {
        localStorage.setItem("sebetToplamQiymet", JSON.stringify(sebetToplamQiymet));
    }
    
    if (localGetCartCount === null) {
        localStorage.setItem("startingCartCount", JSON.stringify(startingCartCount));
    }
    
}

function saveLocal() {
    localStorage.setItem("kitablar", JSON.stringify(kitablar));
    localStorage.setItem("sebetToplamQiymet", JSON.stringify(sebetToplamQiymet));
    localStorage.setItem("startingCartCount", JSON.stringify(startingCartCount));
}


firstTimeSaveLocal()

/* 
    KITABLAR 
*/


/* 
    FUNCTIONS 
*/

function loadLocal() {

    kitablar = JSON.parse(localStorage.getItem("kitablar"));
    sebetToplamQiymet = parseInt(JSON.parse(localStorage.getItem("sebetToplamQiymet")));
    startingCartCount = parseInt(JSON.parse(localStorage.getItem("startingCartCount")));
    kitablar.forEach(kitablariEkranaYazdir);
    kitablar.filter(kitab => kitab.sebetdekiSayi > 0).forEach(kitablariSebeteYazdir);
    sebetInfoGuncelle()
}

loadLocal()

/* 
    EVENTS 
*/

navMenuBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        dropdownContent.classList.remove("active")
        sections.forEach(section => {
            section.classList.remove("active")
        })
        let targetSection = document.querySelector(`section${btn.dataset.for}`);
        targetSection.classList.add("active")
    })
})

dropdownbtn.addEventListener("click", () => {
    dropdownContent.classList.toggle("active")
})

// section ve footere klikledikde dropdown menyunu baglayacaq
document.querySelector("footer").addEventListener("click", () => {
    dropdownContent.classList.remove("active");
    nav_menu.classList.remove("active");
})
sections.forEach(section => {
    section.addEventListener("click", () => {
        dropdownContent.classList.remove("active");
        nav_menu.classList.remove("active");
    })
})


hamburgerbtn.addEventListener("click", () => {
    nav_menu.classList.add("active")
})

window.addEventListener("scroll", () => {
  const hdbottom = document.querySelector(".header-bottom")
  hdbottom.classList.toggle("fixed", window.scrollY > 0);
})

prtswitch.addEventListener("change", () => {
    const prtdiv = document.querySelector(".prt-div")
    if (prtswitch.checked) {
        prtdiv.classList.add("checked");
        prtdiv.querySelector("h4").innerHTML = "Aylıq icarə";
        prtdiv.querySelector("h5").innerHTML = `6 <i class="fa-solid fa-manat-sign"></i> / ay`
    } else {
        prtdiv.classList.remove("checked");
        prtdiv.querySelector("h4").innerHTML = "Həftəlik icarə";
        prtdiv.querySelector("h5").innerHTML = `2 <i class="fa-solid fa-manat-sign"></i> / həftə`
    }
})

/* 
    MEHSULLAR 
*/

function kitablariEkranaYazdir(kitab) {
    mehsullarCont.innerHTML += `
        <div class="card" data-id="${kitab.id}">
            <div class="card_image">
                <img src="img/${kitab.src}" alt="book kitab ${kitab.ad} ${kitab.yazici}">
            </div>

            <div class="card_info">
                <h3 class="kitab_adi">${kitab.ad}</h3>
                <h4 class="kitab_yazar">${kitab.yazici}</h4>
                <h5 class="kitab_qiymet">${kitab.qiymet} <i class="fa-solid fa-manat-sign"></i></h5>
            </div>

            <div class="card_btns">
                <button class="card_shop" data-id="${kitab.id}">
                    <i class="fa-solid fa-cart-shopping"></i>
                </button>

                <input type="checkbox" id="book${kitab.id}input" data-id="${kitab.id}" ${(kitab.wished) ? "checked" : ""}> 
                <label for="book${kitab.id}input">
                    <i class="fa-solid fa-heart" data-id="${kitab.id}"></i>
                </label>
            </div>
        </div>
    `
}

function kitablariSebeteYazdir(kitab) {

    sebetCont.innerHTML += `
        <div class="item" data-id="${kitab.id}">
            <div class="item-pic">
                <img src="img/${kitab.src}">
            </div>
            <div class="item-info">
                <h3>${kitab.ad}</h3>
                <h4>${kitab.qiymet} <i class="fa fa-manat-sign"></i></h4>
                <div class="item-count">
                    <button class="item-minus" data-id="${kitab.id}">-</button>
                    <span class="item-count-span" data-id="${kitab.id}">${kitab.sebetdekiSayi}</span>
                    <button class="item-plus" data-id="${kitab.id}">+</button>
                </div>  
            </div>
        </div>
    `
}

// sebetdeki plus minus duymeleri
sebetCont.addEventListener("click", e => {
    
    const elplus = e.target.closest(".item-plus");
    const elminus = e.target.closest(".item-minus");
    const kitab = kitablar[e.target.dataset.id];

    if (e.target.classList.contains("item-plus") && kitab.sebetdekiSayi < kitab.stokdakiSayi) {
        kitab.sebetdekiSayi++;
        startingCartCount++;
        elplus.previousElementSibling.innerText = kitab.sebetdekiSayi;
        sebetInfoGuncelle()
    } else if (e.target.classList.contains("item-minus") && kitab.sebetdekiSayi > 0) {
        kitab.sebetdekiSayi--;
        startingCartCount--;
        elminus.nextElementSibling.innerText = kitab.sebetdekiSayi;
        sebetCont.innerHTML = "";
        kitablar.filter(kitab => kitab.sebetdekiSayi > 0).forEach(kitablariSebeteYazdir);
        sebetInfoGuncelle()
    } 
})

function sebetInfoGuncelle() {
    sebetToplamQiymet = 0;
    startingCartCount = 0;
    for (let i = 0; i < kitablar.length; i++) {
        sebetToplamQiymet += kitablar[i].qiymet * kitablar[i].sebetdekiSayi;
        startingCartCount += kitablar[i].sebetdekiSayi
    } 
    saveLocal();
    sebetToplamQiymetEl.innerHTML = `Cəmi: ${sebetToplamQiymet} <i class="fa fa-manat-sign"></i>`;
    hdcartcount.innerText = startingCartCount;
}

// window.addEventListener("load", kitablar.forEach(kitablariEkranaYazdir))


mehsullarCont.addEventListener("click", el => {

    if (el.target.matches("i.fa-heart")) { //wishlist urek inputuna kliklenende
        const elicon = el.target.closest("i.fa-heart");
        const elinput = elicon.parentNode.previousElementSibling; //checkbox urek
        
        if (!elinput.checked) {
            kitablar[elicon.dataset.id].wished = true;
            saveLocal()
        }  else {
            kitablar[elicon.dataset.id].wished = false;
            saveLocal()
        }
    }
    
    if (el.target.classList.contains("card_shop")) { //shop duymesine klikleyende mehsul sebetde gorunsun
        
        let btnid = el.target.closest("button.card_shop").dataset.id;
        console.log("asd")

        if (kitablar[btnid].sebetdekiSayi < kitablar[btnid].stokdakiSayi) {

            kitablar[btnid].sebetdekiSayi++;

            sebetInfoGuncelle()

            sebetCont.innerHTML = "";
            let sebetdekiKitablar = kitablar.filter(kitab => kitab.sebetdekiSayi > 0);
            sebetdekiKitablar.forEach(kitablariSebeteYazdir)
        }
        console.log(kitablar[btnid])
    }
})

mehsullar_btns.forEach(mbtn => {
    mbtn.addEventListener("click", (e) => {
        mehsullar_btns.forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active")
    })
})

books_all.addEventListener("click", () => {
    mehsullarCont.innerHTML = "";
    kitablar.forEach(kitablariEkranaYazdir)
})
books_eng.addEventListener("click", () => {
    mehsullarCont.innerHTML = "";
    kitablar.filter(kitab => kitab.dil === "eng").forEach(kitablariEkranaYazdir)
})
books_tr.addEventListener("click", () => {
    mehsullarCont.innerHTML = "";
    kitablar.filter(kitab => kitab.dil === "tr").forEach(kitablariEkranaYazdir)
})

/* 
    SEBET 
*/

checkoutbtn.addEventListener("click", () => {
    for (let i = 0; i < kitablar.length; i++) {
        kitablar[i].sebetdekiSayi = 0;
    }
    saveLocal();
    sebetInfoGuncelle();
    sebetCont.innerHTML = "";
})

cartbtn.addEventListener("click", () => {
    overlay.classList.add("active");
    aside.classList.add("active");
})

sebetclosebtn.addEventListener("click", () => {
    overlay.classList.remove("active");
    aside.classList.remove("active")
})

overlay.addEventListener("click", () => {
    overlay.classList.remove("active");
    aside.classList.remove("active")
})

/*
    HESAB
*/

const qeydkec = document.querySelector("#qeydkec");
const giriset = document.querySelector("#giriset");
const hesablogin = document.querySelector(".hesablogin");
const hesabregister = document.querySelector(".hesabregister");

qeydkec.addEventListener("click", () => {
    hesabregister.classList.remove("active");
    hesablogin.classList.add("active");
})

giriset.addEventListener("click", () => {
    hesablogin.classList.remove("active");
    hesabregister.classList.add("active");
})


/* 
    SWIPER 
*/

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});