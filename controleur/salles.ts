const addRoomButton : HTMLInputElement = document.querySelector("#add-room-button");
const cancelAddRoomButton : HTMLElement = document.querySelector("#cancel-add-room-button");
const addRoomForm : HTMLElement = document.querySelector("#add-room-form");
const confirmAddRoomButton : HTMLElement = document.querySelector("#confirm-add-room-button");
const roomsList : HTMLElement = document.querySelector("#rooms-list");
const roomsCountText : HTMLElement = document.querySelector("#rooms-count");
const removeRoomButton : HTMLInputElement = document.querySelector("#remove-room-button");

const roomNumberField : HTMLInputElement = document.querySelector("#room-number");
const videoprojectorField : HTMLInputElement = document.querySelector("#videoprojector");
const computerRoomField : HTMLInputElement = document.querySelector("#computer-room");
const computerNumberField : HTMLInputElement = document.querySelector("#computer-number");
const buildingLetterField : HTMLInputElement = document.querySelector("#building-letter");

const floorRadioGroundField : HTMLInputElement = document.querySelector("#ground");
const floorRadioFloor1Field : HTMLInputElement = document.querySelector("#floor-1");
const floorRadioFloor2Field : HTMLInputElement = document.querySelector("#floor-2");
const floorRadioFloor3Field : HTMLInputElement = document.querySelector("#floor-3");

let roomsCount = 0;
let selectedRoom = null;

const updateRoomsCountText = () => {
    roomsCountText.textContent = "" + roomsCount;
}

const resetForm = () => {
    roomNumberField.value = "";
    videoprojectorField.checked = false;
    computerRoomField.checked = false;
    computerNumberField.value = "1";
    computerNumberField.disabled = true;
    buildingLetterField.value = "a";
    floorRadioGroundField.checked = true;
};

const closeAddRoomForm = () => {
    addRoomForm.style.display = "none";
    addRoomButton.disabled = false;
}

const openAddRoomForm = () => {
    addRoomForm.style.display = "block";
    addRoomButton.disabled = true;
    resetForm();
}

const deselectRoom = () => {
    selectedRoom = null;
    removeRoomButton.disabled = true;
}

closeAddRoomForm();
updateRoomsCountText();
deselectRoom();

addRoomButton.addEventListener("click", openAddRoomForm);
cancelAddRoomButton.addEventListener("click", closeAddRoomForm);

computerRoomField.addEventListener("input", () => {
    computerNumberField.disabled = !computerRoomField.checked;
});

const getFloorStr = () => {
    if(floorRadioGroundField.checked) return "rez-de-chaussée";
    if(floorRadioFloor1Field.checked) return "1er étage";
    if(floorRadioFloor2Field.checked) return "2ème étage";
    if(floorRadioFloor3Field.checked) return "3ème étage";
}

const getBuildingLetterStr = () => {
    switch(buildingLetterField.value) {
        case "a": return "A";
        case "b": return "B";
        case "c": return "C";
        case "d": return "D";
        case "e": return "E";
        case "f": return "F";
    }
}

const getRoomStr = () => {
    let str = roomNumberField.value + ", bât " + getBuildingLetterStr()
        + ", " + getFloorStr();

    if(videoprojectorField.checked)
        str += ", avec vidéoprojecteur";

    if(computerRoomField.checked) {
        str += " - salle informatique : " + computerNumberField.value
            + " machine";

        if(parseInt(computerNumberField.value) > 1)
            str += "s";
    }


    return str;
}

confirmAddRoomButton.addEventListener("click", () => {
    if(roomNumberField.value == "") {
        alert("Le numéro de salle ne peut pas être vide.");
        return;
    }

    let roomNodeStr = getRoomStr();

    const roomNode = document.createElement("p");
    roomNode.textContent = getRoomStr();
    roomsList.appendChild(roomNode);

    roomsCount++;
    updateRoomsCountText();

    closeAddRoomForm();
});

removeRoomButton.addEventListener("click", () => {
    if(!window.confirm("Êtes-vous sûr de supprimer cette salle ?")) return;

    selectedRoom.remove();
    deselectRoom();

    roomsCount--;
    updateRoomsCountText();
});

document.body.addEventListener("click", event => {
    const rooms : HTMLCollection = roomsList.children;

    if(selectedRoom != null) {
        selectedRoom.style.backgroundColor = "";
        selectedRoom.style.color = "";
    }

    deselectRoom();

    for(let i = 0; i < rooms.length; i++) {
        const room : HTMLElement = <HTMLElement>rooms[i];

        if(event.target == room) {
            room.style.backgroundColor = "#000095";
            room.style.color = "white";

            selectedRoom = room;
            removeRoomButton.disabled = false;
        }
    }
})
