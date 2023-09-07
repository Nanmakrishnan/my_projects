const item = document.querySelector("#item");
const todobox = document.querySelector("#to-do-box");

// Load the to-do list items from localStorage when the page loads
window.addEventListener("load", () => {
  const storedItems = JSON.parse(localStorage.getItem("todos")) || [];
  storedItems.forEach((storedItem) => {
    addToDo(storedItem);
  });
});

// Save only non-completed to-do list items to localStorage before unloading the page
window.addEventListener("beforeunload", () => {
  const listItems = Array.from(todobox.children);
  const toDoItems = listItems
    .filter((item) => !item.classList.contains("done"))
    .map((item) => item.textContent.trim());
  localStorage.setItem("todos", JSON.stringify(toDoItems));
});

// Function to add a to-do item and update localStorage
const addToDoAndStore = (itemText) => {
  addToDo(itemText);
  const storedItems = JSON.parse(localStorage.getItem("todos")) || [];
  storedItems.push(itemText);
  localStorage.setItem("todos", JSON.stringify(storedItems));
};

item.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const inputValue = this.value.trim();
    if (inputValue !== "") {
      addToDoAndStore(inputValue); // Call the modified function
      this.value = "";
    }
  }
});

const addToDo = (itemText) => {
  const listitem = document.createElement("li");
  listitem.innerHTML = `
      ${itemText}
     <i class="fas fa-times"></i>   
    `;
  listitem.addEventListener(
    "click",
    function () {
      this.classList.toggle("done");
      updateStorage(); // Call the function to update localStorage
    }
  );
  listitem.querySelector("i").addEventListener(
    "click",
    function () {
      listitem.remove();
      updateStorage(); // Call the function to update localStorage
    }
  );
  todobox.appendChild(listitem);
};

function speakText(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}

// Add an event listener to the button for text-to-speech
const textToSpeechButton = document.querySelector("#textToSpeech");
textToSpeechButton.addEventListener("click", () => {
  const inputValue = item.value.trim();
  if (inputValue !== "") {
    speakText(inputValue);
  }
});

// Add a mousedown event listener to each list item
todobox.addEventListener("mousedown", (event) => {
  const listItem = event.target.closest("li");
  if (listItem && !listItem.classList.contains("done")) {
    const itemText = listItem.textContent.trim();
    const completedText = "Completed " + itemText; // Add "Completed" prefix
    speakText(completedText);
  }
});
