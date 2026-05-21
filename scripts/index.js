const createElements = (arr)=>{
const htmlElements = arr.map((el)=> `<span class="btn">${el}</span>`)
return htmlElements.join(" ")
}


const loadLesson =()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=> res.json())
    .then((json) => displayShow(json.data)
    )
}

const manageSpiner=(status)=>{
if(status==true){
  document.getElementById("manage-spinner").classList.remove("hidden")
  document.getElementById("word-container").classList.add("hidden")
}
else{
  document.getElementById("word-container").classList.remove("hidden")
  document.getElementById("manage-spinner").classList.add("hidden")
}
}

const removeActive=()=>{
  const lessonBtn = document.querySelectorAll(".lesson-btn")
  console.log(lessonBtn);
  lessonBtn.forEach((btn)=>{
    btn.classList.remove("active")
  })
}

const loadLevelWord=(id)=>{
  manageSpiner(true)
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
  manageSpiner(false)
  return
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
                  <i onclick="loadWordDetail(${word.id})" class="fa-solid fa-circle-info"></i>
                    
                  
                </div>
                <div class="p-2 rounded-xl bg-gray-200">
                   <i class="fa-solid fa-volume-low"></i>
                </div>
              </div>

            </div>
     `;
     wordContainer.append(divCreate)
    
});
manageSpiner(false)
}


const loadWordDetail=async(id)=>{
  const url = `https://openapi.programming-hero.com/api/word/${id}`
  ;
  const res =await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data)
  
}

const displayWordDetails = (word)=>{
  const detailsBox = document.getElementById("details-container")
  detailsBox.innerHTML= `
  
    
          <div>
            <h2>${word.word}(<i class="fa-etch fa-solid fa-microphone"></i> :${word.meaning} )</h2>
            
          </div>
          <div>
            <h2>Meaning</h2>
            <p>${word.pronunciation}</p>
          </div>
           <div>
            <h2>Exmple</h2>
            <p> ${word.sentence}.</p>
          </div>
          <div>
            <h2>synonyms</h2>
            <p>${createElements(word.synonyms)}</p>
             
          </div>
          
  
  
  `
  document.getElementById("my_modal_5").showModal();
};


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