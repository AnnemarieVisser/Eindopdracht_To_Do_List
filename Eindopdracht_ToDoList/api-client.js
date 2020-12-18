const jsonbox = 'https://jsonbox.io/box_d091edbd082f7179829b/';

async function getCurrentToDoList() {

    try {
        let result = await fetch(jsonbox, {
            method: 'GET',
        });
        const response = await result.json();
        return response;
    }
    catch (error) {
        console.log(error);
    }
}

async function postItemToToDoList(inputFromField, callback) {

    const dataToPost = { description: inputFromField, done: false };
    try {
        let postResult = await fetch(jsonbox, {
            method: 'POST',
            body: JSON.stringify(dataToPost),
            headers: {
                "Content-Type": "application/json",
            },
        });
        let response = await postResult.json();
        callback(response);
    } catch (error) {
        console.log(error);
    }
}

async function deleteItemFromToDoList(idOfItemClickedOn) {

    try {
        let deleteItem = await fetch(jsonbox + idOfItemClickedOn, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        });
        let response = await deleteItem.json();
        return response;

    } catch (error) {
        console.log(error);
    }
}

async function itemIsDone(id, newDescription, isDone) {

    const dataToChange = { description: newDescription, done: isDone };
    try {
        let updateItem = await fetch(jsonbox + id, {
            method: 'PUT',
            body: JSON.stringify(dataToChange),
            headers: {
                "Content-Type": "application/json",
            },
        });
        let response = await updateItem.json();
        return response;

    } catch (error) {
        console.log(error);
    }
}