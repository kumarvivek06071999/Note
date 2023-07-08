const btnEl = document.getElementById("btn")
const contentContainerEl = document.getElementById("content-container")


getNotes().forEach((note)=>{
    const noteEl = createNoteWithoutAnimation(note.id, note.content);
    contentContainerEl.parentNode.insertBefore(noteEl, contentContainerEl.nextSibling)
})

function createNoteWithoutAnimation(id,content){
    const element = document.createElement('textarea')
    element.classList.add("content-box")
    // element.classList.add("cssanimation")
    // element.classList.add("elevateRight")
    element.placeholder = "Empty Note"
    element.value = content;

    element.addEventListener('dblclick', ()=>{
        const warning = confirm("Do You Want To Delete It?")
        if(warning){
            deleteNote(id,content)
        }
        
    })

    element.addEventListener('input',()=>{
        updateNote(id,element.value)
    })
    
    function deleteNote(){

    }

    function updateNote(){

    }
    const colors = ["rgba(254, 201, 113, 255)", "rgba(181, 147, 252, 255)","rgba(254, 155, 114, 255)",  "rgba(0, 212, 253, 255)", "rgba(228, 238, 144, 255)"]
    
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    element.style.backgroundColor = randomColor;

    console.log(id,content);
    return element;
}

function createNote(id,content) {
    const element = document.createElement('textarea')
    element.classList.add("content-box")
    element.classList.add("cssanimation")
    element.classList.add("elevateRight")
    element.placeholder = "Empty Note"
    element.value = content;

    element.addEventListener('dblclick', ()=>{
        const warning = confirm("Do You Want To Delete It?")
        if(warning){
            deleteNote(id,element)
        }

        
    })

    element.addEventListener("input",()=>{
        updateNote(id,element.value)
    })
    
    function deleteNote(id,element){
        const notes = getNotes().filter((note)=> note.id ==! id)
        console.log(notes);
        saveNote(notes)
        contentContainerEl.removeChild(element)
    }

    function updateNote(id,content){
        const notes = getNotes();
        const target = notes.filter(note=>note.id == id)[0]
        target.content = content;
        saveNote(notes);
        console.log(notes.filter(note=>note.id == id));
    }
    const colors = ["rgba(254, 201, 113, 255)", "rgba(181, 147, 252, 255)","rgba(254, 155, 114, 255)",  "rgba(0, 212, 253, 255)", "rgba(228, 238, 144, 255)"]
    
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    element.style.backgroundColor = randomColor;

    console.log(id,content);
    return element;
}

function addNote() {
    const notes = getNotes();

    const noteObj = {
        id: Math.floor(Math.random()*100000),
        content: "",
    }
    const notesEl = createNote(noteObj.id,noteObj.content)
    contentContainerEl.parentNode.insertBefore(notesEl, contentContainerEl.nextSibling)

    notes.push(noteObj)
    saveNote(notes)
    
}

function saveNote(notes){
    localStorage.setItem("note-app", JSON.stringify(notes))
}

function getNotes(){
    return JSON.parse(localStorage.getItem("note-app") || "[]")
}

btnEl.addEventListener("click", addNote)
