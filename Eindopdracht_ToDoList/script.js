async function addListItemsToDom() {

    let allItemsFromList = await getCurrentToDoList();
    allItemsFromList.forEach(item => createListItem(item));
}

function createListItem(toDoItem) {

    const newListItem = document.createElement("li");

    const checkBox = createCheckbox(toDoItem._id);
    const listItemText = createTextNode(toDoItem.description);

    newListItem.appendChild(checkBox);
    newListItem.appendChild(listItemText);
    newListItem.appendChild(createDeleteImage(toDoItem._id));

    mainUl.appendChild(newListItem);

    if (toDoItem.done == true) {
        toggleCrossText(listItemText);
        checkBox.checked = true;
    }
}

function createCheckbox(itemID) {
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = itemID;
    checkbox.addEventListener('change', checkboxClick);
    return checkbox;
}

function checkboxClick(mouseEvent) {
    toggleCrossText(mouseEvent.target);
    const innerText = (mouseEvent.target.parentElement.innerText);
    itemIsDone(mouseEvent.target.id, innerText, mouseEvent.target.checked);
}

function toggleCrossText(item) {
    item.parentNode.classList.toggle('crossed');
}

function createTextNode(description) {
    const newTextNode = document.createTextNode(description);
    return newTextNode;
}

function createDeleteImage(itemID) {
    const newDeleteImage = document.createElement('img');
    newDeleteImage.src = 'deletebutton.png';
    newDeleteImage.classList.add('deleteimage');
    newDeleteImage.id = itemID;
    newDeleteImage.addEventListener('click', removeListItem);
    return newDeleteImage;
}

function removeListItem(mouseEvent) {
    const listItem = mouseEvent.target.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);

    let idOfItemClickedOn = mouseEvent.target.id;
    deleteItemFromToDoList(idOfItemClickedOn);
}

function addItem() {

    const inputValue = inputField.value;
    if (inputValue === '') {
        console.log('No entries were made');
    } else {
        postItemToToDoList(inputValue, createListItem);
    }
}

const inputField = document.getElementById("inputfield");
const submitItemToList = document.getElementById("additem");
const mainUl = document.getElementById('todolist');
submitItemToList.addEventListener('click', addItem);

addListItemsToDom();