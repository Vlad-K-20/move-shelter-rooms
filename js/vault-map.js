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
    const oldMapContainer = document.getElementById("vault-map-container");
    if (oldMapContainer !== null) {
        clearShelterMapContainer();
    }
    const mapContainer = document.createElement('div');
    mapContainer.id = 'vault-map-container';
    mapContainer.classList.add('vault-map-container');

    for (let r = 0; r <= VAULT_MAX_ROW; r++) {
        const mapRow = document.createElement('div');
        mapRow.classList.add('vault-map-row');
        mapRow.setAttribute('r', `${r}`);
        for (let c = 0; c <= VAULT_MAX_COL; c++) {
            const mapCol = document.createElement('div');
            mapCol.classList.add('vault-map-col');

            mapCol.setAttribute('r', `${r}`);
            mapCol.setAttribute('c', `${c}`);

            if (r === 0 && c in [0, 1, 2]) {
                mapCol.classList.add("disabled", "col-1");
            } else {
                const room = getInitialRoomByCoordinates(r, c);
                if (room !== null) {
                    const roomLength = getRoomLength(room);
                    if (roomLength > 1) {
                        mapCol.classList.add(`col-${roomLength}`);
                        c += roomLength - 1;
                    } else {
                        mapCol.classList.add("col-1");
                    }
                    mapCol.textContent = getRoomOnMapLabel(room);
                    const roomType = getRoomType(room);
                    if (roomType === vaultRoomsTypes.FAKE_WASTELAND) {
                        mapCol.classList.add("disabled");
                    } else if (roomType === vaultRoomsTypes.ENTRANCE) {
                        mapCol.classList.add("entrance");
                    } else {
                        if (roomType === vaultRoomsTypes.ELEVATOR) {
                            mapCol.classList.add("elevator");
                        } else {
                            mapCol.classList.add("room");
                        }
                    }
                } else {
                    if (coordinatesHaveRock(r, c)) {
                        mapCol.classList.add("rock", getRandomRock(), "col-2");
                        c += 1;
                    } else {
                        mapCol.classList.add("empty", "col-1");
                    }
                }
            }
            mapRow.appendChild(mapCol);
        }
        mapContainer.appendChild(mapRow);
    }

    document.getElementById("shelter-maps-container").appendChild(mapContainer);
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

function getRandomRock() {
    return `rock-${randomNumberInRange(1, 5)}`;
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
