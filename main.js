var nativeGetLightLevel = ModAPI.requireGlobal("Level.getBrightness");

var minimumHeight;
var breakException = {};
var isFirstTimeHandChecked = false;
var GUI1, GUI2;
var PhStoneMobChangeButtonState = 0;
var screensize = {
    x: 0,
    y: 0
};
var EMCInSystem = 0;
var learnedItems = [];
var validItem = false;
var listSlotScale = 60;
var listSlotSpace = listSlotScale / 10;
var tTGuiOpened = false;
var tTSlotYSelected = false;
var activeItemCount = 1;
var maxActiveItemCount = 1;
var tTGuiFirstUpdate = false;
var addedValue = false;
//Fern, Tall Grass, Low Covalence Dust, Moss Stone
var EMCForItems = [{
        id: 4,
        data: 0,
        value: 65
    },
    {
        id: 44,
        data: 5,
        value: 1
    },
    {
        id: 41,
        data: 0,
        value: 1
    },
    {
        id: 31,
        data: 1,
        value: 1
    },
    {
        id: 31,
        data: 2,
        value: 1
    },
    {
        id: 31,
        data: 3,
        value: 1
    },
    {
        id: 32,
        data: 0,
        value: 1
    },
    {
        id: 44,
        data: 3,
        value: 1
    },
    {
        id: 3,
        data: 0,
        value: 1
    },
    {
        id: 2,
        data: 0,
        value: 1
    },
    {
        id: 20,
        data: 0,
        value: 1
    },
    {
        id: 79,
        data: 0,
        value: 1
    },
    {
        id: 18,
        data: 0,
        value: 1
    },
    {
        id: 18,
        data: 1,
        value: 1
    },
    {
        id: 18,
        data: 2,
        value: 1
    },
    {
        id: 18,
        data: 3,
        value: 1
    },
    {
        id: 161,
        data: 0,
        value: 1
    },
    {
        id: 161,
        data: 1,
        value: 1
    },
    {
        id: 110,
        data: 0,
        value: 1
    },
    {
        id: 87,
        data: 0,
        value: 1
    },
    {
        id: 12,
        data: 0,
        value: 1
    },
    {
        id: 1,
        data: 0,
        value: 1
    },
    {
        id: 80,
        data: 0,
        value: 1
    },
    {
        id: 12,
        data: 0,
        value: 1
    },
    {
        id: 67,
        data: 0,
        value: 1
    },
    {
        id: 98,
        data: 0,
        value: 1
    },
    {
        id: 98,
        data: 2,
        value: 1
    },
    {
        id: 98,
        data: 3,
        value: 1
    },
    {
        id: 109,
        data: 0,
        value: 1
    },
    {
        id: 121,
        data: 0,
        value: 1
    }
];
var collectorRecipes={
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
	}
};

IDRegistry.genItemID("PhilosopherStone");
Item.createItem("PhilosopherStone", "Философский камень", {
    name: "PhilosopherStone",
    meta: 0
}, {
    stack: 1
});

Callback.addCallback("LevelLoaded", function() {
    minimumHeight = UI.getScreenHeight() + EMCForItems.length * (listSlotScale + listSlotSpace);
    //Game.message(Item.getName(31,0,1));
    screensize = null;
    screensize = ModAPI.requireGlobal("GuiUtils.GetDisplaySize()");
});

Item.registerUseFunction("PhilosopherStone", function(coords, item, block) {
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
                if (block.data == 0) {
                    World.destroyBlock(coords.x, coords.y, coords.z, false);
                    World.setBlock(coords.x, coords.y, coords.z, 4, 0);
                }
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

            case 4:
                World.destroyBlock(coords.x, coords.y, coords.z, false);
                World.setBlock(coords.x, coords.y, coords.z, 1, 0);
                break;

            case 2:
                World.destroyBlock(coords.x, coords.y, coords.z, false);
                World.setBlock(coords.x, coords.y, coords.z, 12, 0);
                break;

            case 12:
                if (block.data == 0) {
                    World.destroyBlock(coords.x, coords.y, coords.z, false);
                    World.setBlock(coords.x, coords.y, coords.z, 2, 0);
                }
                break;

            case 13:
                World.destroyBlock(coords.x, coords.y, coords.z, false);
                World.setBlock(coords.x, coords.y, coords.z, 24, 0);
                break;

            case 87:
                World.destroyBlock(coords.x, coords.y, coords.z, false);
                World.setBlock(coords.x, coords.y, coords.z, 4, 0);
                break;
        }
    }
});

function PhStoneButtonsController(type) {
    if (type == 1) {
        var ctx = UI.getMcContext();
        Game.message(screensize[0] + ":" + screensize[1]);
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

            var layout2 = new android.widget.LinearLayout(ctx);
            layout2.setOrientation(1);
            var directory2 = PhStoneMobChangeButtonState == 0 ? new android.graphics.Bitmap.createScaledBitmap(new android.graphics.BitmapFactory.decodeFile("/sdcard/windows/BstSharedFolder/EEPE/gui/buttonMobChangeOff.png"), screensize[0] / 20, screensize[0] / 20, true) : new android.graphics.Bitmap.createScaledBitmap(new android.graphics.BitmapFactory.decodeFile("/sdcard/windows/BstSharedFolder/EEPE/gui/buttonMobChangeOn.png"), screensize[0] / 20, screensize[0] / 20, true);
            var img2 = new android.graphics.drawable.BitmapDrawable(directory);
            var image2 = new android.widget.ImageView(ctx);
            image2.setImageBitmap(directory2);
            image2.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg) {
                    Game.message("Looking for mob");
                    //Надо сделать превращение мобов
                }
            }));
            layout2.addView(image2);
            GUI2 = new android.widget.PopupWindow(layout2, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
            GUI2.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.RED));
            GUI2.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
        });
    } else {
        UI.run(function() {
            if (GUI1 != null) {
                GUI1.dismiss();
                GUI1 = null;
            }
            if (GUI2 != null) {
                GUI2.dismiss();
                GUI2 = null;
            }
        });
    }
}

Callback.addCallback("tick", function() {
    if (Player.getCarriedItem().id == ItemID.PhilosopherStone && !isFirstTimeHandChecked) {
        Game.message("Open GUI");
        PhStoneButtonsController(1);
        isFirstTimeHandChecked = true;
    } else if (Player.getCarriedItem().id != ItemID.PhilosopherStone && isFirstTimeHandChecked) {
        Game.message("Close GUI");
        PhStoneButtonsController(2);
        isFirstTimeHandChecked = false;
    }
});

IDRegistry.genBlockID("TransmutationTable");
Block.createBlock("TransmutationTable", [{
    name: "Стол трансмутаций",
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
        minHeight: UI.getScreenHeight() + EMCForItems.length * (listSlotScale + listSlotSpace)
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
                onClick: function(container) {
                    //Game.dialogMessage(JSON.stringify(container));
                    validItem = true;
                    burnSlot = container.getSlot("burnSlot");
                    try {
                        learnedItems.forEach(function(item, i, arr) {
                            if (item["id"] == burnSlot.id && +item["data"] == burnSlot.data) {
                                throw breakException;
                            }
                        });
                    } catch (e) {
                        if (e !== breakException) throw e;
                        validItem = false;
                    }
                    if (validItem) {
                        learnedItems.push({
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
                            container.setText("EMCValue", "ЕМС в системе:" + EMCInSystem);
                            /*.getGuiContent().elements["EMCValue"] = {
                                                                    type: "text",
                                                                    x: 365,
                                                                    y: 53,
                                                                    width: 300,
                                                                    height: 50,
                                                                    text: "ЕМС в системе:" + EMCInSystem
                                                                };*/
                        }
                    } catch (e) {
                        if (e !== breakException) throw e;
                    }
                    for (name in container.getGuiContent().elements) {
                        if (name.indexOf("slotOn") >= 0) {
                            container.getGuiContent().elements[name] = null;
                        }
                    }
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
            text: "ЕМС в системе:\n" + EMCInSystem
        },
        "addValue": {
            type: "text",
            x: 675,
            y: 25,
            width: 500,
            height: 23,
            text: ""
        }
    }
});

function updateAvailableItems(anotherContainer) {
    var posYForSlot = 110;
    var posXForButtons = 365;
    learnedItems.forEach(function(itemLocal, iLocal, arrLocal) {
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
                        var localX = this.rect.x;
                        var localY = this.rect.y;
                        try {
                            EMCForItems.forEach(function(item, i, arr) {
                                if (item["id"] == localId && item["data"] == localData) {
                                    maxActiveItemCount = Math.floor(EMCInSystem / item["value"]);
                                    activeItemCount = 1;
                                    throw breakException;
                                }
                            });
                        } catch (e) {
                            if (e != breakException) throw e;
                        }
                        container.getGuiContent().elements["buttonMinus"] = {
                            type: "button",
                            x: localX - 300,
                            y: localY,
                            bitmap: "buttonMinusOff",
                            bitmap2: "buttonMinusOn",
                            scale: 3.4,
                            clicker: {
                                onClick: function(container, tileEntity) {
                                    if (activeItemCount > 1) activeItemCount--;
                                    container.setText("currentAmountForItem", "Выбрано: " + activeItemCount);
                                    /*.getGuiContent().elements["currentAmountForItem"] = {
                                                                            type: "text",
                                                                            x: this.rect.x - 239 + 59.5,
                                                                            y: this.rect.y + 25,
                                                                            width: 183.6,
                                                                            heigth: 35,
                                                                            text: "Выбрано: " + activeItemCount
                                                                        };*/
                                }
                            }
                        };

                        container.getGuiContent().elements["currentAmountForItem"] = {
                            type: "text",
                            x: localX - 239,
                            y: localY + 25,
                            width: 183.6,
                            heigth: 35,
                            text: "Выбрано: " + activeItemCount
                        };

                        container.getGuiContent().elements["maxRangeForItem"] = {
                            type: "text",
                            x: localX - 239,
                            y: localY + 51,
                            width: 183.6,
                            heigth: 35,
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
                                    if (activeItemCount < maxActiveItemCount) activeItemCount++;
                                    container.setText("currentAmountForItem", "Выбрано: " + activeItemCount);
                                    /*.getGuiContent().elements["currentAmountForItem"] = {
                                                                            type: "text",
                                                                            x: this.rect.x - 239 + 59.5,
                                                                            y: this.rect.y + 25,
                                                                            width: 183.6,
                                                                            heigth: 35,
                                                                            text: "Выбрано: " + activeItemCount
                                                                        };*/
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
                                    EMCInSystem -= activeItemCount * emcValue;
                                    Player.getInventory().addItem(localId, activeItemCount, localData);
                                    container.setText("EMCValue", "ЕМС в системе:" + EMCInSystem);
                                    /*.getGuiContent().elements["EMCValue"] = {
                                                                            type: "text",
                                                                            x: 365,
                                                                            y: 53,
                                                                            width: 300,
                                                                            height: 50,
                                                                            text: "ЕМС в системе:" + EMCInSystem
                                                                        };*/
                                    for (name in container.getGuiContent().elements) {
                                        if (name.indexOf("slotOn") >= 0) {
                                            container.getGuiContent().elements[name] = null;
                                        }
                                    }
                                    clearAdditionalButtons(container);
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
                                    activeItemCount = maxActiveItemCount;
                                    container.setText("currentAmountForItem", "Выбрано: " + activeItemCount);
                                    /*getGuiContent().elements["currentAmountForItem"] = {
                                                                            type: "text",
                                                                            x: 426,
                                                                            y: this.rect.y + 25,
                                                                            width: 183.6,
                                                                            heigth: 35,
                                                                            text: "Выбрано: " + activeItemCount
                                                                        };*/
                                }
                            }
                        };

                        tTSlotYSelected = true;
                        updateAvailableItems(container);
                    }
                }
            };
            anotherContainer.getGuiContent().elements["slotOn" + posYForSlot] = slot;
            posYForSlot += (listSlotScale + listSlotSpace);
        }
    });
}

function sortLearnedItems() {
    learnedItems.sort(function(a, b) {
        if (Item.getName(a["id"], 0, a["data"]).toLowerCase() < Item.getName(b["id"], 0, b["data"]).toLowerCase()) return -1;
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
    tTSlotYSelected = false;
}

TileEntity.registerPrototype(BlockID.TransmutationTable, {
    defaultvalues: {},
    click: function(id, count, data, coords) {

    },
    tick: function() {
        if (this.container.getGuiContent() != null) {
            if (tTGuiFirstUpdate) {
                tTGuiFirstUpdate = false;
                updateAvailableItems(this.container);
            }
            if (!addedValue && this.container.getSlot("burnSlot").id != 0) {
                var emcValue = getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data);
                this.container.setText("addValue", emcValue == -1 ? "Нельзя сжечь" : "+ " + emcValue * this.container.getSlot("burnSlot").count);
                //this.container.setFont("addValue", emcValue == -1 ? android.graphics.Color.BLACK : android.graphics.Color.rgb(0x51, 0x204, 0x255));
                addedValue = true;
            } else if (addedValue && this.container.getSlot("burnSlot").id == 0) {
				this.container.setText("addValue", "");
                addedValue = false;
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
        EMCForItems.forEach(function(item, i, arr) {
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
    name: "Конденсатор энергии",
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

TileEntity.registerPrototype(BlockID.energyCondenser, {
    defaultvalues: {
        currentEnergy: 0,
        itemInSlotId: 0,
        itemInSlotData: 0,
        itemInSlotValue: 0
    },
    created: function() {

    },
    click: function(id, count, data, coords) {

    },
    getTransportSlots: function() {
        return {
            input: ["slot1", "slot2", "slot3", "slot4", "slot5", "slot6", "slot7", "slot8", "slot9", "slot10", "slot11", "slot12", "slot13", "slot14", "slot15", "slot16", "slot17", "slot18", "slot19", "slot20", "slot21", "slot22", "slot23", "slot24", "slot25", "slot26", "slot27", "slot28", "slot29", "slot30", "slot31", "slot32", "slot33", "slot34", "slot35", "slot36", "slot37", "slot38", "slot39", "slot40", "slot41", "slot42", "slot43", "slot44", "slot45", "slot46", "slot47", "slot48", "slot49", "slot50", "slot51", "slot52", "slot53", "slot54", "slot55", "slot56", "slot57", "slot58", "slot59", "slot60", "slot61", "slot62", "slot63", "slot64", "slot65", "slot66", "slot67", "slot68", "slot69", "slot70", "slot71", "slot72", "slot73", "slot74", "slot75", "slot76", "slot77", "slot78", "slot79", "slot80", "slot81"],
            output: ["slot1", "slot2", "slot3", "slot4", "slot5", "slot6", "slot7", "slot8", "slot9", "slot10", "slot11", "slot12", "slot13", "slot14", "slot15", "slot16", "slot17", "slot18", "slot19", "slot20", "slot21", "slot22", "slot23", "slot24", "slot25", "slot26", "slot27", "slot28", "slot29", "slot30", "slot31", "slot32", "slot33", "slot34", "slot35", "slot36", "slot37", "slot38", "slot39", "slot40", "slot41", "slot42", "slot43", "slot44", "slot45", "slot46", "slot47", "slot48", "slot49", "slot50", "slot51", "slot52", "slot53", "slot54", "slot55", "slot56", "slot57", "slot58", "slot59", "slot60", "slot61", "slot62", "slot63", "slot64", "slot65", "slot66", "slot67", "slot68", "slot69", "slot70", "slot71", "slot72", "slot73", "slot74", "slot75", "slot76", "slot77", "slot78", "slot79", "slot80", "slot81"]
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
                if (this.data.currentEnergy < this.data.itemInSlotValue) {
                    for (i = 1; i < 92; i++) {
                        if (this.container.getSlot("slot" + i).id > 0 && (this.container.getSlot("slot" + i).id != this.data.itemInSlotId || this.container.getSlot("slot" + i).data != this.data.itemInSlotData)) {
                            var localEMC = getEMC(this.container.getSlot("slot" + i).id, this.container.getSlot("slot" + i).data);
                            if (localEMC != -1) {
                                this.container.getSlot("slot" + i).count -= 1;
                                this.container.validateSlot("slot" + i);
                                this.data.currentEnergy += localEMC;
                                this.container.applyChanges();
                                break;
                            }
                        }
                    }
                } else {
                    this.data.currentEnergy -= this.data.itemInSlotValue;
                    for (i = 1; i < 92; i++) {
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
                this.container.setScale("energyBarScale", this.data.currentEnergy / this.data.itemInSlotValue);
                this.container.setText("emcValue", this.data.currentEnergy + "/" + this.data.itemInSlotValue);
            }
        }
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
            bitmap: "condenserMainSlotClear"
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
    name: "Собиратель энергии МК1",
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

TileEntity.registerPrototype(BlockID.energyCollectorTier1, {
    defaultvalues: {
		activeSunEnergy: 0,
		activeEnergy: 0,
		maxEnergy: 100000,
		sunTick: 1,
		shallMove: 0,
		needEnergy: 0,
		validTarget: 0,
		validID: 0,
		validData: 0,
		shallTransfer: 0,
		placeToTransfer: {x:0, y:0, z:0}
    },
    created: function() {
		this.data.activeSunEnergy= 0;
		this.data.activeEnergy= 0;
		this.data.maxEnergy= 100000;
		this.data.sunTick= 1;
		this.data.shallMove= 0;
		this.data.needEnergy= 0;
		this.data.validTarget= 0;
		this.data.validID= 0;
		this.data.validData= 0;
		this.data.shallTransfer=0;
		this.data.placeToTransfer= {x:0, y:0, z:0}
		Game.message("Created");
    },
    click: function(id, count, data, coords) {

    },
    getTransportSlots: function() {
        
    },
	init: function(){
		Game.message("Init");
		if(this.data.shallTransfer==0){
			if(World.getBlockID(this.x+1, this.y, this.z)==BlockID.energyCollectorTier1 && World.getTileEntity(this.x+1, this.y, this.z) && World.getTileEntity(this.x+1, this.y, this.z).data.shallTransfer==0){
				this.data.placeToTransfer.x=this.x+1;
				this.data.placeToTransfer.y=this.y; 
				this.data.placeToTransfer.z=this.z;
				this.data.shallTransfer=1;
			} else if(World.getBlockID(this.x-1, this.y, this.z)==BlockID.energyCollectorTier1 && World.getTileEntity(this.x-1, this.y, this.z) && World.getTileEntity(this.x-1, this.y, this.z).data.shallTransfer==0){
				this.data.placeToTransfer.x=this.x-1;
				this.data.placeToTransfer.y=this.y; 
				this.data.placeToTransfer.z=this.z;
				this.data.shallTransfer=1;
				World.setBlock(this.data.placeToTransfer.x, this.data.placeToTransfer.y+1, this.data.placeToTransfer.z, 1);
			} else if(World.getBlockID(this.x, this.y, this.z+1)==BlockID.energyCollectorTier1 && World.getTileEntity(this.x, this.y, this.z+1) && World.getTileEntity(this.x, this.y, this.z+1).data.shallTransfer==0){
				this.data.placeToTransfer.x=this.x;
				this.data.placeToTransfer.y=this.y; 
				this.data.placeToTransfer.z=this.z+1;
				this.data.shallTransfer=1;
			} else if(World.getBlockID(this.x, this.y, this.z-1)==BlockID.energyCollectorTier1 && World.getTileEntity(this.x, this.y, this.z-1) && World.getTileEntity(this.x, this.y, this.z-1).data.shallTransfer==0){
				this.data.placeToTransfer.x=this.x;
				this.data.placeToTransfer.y=this.y; 
				this.data.placeToTransfer.z=this.z-1;
				this.data.shallTransfer=1;
			}else if(World.getBlockID(this.x, this.y-1, this.z)==BlockID.energyCollectorTier1 && World.getTileEntity(this.x, this.y-1, this.z) && World.getTileEntity(this.x, this.y-1, this.z).data.shallTransfer==0){
				this.data.placeToTransfer.x=this.x;
				this.data.placeToTransfer.y=this.y-1; 
				this.data.placeToTransfer.z=this.z;
				this.data.shallTransfer=1;
			}
		}
	},
    tick: function() {
		var mainContainer = this.container;
		if (World.getThreadTime() % 4 == 0){
			if(nativeGetLightLevel(this.x, this.y + 1, this.z) >= 14){
				mainContainer.setScale("lightLevel", 1);
				this.data.sunTick=1;
			} else {
				mainContainer.setScale("lightLevel", 0);
				this.data.sunTick=0;
			}		
			if(this.data.shallTransfer==0){
				if(this.data.activeSunEnergy<this.data.maxEnergy)this.data.activeSunEnergy+=this.data.sunTick;
				if(collectorRecipes[mainContainer.getSlot("burnSlot").id+""+mainContainer.getSlot("burnSlot").data]!=undefined){
					if(this.data.validTarget==0){
						var burnValue = collectorRecipes[mainContainer.getSlot("burnSlot").id+""+mainContainer.getSlot("burnSlot").data].value;
						this.data.needEnergy=burnValue;
						if(this.data.activeSunEnergy>=burnValue){
							if (mainContainer.getSlot("afterBurnSlot").id == 0) {
								mainContainer.getSlot("afterBurnSlot").id=collectorRecipes[mainContainer.getSlot("burnSlot").id+""+mainContainer.getSlot("burnSlot").data].resultid;
								mainContainer.getSlot("afterBurnSlot").data=collectorRecipes[mainContainer.getSlot("burnSlot").id+""+mainContainer.getSlot("burnSlot").data].resultdata;
								mainContainer.getSlot("afterBurnSlot").count=1;
								mainContainer.getSlot("burnSlot").count--;
								mainContainer.validateSlot("burnSlot");
								this.data.activeSunEnergy-=burnValue;
							} else if (mainContainer.getSlot("afterBurnSlot").count == 64 
										|| mainContainer.getSlot("afterBurnSlot").id!=collectorRecipes[mainContainer.getSlot("burnSlot").id+""+mainContainer.getSlot("burnSlot").data].resultid 
										|| mainContainer.getSlot("afterBurnSlot").data!=collectorRecipes[mainContainer.getSlot("burnSlot").id+""+mainContainer.getSlot("burnSlot").data].resultdata) {
								this.data.shallMove=1;
							} else {
								mainContainer.getSlot("afterBurnSlot").count++;
								mainContainer.getSlot("burnSlot").count--;
								mainContainer.validateSlot("burnSlot");
								this.data.activeSunEnergy-=burnValue;
							}
						}
					} else {
						//var burnValue = collectorRecipes[mainContainer.getSlot("targetSlot").id+""+mainContainer.getSlot("targetSlot").data].value;
						//this.data.needEnergy = burnValue;
						if(collectorRecipes[mainContainer.getSlot("burnSlot").id+""+mainContainer.getSlot("burnSlot").data]!=undefined && collectorRecipes[this.data.validID+""+this.data.validData]!=undefined){
							if(this.data.activeSunEnergy>=this.data.needEnergy){
								if (mainContainer.getSlot("afterBurnSlot").id == 0) {
									mainContainer.getSlot("afterBurnSlot").id=collectorRecipes[this.data.validID+""+this.data.validData].resultid;
									mainContainer.getSlot("afterBurnSlot").data=collectorRecipes[this.data.validID+""+this.data.validData].resultdata;
									mainContainer.getSlot("afterBurnSlot").count=1;
									mainContainer.getSlot("burnSlot").count--;
									mainContainer.validateSlot("burnSlot");
									this.data.activeSunEnergy-=this.data.needEnergy;
								} else if (mainContainer.getSlot("afterBurnSlot").count == 64 
											|| mainContainer.getSlot("afterBurnSlot").id!=collectorRecipes[this.data.validID+""+this.data.validData].resultid 
											|| mainContainer.getSlot("afterBurnSlot").data!=collectorRecipes[this.data.validID+""+this.data.validData].resultdata) {
									this.data.shallMove=1;
								} else {
									mainContainer.getSlot("afterBurnSlot").count++;
									mainContainer.getSlot("burnSlot").count--;
									mainContainer.validateSlot("burnSlot");
									this.data.activeSunEnergy-=this.data.needEnergy;
								}
							}
						}
					}
				} else {
					//this.data.needEnergy=0;
				}
				if(this.data.shallMove==1){
					for(i=1; i<9; i++){
						if(mainContainer.getSlot("slot"+i).id==mainContainer.getSlot("afterBurnSlot").id&&mainContainer.getSlot("slot"+i).data==mainContainer.getSlot("afterBurnSlot").data&&mainContainer.getSlot("slot"+i)<64){
							if(mainContainer.getSlot("slot"+i).count+mainContainer.getSlot("afterBurnSlot").count<=64){
								mainContainer.getSlot("slot"+i).count+=mainContainer.getSlot("afterBurnSlot").count;
							} else {
								mainContainer.getSlot("afterBurnSlot").count-=(64-mainContainer.getSlot("afterBurnSlot").count);
								mainContainer.getSlot("slot"+i).count+=(64-mainContainer.getSlot("afterBurnSlot").count);
							}
						} else if(mainContainer.getSlot("slot"+i).id==0){
							mainContainer.getSlot("slot"+i).id=mainContainer.getSlot("afterBurnSlot").id;
							mainContainer.getSlot("slot"+i).data=mainContainer.getSlot("afterBurnSlot").data;
							mainContainer.getSlot("slot"+i).count=mainContainer.getSlot("afterBurnSlot").count;
							mainContainer.clearSlot("afterBurnSlot");
							mainContainer.validateSlot("slot"+i);
							break;
						}
					}
					mainContainer.validateSlot("afterBurnSlot");
					this.data.shallMove=0;
				}
			} else {
				var center = World.getTileEntity(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
				if(center)center.data.activeSunEnergy+=this.data.sunTick;
			}
			mainContainer.setScale("sunEnergy", this.data.activeSunEnergy/this.data.maxEnergy);
			mainContainer.setText("sunEnergyValue", this.data.activeSunEnergy);
			mainContainer.setScale("energy", this.data.activeEnergy/this.data.maxEnergy);
			mainContainer.setText("energyValue", this.data.needEnergy);
			mainContainer.setScale("burnScale",  this.data.needEnergy==0?0:this.data.activeSunEnergy/this.data.needEnergy);
		} else if(World.getThreadTime() % 21 == 0){
			for(i=8; i>0; i--){
				if(mainContainer.getSlot("slot"+i).id==0){
					for(j=i-1; j>0; j--){
						if(mainContainer.getSlot("slot"+j).id!=0){
							mainContainer.getSlot("slot"+i).id=mainContainer.getSlot("slot"+j).id;
							mainContainer.getSlot("slot"+i).data=mainContainer.getSlot("slot"+j).data;
							mainContainer.getSlot("slot"+i).count=mainContainer.getSlot("slot"+j).count;
							mainContainer.clearSlot("slot"+j);
						}
					}
				}
			}
			if(mainContainer.getSlot("burnSlot").id==0 && mainContainer.getSlot("slot8").id!=0&&collectorRecipes[mainContainer.getSlot("slot8").id+""+mainContainer.getSlot("slot8").data]!=undefined){
				mainContainer.getSlot("burnSlot").id=mainContainer.getSlot("slot8").id;
				mainContainer.getSlot("burnSlot").data=mainContainer.getSlot("slot8").data;
				mainContainer.getSlot("burnSlot").count=mainContainer.getSlot("slot8").count;
				mainContainer.clearSlot("slot8");
			}
			if(mainContainer.getSlot("targetSlot").id!=0 && mainContainer.getSlot("burnSlot").id!=0){
				for(name in collectorRecipes){
					if(mainContainer.getSlot("targetSlot").id==collectorRecipes[name].resultid&&mainContainer.getSlot("targetSlot").data==collectorRecipes[name].resultdata){
						for(name2 in collectorRecipes){
							if(collectorRecipes[name2].value>=collectorRecipes[mainContainer.getSlot("burnSlot").id+""+mainContainer.getSlot("burnSlot").data].value)this.data.needEnergy+=collectorRecipes[name2].value;
						}
						this.data.validID=parseInt(name/1000);
						this.data.validData=parseInt(name%1000);
						this.data.validTarget=1;
						break;
					}
					this.data.validTarget=0;
					this.data.needEnergy=0;
				}
			} else if(mainContainer.getSlot("targetSlot").id==0){
				this.data.validTarget=0;
			}
			if(this.data.shallTransfer==1&&this.data.placeToTransfer!=undefined&&World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"])!=BlockID.energyCollectorTier1){
				//Game.message("All broken: "+this.data.shallTransfer+", "+JSON.stringify(this.data.placeToTransfer)+", "+World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"])+":"+BlockID.energyCollectorTier1);
				this.data.shallTransfer=0;
			}
		}
    },
    getGuiScreen: function() {
        return energyCollectorUI;
    },

});

var energyCollectorUI = new UI.StandartWindow();
energyCollectorUI.setContent({
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
        },{
			type: "bitmap", 
			x: 365, 
			y: 72, 
			bitmap: "collector", 
			scale: 3.5
		}
    ],
    elements: {
        "lightLevel": {
            type: "scale",
            x: 788,
            y: 180,
            direction: 1,
            bitmap: "collectorSunOn",
            scale: 3.5,
            value: 1
        },
		"burnScale": {
			type: "scale",
			x: 835, 
			y: 165,
			direction: 1,
			bitmap: "collectorProcess",
            scale: 3.5,
			value: 0
		},
		"burnSlot": {
			type: "slot",
			x: 781,
			y: 258,
			size: 62,
			bitmap: "collectorBurnSlot"
		},
		"afterBurnSlot": {
			type: "slot",
			x: 781,
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
			x: 883,
			y: 181,
			size: 62,
			bitmap: "collectorTargetSlot"
		},
		"sunEnergy": {
			type: "scale",
			x: 575,
			y: 121,
			scale: 3.5,
			bitmap: "collectorBarFull",
			direction: 0,
			value: 0
		},
		"sunEnergyValue": {
			type: "text",
			x: 575,
			y: 173,
			width: 168,
			height: 25,
			text: ""
		},
		"energy": {
			type: "scale",
			x: 575,
			y: 261,
			scale: 3.5,
			direction: 0,
			bitmap: "collectorBarFull",
			value: 0
		},
		"energyValue": {
			type: "text",
			x: 575,
			y: 236,
			width: 168,
			height: 25,
			text: ""
		},
        "slot1": {
            type: "slot",
            x: 418,
            y: 82,
            size: 62,
			bitmap: "collectorSlot1"
        },
        "slot2": {
            type: "slot",
            x: 482,
            y: 82,
            size: 62,
			bitmap: "collectorSlot2"
        },
        "slot3": {
            type: "slot",
            x: 418,
            y: 146,
            size: 62,
			bitmap: "collectorSlot3"
        },
        "slot4": {
            type: "slot",
            x: 482,
            y: 146,
            size: 62,
			bitmap: "collectorSlot4"
        },
        "slot5": {
            type: "slot",
            x: 418,
            y: 210,
            size: 62,
			bitmap: "collectorSlot5"
        },
        "slot6": {
            type: "slot",
            x: 482,
            y: 210,
            size: 62,
			bitmap: "collectorSlot6"
        },
        "slot7": {
            type: "slot",
            x: 418,
            y: 270,
            size: 62,
			bitmap: "collectorSlot1"
        },
        "slot8": {
            type: "slot",
            x: 482,
            y: 270,
            size: 62,
			bitmap: "collectorSlot8"
        }
    }
});
//}



