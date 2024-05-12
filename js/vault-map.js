let initialRoomsOrder = [];
let initialRooms = new Map();
let modifiedRooms = new Map();
let onHoldRooms = new Map();
let rocks = [];

function loadMapFromJson(json) {
    clearMapState();
    const jsonVault = json[JSONConstants.VAULT];
    if (jsonVault === undefined) {
        alertAndClose(`Invalid JSON format: '${JSONConstants.VAULT}' field is missing`);
        return false;
    }

    const jsonRocks = jsonVault[JSONConstants.VAULT_FIELDS.ROCKS];
    if (jsonRocks === undefined) {
        alertAndClose(`Invalid JSON format: '${JSONConstants.VAULT_FIELDS.ROCKS}' field is missing inside '${JSONConstants.VAULT}' field`);
    }

    const jsonRooms = jsonVault[JSONConstants.VAULT_FIELDS.ROOMS];
    if (jsonRooms === undefined) {
        alertAndClose(`Invalid JSON format: '${JSONConstants.VAULT_FIELDS.ROOMS}' field is missing inside '${JSONConstants.VAULT}' field`);
        return false;
    }

    for (const room of jsonRooms) {
        const roomId = room[JSONConstants.VAULT_FIELDS.ROOMS_FIELDS.ID];
        initialRoomsOrder.push(roomId);
        initialRooms.set(roomId, room);
    }
    for (const rock of jsonRocks) {
        rocks.push(rock);
    }
    return true;
}

function showVaultMap() {
    const oldMapTable = document.getElementById("vault-map-table");
    if (oldMapTable !== null) {
        clearShelterMapContainer();
    }
    const mapTable = document.createElement('table');
    mapTable.setAttribute('id', 'vault-map-table');

    for (let r = 0; r <= VAULT_MAX_ROW; r++) {
        const tableRow = document.createElement('tr');
        tableRow.setAttribute('r', `${r}`);
        for (let c = 0; c <= VAULT_MAX_COL; c++) {
            const tableCol = document.createElement('td');
            tableCol.setAttribute('r', `${r}`);
            tableCol.setAttribute('c', `${c}`);

            if (r in [0, 1] && c in [0, 1, 2]) {
                tableCol.classList.add("disabled");
            } else {
                const room = getInitialRoomByCoordinates(r, c);
                if (room !== null) {
                    const roomLength = getRoomLength(room);
                    if (roomLength > 1) {
                        tableCol.colSpan = roomLength
                        c += roomLength - 1;
                    }
                    tableCol.textContent = getRoomOnMapLabel(room);
                    const roomType = getRoomType(room);
                    if (roomType === vaultRoomsTypes.ELEVATOR) {
                        tableCol.classList.add("elevator");
                    } else if (roomType === vaultRoomsTypes.FAKE_WASTELAND) {
                        tableCol.classList.add("disabled");
                    } else {
                        tableCol.classList.add("room");
                    }
                } else {
                    if (coordinatesHaveRock(r, c)) {
                        tableCol.classList.add("rock");
                        tableCol.colSpan = 2;
                        c += 1;
                    } else {
                        tableCol.classList.add("empty");
                    }
                }
            }
            tableRow.appendChild(tableCol);
        }
        mapTable.appendChild(tableRow);
    }

    document.getElementById("shelter-maps-container").appendChild(mapTable);
}

function getInitialRoomByCoordinates(row, col) {
    for (const room of initialRooms.values()) {
        if (row === room[JSONConstants.VAULT_FIELDS.ROOMS_FIELDS.ROW] && col === room[JSONConstants.VAULT_FIELDS.ROOMS_FIELDS.COL]) {
            return room;
        }
    }
    return null;
}

function coordinatesHaveRock(row, col) {
    for (const rock of rocks) {
        if (row === rock[JSONConstants.VAULT_FIELDS.ROCKS_FIELDS.ROW] && col === rock[JSONConstants.VAULT_FIELDS.ROCKS_FIELDS.COL]) {
            return true;
        }
    }
    return false;
}

function clearMapState() {
    initialRoomsOrder = [];
    initialRooms = new Map();
    modifiedRooms = new Map();
    onHoldRooms = new Map();
    rocks = [];
    clearShelterMapContainer()
}

function clearShelterMapContainer() {
    clearElementChildren(document.getElementById("shelter-maps-container"));
}

function alertAndClose(message) {
    console.log("Alert: " + message);
    alert(message);
    clearMapState();
}

function getRoomType(room) {
    if (room !== undefined) {
        return room[JSONConstants.VAULT_FIELDS.ROOMS_FIELDS.TYPE];
    }
    return undefined;
}

function getRoomLength(room) {
    if (room === undefined) {
        return -1;
    }
    const merge = room[JSONConstants.VAULT_FIELDS.ROOMS_FIELDS.MERGE_LEVEL];
    if (merge === undefined) {
        return -1;
    }

    const roomType = getRoomType(room);
    if (roomType === "Elevator") {
        return 1;
    }
    return merge * 3;
}

function getRoomOnMapLabel(room) {
    if (room === undefined) {
        return "";
    }
    const roomType = getRoomType(room);
    const roomLevel = room[JSONConstants.VAULT_FIELDS.ROOMS_FIELDS.LEVEL];
    if (roomType === undefined && roomLevel === undefined) {
        return "undefined";
    } else if (roomType === undefined) {
        return `undefined (LVL ${roomLevel})`;
    } else if (roomLevel === undefined) {
        return `<${roomType}>`;
    }

    if (roomType === vaultRoomsTypes.FAKE_WASTELAND) {
        return "";
    }

    const roomNameLevels = VAULT_ROOMS_TYPE_TO_ON_MAP_LABEL[roomType];
    if (roomNameLevels === undefined) {
        return `<${roomType}> (LVL ${roomLevel})`;
    }

    const roomMapLabel = roomNameLevels[roomLevel];
    if (roomMapLabel === undefined) {
        return `<${roomType}> (LVL ${roomLevel})`;
    }

    if (roomType === vaultRoomsTypes.ELEVATOR) {
        return roomMapLabel;
    }
    return `${roomMapLabel} (LVL ${roomLevel})`;
}

// TODO: Temporary. Remove when done
window.onload = function() {
    loadMapFromJson(exampleSaveJson);
    showVaultMap();
};
