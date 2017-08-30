
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
