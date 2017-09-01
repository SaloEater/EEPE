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
        itemInSlotValue: 0,
		sidesBusied: 0,
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
