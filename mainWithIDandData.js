var LOGGER_TAG = "Equivalent Exchange";
var nativeGetLightLevel = ModAPI.requireGlobal("Level.getBrightness");
var valueButtonAllow = false;
var minimumHeight;
var breakException = {};
var handCheckerPS = false,
    valueBShowed = false;
var GUI1, GUI2, GUIEMC;
var PhStoneMobChangeButtonState = 0;
var screensize = {
    x: 0,
    y: 0
};
var localId;
var localData;
var localX;
var localY;
var EMCInSystem = 0;
var validItem = false;
var listSlotScale = 60;
var listSlotSpace = listSlotScale / 10;
var tTGuiOpened = false;
var tTSlotYSelected = false;
var activeItemCount = 1;
var maxActiveItemCount = 1;
var tTGuiFirstUpdate = false;
var addedValue = false;
var activeScreen = "null";
var lastCoords = {};
var partOfStar = "";
var starPlaced = 0;
var additionalEMC = 0;
var tTHeight = 0;
var allowedPSButtons=false;

importLib("ToolType", "*");

ToolAPI.registerBlockMaterial(BlockID.TransmutationTable, "dirt", 2);
ToolAPI.registerBlockMaterial(BlockID.energyCondenser, "stone", 2);
ToolAPI.registerBlockMaterial(BlockID.energyCollectorTier1, "dirt", 2);
ToolAPI.registerBlockMaterial(BlockID.energyCollectorTier2, "dirt", 2);
ToolAPI.registerBlockMaterial(BlockID.energyCollectorTier3, "dirt", 2);
ToolAPI.registerBlockMaterial(BlockID.antiMatterTier1, "stone", 2);
ToolAPI.registerBlockMaterial(BlockID.antiMatterTier2, "stone", 2);
ToolAPI.registerBlockMaterial(BlockID.antiMatterTier3, "stone", 2);
ToolAPI.registerBlockMaterial(BlockID.alchemicalChest, "stone", 2);
ToolAPI.registerBlockMaterial(BlockID.alchemicalCoalBlock, "stone", 2);
ToolAPI.registerBlockMaterial(BlockID.mobiusFuelBlock, "stone", 2);
ToolAPI.registerBlockMaterial(BlockID.aeternalisFuelBlock, "stone", 2);

IDRegistry.genItemID("einStar");
Item.createItem("einStar", "Star I", {
    name: "klein_star",
    meta: 1
}, {
    stack: 1
});
Translation.addTranslation("Star I", {
    ru: "Звезда I"
});

IDRegistry.genItemID("zweiStar");
Item.createItem("zweiStar", "Star II", {
    name: "klein_star",
    meta: 2
}, {
    stack: 1
});
Translation.addTranslation("Star II", {
    ru: "Звезда II"
});

IDRegistry.genItemID("dreiStar");
Item.createItem("dreiStar", "Star III", {
    name: "klein_star",
    meta: 3
}, {
    stack: 1
});
Translation.addTranslation("Star III", {
    ru: "Звезда III"
});

IDRegistry.genItemID("vierStar");
Item.createItem("vierStar", "Star IV", {
    name: "klein_star",
    meta: 4
}, {
    stack: 1
});
Translation.addTranslation("Star IV", {
    ru: "Звезда IV"
});

IDRegistry.genItemID("sphereStar");
Item.createItem("sphereStar", "Star Sphere", {
    name: "klein_star",
    meta: 5
}, {
    stack: 1
});
Translation.addTranslation("Star Sphere", {
    ru: "Звезда Сфера"
});

IDRegistry.genItemID("omegaStar");
Item.createItem("omegaStar", "Star Omega", {
    name: "klein_star",
    meta: 6
}, {
    stack: 1
});
Translation.addTranslation("Star Omega", {
    ru: "Звезда Омега"
});

Callback.addCallback("tick", function(){
	if(World.getThreadTime()%20==0&&kleinStarController.isStar(Player.getCarriedItem().id)){
		Game.tipMessage("\n\n"+Player.getCarriedItem().id);
    }
});

Callback.addCallback("tick", function() {
    if(World.getThreadTime()%20==0&&kleinStarController.isStar(Player.getCarriedItem().id)){
		Game.tipMessage("\n\n\n\n"+kleinStarController.getEMC(Player.getCarriedItem().data)+"/"+kleinStarController.getMax(Player.getCarriedItem().data));
    }
});

IDRegistry.genBlockID("alchemicalChest");
Block.createBlock("alchemicalChest", [{
    name: "Alchemical Chest",
    texture: [
        ["DMSide", 0],
        ["AlchemistChestTop", 0],
        ["AlchemistChestFront", 0],
        ["AlchemistChestSide", 0],
        ["AlchemistChestSide", 0],
        ["AlchemistChestSide", 0]
    ],
    inCreative: true
}]);
Translation.addTranslation("Alchemical Chest", {
    ru: "Алхимический сундук"
});

IDRegistry.genBlockID("alchemicalCoalBlock");
Block.createBlock("alchemicalCoalBlock", [{
    name: "Alchemical Coal Block",
    texture: [
        ["fuels", 0]
    ],
    inCreative: true
}]);
Translation.addTranslation("Alchemical Coal Block", {
    ru: "Блок алхимического угля"
});

IDRegistry.genBlockID("mobiusFuelBlock");
Block.createBlock("mobiusFuelBlock", [{
    name: "Mobius Fuel Block",
    texture: [
        ["fuels", 1]
    ],
    inCreative: true
}]);
Translation.addTranslation("Mobius Fuel Block", {
    ru: "Блок топлива Мобиуса"
});

IDRegistry.genBlockID("aeternalisFuelBlock");
Block.createBlock("aeternalisFuelBlock", [{
    name: "Aeternalis Fuel Block",
    texture: [
        ["fuels", 2]
    ],
    inCreative: true
}]);
Translation.addTranslation("Aeternalis Fuel Block", {
    ru: "Блок эфирного топлива"
});

var alchemicalChestUI = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: "Алхимический сундук"
            }
        },
        inventory: {
            standart: true
        },
        background: {
            standart: true
        }
    },
    drawing: [],
    elements: {
        slot1: {
            type: "slot",
            x: 350,
            y: 40,
            size: 50
        },
        slot2: {
            type: "slot",
            x: 400,
            y: 40,
            size: 50
        },
        slot3: {
            type: "slot",
            x: 450,
            y: 40,
            size: 50
        },
        slot4: {
            type: "slot",
            x: 500,
            y: 40,
            size: 50
        },
        slot5: {
            type: "slot",
            x: 550,
            y: 40,
            size: 50
        },
        slot6: {
            type: "slot",
            x: 600,
            y: 40,
            size: 50
        },
        slot7: {
            type: "slot",
            x: 650,
            y: 40,
            size: 50
        },
        slot8: {
            type: "slot",
            x: 700,
            y: 40,
            size: 50
        },
        slot9: {
            type: "slot",
            x: 750,
            y: 40,
            size: 50
        },
        slot10: {
            type: "slot",
            x: 800,
            y: 40,
            size: 50
        },
        slot11: {
            type: "slot",
            x: 850,
            y: 40,
            size: 50
        },
        slot12: {
            type: "slot",
            x: 900,
            y: 40,
            size: 50
        },
        slot13: {
            type: "slot",
            x: 350,
            y: 90,
            size: 50
        },
        slot14: {
            type: "slot",
            x: 400,
            y: 90,
            size: 50
        },
        slot15: {
            type: "slot",
            x: 450,
            y: 90,
            size: 50
        },
        slot16: {
            type: "slot",
            x: 500,
            y: 90,
            size: 50
        },
        slot17: {
            type: "slot",
            x: 550,
            y: 90,
            size: 50
        },
        slot18: {
            type: "slot",
            x: 600,
            y: 90,
            size: 50
        },
        slot19: {
            type: "slot",
            x: 650,
            y: 90,
            size: 50
        },
        slot20: {
            type: "slot",
            x: 700,
            y: 90,
            size: 50
        },
        slot21: {
            type: "slot",
            x: 750,
            y: 90,
            size: 50
        },
        slot22: {
            type: "slot",
            x: 800,
            y: 90,
            size: 50
        },
        slot23: {
            type: "slot",
            x: 850,
            y: 90,
            size: 50
        },
        slot24: {
            type: "slot",
            x: 900,
            y: 90,
            size: 50
        },
        slot25: {
            type: "slot",
            x: 350,
            y: 140,
            size: 50
        },
        slot26: {
            type: "slot",
            x: 400,
            y: 140,
            size: 50
        },
        slot27: {
            type: "slot",
            x: 450,
            y: 140,
            size: 50
        },
        slot28: {
            type: "slot",
            x: 500,
            y: 140,
            size: 50
        },
        slot29: {
            type: "slot",
            x: 550,
            y: 140,
            size: 50
        },
        slot30: {
            type: "slot",
            x: 600,
            y: 140,
            size: 50
        },
        slot31: {
            type: "slot",
            x: 650,
            y: 140,
            size: 50
        },
        slot32: {
            type: "slot",
            x: 700,
            y: 140,
            size: 50
        },
        slot33: {
            type: "slot",
            x: 750,
            y: 140,
            size: 50
        },
        slot34: {
            type: "slot",
            x: 800,
            y: 140,
            size: 50
        },
        slot35: {
            type: "slot",
            x: 850,
            y: 140,
            size: 50
        },
        slot36: {
            type: "slot",
            x: 900,
            y: 140,
            size: 50
        },
        slot37: {
            type: "slot",
            x: 350,
            y: 190,
            size: 50
        },
        slot38: {
            type: "slot",
            x: 400,
            y: 190,
            size: 50
        },
        slot39: {
            type: "slot",
            x: 450,
            y: 190,
            size: 50
        },
        slot40: {
            type: "slot",
            x: 500,
            y: 190,
            size: 50
        },
        slot41: {
            type: "slot",
            x: 550,
            y: 190,
            size: 50
        },
        slot42: {
            type: "slot",
            x: 600,
            y: 190,
            size: 50
        },
        slot43: {
            type: "slot",
            x: 650,
            y: 190,
            size: 50
        },
        slot44: {
            type: "slot",
            x: 700,
            y: 190,
            size: 50
        },
        slot45: {
            type: "slot",
            x: 750,
            y: 190,
            size: 50
        },
        slot46: {
            type: "slot",
            x: 800,
            y: 190,
            size: 50
        },
        slot47: {
            type: "slot",
            x: 850,
            y: 190,
            size: 50
        },
        slot48: {
            type: "slot",
            x: 900,
            y: 190,
            size: 50
        },
        slot49: {
            type: "slot",
            x: 350,
            y: 240,
            size: 50
        },
        slot50: {
            type: "slot",
            x: 400,
            y: 240,
            size: 50
        },
        slot51: {
            type: "slot",
            x: 450,
            y: 240,
            size: 50
        },
        slot52: {
            type: "slot",
            x: 500,
            y: 240,
            size: 50
        },
        slot53: {
            type: "slot",
            x: 550,
            y: 240,
            size: 50
        },
        slot54: {
            type: "slot",
            x: 600,
            y: 240,
            size: 50
        },
        slot55: {
            type: "slot",
            x: 650,
            y: 240,
            size: 50
        },
        slot56: {
            type: "slot",
            x: 700,
            y: 240,
            size: 50
        },
        slot57: {
            type: "slot",
            x: 750,
            y: 240,
            size: 50
        },
        slot58: {
            type: "slot",
            x: 800,
            y: 240,
            size: 50
        },
        slot59: {
            type: "slot",
            x: 850,
            y: 240,
            size: 50
        },
        slot60: {
            type: "slot",
            x: 900,
            y: 240,
            size: 50
        },
        slot61: {
            type: "slot",
            x: 350,
            y: 290,
            size: 50
        },
        slot62: {
            type: "slot",
            x: 400,
            y: 290,
            size: 50
        },
        slot63: {
            type: "slot",
            x: 450,
            y: 290,
            size: 50
        },
        slot64: {
            type: "slot",
            x: 500,
            y: 290,
            size: 50
        },
        slot65: {
            type: "slot",
            x: 550,
            y: 290,
            size: 50
        },
        slot66: {
            type: "slot",
            x: 600,
            y: 290,
            size: 50
        },
        slot67: {
            type: "slot",
            x: 650,
            y: 290,
            size: 50
        },
        slot68: {
            type: "slot",
            x: 700,
            y: 290,
            size: 50
        },
        slot69: {
            type: "slot",
            x: 750,
            y: 290,
            size: 50
        },
        slot70: {
            type: "slot",
            x: 800,
            y: 290,
            size: 50
        },
        slot71: {
            type: "slot",
            x: 850,
            y: 290,
            size: 50
        },
        slot72: {
            type: "slot",
            x: 900,
            y: 290,
            size: 50
        },
        slot73: {
            type: "slot",
            x: 350,
            y: 340,
            size: 50
        },
        slot74: {
            type: "slot",
            x: 400,
            y: 340,
            size: 50
        },
        slot75: {
            type: "slot",
            x: 450,
            y: 340,
            size: 50
        },
        slot76: {
            type: "slot",
            x: 500,
            y: 340,
            size: 50
        },
        slot77: {
            type: "slot",
            x: 550,
            y: 340,
            size: 50
        },
        slot78: {
            type: "slot",
            x: 600,
            y: 340,
            size: 50
        },
        slot79: {
            type: "slot",
            x: 650,
            y: 340,
            size: 50
        },
        slot80: {
            type: "slot",
            x: 700,
            y: 340,
            size: 50
        },
        slot81: {
            type: "slot",
            x: 750,
            y: 340,
            size: 50
        },
        slot82: {
            type: "slot",
            x: 800,
            y: 340,
            size: 50
        },
        slot83: {
            type: "slot",
            x: 850,
            y: 340,
            size: 50
        },
        slot84: {
            type: "slot",
            x: 900,
            y: 340,
            size: 50
        },
        slot85: {
            type: "slot",
            x: 350,
            y: 390,
            size: 50
        },
        slot86: {
            type: "slot",
            x: 400,
            y: 390,
            size: 50
        },
        slot87: {
            type: "slot",
            x: 450,
            y: 390,
            size: 50
        },
        slot88: {
            type: "slot",
            x: 500,
            y: 390,
            size: 50
        },
        slot89: {
            type: "slot",
            x: 550,
            y: 390,
            size: 50
        },
        slot90: {
            type: "slot",
            x: 600,
            y: 390,
            size: 50
        },
        slot91: {
            type: "slot",
            x: 650,
            y: 390,
            size: 50
        },
        slot92: {
            type: "slot",
            x: 700,
            y: 390,
            size: 50
        },
        slot93: {
            type: "slot",
            x: 750,
            y: 390,
            size: 50
        },
        slot94: {
            type: "slot",
            x: 800,
            y: 390,
            size: 50
        },
        slot95: {
            type: "slot",
            x: 850,
            y: 390,
            size: 50
        },
        slot96: {
            type: "slot",
            x: 900,
            y: 390,
            size: 50
        },
        slot97: {
            type: "slot",
            x: 350,
            y: 440,
            size: 50
        },
        slot98: {
            type: "slot",
            x: 400,
            y: 440,
            size: 50
        },
        slot99: {
            type: "slot",
            x: 450,
            y: 440,
            size: 50
        },
        slot100: {
            type: "slot",
            x: 500,
            y: 440,
            size: 50
        },
        slot101: {
            type: "slot",
            x: 550,
            y: 440,
            size: 50
        },
        slot102: {
            type: "slot",
            x: 600,
            y: 440,
            size: 50
        },
        slot103: {
            type: "slot",
            x: 650,
            y: 440,
            size: 50
        },
        slot104: {
            type: "slot",
            x: 700,
            y: 440,
            size: 50
        },
        slot105: {
            type: "slot",
            x: 750,
            y: 440,
            size: 50
        },
        slot106: {
            type: "slot",
            x: 800,
            y: 440,
            size: 50
        },
        slot107: {
            type: "slot",
            x: 850,
            y: 440,
            size: 50
        },
        slot108: {
            type: "slot",
            x: 900,
            y: 440,
            size: 50
        }
    }
});
TileEntity.registerPrototype(BlockID.alchemicalChest, {
    getGuiScreen: function() {
        return alchemicalChestUI;
    }
});

IDRegistry.genItemID("darkMatter");
Item.createItem("darkMatter", "Dark Matter", {
    name: "dark",
    meta: 0
}, {
    stack: 64
});
Translation.addTranslation("Dark Matter", {
    ru: "Темная материя"
});

IDRegistry.genItemID("redMatter");
Item.createItem("redMatter", "Red Matter", {
    name: "red",
    meta: 0
}, {
    stack: 64
});
Translation.addTranslation("Red Matter", {
    ru: "Красная материя"
});

IDRegistry.genItemID("lowCovalenceDust");
Item.createItem("lowCovalenceDust", "Low Covalence Dust", {
    name: "low",
    meta: 0
}, {
    stack: 64
});
Translation.addTranslation("Low Covalence Dust", {
    ru: "Слабая ковалентная пыль"
});

IDRegistry.genItemID("mediumCovalenceDust");
Item.createItem("mediumCovalenceDust", "Medium Covalence Dust", {
    name: "medium",
    meta: 0
}, {
    stack: 64
});
Translation.addTranslation("Medium Covalence Dust", {
    ru: "Средняя ковалентная пыль"
});

IDRegistry.genItemID("highCovalenceDust");
Item.createItem("highCovalenceDust", "High Covalence Dust", {
    name: "high",
    meta: 0
}, {
    stack: 64
});
Translation.addTranslation("High Covalence Dust", {
    ru: "Сильная ковалентная пыль"
});

IDRegistry.genItemID("aeternalisFuel");
Item.createItem("aeternalisFuel", "Aeternalis Fuel", {
    name: "aeternalis",
    meta: 0
}, {
    stack: 64
});
Translation.addTranslation("Aeternalis Fuel", {
    ru: "Эфирное топливо"
});

IDRegistry.genItemID("mobiusFuel");
Item.createItem("mobiusFuel", "Mobius Fuel", {
    name: "mobius",
    meta: 0
}, {
    stack: 64
});
Translation.addTranslation("Mobius Fuel", {
    ru: "Топливо Мобиуса"
});

IDRegistry.genItemID("alchemicalCoal");
Item.createItem("alchemicalCoal", "Alchemical Coal", {
    name: "alchemical_coal",
    meta: 0
}, {
    stack: 64
});
Translation.addTranslation("Alchemical Coal", {
    ru: "Алхимический уголь"
});

Callback.addCallback("LevelLoaded", function() {
    minimumHeight = UI.getScreenHeight() + EMCSystem.EMCForItems.length * (listSlotScale + listSlotSpace);
    screensize = ModAPI.requireGlobal("GuiUtils.GetDisplaySize()");
});

Callback.addCallback("PostLoaded", function() {
	kleinStarController.addStarId(ItemID.einStar);
	kleinStarController.addStarId(ItemID.zweiStar);
	kleinStarController.addStarId(ItemID.dreiStar);
	kleinStarController.addStarId(ItemID.vierStar);
	kleinStarController.addStarId(ItemID.sphereStar);
	kleinStarController.addStarId(ItemID.omegaStar);
    EMCSystem.addVanillaItemsToList();
    EMCSystem.addEEItemsToList();
    EMCSystem.addToCollector();
	tTHeight = UI.getScreenHeight() + EMCSystem.EMCForItems.length * (listSlotScale + listSlotSpace);
    Recipes.addShaped({
        id: ItemID.philosopherStone,
        count: 1,
        data: 0
    }, [
        "rgr",
        "gdg",
        "rgr"
    ], ['r', 331, 0, 'g', 348, 0, 'd', 264, 0]);

    Recipes.addShaped({
        id: BlockID.TransmutationTable,
        count: 1,
        data: 0
    }, [
        "oso",
        "sps",
        "oso"
    ], ['o', 49, 0, 's', 1, 0, 'p', ItemID.philosopherStone, 0]);

    Recipes.addShaped({
        id: BlockID.energyCondenser,
        count: 1,
        data: 0
    }, [
        "odo",
        "dad",
        "odo"
    ], ['o', 49, 0, 'a', BlockID.alchemicalChest, 0, 'd', 264, 0]);

    Recipes.addShaped({
        id: BlockID.alchemicalChest,
        count: 1,
        data: 0
    }, [
        "lmh",
        "sds",
        "ici"
    ], ['s', 1, 0, 'l', ItemID.lowCovalenceDust, 0, 'm', ItemID.mediumCovalenceDust, 0, 'h', ItemID.highCovalenceDust, 0, 'd', 264, 0, 'i', 265, 0, 'c', 54, 0]);

    Recipes.addShaped({
        id: BlockID.energyCollectorTier1,
        count: 1,
        data: 0
    }, [
        "gbg",
        "gdg",
        "gfg"
    ], ['g', 89, 0, 'b', 20, 0, 'd', 57, 0, 'f', 61, 0]);

    Recipes.addShaped({
        id: BlockID.energyCollectorTier2,
        count: 1,
        data: 0
    }, [
        "gdg",
        "gfg",
        "ggg"
    ], ['g', 89, 0, 'd', ItemID.darkMatter, 0, 'f', BlockID.energyCollectorTier1, 0]);

    Recipes.addShaped({
        id: BlockID.energyCollectorTier3,
        count: 1,
        data: 0
    }, [
        "grg",
        "gsg",
        "ggg"
    ], ['g', 89, 0, 'r', ItemID.redMatter, 0, 's', BlockID.energyCollectorTier2, 0]);

    Recipes.addShaped({
        id: BlockID.antiMatterTier1,
        count: 1,
        data: 0
    }, [
        "gbg",
        "gdg",
        "ggg"
    ], ['g', 49, 0, 'b', 20, 0, 'd', 57, 0]);

    Recipes.addShaped({
        id: BlockID.antiMatterTier2,
        count: 1,
        data: 0
    }, [
        "gbg",
        "gdg",
        "ggg"
    ], ['g', 49, 0, 'b', ItemID.darkMatter, 0, 'd', BlockID.antiMatterTier1, 0]);

    Recipes.addShaped({
        id: BlockID.antiMatterTier3,
        count: 1,
        data: 0
    }, [
        "grg",
        "gsg",
        "ggg"
    ], ['g', 49, 0, 'r', ItemID.redMatter, 0, 's', BlockID.antiMatterTier2, 0]);

    Recipes.addShaped({
        id: ItemID.lowCovalenceDust,
        count: 40,
        data: 0
    }, [
        "ccc",
        "ccc",
        "cch"
    ], ['c', 4, 0, 'h', 263, 1]);

    Recipes.addShapeless({
        id: ItemID.mediumCovalenceDust,
        count: 40,
        data: 0
    }, [{
        id: 265,
        data: 0
    }, {
        id: 331,
        data: 0
    }]);
    Recipes.addShapeless({
        id: ItemID.highCovalenceDust,
        count: 40,
        data: 0
    }, [{
        id: 263,
        data: 0
    }, {
        id: 264,
        data: 0
    }]);

    Recipes.addShaped({
        id: ItemID.redMatter,
        count: 1,
        data: 0
    }, [
        "aaa",
        "ddd",
        "aaa"
    ], ['a', ItemID.aeternalisFuel, 0, 'd', ItemID.darkMatter, 0]);

    Recipes.addShaped({
        id: ItemID.darkMatter,
        count: 1,
        data: 0
    }, [
        "aaa",
        "ada",
        "aaa"
    ], ['a', ItemID.aeternalisFuel, 0, 'd', 264, 0]);

    Recipes.addShaped({
        id: ItemID.aeternalisFuel,
        count: 1,
        data: 0
    }, [
        "pm ",
        "mm ",
        "m  "
    ], ['p', ItemID.philosopherStone, 0, 'm', ItemID.mobiusFuel, 0]);

    Recipes.addShaped({
        id: ItemID.mobiusFuel,
        count: 1,
        data: 0
    }, [
        "pa ",
        "aa ",
        "a  "
    ], ['p', ItemID.philosopherStone, 0, 'a', ItemID.alchemicalCoal, 0]);

    Recipes.addShaped({
        id: ItemID.alchemicalCoal,
        count: 1,
        data: 0
    }, [
        "pc ",
        "cc ",
        "c  "
    ], ['p', ItemID.philosopherStone, 0, 'c', 263, 0]);

    Recipes.addShaped({
        id: BlockID.alchemicalCoalBlock,
        count: 1,
        data: 0
    }, [
        "aaa",
        "aaa",
        "aaa"
    ], ['a', ItemID.alchemicalCoal, 0]);

    Recipes.addShaped({
        id: BlockID.mobiusFuelBlock,
        count: 1,
        data: 0
    }, [
        "aaa",
        "aaa",
        "aaa"
    ], ['a', ItemID.mobiusFuel, 0]);

    Recipes.addShaped({
        id: BlockID.aeternalisFuelBlock,
        count: 1,
        data: 0
    }, [
        "aaa",
        "aaa",
        "aaa"
    ], ['a', ItemID.aeternalisFuel, 0]);

    Recipes.addShaped({
        id: ItemID.einStar,
        count: 1,
        data: 0
    }, [
        "aaa",
        "ada",
        "aaa"
    ], ['a', ItemID.mobiusFuel, 0, 'd', 264, 0], kleinStarZeroDataCraft);
	
	Recipes.addShaped({
        id: 263,
        count: 1,
        data: 1
    }, [
        "pc ",
        "cc ",
        "c  "
    ], ['c', 263, 1, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: 263,
        count: 4,
        data: 1
    }, [
        "pc ",
        "   ",
        "   "
    ], ['c', 263, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: 266,
        count: 1,
        data: 0
    }, [
        "pii",
        "iii",
        "iii"
    ], ['i', 265, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: 265,
        count: 8,
        data: 0
    }, [
        "pg ",
        "   ",
        "   "
    ], ['g', 266, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: 264,
        count: 1,
        data: 0
    }, [
        "pg ",
        "gg",
        "g  "
    ], ['g', 266, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: 266,
        count: 4,
        data: 0
    }, [
        "pd ",
        "   ",
        "   "
    ], ['d', 264, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: ItemID.alchemicalCoal,
        count: 1,
        data: 0
    }, [
        "pc ",
        "cc ",
        "c  "
    ], ['c', 263, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: 263,
        count: 4,
        data: 0
    }, [
        "pc ",
        "   ",
        "   "
    ], ['c', ItemID.alchemicalCoal, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: ItemID.mobiusFuel,
        count: 1,
        data: 0
    }, [
        "pc ",
        "cc ",
        "c  "
    ], ['c', ItemID.alchemicalCoal, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: ItemID.alchemicalCoal,
        count: 1,
        data: 0
    }, [
        "pc ",
        "   ",
        "   "
    ], ['c', ItemID.mobiusFuel, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: ItemID.aeternalisFuel,
        count: 1,
        data: 0
    }, [
        "pc ",
        "cc ",
        "c  "
    ], ['c', ItemID.mobiusFuel, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: ItemID.mobiusFuel,
        count: 1,
        data: 0
    }, [
        "pc ",
        "   ",
        "   "
    ], ['c', ItemID.aeternalisFuel, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: ItemID.zweiStar,
        count: 1,
        data: 0
    }, [
        "ss ",
        "ss ",
        "   "
    ], ['s', ItemID.einStar, -1], kleinStarEnergyCraft);
	
	Recipes.addShaped({
        id: ItemID.dreiStar,
        count: 1,
        data: 0
    }, [
        "ss ",
        "ss ",
        "   "
    ], ['s', ItemID.zweiStar, -1], kleinStarEnergyCraft);
	
	Recipes.addShaped({
        id: ItemID.vierStar,
        count: 1,
        data: 0
    }, [
        "ss ",
        "ss ",
        "   "
    ], ['s', ItemID.dreiStar, -1], kleinStarEnergyCraft);
	
	Recipes.addShaped({
        id: ItemID.sphereStar,
        count: 1,
        data: 0
    }, [
        "ss ",
        "ss ",
        "   "
    ], ['s', ItemID.vierStar, -1], kleinStarEnergyCraft);
	
	Recipes.addShaped({
        id: ItemID.omegaStar,
        count: 1,
        data: 0
    }, [
        "ss ",
        "ss ",
        "   "
    ], ['s', ItemID.sphereStar, -1], kleinStarEnergyCraft);

});

IDRegistry.genItemID("philosopherStone");
Item.createItem("philosopherStone", "Philosopher's Stone", {
    name: "PhilosopherStone",
    meta: 0
}, {
    stack: 1
});
Translation.addTranslation("Alchemical Coal", {
    ru: "Философский камень"
});

Item.registerUseFunction("philosopherStone", function(coords, item, block) {
    if (Entity.getSneaking(Player.get())) {
        switch (block.id) {
            case 1:
                World.destroyBlock(coords.x, coords.y, coords.z, false);
                World.setBlock(coords.x, coords.y, coords.z, 2, 0);
                break;

            case 4:
                World.destroyBlock(coords.x, coords.y, coords.z, false);
                World.setBlock(coords.x, coords.y, coords.z, 2, 0);
                break;

            case 2:
                World.destroyBlock(coords.x, coords.y, coords.z, false);
                World.setBlock(coords.x, coords.y, coords.z, 4, 0);
                break;

            case 12:
				World.destroyBlock(coords.x, coords.y, coords.z, false);
				World.setBlock(coords.x, coords.y, coords.z, 4, 0);
                break;

            case 24:
                if (block.data == 0) {
                    World.destroyBlock(coords.x, coords.y, coords.z, false);
                    World.setBlock(coords.x, coords.y, coords.z, 13, 0);
                }
                break;
        }
    } else {
        switch (block.id) {
            case 1:
                World.destroyBlock(coords.x, coords.y, coords.z, false);
                World.setBlock(coords.x, coords.y, coords.z, 4, 0);
                break;
				
            case 2:
                World.destroyBlock(coords.x, coords.y, coords.z, false);
                World.setBlock(coords.x, coords.y, coords.z, 12, 0);
                break;
				
			case 31:
				if(block.data==1){
					World.destroyBlock(coords.x, coords.y, coords.z, false);
					World.setBlock(coords.x, coords.y, coords.z, 32, 0);
				}
				break;

            case 87:
                World.destroyBlock(coords.x, coords.y, coords.z, false);
                World.setBlock(coords.x, coords.y, coords.z, 4, 0);
                break;
				
            case 13:
                World.destroyBlock(coords.x, coords.y, coords.z, false);
                World.setBlock(coords.x, coords.y, coords.z, 24, 0);
                break;

            case 103:
				World.destroyBlock(coords.x, coords.y, coords.z, false);
				World.setBlock(coords.x, coords.y, coords.z, 91, 0);
                break;
				
			case 8:
				World.destroyBlock(coords.x, coords.y, coords.z, false);
				World.setBlock(coords.x, coords.y, coords.z, 79, 0);
                break;
				
			case 10:
				World.destroyBlock(coords.x, coords.y, coords.z, false);
				World.setBlock(coords.x, coords.y, coords.z, 49, 0);
                break;
				
			case 17:
				if(block.data==0){
					World.destroyBlock(coords.x, coords.y, coords.z, false);
					World.setBlock(coords.x, coords.y, coords.z, 17, 1);
				} else if (block.data==1){
					World.destroyBlock(coords.x, coords.y, coords.z, false);
					World.setBlock(coords.x, coords.y, coords.z, 17, 2);
				}
                break;
				
			case 37:
				World.destroyBlock(coords.x, coords.y, coords.z, false);
				World.setBlock(coords.x, coords.y, coords.z, 38, 0);
                break;
			
			case 39:
				World.destroyBlock(coords.x, coords.y, coords.z, false);
				World.setBlock(coords.x, coords.y, coords.z, 40, 0);
                break;
				
			case 20:
				World.destroyBlock(coords.x, coords.y, coords.z, false);
				World.setBlock(coords.x, coords.y, coords.z, 12, 0);
                break;

        }
    }
});

Callback.addCallback("EntityHurt", function(who, whom, damage) {
    if(who == Player.get() && Player.getCarriedItem().id==ItemID.philosopherStone){
		var newID=getNewID(whom);
		if(newID==0)newID=Entity.getType(whom);
		var coords = Entity.getPosition(whom);
		Game.message(newID);
		Entity.spawn(Entity.getPosition(whom).x, Entity.getPosition(whom).y, Entity.getPosition(whom).z, newID);
		Entity.remove(whom);
		Game.prevent();
	}
});

function phStoneButtons(type) {
    if (type == 1) {
        var ctx = UI.getMcContext();
        UI.run(function() {
            var layout = new android.widget.LinearLayout(ctx);
            layout.setOrientation(1);
            var directory = new android.graphics.Bitmap.createScaledBitmap(new android.graphics.BitmapFactory.decodeFile("/sdcard/windows/BstSharedFolder/EEPE/gui/buttonCraft.png"), screensize[0] / 20, screensize[0] / 20, true);
            var img = new android.graphics.drawable.BitmapDrawable(directory);
            var image = new android.widget.ImageView(ctx);
            image.setImageBitmap(directory);
            image.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg) {
                    Game.message("Open table");
                    ModAPI.requireGlobal("WorkbenchPocketStyle.openUI()");
                }
            }));
            layout.addView(image);
            GUI1 = new android.widget.PopupWindow(layout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
            GUI1.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.RED));
            GUI1.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 0);

            /*var layout2 = new android.widget.LinearLayout(ctx);
            layout2.setOrientation(1);
            var directory2 = PhStoneMobChangeButtonState == 0 ? new android.graphics.Bitmap.createScaledBitmap(new android.graphics.BitmapFactory.decodeFile("/sdcard/windows/BstSharedFolder/EEPE/gui/buttonMobChangeOff.png"), screensize[0] / 20, screensize[0] / 20, true) : new android.graphics.Bitmap.createScaledBitmap(new android.graphics.BitmapFactory.decodeFile("/sdcard/windows/BstSharedFolder/EEPE/gui/buttonMobChangeOn.png"), screensize[0] / 20, screensize[0] / 20, true);
            var img2 = new android.graphics.drawable.BitmapDrawable(directory);
            var image2 = new android.widget.ImageView(ctx);
            image2.setImageBitmap(directory2);
            image2.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg) {
                    Game.message("Looking for mob");
					var mob = Player.getPointed().entity;
					Game.message(mob);
					if(mob){
						var newID=isHostile(mob);
						var coords = Entity.getPosition(mob);
						Game.message(JSON.stringify(coords));
					}
					//for(n in Player.getPointed().entity)Game.message(n);
					
					Game.message(mob);
                    if(mob!=null){
						var newID=isHostile(mob);
						var coords = Entity.getPosition(mob);
						Game.message(newID);
						Entity.spawn(coords.x, coords.y, coords.z, newID);
						Entity.remove(mob);
					}
                }
            }));
            layout2.addView(image2);
            GUI2 = new android.widget.PopupWindow(layout2, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
            GUI2.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.RED));
            GUI2.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, screensize[0] / 20);*/
        });
    } else {
        UI.run(function() {
            if (GUI1 != null) {
                GUI1.dismiss();
                GUI1 = null;
            }
            /*if (GUI2 != null) {
                GUI2.dismiss();
                GUI2 = null;
            }*/
        });
    }
}

function getNewID(mob){
	mob=Entity.getType(mob); 
	var hostile = [];
	var nonHostile =[]
	for(i=10; i<26; i++)nonHostile.push(i);
	nonHostile.push(28);
	hostile.push(26);
	hostile.push(27);
	for(i=32; i<52; i++)hostile.push(i);
	hostile.push(54);
	if(hostile.indexOf(mob)!=-1){
		return hostile[Math.floor(Math.random() * (hostile.length - 0 + 1)) + 0];
	}
	if(nonHostile.indexOf(mob)!=-1){
		return nonHostile[Math.floor(Math.random() * (nonHostile.length - 0 + 1)) + 0];
	}
	return 10;
}

Callback.addCallback("tick", function() {
    if (Player.getCarriedItem().id == ItemID.philosopherStone && !handCheckerPS && allowedPSButtons) {
        //Game.message("Open GUI");
        phStoneButtons(1);
        handCheckerPS = true;
    } else if (handCheckerPS || !allowedPSButtons) {
        //Game.message("Close GUI");
        phStoneButtons(2);
        handCheckerPS = false;
    }
});

Callback.addCallback("NativeGuiChanged", function(screenName) {
	var inventories=["ender_chest_screen", "dispenser_screen", "dropper_screen", "small_chest_screen", "hopper_screen", "furnace_screen", "large_chest_screen"];
	//Game.dialogMessage(screenName);
	if(inventories.indexOf(screenName)!=-1){
		invValueButton(1);
	} else {
		invValueButton(2);
	}
	allowedPSButtons=false;
    if (screenName == "hud_screen" || screenName == "in_game_play_screen") {
		allowedPSButtons=true;
    }
});

Callback.addCallback("tick", function() {
    if (World.getThreadTime() % 10 == 0) {
        if (lastCoords.x != undefined) {
            if (World.getTileEntity(lastCoords.x, lastCoords.y, lastCoords.z) == undefined || World.getTileEntity(lastCoords.x, lastCoords.y, lastCoords.z).container == undefined || !World.getTileEntity(lastCoords.x, lastCoords.y, lastCoords.z).container.isOpened()) {
				if(allowedPSButtons)allowedPSButtons=false;
                invValueButton(2);
            } else {
				allowedPSButtons=true;
			}
        } 
    }
});

function invValueButton(type) {
    if (type == 1) {
        var ctx = UI.getMcContext();
        //Game.message(screensize[0] + ":" + screensize[1]);
        UI.run(function() {
            if (GUIEMC != null) {
                GUIEMC.dismiss();
                GUIEMC = null;
            }
            var layout = new android.widget.LinearLayout(ctx);
            layout.setOrientation(1);
            var directory = new android.graphics.Bitmap.createScaledBitmap(new android.graphics.BitmapFactory.decodeFile("/sdcard/windows/BstSharedFolder/EEPE/gui/buttonValueOff.png"), screensize[0] / 18, screensize[0] / 18, true);
            var img = new android.graphics.drawable.BitmapDrawable(directory);
            var image = new android.widget.ImageView(ctx);
            image.setImageBitmap(directory);
            image.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg) {
                    inventoryToEMC();
                }
            }));
            layout.addView(image);
            GUIEMC = new android.widget.PopupWindow(layout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
            GUIEMC.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.RED));
            GUIEMC.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);

        });
    } else {
        UI.run(function() {
            if (GUIEMC != null) {
                GUIEMC.dismiss();
                GUIEMC = null;
            }
        });
    }
}

Callback.addCallback("ItemUse", function(coords, item, block) {
    if (World.getTileEntity(coords.x, coords.y, coords.z)) {
        lastCoords.x = coords.x;
        lastCoords.y = coords.y;
        lastCoords.z = coords.z;
        invValueButton(1);
    }
	if(block.id==BlockID.TransmutationTable)updateAvailableItems(World.getTileEntity(coords.x, coords.y, coords.z).container);
});

var emcValuesContainer = {
    standart: {
        header: {
            text: {
                text: "Ваш инвентарь"
            }
        },
        background: {
            standart: true
        }
    },
    drawing: [

    ],
    elements: {}
};
var emcValuesWindow = new UI.StandartWindow(emcValuesContainer);

function inventoryToEMC() {
	var readedIds=[];
	var readedItems=[];
    var openedUI = new UI.Container();
    var nameX = 50;
    var slotX = 250;
    var valueX = 400;
    var mainY = 50;
    var spaceY = 80;
    var slotsAdded = 0;
    emcValuesContainer.elements = {};
    var getSlotId = ModAPI.requireGlobal("Player.getInventorySlot");
    var getSlotCount = ModAPI.requireGlobal("Player.getInventorySlotCount");
    var getSlotData = ModAPI.requireGlobal("Player.getInventorySlotData");
    for (i = 9; i < 45; i++) {
        if (getSlotId(i) != 0 && readedItems.indexOf(getSlotId(i)+":"+getSlotData(i))==-1 && !kleinStarController.isStar(getSlotId(i))) {
            emcValuesContainer.elements["slot" + i] = {
                type: "slot",
                x: slotX,
                y: mainY + 4,
                size: listSlotScale,
                visual: true
            };
            emcValuesContainer.elements["name" + i] = {
                type: "text",
                x: nameX,
                y: mainY,
                text: "Предмет:  " + Item.getName(getSlotId(i), 0, getSlotData(i))
            };
            emcValuesContainer.elements["value" + i] = {
                type: "text",
                x: valueX,
                y: mainY + 35,
                text: getEMC(getSlotId(i), getSlotData(i)) == -1 ? "Не зарегистрирован" : "Ценность: " + getEMC(getSlotId(i), getSlotData(i))
            };
            mainY += spaceY;
			readedItems.push(getSlotId(i)+":"+getSlotData(i));
        } else if(kleinStarController.isStar(getSlotId(i))){
			 emcValuesContainer.elements["slot" + i] = {
                type: "slot",
                x: slotX,
                y: mainY + 4,
                size: listSlotScale,
                visual: true
            };
			emcValuesContainer.elements["name" + i] = {
                type: "text",
                x: nameX,
                y: mainY,
                text: "Предмет:  " + Item.getName(getSlotId(i), 0, getSlotData(i))
            };
			emcValuesContainer.elements["value" + i] = {
                type: "text",
                x: valueX,
                y: mainY + 35,
				text: "Содержит "+kleinStarController.getEMC(tileContainer.getSlot(slot).data)+" EMC"
			};
			mainY += spaceY;
			readedItems.push(tileContainer.getSlot(slot).id+":"+tileContainer.getSlot(slot).data);
		}
    }
	var tileEntity = World.getTileEntity(lastCoords.x, lastCoords.y, lastCoords.z);
	var tileSlots=[];
	var tileContainer = tileEntity.container;
	var tileElements = tileContainer.getGuiContent().elements;
	/*var b = new java.lang.StringBuilder(;
	for(n in tileContainer)b.append(n).append(", ");
	Game.dialogMessage(b.toString());*/
	for(element in tileElements){
		if(tileElements[element].type=="slot")tileSlots.push(element);
	}
	tileSlots.forEach(function(slot, i, arr) {
								if(tileContainer.getSlot(slot).id!=0 && readedItems.indexOf(tileContainer.getSlot(slot).id+":"+tileContainer.getSlot(slot).data)==-1 && !kleinStarController.isStar(tileContainer.getSlot(slot).id)){
									emcValuesContainer.elements["slotC" + slot] = {
										type: "slot",
										x: slotX,
										y: mainY + 4,
										size: listSlotScale,
										visual: true
									};
									emcValuesContainer.elements["nameC" + slot] = {
										type: "text",
										x: nameX,
										y: mainY,
										text: "Предмет:  " + Item.getName(tileContainer.getSlot(slot).id, 0, (tileContainer.getSlot(slot).data))
									};
									emcValuesContainer.elements["valueC" + slot] = {
										type: "text",
										x: valueX,
										y: mainY + 35,
										text: getEMC(tileContainer.getSlot(slot).id, tileContainer.getSlot(slot).data) == -1 ? "Не зарегистрирован" : "Ценность: " + getEMC(tileContainer.getSlot(slot).id, tileContainer.getSlot(slot).data)
									};
									mainY += spaceY;
									readedItems.push(tileContainer.getSlot(slot).id+":"+tileContainer.getSlot(slot).data);
								} else if(kleinStarController.isStar(tileContainer.getSlot(slot).id)){
									emcValuesContainer.elements["slotC" + slot] = {
										type: "slot",
										x: slotX,
										y: mainY + 4,
										size: listSlotScale,
										visual: true
									};
									emcValuesContainer.elements["nameC" + slot] = {
										type: "text",
										x: nameX,
										y: mainY,
										text: "Предмет:  " + Item.getName(tileContainer.getSlot(slot).id, 0, (tileContainer.getSlot(slot).data))
									};
									emcValuesContainer.elements["valueC" + slot] = {
										type: "text",
										x: valueX,
										y: mainY + 35,
										text: "Содержит "+kleinStarController.getEMC(tileContainer.getSlot(slot).data)+" EMC"
									};
									mainY += spaceY;
									readedItems.push(tileContainer.getSlot(slot).id+":"+tileContainer.getSlot(slot).data);
								}
							});
	
	
    emcValuesContainer.standart.minHeight = mainY + 15;
    openedUI.openAs(emcValuesWindow);
    for (i = 9; i < 45; i++) {
        if (getSlotId(i) != 0) {
            openedUI.getSlot("slot" + i).id = getSlotId(i);
            openedUI.getSlot("slot" + i).data = getSlotData(i);
            openedUI.getSlot("slot" + i).count = 0
        }
        mainY += spaceY;
    }
	
	tileSlots.forEach(function(slot, i, arr) {
								if(tileContainer.getSlot(slot).id!=0){
									openedUI.getSlot("slotC" + slot).id = tileContainer.getSlot(slot).id;
									openedUI.getSlot("slotC" + slot).data = tileContainer.getSlot(slot).data;
									openedUI.getSlot("slotC" + slot).count = 0
								}
							});
							
	
	
}

IDRegistry.genBlockID("TransmutationTable");
Block.createBlock("TransmutationTable", [{
    name: "Transmutation Table",
    texture: [
        ["TransmutationTableBottom", 0],
        ["TransmutationTableTop", 0],
        ["TransmutationTableSide", 0],
        ["TransmutationTableSide", 0],
        ["TransmutationTableSide", 0],
        ["TransmutationTableSide", 0]
    ],
    inCreative: true
}]);
Block.setBlockShape(BlockID.TransmutationTable, {
    x: 0,
    y: 0,
    z: 0
}, {
    x: 1,
    y: 0.3,
    z: 1
});
Translation.addTranslation("Transmutation Table", {
    ru: "Стол трансмутаций"
});

var TransmutationTableUI = new UI.StandartWindow();
TransmutationTableUI.setContent({
    standart: {
        header: {
            text: {
                text: "Стол трансмутаций"
            },
            color: android.graphics.Color.rgb(0x47, 0x26, 0x0c)
        },
        inventory: {
            standart: true
        },
        background: {
            color: android.graphics.Color.rgb(0x198, 0x198, 0x198)
        },
        minHeight: tTHeight
    },
    params: {
        textures: {},
    },
    drawing: [

    ],
    elements: {
        "burnSlot": {
            type: "slot",
            x: 665,
            y: 48,
            size: listSlotScale,
            bitmap: "burnIcon"
        },
        "buttonBurn": {
            type: "button",
            x: 745,
            y: 48,
            bitmap: "buttonBurnOff",
            bitmap2: "buttonBurnOn",
            scale: 3.6,
            clicker: {
                onClick: function(container, tileEntity) {
                    //Game.dialogMessage(JSON.stringify(container));
					if(!kleinStarController.isStar(container.getSlot("burnSlot").id)){
						validItem = true;
						burnSlot = container.getSlot("burnSlot");
						try {
							EMCSystem.learnedItems.forEach(function(item, i, arr) {
								if (item["id"] == burnSlot.id && +item["data"] == burnSlot.data) {
									throw breakException;
								}
							});
						} catch (e) {
							if (e !== breakException) throw e;
							validItem = false;
						}
						if (validItem) {
							EMCSystem.learnedItems.push({
								id: burnSlot.id,
								data: burnSlot.data
							});
							sortLearnedItems();
						}
						try {
							var emcValue = getEMC(burnSlot.id, burnSlot.data);
							if (emcValue != -1) {
								EMCInSystem += emcValue * burnSlot.count;
								container.clearSlot("burnSlot");
								container.setText("EMCValue", "ЕМС в системе:  " + EMCInSystem);
							}
						} catch (e) {
							if (e !== breakException) throw e;
						}
					} else {
						validItem = true;
						burnSlot = container.getSlot("burnSlot");
						try {
							EMCSystem.learnedItems.forEach(function(item, i, arr) {
								if (item["id"] == burnSlot.id) {
									throw breakException;
								}
							});
						} catch (e) {
							if (e !== breakException) throw e;
							validItem = false;
						}
						if (validItem) {
							EMCSystem.learnedItems.push({
								id: burnSlot.id,
								data: 0
							});
							sortLearnedItems();
						}
						try {
							var emcValue = getEMC(burnSlot.id, 0);
							if (emcValue != -1) {
								EMCInSystem += emcValue * burnSlot.count;
								container.clearSlot("burnSlot");
								tileEntity.data.starPlaced=0;
								container.setText("EMCValue", "ЕМС в системе:  " + EMCInSystem);
							}
						} catch (e) {
							if (e !== breakException) throw e;
						}
					}
					/*for (name in container.getGuiContent().elements) {
						if (name.indexOf("slotOn") >= 0) {
							container.getGuiContent().elements[name] = null;
						}
					}*/
					if (tTSlotYSelected) {
						clearAdditionalButtons(container);
					}
					updateAvailableItems(container);
                }
            }
        },
        "EMCValue": {
            type: "text",
            x: 365,
            y: 53,
            width: 300,
            height: 50,
            text: "ЕМС в системе:  " + EMCInSystem
        },
        "addValue": {
            type: "text",
            x: 675,
            y: 22,
            width: 500,
            height: 25,
            text: ""
        }
    }
});

function updateAvailableItems(anotherContainer) {
    var posYForSlot = 110;
    var posXForButtons = 365;
	for (name in anotherContainer.getGuiContent().elements) {
		if (name.indexOf("slotOn") >= 0) {
			anotherContainer.getGuiContent().elements[name] = null;
		}
	}
	
    EMCSystem.learnedItems.forEach(function(itemLocal, iLocal, arrLocal) {
		var emcValue = getEMC(itemLocal["id"], itemLocal["data"]);
        if (EMCInSystem / emcValue >= 1) {
            var slot = {
                type: "slot",
                source: {
                    id: itemLocal["id"],
                    count: 1,
                    data: itemLocal["data"]
                },
                x: 665,
                y: posYForSlot,
                size: listSlotScale,
                clicker: {
                    onClick: function(position, container, tileEntity) {
                        if (tTSlotYSelected) {
                            clearAdditionalButtons(container);
                        }
                        var localId = this.source.id;
                        var localData = this.source.data;
						var localValue = getEMC(localId, localData);
                        var localX = this.rect.x;
                        var localY = this.rect.y;
                        try {
                            EMCSystem.EMCForItems.forEach(function(item, i, arr) {
                                if (item["id"] == localId && item["data"] == localData) {
                                    maxActiveItemCount = Math.floor(EMCInSystem / item["value"]);
                                    activeItemCount =( EMCInSystem>=localValue)?1:0;
                                    throw breakException;
                                }
                            });
                        } catch (e) {
                            if (e != breakException) throw e;
                        }
                        container.getGuiContent().elements["buttonMinus"] = {
                            type: "button",
                            x: localX - 59.5 * 2,
                            y: localY,
                            bitmap: "buttonMinusOff",
                            bitmap2: "buttonMinusOn",
                            scale: 3.4,
                            clicker: {
                                onClick: function(container, tileEntity) {
                                    if (activeItemCount > 1 && !kleinStarController.isStar(localId)) activeItemCount--;
                                    container.setText("currentAmountForItem", "Выбрано: " + activeItemCount);
                                }
                            }
                        };

                        container.getGuiContent().elements["currentAmountForItem"] = {
                            type: "text",
                            x: 365,
                            y: localY,
                            width: 185,
                            height: 30,
                            text: "Выбрано: " + activeItemCount
                        };

                        container.getGuiContent().elements["maxRangeForItem"] = {
                            type: "text",
                            x: 365,
                            y: localY + 25,
                            width: 185,
                            height: 35,
                            text: "Максимум: " + maxActiveItemCount
                        };

                        container.getGuiContent().elements["buttonPlus"] = {
                            type: "button",
                            x: localX - 59.5,
                            y: localY,
                            bitmap: "buttonPlusOff",
                            bitmap2: "buttonPlusOn",
                            scale: 3.4,
                            clicker: {
                                onClick: function(container, tileEntity) {
                                    if (activeItemCount < maxActiveItemCount && !kleinStarController.isStar(localId)) activeItemCount++;
                                    container.setText("currentAmountForItem", "Выбрано: " + activeItemCount);
                                }
                            }
                        };

                        container.getGuiContent().elements["getAmount"] = {
                            type: "button",
                            x: 745,
                            y: localY,
                            bitmap: "buttonGetAmountOff",
                            bitmap2: "buttonGetAmountOn",
                            scale: 3.4,
                            clicker: {
                                onClick: function(container, tileEntity) {
									var emcValue = getEMC(localId, localData);
									var freeSlots = 0;
									var getSlotId = ModAPI.requireGlobal("Player.getInventorySlot");
									var getSlotData = ModAPI.requireGlobal("Player.getInventorySlotData");
									var getSlotCount = ModAPI.requireGlobal("Player.getInventorySlotCount");
									for (var i = 9; i < 45; i++) {
										if (getSlotId(i) == 0) {
											freeSlots+=64;
										} else if(getSlotId(i)==localId && getSlotData(i)==localData && !kleinStarController.isStar(localId)){
											freeSlots+=64-getSlotCount(i);
										}
									}

									if(freeSlots>0){
										if(!kleinStarController.isStar(localId)) {
											Player.getInventory().addItem(localId, freeSlots > activeItemCount ? activeItemCount : freeSlots, localData);
										} else {
											Player.getInventory().addItem(localId, activeItemCount, kleinStarController.registerWand({id: localId}));
										}
										EMCInSystem -= (freeSlots > activeItemCount ? activeItemCount : freeSlots) * emcValue;
										container.setText("EMCValue", "ЕМС в системе:  " + EMCInSystem);
										
									}
									clearAdditionalButtons(container);
									updateAvailableItems(container);
                                }
                            }
                        };

                        container.getGuiContent().elements["setMaxAmount"] = {
                            type: "button",
                            x: 864,
                            y: localY,
                            bitmap: "buttonMaxOff",
                            bitmap2: "buttonMaxOn",
                            scale: 3.4,
                            clicker: {
                                onClick: function(container, tileEntity) {
                                    if(!kleinStarController.isStar(localId))activeItemCount = maxActiveItemCount;
                                    container.setText("currentAmountForItem", "Выбрано: " + activeItemCount);
                                }
                            }
                        };

                        tTSlotYSelected = true;
                        //updateAvailableItems(container);
                    }
                }
            };
            anotherContainer.getGuiContent().elements["slotOn" + posYForSlot] = slot;
            posYForSlot += (listSlotScale + listSlotSpace);
        }
    });
}

function sortLearnedItems() {
    EMCSystem.learnedItems.sort(function(a, b) {
        if (Item.getName(a["id"], 0, a["data"]).toLowerCase() < Item.getName(b["id"], 0, b["data"]).toLowerCase()) return 8;
        if (Item.getName(a["id"], 0, a["data"]).toLowerCase() > Item.getName(b["id"], 0, b["data"]).toLowerCase()) return 1;
        return 0;
    });
}

function clearAdditionalButtons(container) {
    container.getGuiContent().elements["buttonMinus"] = null;
    container.getGuiContent().elements["buttonPlus"] = null;
    container.getGuiContent().elements["maxRangeForItem"] = null;
    container.getGuiContent().elements["currentAmountForItem"] = null;
    container.getGuiContent().elements["getAmount"] = null;
    container.getGuiContent().elements["setMaxAmount"] = null;
    container.applyChanges();
    tTSlotYSelected = false;
}

TileEntity.registerPrototype(BlockID.TransmutationTable, {
    defaultValues: {
		wandData: 0,
		starPlaced: 0
	},
    click: function(id, count, data, coords) {

    },
    init: function() {
		
	},
    tick: function() {
        if (this.container.isOpened()) {
            if (kleinStarController.isStar(this.container.getSlot("burnSlot").id)) {
                if (this.data.starPlaced == 0) {
					this.data.wandData = this.container.getSlot("burnSlot").data;
					additionalEMC = kleinStarController.getEMC(this.data.wandData);
					kleinStarController.extractAllEMC(this.data.wandData);
					EMCInSystem += additionalEMC;
					this.container.setText("EMCValue", "ЕМС в системе:  " + EMCInSystem);
					
					var emcValue = getEMC(this.container.getSlot("burnSlot").id, 0);
                    this.container.setText("addValue", emcValue == -1 ? "Нельзя сжечь" : "+" + emcValue * this.container.getSlot("burnSlot").count);
                    addedValue = true;
					
					clearAdditionalButtons(this.container);
					updateAvailableItems(this.container);
					
					this.data.starPlaced = 1;
                }
            } else {
                if (this.data.starPlaced == 1) {
                    this.data.starPlaced = 0;
					var deltaEMC = kleinStarController.getMax(this.data.wandData)-kleinStarController.getEMC(this.data.wandData);
					if (deltaEMC > 0) {
						kleinStarController.addEMC(this.data.wandData, deltaEMC > EMCInSystem ? EMCInSystem : deltaEMC);
						EMCInSystem -= deltaEMC > EMCInSystem ? EMCInSystem : deltaEMC;
					}
					clearAdditionalButtons(this.container);
					updateAvailableItems(this.container);
					//Game.dialogMessage("Remove EMC");
                }
                this.container.setText("EMCValue", "ЕМС в системе:  " + EMCInSystem);
                if (tTGuiFirstUpdate) {
                    tTGuiFirstUpdate = false;
                    updateAvailableItems(this.container);
                }
                if (!addedValue && this.container.getSlot("burnSlot").id != 0) {
                    var emcValue = getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data);
                    this.container.setText("addValue", emcValue == -1 ? "Нельзя сжечь" : "+" + emcValue * this.container.getSlot("burnSlot").count);
                    addedValue = true;
                } else if (addedValue && this.container.getSlot("burnSlot").id == 0) {
                    this.container.setText("addValue", "");
                    addedValue = false;
                }
            }
        }
    },
    getGuiScreen: function() {
        tTGuiFirstUpdate = true;
        return TransmutationTableUI;
    }
});

function getEMC(id, data) {
    emcValue = -1;
    try {
        EMCSystem.EMCForItems.forEach(function(item, i, arr) {
            if (item["id"] == id && item["data"] == data) {
                emcValue = item["value"];
                throw breakException;
            }
        });
    } catch (e) {
        if (e != breakException) throw e;
    }
    return emcValue;
}

IDRegistry.genBlockID("energyCondenser");
Block.createBlock("energyCondenser", [{
    name: "Energy Condenser",
    texture: [
        ["DMSide", 0],
        ["CondenserTop", 0],
        ["CondenserFront", 0],
        ["CondenserSide", 0],
        ["CondenserSide", 0],
        ["CondenserSide", 0]
    ],
    inCreative: true
}]);
Translation.addTranslation("Energy Condenser", {
    ru: "Конденсор энергии"
});

TileEntity.registerPrototype(BlockID.energyCondenser, {
    defaultValues: {
        activeEnergy: 0,
        itemInSlotId: 0,
        itemInSlotData: 0,
        itemInSlotValue: 0
    },
    created: function() {

    },
    click: function(id, count, data, coords) {

    },
    getTransportSlots: function() {
        var inputA, outputA;
        for (i = 1; i < 82; i++) {
            inputA.push("slot" + i);
            outputA.push("slot" + i);
        }
		inputA.push("mainSlot");
        return {
            input: inputA,
            output: outputA
        };
    },
    tick: function() {
        if (World.getThreadTime() % 2 == 0) {
            var mainSlot = this.container.getSlot("mainSlot");
            if (mainSlot.id > 0) {
                if (mainSlot.id != this.data.itemInSlotId || mainSlot.data != this.data.itemInSlotData) {
                    var localEMC = getEMC(mainSlot.id, mainSlot.data);
                    if (localEMC != -1) {
                        this.data.itemInSlotId = mainSlot.id;
                        this.data.itemInSlotData = mainSlot.data;
                        this.data.itemInSlotValue = localEMC;
                        //Game.dialogMessage(this.data.itemInSlotId + ":" + this.data.itemInSlotData + ":" + this.data.itemInSlotValue);
                    }
                }
            } else {
                this.data.itemInSlotId = 0;
                this.data.itemInSlotData = 0;
                this.data.itemInSlotValue = 0;
            }
            if (this.data.itemInSlotId != 0) {
                if (this.data.activeEnergy < this.data.itemInSlotValue) {
                    for (i = 1; i < 82; i++) {
                        if (this.container.getSlot("slot" + i).id > 0 && (this.container.getSlot("slot" + i).id != this.data.itemInSlotId || this.container.getSlot("slot" + i).data != this.data.itemInSlotData)) {
                            var localEMC = getEMC(this.container.getSlot("slot" + i).id, this.container.getSlot("slot" + i).data);
                            if (localEMC != -1) {
                                this.container.getSlot("slot" + i).count -= 1;
                                this.container.validateSlot("slot" + i);
                                this.data.activeEnergy += localEMC;
                                this.container.applyChanges();
                                break;
                            }
                        }
                    }
                } else {
                    this.data.activeEnergy -= this.data.itemInSlotValue;
                    for (i = 1; i < 82; i++) {
                        if (this.container.getSlot("slot" + i).id == this.data.itemInSlotId || this.container.getSlot("slot" + i).id < 1) {
                            if (this.container.getSlot("slot" + i).count == 0) {
                                this.container.getSlot("slot" + i).id = this.data.itemInSlotId;
                                this.container.getSlot("slot" + i).data = this.data.itemInSlotData;
                                this.container.getSlot("slot" + i).count = 1;
                            } else if (this.container.getSlot("slot" + i).count == 64) {
                                continue;
                            } else {
                                this.container.getSlot("slot" + i).count++;
                            }
                            this.container.applyChanges();
                            break;
                        }
                    }
                }
                this.container.setScale("energyBarScale", this.data.activeEnergy / this.data.itemInSlotValue);
                this.container.setText("emcValue", parseInt(this.data.activeEnergy) + "/" + parseInt(this.data.itemInSlotValue));
            }
        }
    },
	hasFreeSpace: function(){
		for (i = 1; i < 82; i++) {
			if((this.container.getSlot("slot"+i).id==0 || (this.container.getSlot("slot"+i).id==this.data.itemInSlotId && this.container.getSlot("slot"+i)<64))){
				//if(World.getThreadTime()%40==0)Game.dialogMessage(getEMC(this.data.itemInSlotId, this.data.itemInSlotData));
				return getEMC(this.data.itemInSlotId, this.data.itemInSlotData);
			}
		}
		return -1;
	},
    getGuiScreen: function() {
        return energyCondenserUI;
    },

});

var energyCondenserUI = new UI.StandartWindow();
energyCondenserUI.setContent({
    standart: {
        header: {
            text: {
                text: "Конденсатор энергии"
            },
            color: android.graphics.Color.rgb(0x47, 0x26, 0x0c)
        },
        inventory: {
            standart: true
        },
        minHeight: 110 + 15 * 10 * 4 + listSlotSpace
    },
    params: {
        textures: {},
    },
    drawing: [{
            type: "background",
            color: 0
        },
        //{type: "frame", x: 357, y: 32, width: listSlotSpace*7+16*8*4+16, height: listSlotSpace+15*4*11+24, bitmap: "condenserFrame", scale: 2, bg: android.graphics.Color.rgb(0x153, 0x153, 0x152)},
        {
            type: "bitmap",
            x: 437,
            y: 48,
            bitmap: "condenserBarClear",
            scale: 4
        }
    ],
    elements: {
        "mainSlot": {
            type: "slot",
            x: 365,
            y: 48,
            size: listSlotScale,
            bitmap: "condenserMainSlot"
        },
        "energyBarScale": {
            type: "scale",
            x: 437,
            y: 48,
            direction: 0,
            bitmap: "condenserBarFullClear",
            scale: 4,
            value: 0
        },
        "emcValue": {
            type: "text",
            x: 649,
            y: 114,
            width: 300,
            height: 30,
            text: ""
        }, // 1 ряд
        "slot1": {
            type: "slot",
            x: 373 + 15 * 4 * 0,
            y: 110 + 15 * 4 * 1 + listSlotSpace,
            size: listSlotScale
        },
        "slot2": {
            type: "slot",
            x: 373 + 15 * 4 * 1,
            y: 110 + 15 * 4 * 1 + listSlotSpace,
            size: listSlotScale
        },
        "slot3": {
            type: "slot",
            x: 373 + 15 * 4 * 2,
            y: 110 + 15 * 4 * 1 + listSlotSpace,
            size: listSlotScale
        },
        "slot4": {
            type: "slot",
            x: 373 + 15 * 4 * 3,
            y: 110 + 15 * 4 * 1 + listSlotSpace,
            size: listSlotScale
        },
        "slot5": {
            type: "slot",
            x: 373 + 15 * 4 * 4,
            y: 110 + 15 * 4 * 1 + listSlotSpace,
            size: listSlotScale
        },
        "slot6": {
            type: "slot",
            x: 373 + 15 * 4 * 5,
            y: 110 + 15 * 4 * 1 + listSlotSpace,
            size: listSlotScale
        },
        "slot7": {
            type: "slot",
            x: 373 + 15 * 4 * 6,
            y: 110 + 15 * 4 * 1 + listSlotSpace,
            size: listSlotScale
        },
        "slot8": {
            type: "slot",
            x: 373 + 15 * 4 * 7,
            y: 110 + 15 * 4 * 1 + listSlotSpace,
            size: listSlotScale
        },
        "slot9": {
            type: "slot",
            x: 373 + 15 * 4 * 8,
            y: 110 + 15 * 4 * 1 + listSlotSpace,
            size: listSlotScale
        }, // 2 ряд
        "slot10": {
            type: "slot",
            x: 373 + 15 * 4 * 0,
            y: 110 + 15 * 4 * 2 + listSlotSpace,
            size: listSlotScale
        },
        "slot11": {
            type: "slot",
            x: 373 + 15 * 4 * 1,
            y: 110 + 15 * 4 * 2 + listSlotSpace,
            size: listSlotScale
        },
        "slot12": {
            type: "slot",
            x: 373 + 15 * 4 * 2,
            y: 110 + 15 * 4 * 2 + listSlotSpace,
            size: listSlotScale
        },
        "slot13": {
            type: "slot",
            x: 373 + 15 * 4 * 3,
            y: 110 + 15 * 4 * 2 + listSlotSpace,
            size: listSlotScale
        },
        "slot14": {
            type: "slot",
            x: 373 + 15 * 4 * 4,
            y: 110 + 15 * 4 * 2 + listSlotSpace,
            size: listSlotScale
        },
        "slot15": {
            type: "slot",
            x: 373 + 15 * 4 * 5,
            y: 110 + 15 * 4 * 2 + listSlotSpace,
            size: listSlotScale
        },
        "slot16": {
            type: "slot",
            x: 373 + 15 * 4 * 6,
            y: 110 + 15 * 4 * 2 + listSlotSpace,
            size: listSlotScale
        },
        "slot17": {
            type: "slot",
            x: 373 + 15 * 4 * 7,
            y: 110 + 15 * 4 * 2 + listSlotSpace,
            size: listSlotScale
        },
        "slot18": {
            type: "slot",
            x: 373 + 15 * 4 * 8,
            y: 110 + 15 * 4 * 2 + listSlotSpace,
            size: listSlotScale
        }, // 3 ряд
        "slot19": {
            type: "slot",
            x: 373 + 15 * 4 * 0,
            y: 110 + 15 * 4 * 3 + listSlotSpace,
            size: listSlotScale
        },
        "slot20": {
            type: "slot",
            x: 373 + 15 * 4 * 1,
            y: 110 + 15 * 4 * 3 + listSlotSpace,
            size: listSlotScale
        },
        "slot21": {
            type: "slot",
            x: 373 + 15 * 4 * 2,
            y: 110 + 15 * 4 * 3 + listSlotSpace,
            size: listSlotScale
        },
        "slot22": {
            type: "slot",
            x: 373 + 15 * 4 * 3,
            y: 110 + 15 * 4 * 3 + listSlotSpace,
            size: listSlotScale
        },
        "slot23": {
            type: "slot",
            x: 373 + 15 * 4 * 4,
            y: 110 + 15 * 4 * 3 + listSlotSpace,
            size: listSlotScale
        },
        "slot24": {
            type: "slot",
            x: 373 + 15 * 4 * 5,
            y: 110 + 15 * 4 * 3 + listSlotSpace,
            size: listSlotScale
        },
        "slot25": {
            type: "slot",
            x: 373 + 15 * 4 * 6,
            y: 110 + 15 * 4 * 3 + listSlotSpace,
            size: listSlotScale
        },
        "slot26": {
            type: "slot",
            x: 373 + 15 * 4 * 7,
            y: 110 + 15 * 4 * 3 + listSlotSpace,
            size: listSlotScale
        },
        "slot27": {
            type: "slot",
            x: 373 + 15 * 4 * 8,
            y: 110 + 15 * 4 * 3 + listSlotSpace,
            size: listSlotScale
        }, // 4 ряд
        "slot28": {
            type: "slot",
            x: 373 + 15 * 4 * 0,
            y: 110 + 15 * 4 * 4 + listSlotSpace,
            size: listSlotScale
        },
        "slot29": {
            type: "slot",
            x: 373 + 15 * 4 * 1,
            y: 110 + 15 * 4 * 4 + listSlotSpace,
            size: listSlotScale
        },
        "slot30": {
            type: "slot",
            x: 373 + 15 * 4 * 2,
            y: 110 + 15 * 4 * 4 + listSlotSpace,
            size: listSlotScale
        },
        "slot31": {
            type: "slot",
            x: 373 + 15 * 4 * 3,
            y: 110 + 15 * 4 * 4 + listSlotSpace,
            size: listSlotScale
        },
        "slot32": {
            type: "slot",
            x: 373 + 15 * 4 * 4,
            y: 110 + 15 * 4 * 4 + listSlotSpace,
            size: listSlotScale
        },
        "slot33": {
            type: "slot",
            x: 373 + 15 * 4 * 5,
            y: 110 + 15 * 4 * 4 + listSlotSpace,
            size: listSlotScale
        },
        "slot34": {
            type: "slot",
            x: 373 + 15 * 4 * 6,
            y: 110 + 15 * 4 * 4 + listSlotSpace,
            size: listSlotScale
        },
        "slot35": {
            type: "slot",
            x: 373 + 15 * 4 * 7,
            y: 110 + 15 * 4 * 4 + listSlotSpace,
            size: listSlotScale
        },
        "slot36": {
            type: "slot",
            x: 373 + 15 * 4 * 8,
            y: 110 + 15 * 4 * 4 + listSlotSpace,
            size: listSlotScale
        }, // 5 ряд
        "slot37": {
            type: "slot",
            x: 373 + 15 * 4 * 0,
            y: 110 + 15 * 4 * 5 + listSlotSpace,
            size: listSlotScale
        },
        "slot38": {
            type: "slot",
            x: 373 + 15 * 4 * 1,
            y: 110 + 15 * 4 * 5 + listSlotSpace,
            size: listSlotScale
        },
        "slot39": {
            type: "slot",
            x: 373 + 15 * 4 * 2,
            y: 110 + 15 * 4 * 5 + listSlotSpace,
            size: listSlotScale
        },
        "slot40": {
            type: "slot",
            x: 373 + 15 * 4 * 3,
            y: 110 + 15 * 4 * 5 + listSlotSpace,
            size: listSlotScale
        },
        "slot41": {
            type: "slot",
            x: 373 + 15 * 4 * 4,
            y: 110 + 15 * 4 * 5 + listSlotSpace,
            size: listSlotScale
        },
        "slot42": {
            type: "slot",
            x: 373 + 15 * 4 * 5,
            y: 110 + 15 * 4 * 5 + listSlotSpace,
            size: listSlotScale
        },
        "slot43": {
            type: "slot",
            x: 373 + 15 * 4 * 6,
            y: 110 + 15 * 4 * 5 + listSlotSpace,
            size: listSlotScale
        },
        "slot44": {
            type: "slot",
            x: 373 + 15 * 4 * 7,
            y: 110 + 15 * 4 * 5 + listSlotSpace,
            size: listSlotScale
        },
        "slot45": {
            type: "slot",
            x: 373 + 15 * 4 * 8,
            y: 110 + 15 * 4 * 5 + listSlotSpace,
            size: listSlotScale
        }, // 6 ряд
        "slot46": {
            type: "slot",
            x: 373 + 15 * 4 * 0,
            y: 110 + 15 * 4 * 6 + listSlotSpace,
            size: listSlotScale
        },
        "slot47": {
            type: "slot",
            x: 373 + 15 * 4 * 1,
            y: 110 + 15 * 4 * 6 + listSlotSpace,
            size: listSlotScale
        },
        "slot48": {
            type: "slot",
            x: 373 + 15 * 4 * 2,
            y: 110 + 15 * 4 * 6 + listSlotSpace,
            size: listSlotScale
        },
        "slot49": {
            type: "slot",
            x: 373 + 15 * 4 * 3,
            y: 110 + 15 * 4 * 6 + listSlotSpace,
            size: listSlotScale
        },
        "slot50": {
            type: "slot",
            x: 373 + 15 * 4 * 4,
            y: 110 + 15 * 4 * 6 + listSlotSpace,
            size: listSlotScale
        },
        "slot51": {
            type: "slot",
            x: 373 + 15 * 4 * 5,
            y: 110 + 15 * 4 * 6 + listSlotSpace,
            size: listSlotScale
        },
        "slot52": {
            type: "slot",
            x: 373 + 15 * 4 * 6,
            y: 110 + 15 * 4 * 6 + listSlotSpace,
            size: listSlotScale
        },
        "slot53": {
            type: "slot",
            x: 373 + 15 * 4 * 7,
            y: 110 + 15 * 4 * 6 + listSlotSpace,
            size: listSlotScale
        },
        "slot54": {
            type: "slot",
            x: 373 + 15 * 4 * 8,
            y: 110 + 15 * 4 * 6 + listSlotSpace,
            size: listSlotScale
        }, // 7 ряд
        "slot55": {
            type: "slot",
            x: 373 + 15 * 4 * 0,
            y: 110 + 15 * 4 * 7 + listSlotSpace,
            size: listSlotScale
        },
        "slot56": {
            type: "slot",
            x: 373 + 15 * 4 * 1,
            y: 110 + 15 * 4 * 7 + listSlotSpace,
            size: listSlotScale
        },
        "slot57": {
            type: "slot",
            x: 373 + 15 * 4 * 2,
            y: 110 + 15 * 4 * 7 + listSlotSpace,
            size: listSlotScale
        },
        "slot58": {
            type: "slot",
            x: 373 + 15 * 4 * 3,
            y: 110 + 15 * 4 * 7 + listSlotSpace,
            size: listSlotScale
        },
        "slot59": {
            type: "slot",
            x: 373 + 15 * 4 * 4,
            y: 110 + 15 * 4 * 7 + listSlotSpace,
            size: listSlotScale
        },
        "slot60": {
            type: "slot",
            x: 373 + 15 * 4 * 5,
            y: 110 + 15 * 4 * 7 + listSlotSpace,
            size: listSlotScale
        },
        "slot61": {
            type: "slot",
            x: 373 + 15 * 4 * 6,
            y: 110 + 15 * 4 * 7 + listSlotSpace,
            size: listSlotScale
        },
        "slot62": {
            type: "slot",
            x: 373 + 15 * 4 * 7,
            y: 110 + 15 * 4 * 7 + listSlotSpace,
            size: listSlotScale
        },
        "slot63": {
            type: "slot",
            x: 373 + 15 * 4 * 8,
            y: 110 + 15 * 4 * 7 + listSlotSpace,
            size: listSlotScale
        }, // 8 ряд
        "slot64": {
            type: "slot",
            x: 373 + 15 * 4 * 0,
            y: 110 + 15 * 4 * 8 + listSlotSpace,
            size: listSlotScale
        },
        "slot65": {
            type: "slot",
            x: 373 + 15 * 4 * 1,
            y: 110 + 15 * 4 * 8 + listSlotSpace,
            size: listSlotScale
        },
        "slot66": {
            type: "slot",
            x: 373 + 15 * 4 * 2,
            y: 110 + 15 * 4 * 8 + listSlotSpace,
            size: listSlotScale
        },
        "slot67": {
            type: "slot",
            x: 373 + 15 * 4 * 3,
            y: 110 + 15 * 4 * 8 + listSlotSpace,
            size: listSlotScale
        },
        "slot68": {
            type: "slot",
            x: 373 + 15 * 4 * 4,
            y: 110 + 15 * 4 * 8 + listSlotSpace,
            size: listSlotScale
        },
        "slot69": {
            type: "slot",
            x: 373 + 15 * 4 * 5,
            y: 110 + 15 * 4 * 8 + listSlotSpace,
            size: listSlotScale
        },
        "slot70": {
            type: "slot",
            x: 373 + 15 * 4 * 6,
            y: 110 + 15 * 4 * 8 + listSlotSpace,
            size: listSlotScale
        },
        "slot71": {
            type: "slot",
            x: 373 + 15 * 4 * 7,
            y: 110 + 15 * 4 * 8 + listSlotSpace,
            size: listSlotScale
        },
        "slot72": {
            type: "slot",
            x: 373 + 15 * 4 * 8,
            y: 110 + 15 * 4 * 8 + listSlotSpace,
            size: listSlotScale
        }, // 9 ряд
        "slot73": {
            type: "slot",
            x: 373 + 15 * 4 * 0,
            y: 110 + 15 * 4 * 9 + listSlotSpace,
            size: listSlotScale
        },
        "slot74": {
            type: "slot",
            x: 373 + 15 * 4 * 1,
            y: 110 + 15 * 4 * 9 + listSlotSpace,
            size: listSlotScale
        },
        "slot75": {
            type: "slot",
            x: 373 + 15 * 4 * 2,
            y: 110 + 15 * 4 * 9 + listSlotSpace,
            size: listSlotScale
        },
        "slot76": {
            type: "slot",
            x: 373 + 15 * 4 * 3,
            y: 110 + 15 * 4 * 9 + listSlotSpace,
            size: listSlotScale
        },
        "slot77": {
            type: "slot",
            x: 373 + 15 * 4 * 4,
            y: 110 + 15 * 4 * 9 + listSlotSpace,
            size: listSlotScale
        },
        "slot78": {
            type: "slot",
            x: 373 + 15 * 4 * 5,
            y: 110 + 15 * 4 * 9 + listSlotSpace,
            size: listSlotScale
        },
        "slot79": {
            type: "slot",
            x: 373 + 15 * 4 * 6,
            y: 110 + 15 * 4 * 9 + listSlotSpace,
            size: listSlotScale
        },

        "slot80": {
            type: "slot",
            x: 373 + 15 * 4 * 7,
            y: 110 + 15 * 4 * 9 + listSlotSpace,
            size: listSlotScale
        },
        "slot81": {
            type: "slot",
            x: 373 + 15 * 4 * 8,
            y: 110 + 15 * 4 * 9 + listSlotSpace,
            size: listSlotScale
        }
    }
});
//}

IDRegistry.genBlockID("energyCollectorTier1");
Block.createBlock("energyCollectorTier1", [{
    name: "Energy Collector МК1",
    texture: [
        ["energyCollectorSide", 0],
        ["energyCollectorTop1", 0],
        ["energyCollectorFront", 0],
        ["energyCollectorSide", 0],
        ["energyCollectorSide", 0],
        ["energyCollectorSide", 0]
    ],
    inCreative: true
}]);
Translation.addTranslation("Energy Collector МК1", {
    ru: "Собиратель энергии МК1"
});

TileEntity.registerPrototype(BlockID.energyCollectorTier1, {
    defaultValues: {
        activeEnergy: 0,
        activeWandEnergy: 0,
        maxEnergy: 10000,
		maxWandEnergy: 0,
        sunTick: 1,
        shallMove: 0,
        needEnergy: 0,
        validTarget: 0,
        validID: 0,
        validData: 0,
        shallTransfer: 0,
        placeToTransfer: {
            x: 0,
            y: 0,
            z: 0
        }
    },
    created: function() {

    },
	getTransportSlots: function() {
        var inputA, outputA;
        for (i = 1; i < 9; i++) {
            inputA.push("slot" + i);
            outputA.push("slot" + i);
        }
		outputA.push("afterBurnSlot");
        return {
            input: inputA,
            output: outputA
        };
    },
    click: function(id, count, data, coords) {

    },
	checkForTransfer: function(){
		if (this.data.shallTransfer == 0) {
            if (((World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCollectorTier1 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCollectorTier2 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x + 1, this.y, this.z).data.shallTransfer == 0) || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.antiMatterTier1 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.antiMatterTier2 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.antiMatterTier3 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCondenser) {
                //Game.message("1");
                this.data.placeToTransfer.x = this.x + 1;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCollectorTier1 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCollectorTier2 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x - 1, this.y, this.z).data.shallTransfer == 0) || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.antiMatterTier1 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.antiMatterTier2 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.antiMatterTier3 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCondenser) {
                //Game.message("2");
                this.data.placeToTransfer.x = this.x - 1;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCollectorTier1 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCollectorTier2 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x, this.y, this.z + 1).data.shallTransfer == 0) || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.antiMatterTier1 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.antiMatterTier2 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.antiMatterTier3 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCondenser) {
                //Game.message("3");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z + 1;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCollectorTier1 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCollectorTier2 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x, this.y, this.z - 1).data.shallTransfer == 0) || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.antiMatterTier1 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.antiMatterTier2 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.antiMatterTier3 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCondenser) {
                //Game.message("4");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z - 1;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCollectorTier1 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCollectorTier2 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x, this.y - 1, this.z).data.shallTransfer == 0) || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.antiMatterTier1 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.antiMatterTier2 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.antiMatterTier3 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCondenser) {
                //Game.message("5");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y - 1;
                this.data.placeToTransfer.z = this.z;
                this.data.shallTransfer = 1;
            }
            if ( this.data.shallTransfer ==1 && (World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier1 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier2 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier3)) {
                //Game.message("Added 1");
                World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.sidesBusied++;
            }
        } else {
			blockHost = World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
            if (this.data.shallTransfer == 1 && this.data.placeToTransfer && blockHost != BlockID.energyCollectorTier1 && blockHost != BlockID.energyCollectorTier2 && blockHost != BlockID.energyCollectorTier3 && blockHost != BlockID.antiMatterTier1 && blockHost != BlockID.antiMatterTier2 && blockHost != BlockID.antiMatterTier3) {
                this.data.shallTransfer = 0;
				this.checkForTransfer();
            }
		}
	},	
    init: function() {
		
    },
    destroyBlock: function(coords, player) {
        if (World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier1 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier2 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier3) {
            World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.sidesBusied--;
        }
    },
    tick: function() {
        var mainContainer = this.container;
        if (World.getThreadTime() % 5 == 0) {
			if (World.getThreadTime() % 20 == 0) {
				for (i = 8; i > 0; i--) {
					if (mainContainer.getSlot("slot" + i).id == 0) {
						for (j = i - 1; j > 0; j--) {
							if (mainContainer.getSlot("slot" + j).id != 0) {
								mainContainer.getSlot("slot" + i).id = mainContainer.getSlot("slot" + j).id;
								mainContainer.getSlot("slot" + i).data = mainContainer.getSlot("slot" + j).data;
								mainContainer.getSlot("slot" + i).count = mainContainer.getSlot("slot" + j).count;
								mainContainer.clearSlot("slot" + j);
							}
						}
					}
				}
			}
			this.checkForTransfer();
            this.data.sunTick = nativeGetLightLevel(this.x, this.y + 1, this.z) / 15;
            if (this.data.shallTransfer == 0 || (World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"])==BlockID.energyCondenser && World.getTileEntity(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]).hasFreeSpace()==-1)) {
                if (this.data.activeEnergy < this.data.maxEnergy) this.data.activeEnergy += this.data.sunTick;
				if(mainContainer.getSlot("burnSlot").id!=0){
					if(kleinStarController.isStar(mainContainer.getSlot("burnSlot").id)){
						var wandData=mainContainer.getSlot("burnSlot").data;
						if(this.data.starPlaced==0){
							this.data.maxWandEnergy=kleinStarController.getMax(wandData);
						}
						var deltaEMC=kleinStarController.getMax(wandData)-kleinStarController.getEMC(wandData);
						if(deltaEMC>0){
							kleinStarController.addEMC(wandData, deltaEMC>this.data.activeEnergy?this.data.activeEnergy:deltaEMC);
							this.data.activeEnergy-=deltaEMC>this.data.activeEnergy?this.data.activeEnergy:deltaEMC;
							this.data.activeWandEnergy=kleinStarController.getEMC(wandData);
						}
						this.data.starPlaced=1;
					} else {
						if(this.data.starPlaced==1){
							this.data.maxWandEnergy=0;
							this.data.activeWandEnergy=0;
						}
						if (EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data] != undefined) {
							if (mainContainer.getSlot("targetSlot").id != 0) {
								if (this.data.validTarget == 0) {
									for (name in collectorRecipes) {
										if (mainContainer.getSlot("targetSlot").id == EMCSystem.collectorRecipes[name].resultid && mainContainer.getSlot("targetSlot").data == EMCSystem.collectorRecipes[name].resultdata) {
											for (name2 in collectorRecipes) {
												if (EMCSystem.collectorRecipes[name2].value >= EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].value) this.data.needEnergy += EMCSystem.collectorRecipes[name2].value;
											}
											this.data.validID = parseInt(name / 1000);
											this.data.validData = parseInt(name % 1000);
											this.data.validTarget = 1;
											this.data.
											break;
										}
									}
								}
							} else if (mainContainer.getSlot("targetSlot").id == 0 || mainContainer.getSlot("targetSlot").id != this.data.validID) {
								this.data.validTarget = 0;
								this.data.needEnergy = 0;
							}
							if (this.data.validTarget == 0) {
								var burnValue = EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].value;
								this.data.needEnergy = burnValue;
								if (this.data.activeEnergy >= burnValue) {
									if (mainContainer.getSlot("afterBurnSlot").id == 0) {
										mainContainer.getSlot("afterBurnSlot").id = EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultid;
										mainContainer.getSlot("afterBurnSlot").data = EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultdata;
										mainContainer.getSlot("afterBurnSlot").count = 1;
										mainContainer.getSlot("burnSlot").count--;
										mainContainer.validateSlot("burnSlot");
										this.data.activeEnergy -= burnValue;
									} else if (mainContainer.getSlot("afterBurnSlot").count == 64 ||
										mainContainer.getSlot("afterBurnSlot").id != EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultid ||
										mainContainer.getSlot("afterBurnSlot").data != EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultdata) {
										this.data.shallMove = 1;
									} else {
										mainContainer.getSlot("afterBurnSlot").count++;
										mainContainer.getSlot("burnSlot").count--;
										mainContainer.validateSlot("burnSlot");
										this.data.activeEnergy -= burnValue;
									}
								}
							} else {
								//var burnValue = EMCSystem.collectorRecipes[mainContainer.getSlot("targetSlot").id+""+mainContainer.getSlot("targetSlot").data].value;
								//this.data.needEnergy = burnValue;
								if (EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data] != undefined && EMCSystem.collectorRecipes[this.data.validID + "" + this.data.validData] != undefined) {
									if (this.data.activeEnergy >= this.data.needEnergy) {
										if (mainContainer.getSlot("afterBurnSlot").id == 0) {
											mainContainer.getSlot("afterBurnSlot").id = EMCSystem.collectorRecipes[this.data.validID + "" + this.data.validData].resultid;
											mainContainer.getSlot("afterBurnSlot").data = EMCSystem.collectorRecipes[this.data.validID + "" + this.data.validData].resultdata;
											mainContainer.getSlot("afterBurnSlot").count = 1;
											mainContainer.getSlot("burnSlot").count--;
											mainContainer.validateSlot("burnSlot");
											this.data.activeEnergy -= this.data.needEnergy;
										} else if (mainContainer.getSlot("afterBurnSlot").count == 64 ||
											mainContainer.getSlot("afterBurnSlot").id != EMCSystem.collectorRecipes[this.data.validID + "" + this.data.validData].resultid ||
											mainContainer.getSlot("afterBurnSlot").data != EMCSystem.collectorRecipes[this.data.validID + "" + this.data.validData].resultdata) {
											this.data.shallMove = 1;
										} else {
											mainContainer.getSlot("afterBurnSlot").count++;
											mainContainer.getSlot("burnSlot").count--;
											mainContainer.validateSlot("burnSlot");
											this.data.activeEnergy -= this.data.needEnergy;
										}
									}
								}
							}
						}
						if (this.data.shallMove == 1 || mainContainer.getSlot("afterBurnSlot").count == 64 || mainContainer.getSlot("burnSlot").id == 0) {
							for (i = 1; i < 9; i++) {
								if (mainContainer.getSlot("slot" + i).id == mainContainer.getSlot("afterBurnSlot").id && mainContainer.getSlot("slot" + i).data == mainContainer.getSlot("afterBurnSlot").data && mainContainer.getSlot("slot" + i) < 64) {
									if (mainContainer.getSlot("slot" + i).count + mainContainer.getSlot("afterBurnSlot").count <= 64) {
										mainContainer.getSlot("slot" + i).count += mainContainer.getSlot("afterBurnSlot").count;
									} else {
										mainContainer.getSlot("afterBurnSlot").count -= (64 - mainContainer.getSlot("afterBurnSlot").count);
										mainContainer.getSlot("slot" + i).count += (64 - mainContainer.getSlot("afterBurnSlot").count);
									}
								} else if (mainContainer.getSlot("slot" + i).id == 0) {
									mainContainer.getSlot("slot" + i).id = mainContainer.getSlot("afterBurnSlot").id;
									mainContainer.getSlot("slot" + i).data = mainContainer.getSlot("afterBurnSlot").data;
									mainContainer.getSlot("slot" + i).count = mainContainer.getSlot("afterBurnSlot").count;
									mainContainer.clearSlot("afterBurnSlot");
									mainContainer.validateSlot("slot" + i);
									break;
								}
							}
							mainContainer.validateSlot("afterBurnSlot");
							this.data.shallMove = 0;
						}
						if (mainContainer.getSlot("burnSlot").id == 0 && mainContainer.getSlot("slot8").id != 0 && EMCSystem.collectorRecipes[mainContainer.getSlot("slot8").id + "" + mainContainer.getSlot("slot8").data] != undefined) {
							mainContainer.getSlot("burnSlot").id = mainContainer.getSlot("slot8").id;
							mainContainer.getSlot("burnSlot").data = mainContainer.getSlot("slot8").data;
							mainContainer.getSlot("burnSlot").count = mainContainer.getSlot("slot8").count;
							mainContainer.clearSlot("slot8");
						}
					}
				} else {
					this.data.needEnergy=0;
				}
            } else {
                var center = World.getTileEntity(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
                //Game.message("Was " + center.data.activeEnergy + ", added " + this.data.sunTick);
                if(World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"])!=BlockID.energyCondenser){
					if (center && (center.data.activeEnergy+this.data.sunTick) < center.data.maxEnergy) {
						center.data.activeEnergy += this.data.sunTick;
					}
				} else {
					this.data.activeEnergy+=this.data.sunTick;
					center.data.activeEnergy+=this.data.sunTick*2>this.data.activeEnergy?this.data.activeEnergy:this.data.sunTick*2;
					this.data.activeEnergy-=this.data.sunTick*2>this.data.activeEnergy?this.data.activeEnergy:this.data.sunTick*2;
					//center.data.activeEnergy+=this.data.sunTick;
				}
            }
            mainContainer.setScale("energy", this.data.maxEnergy==0?0:this.data.activeEnergy / this.data.maxEnergy);
            mainContainer.setText("energyValue", parseInt(this.data.activeEnergy));
            mainContainer.setScale("wandEnergy",  this.data.maxEnergy==0?0:this.data.activeWandEnergy / this.data.maxEnergy);
            mainContainer.setText("wandEnergyValue", this.data.maxEnergy==0?parseInt(this.data.needEnergy):parseInt(this.data.activeWandEnergy));
            mainContainer.setScale("burnScale", this.data.needEnergy == 0 ? 0 : this.data.activeEnergy / this.data.needEnergy);
            mainContainer.setScale("lightLevel", this.data.sunTick)
        }
    },
    getGuiScreen: function() {
        return energyCollectorUIT1;
    },

});

var energyCollectorUIT1 = new UI.StandartWindow();
energyCollectorUIT1.setContent({
    standart: {
        header: {
            text: {
                text: "Собиратель энергии МК1"
            },
            color: android.graphics.Color.rgb(0x47, 0x26, 0x0c)
        },
        inventory: {
            standart: true
        }
    },
    params: {
        textures: {},
    },
    drawing: [{
        type: "background",
        color: android.graphics.Color.rgb(198, 198, 198)
    }, {
        type: "bitmap",
        x: 365+32,
        y: 72,
        bitmap: "collector",
        scale: 3.5
    }],
    elements: {
        "lightLevel": {
            type: "scale",
            x: 788+32,
            y: 180,
            direction: 1,
            bitmap: "collectorSunOn",
            scale: 3.5,
            value: 1
        },
        "burnScale": {
            type: "scale",
            x: 835+32,
            y: 165,
            direction: 1,
            bitmap: "collectorProcess",
            scale: 3.5,
            value: 0
        },
        "burnSlot": {
            type: "slot",
            x: 781+32,
            y: 258,
            size: 62,
            bitmap: "collectorBurnSlot"
        },
        "afterBurnSlot": {
            type: "slot",
            x: 781+32,
            y: 100,
            size: 62,
            bitmap: "collectorAfterBurnSlot",
            clicker: {
                onClick: function(position, container, tileEntity) {
                    Player.getInventory().addItem(container.getSlot("afterBurnSlot").id, container.getSlot("afterBurnSlot").count, container.getSlot("afterBurnSlot").data);
                    container.clearSlot("afterBurnSlot");
                    container.validateSlot("afterBurnSlot");
                }
            }
        },
        "targetSlot": {
            type: "slot",
            x: 883+32,
            y: 181,
            size: 62,
            bitmap: "collectorTargetSlot"
        },
        "energy": {
            type: "scale",
            x: 575+32,
            y: 121,
            scale: 3.5,
            bitmap: "collectorBarFull",
            direction: 0,
            value: 0
        },
        "energyValue": {
            type: "text",
            x: 575+32,
            y: 173,
            width: 168,
            height: 30,
            text: ""
        },
        "wandEnergy": {
            type: "scale",
            x: 575+32,
            y: 261,
            scale: 3.5,
            direction: 0,
            bitmap: "collectorBarFull",
            value: 0
        },
        "wandEnergyValue": {
            type: "text",
            x: 575+32,
            y: 236,
            width: 168,
            height: 30,
            text: ""
        },
        "slot1": {
            type: "slot",
            x: 418+32,
            y: 82,
            size: 62,
            bitmap: "collectorSlot1"
        },
        "slot2": {
            type: "slot",
            x: 482+32,
            y: 82,
            size: 62,
            bitmap: "collectorSlot2"
        },
        "slot3": {
            type: "slot",
            x: 418+32,
            y: 146,
            size: 62,
            bitmap: "collectorSlot3"
        },
        "slot4": {
            type: "slot",
            x: 482+32,
            y: 146,
            size: 62,
            bitmap: "collectorSlot4"
        },
        "slot5": {
            type: "slot",
            x: 418+32,
            y: 210,
            size: 62,
            bitmap: "collectorSlot5"
        },
        "slot6": {
            type: "slot",
            x: 482+32,
            y: 210,
            size: 62,
            bitmap: "collectorSlot6"
        },
        "slot7": {
            type: "slot",
            x: 418+32,
            y: 270,
            size: 62,
            bitmap: "collectorSlot1"
        },
        "slot8": {
            type: "slot",
            x: 482+32,
            y: 270,
            size: 62,
            bitmap: "collectorSlot8"
        }
    }
});

IDRegistry.genBlockID("energyCollectorTier2");
Block.createBlock("energyCollectorTier2", [{
    name: "Energy Collector МК2",
    texture: [
        ["energyCollectorSide", 0],
        ["energyCollectorTop2", 0],
        ["energyCollectorFront", 0],
        ["energyCollectorSide", 0],
        ["energyCollectorSide", 0],
        ["energyCollectorSide", 0]
    ],
    inCreative: true
}]);
Translation.addTranslation("Energy Collector МК2", {
    ru: "Собиратель энергии МК2"
});

TileEntity.registerPrototype(BlockID.energyCollectorTier2, {
    defaultValues: {
        activeEnergy: 0,
        activeWandEnergy: 0,
        maxEnergy: 30000,
		maxWandEnergy: 0,
        sunTick: 1,
        shallMove: 0,
        needEnergy: 0,
        validTarget: 0,
        validID: 0,
        validData: 0,
        shallTransfer: 0,
        placeToTransfer: {
            x: 0,
            y: 0,
            z: 0
        }
    },
    created: function() {

    },
	getTransportSlots: function() {
        var inputA, outputA;
        for (i = 1; i < 13; i++) {
            inputA.push("slot" + i);
            outputA.push("slot" + i);
        }
		outputA.push("afterBurnSlot");
        return {
            input: inputA,
            output: outputA
        };
    },
    click: function(id, count, data, coords) {

    },
    checkForTransfer: function(){
		if (this.data.shallTransfer == 0) {
            if (((World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCollectorTier1 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCollectorTier2 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x + 1, this.y, this.z).data.shallTransfer == 0) || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.antiMatterTier1 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.antiMatterTier2 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.antiMatterTier3 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCondenser) {
                //Game.message("1");
                this.data.placeToTransfer.x = this.x + 1;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCollectorTier1 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCollectorTier2 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x - 1, this.y, this.z).data.shallTransfer == 0) || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.antiMatterTier1 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.antiMatterTier2 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.antiMatterTier3 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCondenser) {
                //Game.message("2");
                this.data.placeToTransfer.x = this.x - 1;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCollectorTier1 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCollectorTier2 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x, this.y, this.z + 1).data.shallTransfer == 0) || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.antiMatterTier1 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.antiMatterTier2 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.antiMatterTier3 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCondenser) {
                //Game.message("3");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z + 1;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCollectorTier1 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCollectorTier2 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x, this.y, this.z - 1).data.shallTransfer == 0) || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.antiMatterTier1 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.antiMatterTier2 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.antiMatterTier3 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCondenser) {
                //Game.message("4");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z - 1;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCollectorTier1 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCollectorTier2 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x, this.y - 1, this.z).data.shallTransfer == 0) || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.antiMatterTier1 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.antiMatterTier2 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.antiMatterTier3 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCondenser) {
                //Game.message("5");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y - 1;
                this.data.placeToTransfer.z = this.z;
                this.data.shallTransfer = 1;
            }
            if ( this.data.shallTransfer ==1 && (World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier1 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier2 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier3)) {
                //Game.message("Added 1");
                World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.sidesBusied++;
            }
        } else {
			blockHost = World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
            if (this.data.shallTransfer == 1 && this.data.placeToTransfer && blockHost != BlockID.energyCollectorTier1 && blockHost != BlockID.energyCollectorTier2 && blockHost != BlockID.energyCollectorTier3 && blockHost != BlockID.antiMatterTier1 && blockHost != BlockID.antiMatterTier2 && blockHost != BlockID.antiMatterTier3) {
                this.data.shallTransfer = 0;
				this.checkForTransfer();
            }
		}
	},	
    init: function() {
		
    },
    destroyBlock: function(coords, player) {
        if (World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier1 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier2 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier3) {
            World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.sidesBusied--;
        }
    },
    tick: function() {
        var mainContainer = this.container;
        if (World.getThreadTime() % 5 == 0) {
			if (World.getThreadTime() % 5 == 0) {
				for (i = 12; i > 0; i--) {
					if (mainContainer.getSlot("slot" + i).id == 0) {
						for (j = i - 1; j > 0; j--) {
							if (mainContainer.getSlot("slot" + j).id != 0) {
								mainContainer.getSlot("slot" + i).id = mainContainer.getSlot("slot" + j).id;
								mainContainer.getSlot("slot" + i).data = mainContainer.getSlot("slot" + j).data;
								mainContainer.getSlot("slot" + i).count = mainContainer.getSlot("slot" + j).count;
								mainContainer.clearSlot("slot" + j);
							}
						}
					}
				}
			}
			this.checkForTransfer();
            this.data.sunTick = nativeGetLightLevel(this.x, this.y + 1, this.z) / 15 * 3;
            if (this.data.shallTransfer == 0 || (World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"])==BlockID.energyCondenser && World.getTileEntity(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]).hasFreeSpace()==-1)) {
                if (this.data.activeEnergy < this.data.maxEnergy) this.data.activeEnergy += this.data.sunTick;
				if(mainContainer.getSlot("burnSlot").id!=0){
					if(kleinStarController.isStar(mainContainer.getSlot("burnSlot").id)){
						var wandData=mainContainer.getSlot("burnSlot").data;
						if(this.data.starPlaced==0){
							this.data.maxWandEnergy=kleinStarController.getMax(wandData);
						}
						var deltaEMC=kleinStarController.getMax(wandData)-kleinStarController.getEMC(wandData);
						if(deltaEMC>0){
							kleinStarController.addEMC(wandData, deltaEMC>this.data.activeEnergy?this.data.activeEnergy:deltaEMC);
							this.data.activeEnergy-=deltaEMC>this.data.activeEnergy?this.data.activeEnergy:deltaEMC;
							this.data.activeWandEnergy=kleinStarController.getEMC(wandData);
						}
						this.data.starPlaced=1;
					} else {
						if(this.data.starPlaced==1){
							this.data.maxWandEnergy=0;
							this.data.activeWandEnergy=0;
						}
						if (EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data] != undefined) {
							if (mainContainer.getSlot("targetSlot").id != 0) {
								if (this.data.validTarget == 0) {
									for (name in collectorRecipes) {
										if (mainContainer.getSlot("targetSlot").id == EMCSystem.collectorRecipes[name].resultid && mainContainer.getSlot("targetSlot").data == EMCSystem.collectorRecipes[name].resultdata) {
											for (name2 in collectorRecipes) {
												if (EMCSystem.collectorRecipes[name2].value >= EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].value) this.data.needEnergy += EMCSystem.collectorRecipes[name2].value;
											}
											this.data.validID = parseInt(name / 1000);
											this.data.validData = parseInt(name % 1000);
											this.data.validTarget = 1;
											this.data.
											break;
										}
									}
								}
							} else if (mainContainer.getSlot("targetSlot").id == 0 || mainContainer.getSlot("targetSlot").id != this.data.validID) {
								this.data.validTarget = 0;
								this.data.needEnergy = 0;
							}
							if (this.data.validTarget == 0) {
								var burnValue = EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].value;
								this.data.needEnergy = burnValue;
								if (this.data.activeEnergy >= burnValue) {
									if (mainContainer.getSlot("afterBurnSlot").id == 0) {
										mainContainer.getSlot("afterBurnSlot").id = EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultid;
										mainContainer.getSlot("afterBurnSlot").data = EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultdata;
										mainContainer.getSlot("afterBurnSlot").count = 1;
										mainContainer.getSlot("burnSlot").count--;
										mainContainer.validateSlot("burnSlot");
										this.data.activeEnergy -= burnValue;
									} else if (mainContainer.getSlot("afterBurnSlot").count == 64 ||
										mainContainer.getSlot("afterBurnSlot").id != EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultid ||
										mainContainer.getSlot("afterBurnSlot").data != EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultdata) {
										this.data.shallMove = 1;
									} else {
										mainContainer.getSlot("afterBurnSlot").count++;
										mainContainer.getSlot("burnSlot").count--;
										mainContainer.validateSlot("burnSlot");
										this.data.activeEnergy -= burnValue;
									}
								}
							} else {
								//var burnValue = EMCSystem.collectorRecipes[mainContainer.getSlot("targetSlot").id+""+mainContainer.getSlot("targetSlot").data].value;
								//this.data.needEnergy = burnValue;
								if (EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data] != undefined && EMCSystem.collectorRecipes[this.data.validID + "" + this.data.validData] != undefined) {
									if (this.data.activeEnergy >= this.data.needEnergy) {
										if (mainContainer.getSlot("afterBurnSlot").id == 0) {
											mainContainer.getSlot("afterBurnSlot").id = EMCSystem.collectorRecipes[this.data.validID + "" + this.data.validData].resultid;
											mainContainer.getSlot("afterBurnSlot").data = EMCSystem.collectorRecipes[this.data.validID + "" + this.data.validData].resultdata;
											mainContainer.getSlot("afterBurnSlot").count = 1;
											mainContainer.getSlot("burnSlot").count--;
											mainContainer.validateSlot("burnSlot");
											this.data.activeEnergy -= this.data.needEnergy;
										} else if (mainContainer.getSlot("afterBurnSlot").count == 64 ||
											mainContainer.getSlot("afterBurnSlot").id != EMCSystem.collectorRecipes[this.data.validID + "" + this.data.validData].resultid ||
											mainContainer.getSlot("afterBurnSlot").data != EMCSystem.collectorRecipes[this.data.validID + "" + this.data.validData].resultdata) {
											this.data.shallMove = 1;
										} else {
											mainContainer.getSlot("afterBurnSlot").count++;
											mainContainer.getSlot("burnSlot").count--;
											mainContainer.validateSlot("burnSlot");
											this.data.activeEnergy -= this.data.needEnergy;
										}
									}
								}
							}
						}
						if (this.data.shallMove == 1 || mainContainer.getSlot("afterBurnSlot").count == 64 || mainContainer.getSlot("burnSlot").id == 0) {
							for (i = 1; i < 13; i++) {
								if (mainContainer.getSlot("slot" + i).id == mainContainer.getSlot("afterBurnSlot").id && mainContainer.getSlot("slot" + i).data == mainContainer.getSlot("afterBurnSlot").data && mainContainer.getSlot("slot" + i) < 64) {
									if (mainContainer.getSlot("slot" + i).count + mainContainer.getSlot("afterBurnSlot").count <= 64) {
										mainContainer.getSlot("slot" + i).count += mainContainer.getSlot("afterBurnSlot").count;
									} else {
										mainContainer.getSlot("afterBurnSlot").count -= (64 - mainContainer.getSlot("afterBurnSlot").count);
										mainContainer.getSlot("slot" + i).count += (64 - mainContainer.getSlot("afterBurnSlot").count);
									}
								} else if (mainContainer.getSlot("slot" + i).id == 0) {
									mainContainer.getSlot("slot" + i).id = mainContainer.getSlot("afterBurnSlot").id;
									mainContainer.getSlot("slot" + i).data = mainContainer.getSlot("afterBurnSlot").data;
									mainContainer.getSlot("slot" + i).count = mainContainer.getSlot("afterBurnSlot").count;
									mainContainer.clearSlot("afterBurnSlot");
									mainContainer.validateSlot("slot" + i);
									break;
								}
							}
							mainContainer.validateSlot("afterBurnSlot");
							this.data.shallMove = 0;
						}
						if (mainContainer.getSlot("burnSlot").id == 0 && mainContainer.getSlot("slot12").id != 0 && EMCSystem.collectorRecipes[mainContainer.getSlot("slot12").id + "" + mainContainer.getSlot("slot12").data] != undefined) {
							mainContainer.getSlot("burnSlot").id = mainContainer.getSlot("slot12").id;
							mainContainer.getSlot("burnSlot").data = mainContainer.getSlot("slot12").data;
							mainContainer.getSlot("burnSlot").count = mainContainer.getSlot("slot12").count;
							mainContainer.clearSlot("slot12");
						}
					}
				} else {
					this.data.needEnergy=0;
				}
            } else {
                var center = World.getTileEntity(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
                //Game.message("Was " + center.data.activeEnergy + ", added " + this.data.sunTick);
                if(World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"])!=BlockID.energyCondenser){
					if (center && (center.data.activeEnergy+this.data.sunTick) < center.data.maxEnergy) {
						center.data.activeEnergy += this.data.sunTick;
					}
				} else {
					this.data.activeEnergy+=this.data.sunTick;
					center.data.activeEnergy+=this.data.sunTick*2>this.data.activeEnergy?this.data.activeEnergy:this.data.sunTick*2;
					this.data.activeEnergy-=this.data.sunTick*2>this.data.activeEnergy?this.data.activeEnergy:this.data.sunTick*2;
				}
            }
            mainContainer.setScale("energy", this.data.maxEnergy==0?0:this.data.activeEnergy / this.data.maxEnergy);
            mainContainer.setText("energyValue", parseInt(this.data.activeEnergy));
            mainContainer.setScale("wandEnergy",  this.data.maxEnergy==0?0:this.data.activeWandEnergy / this.data.maxEnergy);
            mainContainer.setText("wandEnergyValue", this.data.maxEnergy==0?parseInt(this.data.needEnergy):parseInt(this.data.activeWandEnergy));
            mainContainer.setScale("burnScale", this.data.needEnergy == 0 ? 0 : this.data.activeEnergy / this.data.needEnergy);
            mainContainer.setScale("lightLevel", this.data.sunTick);
        }
    },
    getGuiScreen: function() {
        return energyCollectorUIT2;
    },

});

var energyCollectorUIT2 = new UI.StandartWindow();
energyCollectorUIT2.setContent({
    standart: {
        header: {
            text: {
                text: "Собиратель энергии МК2"
            },
            color: android.graphics.Color.rgb(0x47, 0x26, 0x0c)
        },
        inventory: {
            standart: true
        }
    },
    params: {
        textures: {},
    },
    drawing: [{
        type: "background",
        color: android.graphics.Color.rgb(198, 198, 198)
    }, {
        type: "bitmap",
        x: 365+32,
        y: 72,
        bitmap: "collector",
        scale: 3.5
    }],
    elements: {
        "lightLevel": {
            type: "scale",
            x: 788+32,
            y: 180,
            direction: 1,
            bitmap: "collectorSunOn",
            scale: 3.5,
            value: 1
        },
        "burnScale": {
            type: "scale",
            x: 835+32,
            y: 165,
            direction: 1,
            bitmap: "collectorProcess",
            scale: 3.5,
            value: 0
        },
        "burnSlot": {
            type: "slot",
            x: 781+32,
            y: 258,
            size: 62,
            bitmap: "collectorBurnSlot"
        },
        "afterBurnSlot": {
            type: "slot",
            x: 781+32,
            y: 100,
            size: 62,
            bitmap: "collectorAfterBurnSlot",
            clicker: {
                onClick: function(position, container, tileEntity) {
                    Player.getInventory().addItem(container.getSlot("afterBurnSlot").id, container.getSlot("afterBurnSlot").count, container.getSlot("afterBurnSlot").data);
                    container.clearSlot("afterBurnSlot");
                    container.validateSlot("afterBurnSlot");
                }
            }
        },
        "targetSlot": {
            type: "slot",
            x: 883+32,
            y: 181,
            size: 62,
            bitmap: "collectorTargetSlot"
        },
        "energy": {
            type: "scale",
            x: 575+32,
            y: 121,
            scale: 3.5,
            bitmap: "collectorBarFull",
            direction: 0,
            value: 0
        },
        "energyValue": {
            type: "text",
            x: 575+32,
            y: 173,
            width: 168,
            height: 30,
            text: ""
        },
        "wandEnergy": {
            type: "scale",
            x: 575+32,
            y: 261,
            scale: 3.5,
            direction: 0,
            bitmap: "collectorBarFull",
            value: 0
        },
        "wandEnergyValue": {
            type: "text",
            x: 575+32,
            y: 236,
            width: 168,
            height: 30,
            text: ""
        },
		"slot1": {
            type: "slot",
            x: 354+32,
            y: 82,
            size: 62,
            bitmap: "collectorSlot1"
        },
        "slot2": {
            type: "slot",
            x: 418+32,
            y: 82,
            size: 62,
            bitmap: "collectorSlot1"
        },
        "slot3": {
            type: "slot",
            x: 482+32,
            y: 82,
            size: 62,
            bitmap: "collectorSlot2"
        },
		"slot4": {
            type: "slot",
            x: 354+32,
            y: 146,
            size: 62,
            bitmap: "collectorSlot1"
        },
        "slot5": {
            type: "slot",
            x: 418+32,
            y: 146,
            size: 62,
            bitmap: "collectorSlot3"
        },
        "slot6": {
            type: "slot",
            x: 482+32,
            y: 146,
            size: 62,
            bitmap: "collectorSlot4"
        },
		"slot7": {
            type: "slot",
            x: 354+32,
            y: 210,
            size: 62,
            bitmap: "collectorSlot1"
        },
        "slot8": {
            type: "slot",
            x: 418+32,
            y: 210,
            size: 62,
            bitmap: "collectorSlot5"
        },
        "slot9": {
            type: "slot",
            x: 482+32,
            y: 210,
            size: 62,
            bitmap: "collectorSlot6"
        },
		"slot10": {
            type: "slot",
            x: 354+32,
            y: 274,
            size: 62,
            bitmap: "collectorSlot1"
        },
        "slot11": {
            type: "slot",
            x: 418+32,
            y: 274,
            size: 62,
            bitmap: "collectorSlot1"
        },
        "slot12": {
            type: "slot",
            x: 482+32,
            y: 274,
            size: 62,
            bitmap: "collectorSlot8"
        }
    }
});

IDRegistry.genBlockID("energyCollectorTier3");
Block.createBlock("energyCollectorTier3", [{
    name: "Energy Collector МК3",
    texture: [
        ["energyCollectorSide", 0],
        ["energyCollectorTop3", 0],
        ["energyCollectorFront", 0],
        ["energyCollectorSide", 0],
        ["energyCollectorSide", 0],
        ["energyCollectorSide", 0]
    ],
    inCreative: true
}]);
Translation.addTranslation("Energy Collector МК3", {
    ru: "Собиратель энергии МК3"
});

TileEntity.registerPrototype(BlockID.energyCollectorTier3, {
    defaultValues: {
        activeEnergy: 0,
        activeWandEnergy: 0,
        maxEnergy: 60000,
		maxWandEnergy: 0,
        sunTick: 10,
        shallMove: 0,
        needEnergy: 0,
        validTarget: 0,
        validID: 0,
        validData: 0,
        shallTransfer: 0,
        placeToTransfer: {
            x: 0,
            y: 0,
            z: 0
        },
		starPlaced: 0
    },
    created: function() {

    },
	getTransportSlots: function() {
        var inputA, outputA;
        for (i = 1; i < 17; i++) {
            inputA.push("slot" + i);
            outputA.push("slot" + i);
        }
		outputA.push("afterBurnSlot");
        return {
            input: inputA,
            output: outputA
        };
    },
    click: function(id, count, data, coords) {

    },
    checkForTransfer: function(){
		if (this.data.shallTransfer == 0) {
            if (((World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCollectorTier1 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCollectorTier2 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x + 1, this.y, this.z).data.shallTransfer == 0) || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.antiMatterTier1 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.antiMatterTier2 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.antiMatterTier3 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCondenser) {
                //Game.message("1");
                this.data.placeToTransfer.x = this.x + 1;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCollectorTier1 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCollectorTier2 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x - 1, this.y, this.z).data.shallTransfer == 0) || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.antiMatterTier1 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.antiMatterTier2 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.antiMatterTier3 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCondenser) {
                //Game.message("2");
                this.data.placeToTransfer.x = this.x - 1;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCollectorTier1 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCollectorTier2 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x, this.y, this.z + 1).data.shallTransfer == 0) || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.antiMatterTier1 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.antiMatterTier2 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.antiMatterTier3 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCondenser) {
                //Game.message("3");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z + 1;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCollectorTier1 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCollectorTier2 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x, this.y, this.z - 1).data.shallTransfer == 0) || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.antiMatterTier1 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.antiMatterTier2 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.antiMatterTier3 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCondenser) {
                //Game.message("4");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z - 1;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCollectorTier1 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCollectorTier2 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x, this.y - 1, this.z).data.shallTransfer == 0) || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.antiMatterTier1 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.antiMatterTier2 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.antiMatterTier3 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCondenser) {
                //Game.message("5");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y - 1;
                this.data.placeToTransfer.z = this.z;
                this.data.shallTransfer = 1;
            }
            if ( this.data.shallTransfer ==1 && World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) && (World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier1 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier2 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier3)) {
                //Game.message("Added 1");
                World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.sidesBusied++;
            }
        } else {
			blockHost = World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
            if (this.data.shallTransfer == 1 && this.data.placeToTransfer && blockHost != BlockID.energyCollectorTier1 && blockHost != BlockID.energyCollectorTier2 && blockHost != BlockID.energyCollectorTier3 && blockHost != BlockID.antiMatterTier1 && blockHost != BlockID.antiMatterTier2 && blockHost != BlockID.antiMatterTier3) {
                this.data.shallTransfer = 0;
				this.checkForTransfer();
            }
		}
	},	
    init: function() {
		
    },
    destroyBlock: function(coords, player) {
        if (World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier1 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier2 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier3) {
            World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.sidesBusied--;
        }
    },
    tick: function() {
        var mainContainer = this.container;
        if (World.getThreadTime() % 5 == 0) {
			if (World.getThreadTime() % 20 == 0) {
				for (i = 16; i > 0; i--) {
					if (mainContainer.getSlot("slot" + i).id == 0) {
						for (j = i - 1; j > 0; j--) {
							if (mainContainer.getSlot("slot" + j).id != 0) {
								mainContainer.getSlot("slot" + i).id = mainContainer.getSlot("slot" + j).id;
								mainContainer.getSlot("slot" + i).data = mainContainer.getSlot("slot" + j).data;
								mainContainer.getSlot("slot" + i).count = mainContainer.getSlot("slot" + j).count;
								mainContainer.clearSlot("slot" + j);
							}
						}
					}
				}
			}
			this.checkForTransfer();
            this.data.sunTick = nativeGetLightLevel(this.x, this.y + 1, this.z) / 15 * 10;
            if (this.data.shallTransfer == 0 || (World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"])==BlockID.energyCondenser && World.getTileEntity(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]).hasFreeSpace()==-1)) {
                if (this.data.activeEnergy < this.data.maxEnergy) this.data.activeEnergy += this.data.sunTick;
				if(mainContainer.getSlot("burnSlot").id!=0){
					if(kleinStarController.isStar(mainContainer.getSlot("burnSlot").id)){
						var wandData=mainContainer.getSlot("burnSlot").data;
						if(this.data.starPlaced==0){
							this.data.maxWandEnergy=kleinStarController.getMax(wandData);
						}
						var deltaEMC=kleinStarController.getMax(wandData)-kleinStarController.getEMC(wandData);
						if(deltaEMC>0){
							kleinStarController.addEMC(wandData, deltaEMC>this.data.activeEnergy?this.data.activeEnergy:deltaEMC);
							this.data.activeEnergy-=deltaEMC>this.data.activeEnergy?this.data.activeEnergy:deltaEMC;
							this.data.activeWandEnergy=kleinStarController.getEMC(wandData);
						}
						this.data.starPlaced=1;
					} else {
						if(this.data.starPlaced==1){
							this.data.maxWandEnergy=0;
							this.data.activeWandEnergy=0;
						}
						if (EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data] != undefined) {
							if (mainContainer.getSlot("targetSlot").id != 0) {
								if (this.data.validTarget == 0) {
									for (name in collectorRecipes) {
										if (mainContainer.getSlot("targetSlot").id == EMCSystem.collectorRecipes[name].resultid && mainContainer.getSlot("targetSlot").data == EMCSystem.collectorRecipes[name].resultdata) {
											for (name2 in collectorRecipes) {
												if (EMCSystem.collectorRecipes[name2].value >= EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].value) this.data.needEnergy += EMCSystem.collectorRecipes[name2].value;
											}
											this.data.validID = parseInt(name / 1000);
											this.data.validData = parseInt(name % 1000);
											this.data.validTarget = 1;
											this.data.
											break;
										}
									}
								}
							} else if (mainContainer.getSlot("targetSlot").id == 0 || mainContainer.getSlot("targetSlot").id != this.data.validID) {
								this.data.validTarget = 0;
								this.data.needEnergy = 0;
							}
							if (this.data.validTarget == 0) {
								var burnValue = EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].value;
								this.data.needEnergy = burnValue;
								if (this.data.activeEnergy >= burnValue) {
									if (mainContainer.getSlot("afterBurnSlot").id == 0) {
										mainContainer.getSlot("afterBurnSlot").id = EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultid;
										mainContainer.getSlot("afterBurnSlot").data = EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultdata;
										mainContainer.getSlot("afterBurnSlot").count = 1;
										mainContainer.getSlot("burnSlot").count--;
										mainContainer.validateSlot("burnSlot");
										this.data.activeEnergy -= burnValue;
									} else if (mainContainer.getSlot("afterBurnSlot").count == 64 ||
										mainContainer.getSlot("afterBurnSlot").id != EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultid ||
										mainContainer.getSlot("afterBurnSlot").data != EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultdata) {
										this.data.shallMove = 1;
									} else {
										mainContainer.getSlot("afterBurnSlot").count++;
										mainContainer.getSlot("burnSlot").count--;
										mainContainer.validateSlot("burnSlot");
										this.data.activeEnergy -= burnValue;
									}
								}
							} else {
								//var burnValue = EMCSystem.collectorRecipes[mainContainer.getSlot("targetSlot").id+""+mainContainer.getSlot("targetSlot").data].value;
								//this.data.needEnergy = burnValue;
								if (EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data] != undefined && EMCSystem.collectorRecipes[this.data.validID + "" + this.data.validData] != undefined) {
									if (this.data.activeEnergy >= this.data.needEnergy) {
										if (mainContainer.getSlot("afterBurnSlot").id == 0) {
											mainContainer.getSlot("afterBurnSlot").id = EMCSystem.collectorRecipes[this.data.validID + "" + this.data.validData].resultid;
											mainContainer.getSlot("afterBurnSlot").data = EMCSystem.collectorRecipes[this.data.validID + "" + this.data.validData].resultdata;
											mainContainer.getSlot("afterBurnSlot").count = 1;
											mainContainer.getSlot("burnSlot").count--;
											mainContainer.validateSlot("burnSlot");
											this.data.activeEnergy -= this.data.needEnergy;
										} else if (mainContainer.getSlot("afterBurnSlot").count == 64 ||
											mainContainer.getSlot("afterBurnSlot").id != EMCSystem.collectorRecipes[this.data.validID + "" + this.data.validData].resultid ||
											mainContainer.getSlot("afterBurnSlot").data != EMCSystem.collectorRecipes[this.data.validID + "" + this.data.validData].resultdata) {
											this.data.shallMove = 1;
										} else {
											mainContainer.getSlot("afterBurnSlot").count++;
											mainContainer.getSlot("burnSlot").count--;
											mainContainer.validateSlot("burnSlot");
											this.data.activeEnergy -= this.data.needEnergy;
										}
									}
								}
							}
						}
						if (this.data.shallMove == 1 || mainContainer.getSlot("afterBurnSlot").count == 64 || mainContainer.getSlot("burnSlot").id == 0) {
							for (i = 1; i < 17; i++) {
								if (mainContainer.getSlot("slot" + i).id == mainContainer.getSlot("afterBurnSlot").id && mainContainer.getSlot("slot" + i).data == mainContainer.getSlot("afterBurnSlot").data && mainContainer.getSlot("slot" + i) < 64) {
									if (mainContainer.getSlot("slot" + i).count + mainContainer.getSlot("afterBurnSlot").count <= 64) {
										mainContainer.getSlot("slot" + i).count += mainContainer.getSlot("afterBurnSlot").count;
									} else {
										mainContainer.getSlot("afterBurnSlot").count -= (64 - mainContainer.getSlot("afterBurnSlot").count);
										mainContainer.getSlot("slot" + i).count += (64 - mainContainer.getSlot("afterBurnSlot").count);
									}
								} else if (mainContainer.getSlot("slot" + i).id == 0) {
									mainContainer.getSlot("slot" + i).id = mainContainer.getSlot("afterBurnSlot").id;
									mainContainer.getSlot("slot" + i).data = mainContainer.getSlot("afterBurnSlot").data;
									mainContainer.getSlot("slot" + i).count = mainContainer.getSlot("afterBurnSlot").count;
									mainContainer.clearSlot("afterBurnSlot");
									mainContainer.validateSlot("slot" + i);
									break;
								}
							}
							mainContainer.validateSlot("afterBurnSlot");
							this.data.shallMove = 0;
						}
						if (mainContainer.getSlot("burnSlot").id == 0 && mainContainer.getSlot("slot16").id != 0 && EMCSystem.collectorRecipes[mainContainer.getSlot("slot16").id + "" + mainContainer.getSlot("slot16").data] != undefined) {
							mainContainer.getSlot("burnSlot").id = mainContainer.getSlot("slot16").id;
							mainContainer.getSlot("burnSlot").data = mainContainer.getSlot("slot16").data;
							mainContainer.getSlot("burnSlot").count = mainContainer.getSlot("slot16").count;
							mainContainer.clearSlot("slot16");
						}
					}
				} else {
					this.data.needEnergy=0;
				}
            } else {
                var center = World.getTileEntity(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
                if(World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"])!=BlockID.energyCondenser){
					if (center && (center.data.activeEnergy+this.data.sunTick) < center.data.maxEnergy) {
						center.data.activeEnergy += this.data.sunTick;
					}
				} else {
					this.data.activeEnergy+=this.data.sunTick;
					center.data.activeEnergy+=this.data.sunTick*2>this.data.activeEnergy?this.data.activeEnergy:this.data.sunTick*2;
					this.data.activeEnergy-=this.data.sunTick*2>this.data.activeEnergy?this.data.activeEnergy:this.data.sunTick*2;
				}
            }
            mainContainer.setScale("energy", this.data.maxEnergy==0?0:this.data.activeEnergy / this.data.maxEnergy);
            mainContainer.setText("energyValue", parseInt(this.data.activeEnergy));
            mainContainer.setScale("wandEnergy",  this.data.maxEnergy==0?0:this.data.activeWandEnergy / this.data.maxEnergy);
            mainContainer.setText("wandEnergyValue", this.data.maxEnergy==0?parseInt(this.data.needEnergy):parseInt(this.data.activeWandEnergy));
            mainContainer.setScale("burnScale", this.data.needEnergy == 0 ? 0 : this.data.activeEnergy / this.data.needEnergy);
            mainContainer.setScale("lightLevel", this.data.sunTick);
        }
    },
    getGuiScreen: function() {
        return energyCollectorUIT3;
    },

});

var energyCollectorUIT3 = new UI.StandartWindow();
energyCollectorUIT3.setContent({
    standart: {
        header: {
            text: {
                text: "Собиратель энергии МК3"
            },
            color: android.graphics.Color.rgb(0x47, 0x26, 0x0c)
        },
        inventory: {
            standart: true
        }
    },
    params: {
        textures: {},
    },
    drawing: [{
        type: "background",
        color: android.graphics.Color.rgb(198, 198, 198)
    }, {
        type: "bitmap",
        x: 365+32,
        y: 72,
        bitmap: "collector",
        scale: 3.5
    }],
    elements: {
        "lightLevel": {
            type: "scale",
            x: 788+32,
            y: 180,
            direction: 1,
            bitmap: "collectorSunOn",
            scale: 3.5,
            value: 1
        },
        "burnScale": {
            type: "scale",
            x: 835+32,
            y: 165,
            direction: 1,
            bitmap: "collectorProcess",
            scale: 3.5,
            value: 0
        },
        "burnSlot": {
            type: "slot",
            x: 781+32,
            y: 258,
            size: 62,
            bitmap: "collectorBurnSlot"
        },
        "afterBurnSlot": {
            type: "slot",
            x: 781+32,
            y: 100,
            size: 62,
            bitmap: "collectorAfterBurnSlot",
            clicker: {
                onClick: function(position, container, tileEntity) {
                    Player.getInventory().addItem(container.getSlot("afterBurnSlot").id, container.getSlot("afterBurnSlot").count, container.getSlot("afterBurnSlot").data);
                    container.clearSlot("afterBurnSlot");
                    container.validateSlot("afterBurnSlot");
                }
            }
        },
        "targetSlot": {
            type: "slot",
            x: 883+32,
            y: 181,
            size: 62,
            bitmap: "collectorTargetSlot"
        },
        "energy": {
            type: "scale",
            x: 575+32,
            y: 121,
            scale: 3.5,
            bitmap: "collectorBarFull",
            direction: 0,
            value: 0
        },
        "energyValue": {
            type: "text",
            x: 575+32,
            y: 173,
            width: 168,
            height: 30,
            text: ""
        },
        "wandEnergy": {
            type: "scale",
            x: 575+32,
            y: 261,
            scale: 3.5,
            direction: 0,
            bitmap: "collectorBarFull",
            value: 0
        },
        "wandEnergyValue": {
            type: "text",
            x: 575+32,
            y: 236,
            width: 168,
            height: 30,
            text: ""
        },
		"slot1": {
            type: "slot",
            x: 354-32,
            y: 82,
            size: 62,
            bitmap: "collectorSlot1"
        },
		"slot2": {
            type: "slot",
            x: 354+32,
            y: 82,
            size: 62,
            bitmap: "collectorSlot1"
        },
        "slot3": {
            type: "slot",
            x: 418+32,
            y: 82,
            size: 62,
            bitmap: "collectorSlot1"
        },
        "slot4": {
            type: "slot",
            x: 482+32,
            y: 82,
            size: 62,
            bitmap: "collectorSlot2"
        },
		"slot5": {
            type: "slot",
            x: 354-32,
            y: 146,
            size: 62,
            bitmap: "collectorSlot1"
        },
		"slot6": {
            type: "slot",
            x: 354+32,
            y: 146,
            size: 62,
            bitmap: "collectorSlot1"
        },
        "slot7": {
            type: "slot",
            x: 418+32,
            y: 146,
            size: 62,
            bitmap: "collectorSlot3"
        },
        "slot8": {
            type: "slot",
            x: 482+32,
            y: 146,
            size: 62,
            bitmap: "collectorSlot4"
        },
		"slot9": {
            type: "slot",
            x: 354-32,
            y: 210,
            size: 62,
            bitmap: "collectorSlot1"
        },
		"slot10": {
            type: "slot",
            x: 354+32,
            y: 210,
            size: 62,
            bitmap: "collectorSlot1"
        },
        "slot11": {
            type: "slot",
            x: 418+32,
            y: 210,
            size: 62,
            bitmap: "collectorSlot5"
        },
        "slot12": {
            type: "slot",
            x: 482+32,
            y: 210,
            size: 62,
            bitmap: "collectorSlot6"
        },
		"slot13": {
            type: "slot",
            x: 354-32,
            y: 274,
            size: 62,
            bitmap: "collectorSlot1"
        },
        "slot14": {
            type: "slot",
            x: 354+32,
            y: 274,
            size: 62,
            bitmap: "collectorSlot1"
        },
		 "slot15": {
            type: "slot",
            x: 418+32,
            y: 274,
            size: 62,
            bitmap: "collectorSlot1"
        },
        "slot16": {
            type: "slot",
            x: 482+32,
            y: 274,
            size: 62,
            bitmap: "collectorSlot8"
        }
		
    }
});

IDRegistry.genBlockID("antiMatterTier1");
Block.createBlock("antiMatterTier1", [{
    name: "Antimatter Relay МК1",
    texture: [
        ["AntimatterRelaySide", 0],
        ["AntimatterRelayTop1", 0],
        ["AntimatterRelayFront", 0],
        ["AntimatterRelaySide", 0],
        ["AntimatterRelaySide", 0],
        ["AntimatterRelaySide", 0]
    ],
    inCreative: true
}]);
Translation.addTranslation("Antimatter Relay МК1", {
    ru: "Реле антиматерии МК1"
});

TileEntity.registerPrototype(BlockID.antiMatterTier1, {
    defaultValues: {
        activeEnergy: 0,
        activeWandEnergy: 0,
        maxEnergy: 100000,
		maxWandEnergy: 0,
        sidesBusied: 0,
        additional: 1 / 4,
        validBurnItem: 0,
		starPlaced: 0,
        isTransfering: 0,
        placeToTransfer: {
            x: 0,
            y: 0,
            z: 0
        },
		transferSpeed: 64
    },
    created: function() {},
    click: function(id, count, data, coords) {

    },
	checkForTransfer: function(){
		if (this.data.isTransfering == 0) {
            if (World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCondenser) {
                //Game.message("1");
                this.data.placeToTransfer.x = this.x + 1;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z;
                this.data.isTransfering = 1;
            } else if (World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCondenser) {
                //Game.message("2");
                this.data.placeToTransfer.x = this.x - 1;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z;
                this.data.isTransfering = 1;
            } else if (World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCondenser) {
                //Game.message("3");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z + 1;
                this.data.isTransfering = 1;
            } else if (World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCondenser) {
                //Game.message("4");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z - 1;
                this.data.isTransfering = 1;
            } else if (World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCondenser) {
                //Game.message("5");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y - 1;
                this.data.placeToTransfer.z = this.z;
                this.data.isTransfering = 1;
            }
        } else {
			blockHost = World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
            if (this.data.isTransfering == 1 && blockHost != BlockID.energyCondenser) {
                this.data.isTransfering = 0;
				this.checkForTransfer();
            }
		}
	},	
	getTransportSlots: function() {
        var inputA, outputA;
        for (i = 1; i < 7; i++) {
            inputA.push("slot" + i);
        }
		inputA.push("burnSlot");
        return {
            input: inputA,
            output: outputA
        };
    },
    init: function() {

    },
    tick: function() {
        if (World.getThreadTime() % 5 == 0) {
			if (World.getThreadTime() % 20 == 0) {
				for (i = 6; i > 0; i--) {
					if (this.container.getSlot("slot" + i).id == 0) {
						for (j = i - 1; j > 0; j--) {
							if (this.container.getSlot("slot" + j).id != 0) {
								this.container.getSlot("slot" + i).id = this.container.getSlot("slot" + j).id;
								this.container.getSlot("slot" + i).data = this.container.getSlot("slot" + j).data;
								this.container.getSlot("slot" + i).count = this.container.getSlot("slot" + j).count;
								this.container.clearSlot("slot" + j);
							}
						}
					}
				}
				if (this.container.getSlot("burnSlot").id == 0 && this.container.getSlot("slot6").id != 0) {
					this.container.getSlot("burnSlot").id = this.container.getSlot("slot6").id;
					this.container.getSlot("burnSlot").data = this.container.getSlot("slot6").data;
					this.container.getSlot("burnSlot").count = this.container.getSlot("slot6").count;
					this.container.clearSlot("slot6");
				}
			}
            if (this.container.getSlot("burnSlot").id != 0 && !kleinStarController.isStar(this.container.getSlot("burnSlot").id) && getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data) != -1) {
                if (this.data.activeEnergy + getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data) <= this.data.maxEnergy) {
                    this.data.activeEnergy += getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data);
                    this.container.getSlot("burnSlot").count--;
                    this.container.validateSlot("burnSlot");

                }
                this.data.validBurnItem = 1;
            } else {
                this.data.validBurnItem = 0;
            }
            this.data.activeEnergy += this.data.activeEnergy < this.data.maxEnergy ? this.data.sidesBusied * this.data.additional : 0;
			
			if(kleinStarController.isStar(this.container.getSlot("wandSlot").id)){
				var wandData = this.container.getSlot("wandSlot").data;
				if(this.data.starPlaced==0){
					this.data.maxWandEnergy=kleinStarController.getMax(wandData);
				}
				var deltaEMC=kleinStarController.getMax(wandData)-kleinStarController.getEMC(wandData);
				if(deltaEMC>0){
					kleinStarController.addEMC(wandData, deltaEMC>this.data.activeEnergy?this.data.activeEnergy:deltaEMC);
					this.data.activeEnergy-=deltaEMC>this.data.activeEnergy?this.data.activeEnergy:deltaEMC;
				}
				this.data.activeWandEnergy=kleinStarController.getEMC(wandData);
				this.data.starPlaced=1;
			} else {
				this.data.maxWandEnergy=0;
				this.data.activeWandEnergy=0;
				this.data.starPlaced=0;
				this.checkForTransfer();
				if(this.data.isTransfering==1){
					//var activeEnergy = World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.activeEnergy;
					//var needEnergy = World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.itemInSlotValue;
					if(World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).hasFreeSpace()){
						World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.activeEnergy+=this.data.activeEnergy>this.data.transferSpeed?this.data.transferSpeed:this.data.activeEnergy;
						this.data.activeEnergy-=this.data.activeEnergy>this.data.transferSpeed?this.data.transferSpeed:this.data.activeEnergy;
					}
				}
			}
			
			this.container.setScale("wandCharging", this.data.maxWandEnergy==0?0:1);
			this.container.setText("chargingWandValue", this.data.activeWandEnergy );
			this.container.setScale("chargingWandBar", this.data.maxWandEnergy==0?0:this.data.activeWandEnergy/this.data.maxWandEnergy);
			
            this.container.setScale("mainEnergy", this.data.activeEnergy / this.data.maxEnergy);
            this.container.setText("mainEnergyValue", parseInt(this.data.activeEnergy));
            this.container.setScale("burn", this.data.validBurnItem);
			this.container.setScale("dechargingWandBar", 0);
            this.container.setText("dechargingWandValue", 0);

        }
    },
    getGuiScreen: function() {
        return antiMatterUI1;
    },

});

var antiMatterUI1 = new UI.StandartWindow();
antiMatterUI1.setContent({
    standart: {
        header: {
            text: {
                text: "Антивещественная печь МК1"
            },
            color: android.graphics.Color.rgb(0x47, 0x26, 0x0c)
        },
        inventory: {
            standart: true
        }
    },
    params: {
        textures: {},
    },
    drawing: [{
        type: "background",
        color: android.graphics.Color.rgb(198, 198, 198)
    }, {
        type: "bitmap",
        x:-48+128+ 365,
        y: 72,
        bitmap: "amSmallBg",
        scale: 3.5
    }],
    elements: {
        "mainEnergy": {
            type: "scale",
            x:-48+128+ 515,
            y: 82,
            direction: 0,
            bitmap: "amBigBarFull",
            scale: 3.5,
            value: 1
        },
        "mainEnergyValue": {
            type: "text",
            x:-48+128+ 652,
            y: 138,
            width: 168,
            height: 30,
            text: ""
        },
        "dechargingWandBar": {
            type: "scale",
            x:-48+128+ 516,
            y: 296,
            direction: 0,
            bitmap: "amSmallBarFull",
            scale: 3.5,
            value: 1
        },
        "dechargingWandValue": {
            type: "text",
            x:-48+128+ 547,
            y: 342,
            width: 168,
            height: 30,
            text: ""
        },
        "chargingWandBar": {
            type: "scale",
            x:-48+128+ 696,
            y: 296,
            direction: 0,
            bitmap: "amSmallBarFull",
            scale: 3.5,
            value: 1
        },
        "chargingWandValue": {
            type: "text",
            x:-48+128+ 727,
            y: 342,
            width: 168,
            height: 30,
            text: ""
        },
        "wandSlot": {
            type: "slot",
            x:-48+128+ 717,
            y: 195,
            size: 90,
            bitmap: "amResultSlot"
        },
        "burnSlot": {
            type: "slot",
            x:-48+128+ 509,
            y: 195,
            size: 90
        },
        "wandCharging": {
            type: "scale",
            x:-48+128+ 606,
            y: 215,
            scale: 3.5,
            direction: 0,
            bitmap: "amArrowFull",
            value: 1
        },
        "burn": {
            type: "scale",
            x:-48+128+ 527,
            y: 144,
            scale: 3.5,
            direction: 0,
            bitmap: "amBurnFull",
            value: 1
        },
        "slot1": {
            type: "slot",
            x:-48+128+ 382,
            y: 118,
            size: 64
        },
        "slot2": {
            type: "slot",
            x:-48+128+ 446,
            y: 118,
            size: 64
        },
        "slot3": {
            type: "slot",
            x:-48+128+ 382,
            y: 180,
            size: 64
        },
        "slot4": {
            type: "slot",
            x:-48+128+ 446,
            y: 180,
            size: 64
        },
        "slot5": {
            type: "slot",
            x:-48+128+ 382,
            y: 244,
            size: 64
        },
        "slot6": {
            type: "slot",
            x:-48+128+ 446,
            y: 244,
            size: 64
        }
    }
}); 

IDRegistry.genBlockID("antiMatterTier2");
Block.createBlock("antiMatterTier2", [{
    name: "Antimatter Relay МК2",
    texture: [
        ["AntimatterRelaySide", 0],
        ["AntimatterRelayTop2", 0],
        ["AntimatterRelayFront", 0],
        ["AntimatterRelaySide", 0],
        ["AntimatterRelaySide", 0],
        ["AntimatterRelaySide", 0]
    ],
    inCreative: true
}]);
Translation.addTranslation("Antimatter Relay МК2", {
    ru: "Реле антиматерии МК2"
});

TileEntity.registerPrototype(BlockID.antiMatterTier2, {
    defaultValues: {
        activeEnergy: 0,
        activeWandEnergy: 0,
        maxEnergy: 1000000,
		maxWandEnergy: 0,
        sidesBusied: 0,
        additional: 3 / 4,
        validBurnItem: 0,
		starPlaced: 0,
        isTransfering: 0,
        placeToTransfer: {
            x: 0,
            y: 0,
            z: 0
        },
		transferSpeed: 129
    },
    created: function() {},
    click: function(id, count, data, coords) {

    },
	checkForTransfer: function(){
		if (this.data.isTransfering == 0) {
            if (World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCondenser) {
                //Game.message("1");
                this.data.placeToTransfer.x = this.x + 1;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z;
                this.data.isTransfering = 1;
            } else if (World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCondenser) {
                //Game.message("2");
                this.data.placeToTransfer.x = this.x - 1;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z;
                this.data.isTransfering = 1;
            } else if (World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCondenser) {
                //Game.message("3");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z + 1;
                this.data.isTransfering = 1;
            } else if (World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCondenser) {
                //Game.message("4");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z - 1;
                this.data.isTransfering = 1;
            } else if (World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCondenser) {
                //Game.message("5");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y - 1;
                this.data.placeToTransfer.z = this.z;
                this.data.isTransfering = 1;
            }
        } else {
			blockHost = World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
            if (this.data.isTransfering == 1 && blockHost != BlockID.energyCondenser) {
                this.data.isTransfering = 0;
				this.checkForTransfer();
            }
		}
	},	
    getTransportSlots: function() {
        var inputA, outputA;
        for (i = 1; i < 13; i++) {
            inputA.push("slot" + i);
        }
		inputA.push("burnSlot");
        return {
            input: inputA,
            output: outputA
        };
    },
    init: function() {

    },
    tick: function() {
        if (World.getThreadTime() % 5 == 0) {
			if (World.getThreadTime() % 20 == 0) {
				for (i = 9; i > 0; i--) {
					if (this.container.getSlot("slot" + i).id == 0) {
						for (j = i - 1; j > 0; j--) {
							if (this.container.getSlot("slot" + j).id != 0) {
								this.container.getSlot("slot" + i).id = this.container.getSlot("slot" + j).id;
								this.container.getSlot("slot" + i).data = this.container.getSlot("slot" + j).data;
								this.container.getSlot("slot" + i).count = this.container.getSlot("slot" + j).count;
								this.container.clearSlot("slot" + j);
							}
						}
					}
				}
				if (this.container.getSlot("burnSlot").id == 0 && this.container.getSlot("slot9").id != 0) {
					this.container.getSlot("burnSlot").id = this.container.getSlot("slot9").id;
					this.container.getSlot("burnSlot").data = this.container.getSlot("slot9").data;
					this.container.getSlot("burnSlot").count = this.container.getSlot("slot9").count;
					this.container.clearSlot("slot9");
				}
			}
            if (this.container.getSlot("burnSlot").id != 0 && !kleinStarController.isStar(this.container.getSlot("burnSlot").id) && getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data) != -1) {
                if (this.data.activeEnergy + getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data) <= this.data.maxEnergy) {
                    this.data.activeEnergy += getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data);
                    this.container.getSlot("burnSlot").count--;
                    this.container.validateSlot("burnSlot");

                }
                this.data.validBurnItem = 1;
            } else {
                this.data.validBurnItem = 0;
            }
            this.data.activeEnergy += this.data.activeEnergy < this.data.maxEnergy ? this.data.sidesBusied * this.data.additional : 0;
			
			if(kleinStarController.isStar(this.container.getSlot("wandSlot").id)){
				var wandData = this.container.getSlot("wandSlot").data;
				if(this.data.starPlaced==0){
					this.data.maxWandEnergy=kleinStarController.getMax(wandData);
				}
				var deltaEMC=kleinStarController.getMax(wandData)-kleinStarController.getEMC(wandData);
				if(deltaEMC>0){
					kleinStarController.addEMC(wandData, deltaEMC>this.data.activeEnergy?this.data.activeEnergy:deltaEMC);
					this.data.activeEnergy-=deltaEMC>this.data.activeEnergy?this.data.activeEnergy:deltaEMC;
				}
				this.data.activeWandEnergy=kleinStarController.getEMC(wandData);
				this.data.starPlaced=1;
			} else {
				this.data.maxWandEnergy=0;
				this.data.activeWandEnergy=0;
				this.data.starPlaced=0;
				this.checkForTransfer();
				if(this.data.isTransfering==1){
					//var activeEnergy = World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.activeEnergy;
					//var needEnergy = World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.itemInSlotValue;
					if(World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).hasFreeSpace()){
						World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.activeEnergy+=this.data.activeEnergy>this.data.transferSpeed?this.data.transferSpeed:this.data.activeEnergy;
						this.data.activeEnergy-=this.data.activeEnergy>this.data.transferSpeed?this.data.transferSpeed:this.data.activeEnergy;
					}
				}
			}
			
			this.container.setScale("wandCharging", this.data.maxWandEnergy==0?0:1);
			this.container.setText("chargingWandValue", this.data.activeWandEnergy );
			this.container.setScale("chargingWandBar", this.data.maxWandEnergy==0?0:this.data.activeWandEnergy/this.data.maxWandEnergy);
			
            this.container.setScale("mainEnergy", this.data.activeEnergy / this.data.maxEnergy);
            this.container.setText("mainEnergyValue", parseInt(this.data.activeEnergy));
            this.container.setScale("burn", this.data.validBurnItem);
			this.container.setScale("dechargingWandBar", 0);
            this.container.setText("dechargingWandValue", 0);

        }
    },
    getGuiScreen: function() {
        return antiMatterUI2;
    },

});

var antiMatterUI2 = new UI.StandartWindow();
antiMatterUI2.setContent({
    standart: {
        header: {
            text: {
                text: "Антивещественная печь МК2"
            },
            color: android.graphics.Color.rgb(0x47, 0x26, 0x0c)
        },
        inventory: {
            standart: true
        }
    },
    params: {
        textures: {},
    },
    drawing: [{
        type: "background",
        color: android.graphics.Color.rgb(198, 198, 198)
    }, {
        type: "bitmap",
        x:-48+128+ 365,
        y: 72,
        bitmap: "amSmallBg",
        scale: 3.5
    }],
    elements: {
        "mainEnergy": {
            type: "scale",
            x:-48+128+ 515,
            y: 82,
            direction: 0,
            bitmap: "amBigBarFull",
            scale: 3.5,
            value: 1
        },
        "mainEnergyValue": {
            type: "text",
            x:-48+128+ 652,
            y: 138,
            width: 168,
            height: 30,
            text: ""
        },
        "dechargingWandBar": {
            type: "scale",
            x:-48+128+ 516,
            y: 296,
            direction: 0,
            bitmap: "amSmallBarFull",
            scale: 3.5,
            value: 1
        },
        "dechargingWandValue": {
            type: "text",
            x:-48+128+ 547,
            y: 342,
            width: 168,
            height: 30,
            text: ""
        },
        "chargingWandBar": {
            type: "scale",
            x:-48+128+ 696,
            y: 296,
            direction: 0,
            bitmap: "amSmallBarFull",
            scale: 3.5,
            value: 1
        },
        "chargingWandValue": {
            type: "text",
            x:-48+128+ 727,
            y: 342,
            width: 168,
            height: 30,
            text: ""
        },
        "wandSlot": {
            type: "slot",
            x:-48+128+ 717,
            y: 195,
            size: 90,
            bitmap: "amResultSlot"
        },
        "burnSlot": {
            type: "slot",
            x:-48+128+ 509,
            y: 195,
            size: 90
        },
        "wandCharging": {
            type: "scale",
            x:-48+128+ 606,
            y: 215,
            scale: 3.5,
            direction: 0,
            bitmap: "amArrowFull",
            value: 1
        },
        "burn": {
            type: "scale",
            x:-48+128+ 527,
            y: 144,
            scale: 3.5,
            direction: 0,
            bitmap: "amBurnFull",
            value: 1
        },
		"slot1": {
            type: "slot",
            x:-48+64+ 382,
            y: 118,
            size: 64
        },
        "slot2": {
            type: "slot",
            x:-48+128+ 382,
            y: 118,
            size: 64
        },
        "slot3": {
            type: "slot",
            x:-48+128+ 446,
            y: 118,
            size: 64
        },
		"slot4": {
            type: "slot",
            x:-48+64+ 382,
            y: 180,
            size: 64
        },
		"slot5": {
            type: "slot",
            x:-48+128+ 382,
            y: 180,
            size: 64
        },
        "slot6": {
            type: "slot",
            x:-48+128+ 446,
            y: 180,
            size: 64
        },
        "slot7": {
            type: "slot",
            x:-48+64+ 382,
            y: 244,
            size: 64
        },
		"slot8": {
            type: "slot",
            x:-48+128+ 382,
            y: 244,
            size: 64
        },
        "slot9": {
            type: "slot",
            x:-48+128+ 446,
            y: 244,
            size: 64
        }
    }
});

IDRegistry.genBlockID("antiMatterTier3");
Block.createBlock("antiMatterTier3", [{
    name: "Antimatter Relay МК3",
    texture: [
        ["AntimatterRelaySide", 0],
        ["AntimatterRelayTop3", 0],
        ["AntimatterRelayFront", 0],
        ["AntimatterRelaySide", 0],
        ["AntimatterRelaySide", 0],
        ["AntimatterRelaySide", 0]
    ],
    inCreative: true
}]);
Translation.addTranslation("Antimatter Relay МК3", {
    ru: "Реле антиматерии МК3"
});

TileEntity.registerPrototype(BlockID.antiMatterTier3, {
    defaultValues: {
        activeEnergy: 0,
        activeWandEnergy: 0,
        maxEnergy: 10000000,
		maxWandEnergy: 0,
        sidesBusied: 0,
        additional: 10 / 4,
        validBurnItem: 0,
		starPlaced: 0,
        isTransfering: 0,
        placeToTransfer: {
            x: 0,
            y: 0,
            z: 0
        },
		transferSpeed: 640
    },
    created: function() {},
    click: function(id, count, data, coords) {

    },
	checkForTransfer: function(){
		if (this.data.isTransfering == 0) {
            if (World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCondenser) {
                //Game.message("1");
                this.data.placeToTransfer.x = this.x + 1;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z;
                this.data.isTransfering = 1;
            } else if (World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCondenser) {
                //Game.message("2");
                this.data.placeToTransfer.x = this.x - 1;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z;
                this.data.isTransfering = 1;
            } else if (World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCondenser) {
                //Game.message("3");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z + 1;
                this.data.isTransfering = 1;
            } else if (World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCondenser) {
                //Game.message("4");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z - 1;
                this.data.isTransfering = 1;
            } else if (World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCondenser) {
                //Game.message("5");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y - 1;
                this.data.placeToTransfer.z = this.z;
                this.data.isTransfering = 1;
            }
        } else {
			blockHost = World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
            if (this.data.isTransfering == 1 && blockHost != BlockID.energyCondenser) {
                this.data.isTransfering = 0;
				this.checkForTransfer();
            }
		}
	},	
    getTransportSlots: function() {
        var inputA, outputA;
        for (i = 1; i < 21; i++) {
            inputA.push("slot" + i);
        }
		inputA.push("burnSlot");
        return {
            input: inputA,
            output: outputA
        };
    },
    init: function() {

    },
    tick: function() {
        if (World.getThreadTime() % 5 == 0) {
			if (World.getThreadTime() % 20 == 0) {
				for (i = 9; i > 0; i--) {
					if (this.container.getSlot("slot" + i).id == 0) {
						for (j = i - 1; j > 0; j--) {
							if (this.container.getSlot("slot" + j).id != 0) {
								this.container.getSlot("slot" + i).id = this.container.getSlot("slot" + j).id;
								this.container.getSlot("slot" + i).data = this.container.getSlot("slot" + j).data;
								this.container.getSlot("slot" + i).count = this.container.getSlot("slot" + j).count;
								this.container.clearSlot("slot" + j);
							}
						}
					}
				}
				if (this.container.getSlot("burnSlot").id == 0 && this.container.getSlot("slot20").id != 0) {
					this.container.getSlot("burnSlot").id = this.container.getSlot("slot20").id;
					this.container.getSlot("burnSlot").data = this.container.getSlot("slot20").data;
					this.container.getSlot("burnSlot").count = this.container.getSlot("slot20").count;
					this.container.clearSlot("slot20");
				}
			}
            if (this.container.getSlot("burnSlot").id != 0 && !kleinStarController.isStar(this.container.getSlot("burnSlot").id) && getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data) != -1) {
                if (this.data.activeEnergy + getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data) <= this.data.maxEnergy) {
                    this.data.activeEnergy += getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data);
                    this.container.getSlot("burnSlot").count--;
                    this.container.validateSlot("burnSlot");

                }
                this.data.validBurnItem = 1;
            } else {
                this.data.validBurnItem = 0;
            }
            this.data.activeEnergy += this.data.activeEnergy < this.data.maxEnergy ? this.data.sidesBusied * this.data.additional : 0;
			
			if(kleinStarController.isStar(this.container.getSlot("wandSlot").id)){
				var wandData = this.container.getSlot("wandSlot").data;
				if(this.data.starPlaced==0){
					this.data.maxWandEnergy=kleinStarController.getMax(wandData);
				}
				var deltaEMC=kleinStarController.getMax(wandData)-kleinStarController.getEMC(wandData);
				if(deltaEMC>0){
					kleinStarController.addEMC(wandData, deltaEMC>this.data.activeEnergy?this.data.activeEnergy:deltaEMC);
					this.data.activeEnergy-=deltaEMC>this.data.activeEnergy?this.data.activeEnergy:deltaEMC;
				}
				this.data.activeWandEnergy=kleinStarController.getEMC(wandData);
				this.data.starPlaced=1;
			} else {
				this.data.maxWandEnergy=0;
				this.data.activeWandEnergy=0;
				this.data.starPlaced=0;
				this.checkForTransfer();
				if(this.data.isTransfering==1){
					//var activeEnergy = World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.activeEnergy;
					//var needEnergy = World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.itemInSlotValue;
					if(World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).hasFreeSpace()){
						World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.activeEnergy+=this.data.activeEnergy>this.data.transferSpeed?this.data.transferSpeed:this.data.activeEnergy;
						this.data.activeEnergy-=this.data.activeEnergy>this.data.transferSpeed?this.data.transferSpeed:this.data.activeEnergy;
					}
				}
			}
			
			this.container.setScale("wandCharging", this.data.maxWandEnergy==0?0:1);
			this.container.setText("chargingWandValue", this.data.activeWandEnergy );
			this.container.setScale("chargingWandBar", this.data.maxWandEnergy==0?0:this.data.activeWandEnergy/this.data.maxWandEnergy);
			
            this.container.setScale("mainEnergy", this.data.activeEnergy / this.data.maxEnergy);
            this.container.setText("mainEnergyValue", parseInt(this.data.activeEnergy));
            this.container.setScale("burn", this.data.validBurnItem);
			this.container.setScale("dechargingWandBar", 0);
            this.container.setText("dechargingWandValue", 0);

        }
    },
    getGuiScreen: function() {
        return antiMatterUI3;
    },

});

var antiMatterUI3 = new UI.StandartWindow();
antiMatterUI3.setContent({
    standart: {
        header: {
            text: {
                text: "Антивещественная печь МК3"
            },
            color: android.graphics.Color.rgb(0x47, 0x26, 0x0c)
        },
        inventory: {
            standart: true
        }
    },
    params: {
        textures: {},
    },
    drawing: [{
        type: "background",
        color: android.graphics.Color.rgb(198, 198, 198)
    }, {
        type: "bitmap",
        x:-48+ 128+365,
        y: 72,
        bitmap: "amSmallBg",
        scale: 3.5
    }],
    elements: {
        "mainEnergy": {
            type: "scale",
            x:-48+128+ 515,
            y: 82,
            direction: 0,
            bitmap: "amBigBarFull",
            scale: 3.5,
            value: 1
        },
        "mainEnergyValue": {
            type: "text",
            x:-48+128+ 652,
            y: 138,
            width: 168,
            height: 30,
            text: ""
        },
        "dechargingWandBar": {
            type: "scale",
            x:-48+128+ 516,
            y: 296,
            direction: 0,
            bitmap: "amSmallBarFull",
            scale: 3.5,
            value: 1
        },
        "dechargingWandValue": {
            type: "text",
            x:-48+128+ 547,
            y: 342,
            width: 168,
            height: 30,
            text: ""
        },
        "chargingWandBar": {
            type: "scale",
            x:-48+128+ 696,
            y: 296,
            direction: 0,
            bitmap: "amSmallBarFull",
            scale: 3.5,
            value: 1
        },
        "chargingWandValue": {
            type: "text",
            x:-48+128+ 727,
            y: 342,
            width: 168,
            height: 30,
            text: ""
        },
        "wandSlot": {
            type: "slot",
            x:-48+128+ 717,
            y: 195,
            size: 90,
            bitmap: "amResultSlot"
        },
        "burnSlot": {
            type: "slot",
            x:-48+128+ 509,
            y: 195,
            size: 90
        },
        "wandCharging": {
            type: "scale",
            x:-48+128+ 606,
            y: 215,
            scale: 3.5,
            direction: 0,
            bitmap: "amArrowFull",
            value: 1
        },
        "burn": {
            type: "scale",
            x:-48+128+ 527,
            y: 144,
            scale: 3.5,
            direction: 0,
            bitmap: "amBurnFull",
            value: 1
        },
		"slot1": {
            type: "slot",
            x:-48+382,
            y: 118,
            size: 64
        },
        "slot2": {
            type: "slot",
            x:-48+64+ 382,
            y: 118,
            size: 64
        },
        "slot3": {
            type: "slot",
            x:-48+128+ 382,
            y: 118,
            size: 64
        },
        "slot4": {
            type: "slot",
            x:-48+128+ 446,
            y: 118,
            size: 64
        },
		"slot5": {
            type: "slot",
            x:-48+382,
            y: 180,
            size: 64
        },
		"slot6": {
            type: "slot",
            x:-48+64+ 382,
            y: 180,
            size: 64
        },
		"slot7": {
            type: "slot",
            x:-48+128+ 382,
            y: 180,
            size: 64
        },
        "slot8": {
            type: "slot",
            x:-48+128+ 446,
            y: 180,
            size: 64
        },
		"slot9": {
            type: "slot",
            x:-48+382,
            y: 244,
            size: 64
        },
		"slot10": {
            type: "slot",
            x:-48+64+ 382,
            y: 244,
            size: 64
        },
		"slot11": {
            type: "slot",
            x:-48+128+ 382,
            y: 244,
            size: 64
        },
        "slot12": {
            type: "slot",
            x:-48+128+ 446,
            y: 244,
            size: 64
        },
		"slot13": {
            type: "slot",
            x:-48+382,
            y: 308,
            size: 64
        },
		"slot14": {
            type: "slot",
            x:-48+64+ 382,
            y: 308,
            size: 64
        },
		"slot15": {
            type: "slot",
            x:-48+128+ 382,
            y: 308,
            size: 64
        },
        "slot16": {
            type: "slot",
            x:-48+128+ 446,
            y: 308,
            size: 64
        },
		"slot17": {
            type: "slot",
            x:-48+382,
            y: 372,
            size: 64
        },
		"slot18": {
            type: "slot",
            x:-48+64+ 382,
            y: 372,
            size: 64
        },
		"slot19": {
            type: "slot",
            x:-48+128+ 382,
            y: 372,
            size: 64
        },
        "slot20": {
            type: "slot",
            x:-48+128+ 446,
            y: 372,
            size: 64
        }
    }
});

ModAPI.registerAPI("EECore", {
    addItem: function(id, data, value) {
        EMCSystem.addItem(id, data, value);
    }
});

ModAPI.addAPICallback("EECore", function() {
    Logger.Log("Equivalent Exchange API is registred and can be accessed by ModAPI.requireAPI(\"EECore\")", LOGGER_TAG);
});

var kleinStarZeroDataCraft = function(api, field, result) {
	for (var i in field) {
		api.decreaseFieldSlot(i);
    };
	result.data=kleinStarController.registerWand(result);
}

var kleinStarEnergyCraft = function(api, field, result) {
	var craftedEMC=0;
	for (var i in field) {
		if(field[i].id!=0 && field[i].data!=0)craftedEMC+=kleinStarController.getEMC(field[i].data);
		api.decreaseFieldSlot(i);
    };
	Game.message("Was: "+result.data);
	result.data=kleinStarController.registerWand(result);
	Game.message("Become: "+result.data +" with "+kleinStarController.getEMC(result.data));
	kleinStarController.addEMC(result.data, craftedEMC);
	Game.message("Last one: "+kleinStarController.getEMC(result.data));
}

var philosopherStoneCraft = function(api, field, result) {
	for (var i in field) {
		if(field[i].id!=ItemID.philosopherStone)api.decreaseFieldSlot(i);
    };
	//Player.addItemToInventory(result.id, 1, newData);
}

var kleinStarController = {
	save: {
		uniqueID: 1
	},
	
	starIds: [],
	
	addStarId: function(id){
		this.starIds.push(id);
	},
	
	addEMC: function(data, amount){
		this.save[data].current+=amount;
	},
	
	extractEMC: function(data, amount){
		this.save[data].current-=amount;
	},
	
	extractAllEMC: function(data){
		this.save[data].current=0;
	},
	
	getEMC: function(data){
		return this.save[data].current;
	},
	
	getMax: function(data){
		return this.save[data].max;
	},
	
	getSavePack: function(){
		return this.save;
	},
	
	setSavePack: function(pack){
		this.save=pack?pack:{uniqueID: 1};
	},
	
	registerWand: function(wand){
		var maximum=((wand.id==ItemID.einStar?50000:(wand.id==ItemID.zweiStar?200000:(wand.id==ItemID.dreiStar?800000:(wand.id==ItemID.vierStar?3200000:(wand.id==ItemID.sphereStar?12800000:(wand.id==ItemID.omegaStar?51200000:0)))))));
		this.save[this.save.uniqueID]={};
		this.save[this.save.uniqueID].current=0;
		this.save[this.save.uniqueID].max=maximum;
		return this.save.uniqueID++;
	}, 

	isStar: function(id){
		return this.starIds.indexOf(id)==-1?false:true;
	}
};

Saver.addSavesScope("BackpacksScope",
    function read(scope) {
        EMCInSystem = scope.emc ? scope.emc : 0;
        learnedItems = scope.learned ? scope.learned : [];
		kleinStarController.setSavePack(scope.stars);
    },

    function save() {
        var save = {};
        save.emc = EMCInSystem;
        save.learned= learnedItems;
		save.stars = kleinStarController.getSavePack();
        return save;
    }
);

var EMCSystem = {
	
	collectorRecipes : {
		2631: {
			value: 32,
			resultid: 331,
			resultdata: 0
		},
		3310: {
			value: 64,
			resultid: 263,
			resultdata: 0
		},
		2630: {
			value: 64,
			resultid: 289,
			resultdata: 0
		},
		2890: {
			value: 192,
			resultid: 348,
			resultdata: 0
		},


		1520: {
			value: 192,
			resultid: 377,
			resultdata: 0,
		},
		3770: {
			value: 384,
			resultid: 173,
			resultdata: 0,
		},
		1730: {
			value: 384,
			resultid: 89,
			resultdata: 0,
		},
	},
	
	
	EMCForItems: [
	
	],
	
	
	learnedItems: [
	
	],
	
    addToCollector: function() {
        this.collectorRecipes[ItemID.alchemicalCoal + "0"] = {
            value: 64,
            resultid: 152,
            resultdata: 0,
        };

        this.collectorRecipes[ItemID.mobiusFuel + "0"] = {
            value: 2560,
            resultid: BlockID.alchemicalCoalBlock,
            resultdata: 0,
        };

        this.collectorRecipes[3480] = {
            value: 128,
            resultid: ItemID.alchemicalCoal,
            resultdata: 0,
        };

        this.collectorRecipes[890] = {
            value: 512,
            resultid: ItemID.mobiusFuel,
            resultdata: 0,
        };

        this.collectorRecipes[BlockID.alchemicalCoalBlock + "0"] = {
            value: 3584,
            resultid: ItemID.aeternalisFuel,
            resultdata: 0,
        };

        this.collectorRecipes[ItemID.aeternalisFuel + "0"] = {
            value: 10240,
            resultid: BlockID.mobiusFuelBlock,
            resultdata: 0,
        };

        this.collectorRecipes[BlockID.mobiusFuelBlock + "0"] = {
            value: 55296,
            resultid: BlockID.aeternalisFuelBlock,
            resultdata: 0,
        };
    },
    addItem: function(id, data, value) {
        this.EMCForItems.push({
            "id": id,
            "data": data,
            "value": value
        });
    },
    addEEItemsToList: function() {
        //Philosopher's Stone
        this.addItem(ItemID.philosopherStone, 0, 9984);
        //Antimatter3
        this.addItem(BlockID.antiMatterTier3, 0, 681281);
        //Antimatter2
        this.addItem(BlockID.antiMatterTier2, 0, 213889);
        //Antimatter1
        this.addItem(BlockID.antiMatterTier1, 0, 74177);
        //EnergyCollector3
        this.addItem(BlockID.energyCollectorTier3, 0, 710665);
        //EnergyCollector2
        this.addItem(BlockID.energyCollectorTier2, 0, 232969);
        //EnergyCollector1
        this.addItem(BlockID.energyCollectorTier1, 0, 82953);
        //energyCondenser
        this.addItem(BlockID.energyCondenser, 0, 42011);
        //energyCondenser
        this.addItem(BlockID.energyCondenser, 0, 42011);
        //TransmutationTable
        this.addItem(BlockID.TransmutationTable, 0, 42011);
        //Low Covalence
        this.addItem(ItemID.lowCovalenceDust, 0, 1);
        //Medium Covalence
        this.addItem(ItemID.mediumCovalenceDust, 0, 8);
        //High Covalence
        this.addItem(ItemID.highCovalenceDust, 0, 208);
        //Alchemist Coal
        this.addItem(ItemID.alchemicalCoal, 0, 512);
        //Mobius Fuel
        this.addItem(ItemID.mobiusFuel, 0, 2048);
        //aeternalis Fuel
        this.addItem(ItemID.aeternalisFuel, 0, 8192);
        //dark Matter
        this.addItem(ItemID.darkMatter, 0, 139264);
        //red Matter
        this.addItem(ItemID.darkMatter, 0, 466944);
        //Alch chest
        this.addItem(BlockID.alchemicalChest, 0, 8987);
        //Alchemist Coal Block
        this.addItem(BlockID.alchemicalCoalBlock, 0, 4608);
        //Mobius Coal Block
        this.addItem(BlockID.mobiusFuelBlock, 0, 18432);
        //Aeternalis Coal Block
        this.addItem(BlockID.aeternalisFuelBlock, 0, 73728);
		//Aeternalis Coal Block
        this.addItem(BlockID.aeternalisFuelBlock, 0, 73728);
		//Ein Star
        this.addItem(ItemID.einStar, 0, 24576);
		//Zwei Star
        this.addItem(ItemID.zweiStar, 0, 98304);
		//Drei Star
        this.addItem(ItemID.dreiStar, 0, 393216);
		//Vier Star
        this.addItem(ItemID.vierStar, 0, 1572864);
		//Sphere Star
        this.addItem(ItemID.sphereStar, 0, 6291456);
		//Omega Star
        this.addItem(ItemID.omegaStar, 0, 25165824);
		
    },
    addVanillaItemsToList: function() {
        //Stone
        this.addItem(1, 0, 1);
        //Grass
        this.addItem(2, 0, 1);
        //Dirt
        this.addItem(3, 0, 1);
        //Cobblestone
        this.addItem(4, 0, 1);
        //Wooden Planks 
        this.addItem(5, 0, 8);
        //Wooden Planks 
        this.addItem(5, 1, 8);
        //Wooden Planks 
        this.addItem(5, 2, 8);
        //Wooden Planks 
        this.addItem(5, 3, 8);
        //Sapling 
        this.addItem(6, 0, 8);
        //Sapling 
        this.addItem(6, 1, 8);
        //Sapling 
        this.addItem(6, 2, 8);
        //Sapling 
        this.addItem(6, 3, 8);
        //Bedrock
        this.addItem(7, 0, 100500);
        //Sand
        this.addItem(12, 0, 1);
        //Gravel
        this.addItem(13, 0, 4);
        //Wood 
        this.addItem(17, 0, 32);
        //Wood 
        this.addItem(17, 1, 32);
        //Wood 
        this.addItem(17, 2, 32);
        //Wood 
        this.addItem(17, 3, 32);
        //Leaves 
        this.addItem(18, 0, 1);
        //Leaves 
        this.addItem(18, 1, 1);
        //Leaves 
        this.addItem(18, 2, 1);
        //Leaves 
        this.addItem(18, 3, 1);
        //Glass
        this.addItem(20, 0, 1);
        //Lapis Lazuli Block
        this.addItem(22, 0, 7776);
        //Dispencer
        this.addItem(23, 0, 119);
        //Sandstone 
        this.addItem(24, 0, 4);
        //Sandstone 
        this.addItem(24, 1, 4);
        //Sandstone 
        this.addItem(24, 2, 4);
        //Note Block 
        this.addItem(25, 0, 128);
        //Powered Rail 
        this.addItem(27, 0, 2059);
        //Detector Rail 
        this.addItem(28, 0, 267);
        //Sticky Piston
        this.addItem(29, 0, 380);
        //Cobweb
        this.addItem(30, 0, 12);
        //Fern 
        this.addItem(31, 0, 1);
        //Fern 
        this.addItem(31, 1, 1);
        //Fern 
        this.addItem(31, 2, 1);
        //Fern 
        this.addItem(31, 3, 1);
        //Dead bush
        this.addItem(32, 0, 1);
        //Piston
        this.addItem(33, 0, 348);
        //Wool
        this.addItem(35, 0, 48);
        //Wool
        this.addItem(35, 1, 64);
        //Wool
        this.addItem(35, 2, 64);
        //Wool
        this.addItem(35, 3, 64);
        //Wool
        this.addItem(35, 4, 64);
        //Wool
        this.addItem(35, 5, 76);
        //Wool
        this.addItem(35, 6, 64);
        //Wool
        this.addItem(35, 7, 80);
        //Wool
        this.addItem(35, 8, 64);
        //Wool
        this.addItem(35, 9, 484);
        //Wool
        this.addItem(35, 10, 488);
        //Wool
        this.addItem(35, 11, 912);
        //Wool
        this.addItem(35, 12, 176);
        //Wool
        this.addItem(35, 13, 56);
        //Wool
        this.addItem(35, 14, 64);
        //Wool
        this.addItem(35, 15, 64);
        //Flower
        this.addItem(37, 0, 16);
        //Red Rose
        this.addItem(38, 0, 16);
        //Muchroom
        this.addItem(39, 0, 32);
        //Muchroom
        this.addItem(40, 0, 32);
        //Gold Block
        this.addItem(41, 0, 18432);
        //Iron Block
        this.addItem(42, 0, 2304);
        //Sand Slab
        this.addItem(44, 1, 2);
        //Brick Slab
        this.addItem(44, 4, 32);
        //Nether Slab
        this.addItem(44, 6, 2);
        //Quartz Slab
        this.addItem(44, 7, 512);
        //Brick Block
        this.addItem(45, 0, 64);
        //TNT
        this.addItem(46, 0, 964);
        //Bookshelf
        this.addItem(47, 0, 528);
        //Moss stone
        this.addItem(48, 0, 2);
        //Obsidian
        this.addItem(49, 0, 64);
        //Torch
        this.addItem(50, 0, 9);
        //Wooden stairs
        this.addItem(53, 0, 12);
        //Chest
        this.addItem(54, 0, 64);
        //Diamond block
        this.addItem(57, 0, 73728);
        //Workbench
        this.addItem(58, 0, 32);
        //Furnace
        this.addItem(61, 0, 8);
        //Ladder
        this.addItem(65, 0, 9);
        //Rail
        this.addItem(66, 0, 96);
        //Cobble stairs
        this.addItem(67, 0, 1);
        //Lever
        this.addItem(69, 0, 5);
        //Stone Pressure Plate
        this.addItem(70, 0, 2);
        //Wooden Pressure Plate
        this.addItem(72, 0, 16);
        //Redstone Torch
        this.addItem(76, 0, 68);
        //Button
        this.addItem(77, 0, 1);
        //Ice
        this.addItem(79, 0, 1);
        //Snow Block
        this.addItem(80, 0, 1);
        //Cactus
        this.addItem(81, 0, 8);
        //Clay
        this.addItem(82, 0, 64);
        //Jukebox
        this.addItem(84, 0, 8256);
        //Fence
        this.addItem(85, 0, 12);
        //Pumpkin
        this.addItem(86, 0, 144);
        //Netherrack
        this.addItem(87, 0, 1);
        //Soul sand
        this.addItem(88, 0, 49);
        //Glowstone
        this.addItem(89, 0, 1536);
        //Jack Lantern
        this.addItem(91, 0, 153);
        //Trap door
        this.addItem(96, 0, 24);
        //Mushroom big block
        this.addItem(99, 0, 1);
        //Mushroom big block
        this.addItem(100, 0, 1);
        //Iron Bar
        this.addItem(101, 0, 96);
        //Melon
        this.addItem(103, 0, 144);
        //Vine
        this.addItem(106, 0, 8);
        //Gate
        this.addItem(107, 0, 32);
        //Brick stairs
        this.addItem(108, 0, 96);
        //Stone brick stairs
        this.addItem(109, 0, 1);
        //Mycelium
        this.addItem(110, 0, 2);
        //Netherbrick
        this.addItem(112, 0, 4);
        //Netherbrick fence
        this.addItem(113, 0, 4);
        //Netherbrick stairs
        this.addItem(114, 0, 6);
        //Enchanting table
        this.addItem(116, 0, 16800);
        //Ender stone
        this.addItem(121, 0, 1);
        //Lamp off
        this.addItem(123, 0, 1792);
        //Lamp on
        this.addItem(124, 0, 1792);
        //Wooden slab
        this.addItem(126, 0, 4);
        //Wooden slab
        this.addItem(126, 1, 4);
        //Wooden slab
        this.addItem(126, 2, 4);
        //Wooden slab
        this.addItem(126, 3, 4);
        //Sandstone stairs
        this.addItem(128, 0, 6);
        //Ender chest
        this.addItem(130, 0, 2304);
        //Grapping hook
        this.addItem(131, 0, 134);
        //Emerald block
        this.addItem(133, 0, 147456);
        //Wooden stairs
        this.addItem(134, 0, 12);
        //Wooden stairs
        this.addItem(135, 0, 12);
        //Wooden stairs
        this.addItem(136, 0, 12);
        //Beacon
        this.addItem(138, 0, 139461);
        //Cobble fence
        this.addItem(139, 0, 1);
        //Moss fence
        this.addItem(139, 1, 2);
        //Wooden button
        this.addItem(143, 0, 8);
        //Anvil
        this.addItem(145, 0, 7936);
        //Trap chest
        this.addItem(146, 0, 198);
        //Gold plate
        this.addItem(147, 0, 4096);
        //Iron plate
        this.addItem(148, 0, 512);
        //Solar 
        this.addItem(151, 0, 783);
        //Redstone block
        this.addItem(152, 0, 576);
        //Hopper
        this.addItem(154, 0, 1344);
        //Quartz  block
        this.addItem(155, 0, 1024);
        //Quartz  block
        this.addItem(155, 1, 1024);
        //Quartz  block
        this.addItem(155, 2, 1024);
        //Quartz  stairs
        this.addItem(156, 0, 1536);
        //Activator rail
        this.addItem(157, 0, 268);
        //Dropper
        this.addItem(158, 0, 71);
        //Colored Clay
        this.addItem(159, 0, 64);
        //Colored Clay
        this.addItem(159, 1, 64);
        //Colored Clay
        this.addItem(159, 2, 64);
        //Colored Clay
        this.addItem(159, 3, 64);
        //Colored Clay
        this.addItem(159, 4, 64);
        //Colored Clay
        this.addItem(159, 5, 64);
        //Colored Clay
        this.addItem(159, 6, 64);
        //Colored Clay
        this.addItem(159, 7, 64);
        //Colored Clay
        this.addItem(159, 8, 64);
        //Colored Clay
        this.addItem(159, 9, 64);
        //Colored Clay
        this.addItem(159, 10, 64);
        //Colored Clay
        this.addItem(159, 11, 64);
        //Colored Clay
        this.addItem(159, 12, 64);
        //Colored Clay
        this.addItem(159, 13, 64);
        //Colored Clay
        this.addItem(159, 14, 64);
        //Colored Clay
        this.addItem(159, 15, 64);
        //Hay bale
        this.addItem(170, 0, 216);
        //WoolSmall
        this.addItem(171, 0, 32);
        //WoolSmall
        this.addItem(171, 1, 42);
        //WoolSmall
        this.addItem(171, 2, 42);
        //WoolSmall
        this.addItem(171, 3, 42);
        //WoolSmall
        this.addItem(171, 4, 42);
        //WoolSmall
        this.addItem(171, 5, 50);
        //WoolSmall
        this.addItem(171, 6, 42);
        //WoolSmall
        this.addItem(171, 7, 53);
        //WoolSmall
        this.addItem(171, 8, 42);
        //WoolSmall
        this.addItem(171, 9, 322);
        //WoolSmall
        this.addItem(171, 10, 325);
        //WoolSmall
        this.addItem(171, 11, 608);
        //WoolSmall
        this.addItem(171, 12, 117);
        //WoolSmall
        this.addItem(171, 13, 37);
        //WoolSmall
        this.addItem(171, 14, 42);
        //WoolSmall
        this.addItem(171, 15, 42);
        //HClay
        this.addItem(172, 0, 64);
        //Coal block
        this.addItem(173, 0, 1152);
        //Iron shovel
        this.addItem(256, 0, 264);
        //Iron pickaxe
        this.addItem(257, 0, 776);
        //Iron axe
        this.addItem(258, 0, 776);
        //Flint and steel
        this.addItem(259, 0, 260);
        //Apple
        this.addItem(260, 0, 128);
        //Bow
        this.addItem(261, 0, 48);
        //Arrow
        this.addItem(262, 0, 14);
        //Coal
        this.addItem(263, 0, 128);
        //Charcoal
        this.addItem(263, 1, 32);
        //Diamond
        this.addItem(264, 0, 8192);
        //Iron ingot
        this.addItem(265, 0, 256);
        //Gold ingot
        this.addItem(266, 0, 2048);
        //Iron sword
        this.addItem(267, 0, 516);
        //Wooden sword
        this.addItem(268, 0, 20);
        //Wooden shovel
        this.addItem(269, 0, 16);
        //Wooden pickaxe
        this.addItem(270, 0, 32);
        //Wooden axe
        this.addItem(271, 0, 32);
        //Stone sword
        this.addItem(272, 0, 6);
        //Stone shovel
        this.addItem(273, 0, 9);
        //Stone pickaxe
        this.addItem(274, 0, 11);
        //Stone axe
        this.addItem(275, 0, 11);
        //Diamond sword
        this.addItem(276, 0, 16388);
        //Diamond shovel
        this.addItem(277, 0, 8200);
        //Diamond pickaxe
        this.addItem(278, 0, 24854);
        //Diamond axe
        this.addItem(279, 0, 24854);
        //Stick
        this.addItem(280, 0, 4);
        //Bowl
        this.addItem(281, 0, 6);
        //Mushroom bowl
        this.addItem(282, 0, 70);
        //Gold sword
        this.addItem(283, 0, 4100);
        //Gold shovel
        this.addItem(284, 0, 2056);
        //Gold pickaxe
        this.addItem(285, 0, 6152);
        //Gold axe
        this.addItem(286, 0, 6152);
        //String
        this.addItem(287, 0, 12);
        //Feather
        this.addItem(288, 0, 48);
        //Gunpowder
        this.addItem(289, 0, 192);
        //Wooden hoe
        this.addItem(290, 0, 24);
        //Stone hoe
        this.addItem(291, 0, 10);
        //Iron hoe
        this.addItem(292, 0, 520);
        //Diamond hoe
        this.addItem(293, 0, 16392);
        //Gold hoe
        this.addItem(294, 0, 4104);
        //Wheat seed
        this.addItem(295, 0, 16);
        //Wheat
        this.addItem(296, 0, 24);
        //Bread
        this.addItem(297, 0, 72);
        //Leather helmet
        this.addItem(298, 0, 320);
        //Leather chest
        this.addItem(299, 0, 512);
        //Leather leg
        this.addItem(300, 0, 448);
        //Leather boots
        this.addItem(301, 0, 256);
        //Iron helmet
        this.addItem(306, 0, 1280);
        //Iron chest
        this.addItem(307, 0, 2048);
        //Iron leg
        this.addItem(308, 0, 1792);
        //Iron boots
        this.addItem(309, 0, 1024);
        //Diamond helmet
        this.addItem(310, 0, 40960);
        //Diamond chest
        this.addItem(311, 0, 65536);
        //Diamond leg
        this.addItem(312, 0, 57344);
        //Diamond boots
        this.addItem(313, 0, 32768);
        //Gold helmet
        this.addItem(314, 0, 10240);
        //Gold chest
        this.addItem(315, 0, 16384);
        //Gold leg
        this.addItem(316, 0, 14336);
        //Gold boots
        this.addItem(317, 0, 8192);
        //Flint
        this.addItem(318, 0, 4);
        //Raw pig
        this.addItem(319, 0, 64);
        //Fried pig
        this.addItem(320, 0, 64);
        //Painting
        this.addItem(321, 0, 80);
        //Gold apple
        this.addItem(322, 0, 16512);
        //Gold apple 2?
        this.addItem(322, 1, 147584);
        //Sign
        this.addItem(323, 0, 17);
        //Door
        this.addItem(324, 0, 48);
        //Bucket
        this.addItem(325, 0, 768);
        //Bucket water
        this.addItem(326, 0, 768);
        //Bucket lava
        this.addItem(327, 0, 832);
        //Minecart
        this.addItem(328, 0, 1280);
        //Saddle
        this.addItem(329, 0, 192);
        //Iron door
        this.addItem(330, 0, 1536);
        //Redstone
        this.addItem(331, 0, 64);
        //Snowball
        this.addItem(332, 0, 1);
        //Boat
        this.addItem(333, 0, 40);
        //Leather
        this.addItem(334, 0, 64);
        //Bucket milk
        this.addItem(335, 0, 784);
        //Brick
        this.addItem(336, 0, 16);
        //Clay 
        this.addItem(337, 0, 16);
        //Sugar cane
        this.addItem(338, 0, 32);
        //Paper
        this.addItem(339, 0, 32);
        //Book
        this.addItem(340, 0, 160);
        //Slime
        this.addItem(341, 0, 32);
        //Cart chest
        this.addItem(342, 0, 1344);
        //Cart furnace
        this.addItem(343, 0, 1288);
        //Egg
        this.addItem(344, 0, 32);
        //Compass
        this.addItem(345, 0, 1088);
        //Fishing rod
        this.addItem(346, 0, 36);
        //Clock
        this.addItem(347, 0, 8256);
        //Glowstone
        this.addItem(348, 0, 384);
        //Raw fish
        this.addItem(349, 0, 64);
        //Fried fish
        this.addItem(350, 0, 64);
        //Dye
        this.addItem(351, 0, 16);
        //Dye
        this.addItem(351, 1, 16);
        //Dye
        this.addItem(351, 2, 8);
        //Dye
        this.addItem(351, 3, 128);
        //Dye
        this.addItem(351, 4, 864);
        //Dye
        this.addItem(351, 5, 440);
        //Dye
        this.addItem(351, 6, 436);
        //Dye
        this.addItem(351, 7, 16);
        //Dye
        this.addItem(351, 8, 32);
        //Dye
        this.addItem(351, 9, 16);
        //Dye
        this.addItem(351, 10, 28);
        //Dye
        this.addItem(351, 11, 16);
        //Dye
        this.addItem(351, 12, 16);
        //Dye
        this.addItem(351, 13, 16);
        //Dye
        this.addItem(351, 14, 16);
        //Dye
        this.addItem(351, 15, 48);
        //Bone
        this.addItem(352, 0, 144);
        //Sugar
        this.addItem(353, 0, 32);
        //Cake
        this.addItem(354, 0, 216);
        //Bed
        this.addItem(355, 0, 168);
        //Continuer
        this.addItem(356, 0, 203);
        //Biscuit
        this.addItem(357, 0, 2);
        //Shears
        this.addItem(359, 0, 512);
        //Melon piece
        this.addItem(360, 0, 16);
        //Pumpkin seeds
        this.addItem(361, 0, 36);
        //Melon seeds
        this.addItem(362, 0, 16);
        //Raw cow
        this.addItem(363, 0, 64);
        //Fried cow
        this.addItem(364, 0, 64);
        //Raw chicken
        this.addItem(365, 0, 64);
        //Fried chicken
        this.addItem(366, 0, 64);
        //Rotten flesh
        this.addItem(367, 0, 32);
        //Ender pearl
        this.addItem(368, 0, 1024);
        //Blaze rod
        this.addItem(369, 0, 1536);
        //Ghast tear
        this.addItem(370, 0, 4096);
        //Gold  nugget
        this.addItem(371, 0, 227);
        //Nether wart
        this.addItem(372, 0, 24);
        //Water bottle
        this.addItem(373, 0, 1);
        //Empty bottle
        this.addItem(374, 0, 1);
        //Spider eye
        this.addItem(375, 0, 128);
        //Good spider eye
        this.addItem(376, 0, 192);
        //Blaze powder
        this.addItem(377, 0, 768);
        //Nether Cream
        this.addItem(378, 0, 800);
        //Brewing
        this.addItem(379, 0, 1539);
        //Crucible
        this.addItem(380, 0, 1792);
        //Ender eye
        this.addItem(381, 0, 1792);
        //Gli melon
        this.addItem(382, 0, 1832);
        //Magma ball
        this.addItem(385, 0, 330);
        //Book and quill
        this.addItem(386, 0, 224);
        //Emerald
        this.addItem(388, 0, 16384);
        //Frame
        this.addItem(389, 0, 96);
        //Pot
        this.addItem(390, 0, 48);
        //Carrot
        this.addItem(391, 0, 64);
        //Potato
        this.addItem(392, 0, 64);
        //Fried potato
        this.addItem(393, 0, 64);
        //Rotten potato
        this.addItem(394, 0, 64);
        //Empty map
        this.addItem(395, 0, 1344);
        //Gold carrot
        this.addItem(396, 0, 1880);
        //Carrot rod
        this.addItem(398, 0, 100);
        //Nether start
        this.addItem(399, 0, 139264);
        //Pumpkin pie
        this.addItem(400, 0, 208);
        //Comarator
        this.addItem(404, 0, 463);
        //Nether brick
        this.addItem(405, 0, 1);
        //Quartz
        this.addItem(406, 0, 256);
        //Cart tnt
        this.addItem(407, 0, 2244);
        //Cart hopper
        this.addItem(408, 0, 2624);
        //Iron horse
        this.addItem(417, 0, 2048);
        //Gold horse
        this.addItem(418, 0, 16384);
        //Diamond horse
        this.addItem(419, 0, 40960);
        //Povodok
        this.addItem(420, 0, 40);
    }
}