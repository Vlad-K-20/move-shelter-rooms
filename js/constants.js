const JSONConstants = Object.freeze({
    VAULT: "vault",
    VAULT_FIELDS: Object.freeze({
        ROCKS: "rocks",
        ROOMS: "rooms",
        ROCKS_FIELDS: Object.freeze({
            ROW: "r",
            COL: "c"
        }),
        ROOMS_FIELDS: Object.freeze({
            TYPE: "type",
            MERGE_LEVEL: "mergeLevel",
            ROW: "row",
            COL: "col",
            LEVEL: "level",
            ID: "deserializeID",
        }),
    }),
});

const vaultRoomsTypes = Object.freeze({
    ELEVATOR: "Elevator",
    ENTRANCE: "Entrance",
    FAKE_WASTELAND: "FakeWasteland",
    GEOTHERMAL: "Geothermal",
    CAFETERIA: "Cafeteria",
    MEDBAY: "MedBay",
    LIVING_QUARTERS: "LivingQuarters",
    WATER_PLANT: "WaterPlant",
    SCIENCE_LAB: "ScienceLab",
    OVERSEER: "Overseer",
    RADIO: "Radio",
    STORAGE: "Storage",
    WEAPON_FACTORY: "WeaponFactory",
    GYM: "Gym",
    DOJO: "Dojo",
    ARMORY: "Armory",
    OUTFIT_FACTORY: "OutfitFactory",
    SUPER_ROOM_2: "SuperRoom2",
    CLASSROOM: "Classroom",
});

const VAULT_MAX_ROW = 24;
const VAULT_MAX_COL = 25;

const VAULT_ROOMS_TYPE_TO_ON_MAP_LABEL = {
    [vaultRoomsTypes.ELEVATOR]: {
        1: "E"
    },
    [vaultRoomsTypes.ENTRANCE]: {
        1: "Vault Door",
        2: "Advanced Vault Door",
        3: "Fortified Vault Door",
    },
    [vaultRoomsTypes.GEOTHERMAL]: {
        1: "Power Generator",
        2: "Power Station",
        3: "Power Plant"
    },
    [vaultRoomsTypes.CAFETERIA]: {
        1: "Diner",
        2: "Restaurant",
        3: "Cafeteria"
    },
    [vaultRoomsTypes.MEDBAY]: {
        1: "MedBay",
        2: "Clinic",
        3: "Hospital"
    },
    [vaultRoomsTypes.LIVING_QUARTERS]: {
        1: "Living Room",
        2: "Residence",
        3: "Barracks"
    },
    [vaultRoomsTypes.WATER_PLANT]: {
        1: "Water Treatment",
        2: "Water Treatment Station",
        3: "Water Treatment Plant"
    },
    [vaultRoomsTypes.SCIENCE_LAB]: {
        1: "Science Lab",
        2: "Science Station",
        3: "Science Center"
    },
    [vaultRoomsTypes.OVERSEER]: {
        1: "Overseer's Office",
        2: "Overseer's Control Station",
        3: "Overseer's Command Center"
    },
    [vaultRoomsTypes.RADIO]: {
        1: "Radio Studio",
        2: "Radio Station",
        3: "Broadcast Center"
    },
    [vaultRoomsTypes.STORAGE]: {
        1: "Storage Room",
        2: "Depot",
        3: "Warehouse"
    },
    [vaultRoomsTypes.WEAPON_FACTORY]: {
        1: "Weapon Workshop",
        2: "Weapon Factory",
        3: "Weapon Plant"
    },
    [vaultRoomsTypes.GYM]: {
        1: "Weight Room",
        2: "Gym",
        3: "Strength Center"
    },
    [vaultRoomsTypes.DOJO]: {
        1: "Athletics Room",
        2: "Athletics Studio",
        3: "Athletics Center"
    },
    [vaultRoomsTypes.ARMORY]: {
        1: "Armory",
        2: "Weapons Station",
        3: "Weapons Center"
    },
    [vaultRoomsTypes.OUTFIT_FACTORY]: {
        1: "Outfit Workshop",
        2: "Outfit Factory",
        3: "Outfit Plant"
    },
    [vaultRoomsTypes.SUPER_ROOM_2]: {
        1: "Fitness Room",
        2: "Fitness Studio",
        3: "Fitness Center"
    },
    [vaultRoomsTypes.CLASSROOM]: {
        1: "Classroom",
        2: "School",
        3: "Academy"
    },
};
