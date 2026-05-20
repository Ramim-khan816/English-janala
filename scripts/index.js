const loadLesson =()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=> res.json())
    .then((json) => displayShow(json.data)
    )
}


const removeActive=()=>{
  const lessonBtn = document.querySelectorAll(".lesson-btn")
  console.log(lessonBtn);
  lessonBtn.forEach((btn)=>{
    btn.classList.remove("active")
  })
}

const loadLevelWord=(id)=>{
const url = `https://openapi.programming-hero.com/api/level/${id}`
fetch(url)
.then(res=> res.json())
.then((data) => {
  const clickBtn = document.getElementById(`lesson-btn${id}`)
  clickBtn.classList.add("active")
  displayLevelWord(data.data)
})


}
const displayLevelWord=(words)=>{
const wordContainer = document.getElementById("word-container")
wordContainer.innerHTML = "";

if (words.length == 0){
  wordContainer.innerHTML = `
  <div class="col-span-full text-center space-y-4">

           <img class="mx-auto" src="./assets/alert-error.png" alt="">
         <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
         <h1 class="text-3xl font-semibold">নেক্সট Lesson এ যান।</h1>
       </div>
  
  `;
}


words.forEach(word => {
     const divCreate = document.createElement("div")
     divCreate.innerHTML = `
           <div class="bg-white text-center rounded-xl  space-y-4 shadow-sm gap-6 py-10 px-5">
                <h2 class="font-bold">${word.word}</h2>
                <p>Meaning/pronunciation</p>
                <div class="font-bold"> ${word.meaning ? word.meaning : "word missing"}/ ${word.pronunciation ? word.pronunciation:"pronunciation missing"}</div>
              <div class="mt-10 flex justify-between items-center">
                  <div class="p-2 rounded-xl bg-gray-200">
                  <i onclick="my_modal_5.showModal()" class="fa-solid fa-circle-info"></i>
                    
                  
                </div>
                <div class="p-2 rounded-xl bg-gray-200">
                   <i class="fa-solid fa-volume-low"></i>
                </div>
              </div>

            </div>
     `;
     wordContainer.append(divCreate)
    
});
}


const displayShow = (lessons)=>{
   const divWords = document.getElementById("wordss")
    for (let   lesson of  lessons) {
        const wordElement = document.createElement("div");
        wordElement.innerHTML = `
        <button id="lesson-btn${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn border-2 rounded-2xl border-blue-500 font-bold m-4 lesson-btn  p-4">
        <img src="./assets/fa-book-open.png" alt=""> Lesson - ${lesson.level_no}
        </button>
        
        `;
        divWords.append(wordElement)
    }
}
loadLesson();