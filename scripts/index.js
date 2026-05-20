const loadLesson =()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=> res.json())
    .then((json) => displayShow(json.data)
    )
}

const loadLevelWord=(id)=>{
const url = `https://openapi.programming-hero.com/api/level/${id}`
fetch(url)
.then(res=> res.json())
.then((data) => displayLevelWord(data.data))


}
const displayLevelWord=(words)=>{
const wordContainer = document.getElementById("word-container")
wordContainer.innerHTML = "";
words.forEach(word => {
     const divCreate = document.createElement("div")
     divCreate.innerHTML = `
           <div class="bg-white text-center rounded-xl  space-y-4 shadow-sm gap-6 py-10 px-5">
                <h2 class="font-bold">${word.word}</h2>
                <p>${word.meaning}</p>
                <div class="font-bold">${word.pronunciation}</div>
              <div class="mt-10 flex justify-between items-center">
                  <div class="p-2 rounded-xl bg-gray-200">
                  <i class="fa-solid fa-circle-info"></i>
                    
                  
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
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn border-2 hover:bg-blue-700 rounded-2xl border-blue-500 font-bold m-4   p-4">
        <img src="./assets/fa-book-open.png" alt=""> Lesson - ${lesson.level_no}
        </button>
        
        `;
        divWords.append(wordElement)
    }
}
loadLesson();