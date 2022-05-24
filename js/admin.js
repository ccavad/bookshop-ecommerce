const hamburger = document.querySelector("#hamburger");
const sidemenu = document.querySelector(".sidemenu"); // admindeki aside menusu
const mytable = document.querySelector("#mytable");
const mytablebody = document.querySelector("#mytable_body");
const mehsulelavebtn = document.querySelector("#mehsulelavebtn");
const yenimehsulad = document.querySelector("#yenimehsulad");
const yenimehsulyazar = document.querySelector("#yenimehsulyazar");
const yenimehsulqiymet = document.querySelector("#yenimehsulqiymet");
const yenimehsulstok = document.querySelector("#yenimehsulstok");
const yenimehsuldil = document.querySelector("#yenimehsuldil");

hamburger.addEventListener("click", () => {
  sidemenu.classList.toggle("active")
})

/* 
  MEHSULLAR
*/

function saveLocal() {
  for (let i = 0; i < kitablar.length; i ++) {
    kitablar[i].id = i.toString()
  }

  localStorage.setItem("kitablar", JSON.stringify(kitablar));
}

function tableYarat() {

  if (JSON.parse(localStorage.getItem("kitablar")) !== null) {
    kitablar = JSON.parse(localStorage.getItem("kitablar"))
  }
  
  let table_html = `
    <thead>
      <tr>
        <th>Id</th>
        <th>Ad</th>
        <th>Yazar</th>
        <th>Qiymət</th>
        <th>Stokdakı sayı</th>
        <th>Sil</th>
      </tr>
    </thead>
  `;
  
  for (let i = 0; i < kitablar.length; i++) {
  
    table_html += `
      <tr>
        <td>${kitablar[i].id}</td>
        <td>${kitablar[i].ad}</td>
        <td>${kitablar[i].yazici}</td>
        <td>${kitablar[i].qiymet} <i class="fa fa-manat-sign"></i></td>
        <td>${kitablar[i].stokdakiSayi}</td>
        <td><button class="kitabsilbtn"><i class="fa fa-trash" data-id="${kitablar[i].id}"></i></button></td>
      </tr> 
    `
  }
  
  mytablebody.innerHTML = table_html;

}

tableYarat()

mehsulelavebtn.addEventListener("click", () => {

  if ((yenimehsulad.value !== "") && (yenimehsulyazar.value !== "") && (yenimehsulqiymet.value !== "") && (yenimehsulstok.value !== "")) {
    kitablar.push({
      "ad": `${yenimehsulad.value}`,
      "yazici": `${yenimehsulyazar.value}`,
      "qiymet": `${yenimehsulqiymet.value}`,
      "src": "dummy.jpg",
      "dil": `${yenimehsuldil.value}`,
      "wished": false,
      "sebetdekiSayi": 0,
      "stokdakiSayi": `${yenimehsulstok.value}`,
      "id": kitablar.length.toString()
    }); 

    saveLocal();
    tableYarat()
    yenimehsulad.value = "";
    yenimehsulyazar.value = "";
    yenimehsulqiymet.value = "";
    yenimehsulstok.value = "";

  }

})

mytablebody.addEventListener("click", e => {


  if (e.target.classList.contains("fa-trash")) {
    let id = e.target.dataset.id;

    console.log(id);

    kitablar.splice(id, 1)
    saveLocal();
    tableYarat()
  }

})