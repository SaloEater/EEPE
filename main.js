var LOGGER_TAG = "Equivalent Exchange";
var nativeGetLightLevel = ModAPI.requireGlobal("Level.getBrightness");
var valueButtonAllow=false;
var minimumHeight;
var breakException = {};
var handCheckerPS = false, valueBShowed=false;
var GUI1, GUI2, GUIEMC;
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
var activeScreen = "null";
var lastCoords={};
//Fern, Tall Grass, Low Covalence Dust, Moss Stone
var EMCForItems = [{
        id: 4,
        data: 0,
        value: 1
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
var collectorRecipes = {
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

function phStoneButtons(type) {
    if (type == 1) {
        var ctx = UI.getMcContext();
        //Game.message(screensize[0] + ":" + screensize[1]);
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
            GUI2.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, screensize[0] / 20);
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
    if (Player.getCarriedItem().id == ItemID.PhilosopherStone && !handCheckerPS) {
        Game.message("Open GUI");
        phStoneButtons(1);
        handCheckerPS = true;
    } else if (Player.getCarriedItem().id != ItemID.PhilosopherStone && handCheckerPS) {
        Game.message("Close GUI");
        phStoneButtons(2);
        handCheckerPS = false;
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
            var directory = new android.graphics.Bitmap.createScaledBitmap(new android.graphics.BitmapFactory.decodeFile("/sdcard/windows/BstSharedFolder/EEPE/gui/buttonValueOff.png"), screensize[0]  / 18, screensize[0]  / 18, true);
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

Callback.addCallback("ItemUse", function(coords, item, block){
	//Game.dialogMessage("Click: "+World.getTileEntity(coords.x, coords.y, coords.z));
	//for(n in World.getTileEntity(coords.x, coords.y, coords.z))Game.dialogMessage(n);
	if(World.getTileEntity(coords.x, coords.y, coords.z)){
		lastCoords.x=coords.x;
		lastCoords.y=coords.y;
		lastCoords.z=coords.z;
		invValueButton(1);
	}
});
 
Callback.addCallback("NativeGuiChanged", function(screenName) {
	if(screenName=="hud_screen" || screenName=="in_game_play_screen"){
		if(GUIEMC)invValueButton(2);
    } else {
		if(!GUIEMC)invValueButton(1);
    }
});

Callback.addCallback("tick", function() {
    if(World.getThreadTime()%10==0){
		if(lastCoords.x!=undefined) {
			//Game.message(World.getTileEntity(lastCoords.x, lastCoords.y, lastCoords.z).container.isOpened());
			if(World.getTileEntity(lastCoords.x, lastCoords.y, lastCoords.z)==undefined || World.getTileEntity(lastCoords.x, lastCoords.y, lastCoords.z).container==undefined || !World.getTileEntity(lastCoords.x, lastCoords.y, lastCoords.z).container.isOpened()){
				invValueButton(2);
			}
		}
	}
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
    elements: {
    }
};
var emcValuesWindow = new UI.StandartWindow(emcValuesContainer);


function inventoryToEMC(){
	var openedUI = new UI.Container();
	var nameX=50;
	var slotX=250;
	var valueX=400;
	var mainY=50;
	var spaceY=80;
	var slotsAdded=0;
	emcValuesContainer.elements={};
	var getSlotId = ModAPI.requireGlobal("Player.getInventorySlot");
	var getSlotCount = ModAPI.requireGlobal("Player.getInventorySlotCount");
	var getSlotData = ModAPI.requireGlobal("Player.getInventorySlotData");
	for(i=9; i<45; i++){
		if(getSlotId(i)!=0){
			emcValuesContainer.elements["slot"+i]={type: "slot", x: slotX, y: mainY+4, size: listSlotScale, visual: true};
			emcValuesContainer.elements["name"+i]={type: "text", x: nameX, y: mainY, text: "Предмет:  "+Item.getName(getSlotId(i), 0, getSlotData(i))};
			emcValuesContainer.elements["value"+i]={type: "text", x: valueX, y: mainY+35, text: getEMC(getSlotId(i), getSlotData(i))==-1?"Не зарегистрирован":"Ценность: "+getEMC(getSlotId(i), getSlotData(i))};
			mainY+=spaceY;
		}
	}
	emcValuesContainer.standart.minHeight = mainY+150;
	openedUI.openAs(emcValuesWindow);
	for(i=9; i<45; i++){
		if(getSlotId(i)!=0){
			openedUI.getSlot("slot"+i).id=getSlotId(i);
			openedUI.getSlot("slot"+i).data=getSlotData(i);
			openedUI.getSlot("slot"+i).count=0
		}
		mainY+=spaceY;
	}
}

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
                            container.setText("EMCValue", "ЕМС в системе:  " + EMCInSystem);
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
            text: "ЕМС в системе:  " + EMCInSystem
        },
        "addValue": {
            type: "text",
            x: 675,
            y: 23,
            width: 500,
            height: 25,
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
									Game.dialogMessage("AddMinus");
                                }
                            }
                        };

                        container.getGuiContent().elements["currentAmountForItem"] = {
                            type: "text",
                            x: localX - 239,
                            y: localY,
                            width: 185,
                            height: 35,
                            text: "Выбрано: " + activeItemCount
                        };

                        container.getGuiContent().elements["maxRangeForItem"] = {
                            type: "text",
                            x: localX - 239,
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
                                    if (activeItemCount < maxActiveItemCount) activeItemCount++;
                                    container.setText("currentAmountForItem", "Выбрано: " + activeItemCount);
									Game.dialogMessage("AddPlus");
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
                                    container.setText("EMCValue", "ЕМС в системе:  " + EMCInSystem);
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
									Game.dialogMessage("AddMax");
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
	//container.setText("maxRangeForItem", "");
    container.getGuiContent().elements["maxRangeForItem"] = null;
	//container.setText("currentAmountForItem", "322");
    container.getGuiContent().elements["currentAmountForItem"] = null;
	Game.dialogMessage("Cleared");
    container.getGuiContent().elements["getAmount"] = null;
    container.getGuiContent().elements["setMaxAmount"] = null;
	container.applyChanges();
    tTSlotYSelected = false;
}

TileEntity.registerPrototype(BlockID.TransmutationTable, {
    defaultValues: {
		open: false
	},
    click: function(id, count, data, coords) {

    },
    tick: function() {
        if (this.container.getGuiContent() != null) {
			this.container.setText("EMCValue", "ЕМС в системе:  " + EMCInSystem);
            if (tTGuiFirstUpdate) {
                tTGuiFirstUpdate = false;
                updateAvailableItems(this.container);
            }
            if (!addedValue && this.container.getSlot("burnSlot").id != 0) {
                var emcValue = getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data);
                this.container.setText("addValue", emcValue == -1 ? "Нельзя сжечь" : "+ " + emcValue * this.container.getSlot("burnSlot").count);
                this.container.setTextColor("addValue", emcValue == -1 ? android.graphics.Color.BLACK : android.graphics.Color.rgb(51, 204, 255));
                addedValue = true;
            } else if (addedValue && this.container.getSlot("burnSlot").id == 0) {
                this.container.setText("addValue", "");
                addedValue = false;
            }	
			this.data.open = true;
		} else if(this.data.open){
			clearAdditionalButtons(this.container);
			this.data.open=false;
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

Saver.addSavesScope("BackpacksScope",
    function read(scope){
        EMCInSystem=scope.emc?scope.emc:0;
		learnedItems=scope.learned?scope.learned:[];
    },
 
    function save(){
        var save={};
		save["emc"]=EMCInSystem;
		save["learned"]=learnedItems;
		return save;
    }
);


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
    defaultValues: {
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
		var inputA, outputA;
		for(i=1; i<82; i++){
			inputA.push("slot"+i);
			outputA.push("slot"+i);
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
    defaultValues: {
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
        placeToTransfer: {
            x: 0,
            y: 0,
            z: 0
        }
    },
    created: function() {

    },
    click: function(id, count, data, coords) {

    },
    getTransportSlots: function() {

    },
    init: function() {
        if (this.data.shallTransfer == 0) {
            if (((World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCollectorTier1 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCollectorTier2 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x + 1, this.y, this.z).data.shallTransfer == 0) || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.antiMatterTier1 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.antiMatterTier2 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.antiMatterTier3) {
                //Game.message("1");
                this.data.placeToTransfer.x = this.x + 1;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCollectorTier1 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCollectorTier2 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x - 1, this.y, this.z).data.shallTransfer == 0) || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.antiMatterTier1 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.antiMatterTier2 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.antiMatterTier3) {
                //Game.message("2");
                this.data.placeToTransfer.x = this.x - 1;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCollectorTier1 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCollectorTier2 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x, this.y, this.z + 1).data.shallTransfer == 0) || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.antiMatterTier1 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.antiMatterTier2 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.antiMatterTier3) {
                //Game.message("3");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z + 1;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCollectorTier1 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCollectorTier2 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x, this.y, this.z - 1).data.shallTransfer == 0) || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.antiMatterTier1 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.antiMatterTier2 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.antiMatterTier3) {
                //Game.message("4");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z - 1;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCollectorTier1 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCollectorTier2 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x, this.y - 1, this.z).data.shallTransfer == 0) || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.antiMatterTier1 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.antiMatterTier2 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.antiMatterTier3) {
                //Game.message("5");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y - 1;
                this.data.placeToTransfer.z = this.z;
                this.data.shallTransfer = 1;
            }
            //Game.message("Looking for another " + World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) + " on " + this.data.placeToTransfer.x + ":" + this.data.placeToTransfer.y + ":" + this.data.placeToTransfer.z);
            if (World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier1 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier2 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier3) {
                //Game.message("Added 1");
                World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.sidesBusied++;
            }
        }
        Game.message("MK1 is " + nativeGetLightLevel(this.x, this.y + 1, this.z) / 15);
    },
    destroyBlock: function(coords, player) {
        if (World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier1 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier2 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier3) {
            World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.sidesBusied--;
        }
    },
    tick: function() {
        var mainContainer = this.container;
        if (World.getThreadTime() % 4 == 0) {
            this.data.sunTick = nativeGetLightLevel(this.x, this.y + 1, this.z) / 15;
            if (this.data.shallTransfer == 0) {
                if (this.data.activeSunEnergy < this.data.maxEnergy) this.data.activeSunEnergy += this.data.sunTick;
                if (collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data] != undefined) {
                    if (this.data.validTarget == 0) {
                        var burnValue = collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].value;
                        this.data.needEnergy = burnValue;
                        if (this.data.activeSunEnergy >= burnValue) {
                            if (mainContainer.getSlot("afterBurnSlot").id == 0) {
                                mainContainer.getSlot("afterBurnSlot").id = collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultid;
                                mainContainer.getSlot("afterBurnSlot").data = collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultdata;
                                mainContainer.getSlot("afterBurnSlot").count = 1;
                                mainContainer.getSlot("burnSlot").count--;
                                mainContainer.validateSlot("burnSlot");
                                this.data.activeSunEnergy -= burnValue;
                            } else if (mainContainer.getSlot("afterBurnSlot").count == 64 ||
                                mainContainer.getSlot("afterBurnSlot").id != collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultid ||
                                mainContainer.getSlot("afterBurnSlot").data != collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultdata) {
                                this.data.shallMove = 1;
                            } else {
                                mainContainer.getSlot("afterBurnSlot").count++;
                                mainContainer.getSlot("burnSlot").count--;
                                mainContainer.validateSlot("burnSlot");
                                this.data.activeSunEnergy -= burnValue;
                            }
                        }
                    } else {
                        //var burnValue = collectorRecipes[mainContainer.getSlot("targetSlot").id+""+mainContainer.getSlot("targetSlot").data].value;
                        //this.data.needEnergy = burnValue;
                        if (collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data] != undefined && collectorRecipes[this.data.validID + "" + this.data.validData] != undefined) {
                            if (this.data.activeSunEnergy >= this.data.needEnergy) {
                                if (mainContainer.getSlot("afterBurnSlot").id == 0) {
                                    mainContainer.getSlot("afterBurnSlot").id = collectorRecipes[this.data.validID + "" + this.data.validData].resultid;
                                    mainContainer.getSlot("afterBurnSlot").data = collectorRecipes[this.data.validID + "" + this.data.validData].resultdata;
                                    mainContainer.getSlot("afterBurnSlot").count = 1;
                                    mainContainer.getSlot("burnSlot").count--;
                                    mainContainer.validateSlot("burnSlot");
                                    this.data.activeSunEnergy -= this.data.needEnergy;
                                } else if (mainContainer.getSlot("afterBurnSlot").count == 64 ||
                                    mainContainer.getSlot("afterBurnSlot").id != collectorRecipes[this.data.validID + "" + this.data.validData].resultid ||
                                    mainContainer.getSlot("afterBurnSlot").data != collectorRecipes[this.data.validID + "" + this.data.validData].resultdata) {
                                    this.data.shallMove = 1;
                                } else {
                                    mainContainer.getSlot("afterBurnSlot").count++;
                                    mainContainer.getSlot("burnSlot").count--;
                                    mainContainer.validateSlot("burnSlot");
                                    this.data.activeSunEnergy -= this.data.needEnergy;
                                }
                            }
                        }
                    }
                }
                if (this.data.shallMove == 1) {
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
            } else {
                var center = World.getTileEntity(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
                //Game.message("Was " + center.data.activeSunEnergy + ", added " + this.data.sunTick);
                if (center && center.data.activeSunEnergy < center.data.maxEnergy) {
                    center.data.activeSunEnergy += this.data.sunTick;
                }
            }
            mainContainer.setScale("sunEnergy", this.data.activeSunEnergy / this.data.maxEnergy);
            mainContainer.setText("sunEnergyValue", parseInt(this.data.activeSunEnergy));
            mainContainer.setScale("energy", this.data.activeEnergy / this.data.maxEnergy);
            mainContainer.setText("energyValue", parseInt(this.data.needEnergy));
            mainContainer.setScale("burnScale", this.data.needEnergy == 0 ? 0 : this.data.activeSunEnergy / this.data.needEnergy);
            mainContainer.setScale("lightLevel", this.data.sunTick)
        } else if (World.getThreadTime() % 21 == 0) {
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
            if (mainContainer.getSlot("burnSlot").id == 0 && mainContainer.getSlot("slot8").id != 0 && collectorRecipes[mainContainer.getSlot("slot8").id + "" + mainContainer.getSlot("slot8").data] != undefined) {
                mainContainer.getSlot("burnSlot").id = mainContainer.getSlot("slot8").id;
                mainContainer.getSlot("burnSlot").data = mainContainer.getSlot("slot8").data;
                mainContainer.getSlot("burnSlot").count = mainContainer.getSlot("slot8").count;
                mainContainer.clearSlot("slot8");
            }
            if (mainContainer.getSlot("targetSlot").id != 0 && mainContainer.getSlot("burnSlot").id != 0) {
                for (name in collectorRecipes) {
                    if (mainContainer.getSlot("targetSlot").id == collectorRecipes[name].resultid && mainContainer.getSlot("targetSlot").data == collectorRecipes[name].resultdata) {
                        for (name2 in collectorRecipes) {
                            if (collectorRecipes[name2].value >= collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].value) this.data.needEnergy += collectorRecipes[name2].value;
                        }
                        this.data.validID = parseInt(name / 1000);
                        this.data.validData = parseInt(name % 1000);
                        this.data.validTarget = 1;
                        break;
                    }
                    this.data.validTarget = 0;
                    this.data.needEnergy = 0;
                }
            } else if (mainContainer.getSlot("targetSlot").id == 0) {
                this.data.validTarget = 0;
            }
            blockHost = World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
            if (this.data.shallTransfer == 1 && this.data.placeToTransfer && blockHost != BlockID.energyCollectorTier1 && blockHost != BlockID.energyCollectorTier2 && blockHost != BlockID.energyCollectorTier3 && blockHost != BlockID.antiMatterTier1 && blockHost != BlockID.antiMatterTier2 && blockHost != BlockID.antiMatterTier3) {
                //Game.message("Stop transfer to " + this.data.placeToTransfer.x + ":" + this.data.placeToTransfer.y + ":" + this.data.placeToTransfer.z + "-" + blockHost);
                this.data.shallTransfer = 0;
            }
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
        x: 365,
        y: 72,
        bitmap: "collector",
        scale: 3.5
    }],
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

IDRegistry.genBlockID("energyCollectorTier2");
Block.createBlock("energyCollectorTier2", [{
    name: "Собиратель энергии МК2",
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

TileEntity.registerPrototype(BlockID.energyCollectorTier2, {
    defaultValues: {
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
        placeToTransfer: {
            x: 0,
            y: 0,
            z: 0
        }
    },
    created: function() {

    },
    click: function(id, count, data, coords) {

    },
    getTransportSlots: function() {

    },
    init: function() {
        if (this.data.shallTransfer == 0) {
            /*Game.message("1 - " + World.getBlockID(this.x + 1, this.y, this.z));
            Game.message("2 - " + World.getBlockID(this.x - 1, this.y, this.z));
            Game.message("3 - " + World.getBlockID(this.x, this.y, this.z + 1));
            Game.message("4 - " + World.getBlockID(this.x, this.y, this.z - 1));
            Game.message("5 - " + World.getBlockID(this.x, this.y - 1, this.z));
            Game.message("Looking for " + BlockID.antiMatterTier1);*/
            if (((World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCollectorTier1 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCollectorTier2 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x + 1, this.y, this.z).data.shallTransfer == 0) || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.antiMatterTier1 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.antiMatterTier2 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.antiMatterTier3) {
                //Game.message("1");
                this.data.placeToTransfer.x = this.x + 1;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCollectorTier1 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCollectorTier2 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x - 1, this.y, this.z).data.shallTransfer == 0) || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.antiMatterTier1 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.antiMatterTier2 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.antiMatterTier3) {
                //Game.message("2");
                this.data.placeToTransfer.x = this.x - 1;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCollectorTier1 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCollectorTier2 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x, this.y, this.z + 1).data.shallTransfer == 0) || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.antiMatterTier1 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.antiMatterTier2 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.antiMatterTier3) {
                //Game.message("3");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z + 1;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCollectorTier1 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCollectorTier2 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x, this.y, this.z - 1).data.shallTransfer == 0) || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.antiMatterTier1 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.antiMatterTier2 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.antiMatterTier3) {
                //Game.message("4");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z - 1;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCollectorTier1 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCollectorTier2 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x, this.y - 1, this.z).data.shallTransfer == 0) || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.antiMatterTier1 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.antiMatterTier2 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.antiMatterTier3) {
                //Game.message("5");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y - 1;
                this.data.placeToTransfer.z = this.z;
                this.data.shallTransfer = 1;
            }
            //Game.message("Looking for another " + World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) + " on " + this.data.placeToTransfer.x + ":" + this.data.placeToTransfer.y + ":" + this.data.placeToTransfer.z);
            if (World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier1 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier2 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier3) {
                //Game.message("Added 1");
                World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.sidesBusied++;
            }
        }
        Game.message("MK2 is " + nativeGetLightLevel(this.x, this.y + 1, this.z) / 15 * 3);
    },
    destroyBlock: function(coords, player) {
        if (World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier1 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier2 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier3) {
            World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.sidesBusied--;
        }
    },
    tick: function() {
        var mainContainer = this.container;
        if (World.getThreadTime() % 4 == 0) {
            this.data.sunTick = nativeGetLightLevel(this.x, this.y + 1, this.z) / 15 * 3;
            if (this.data.shallTransfer == 0) {
                if (this.data.activeSunEnergy < this.data.maxEnergy) this.data.activeSunEnergy += this.data.sunTick;
                if (collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data] != undefined) {
                    if (this.data.validTarget == 0) {
                        var burnValue = collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].value;
                        this.data.needEnergy = burnValue;
                        if (this.data.activeSunEnergy >= burnValue) {
                            if (mainContainer.getSlot("afterBurnSlot").id == 0) {
                                mainContainer.getSlot("afterBurnSlot").id = collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultid;
                                mainContainer.getSlot("afterBurnSlot").data = collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultdata;
                                mainContainer.getSlot("afterBurnSlot").count = 1;
                                mainContainer.getSlot("burnSlot").count--;
                                mainContainer.validateSlot("burnSlot");
                                this.data.activeSunEnergy -= burnValue;
                            } else if (mainContainer.getSlot("afterBurnSlot").count == 64 ||
                                mainContainer.getSlot("afterBurnSlot").id != collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultid ||
                                mainContainer.getSlot("afterBurnSlot").data != collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultdata) {
                                this.data.shallMove = 1;
                            } else {
                                mainContainer.getSlot("afterBurnSlot").count++;
                                mainContainer.getSlot("burnSlot").count--;
                                mainContainer.validateSlot("burnSlot");
                                this.data.activeSunEnergy -= burnValue;
                            }
                        }
                    } else {
                        //var burnValue = collectorRecipes[mainContainer.getSlot("targetSlot").id+""+mainContainer.getSlot("targetSlot").data].value;
                        //this.data.needEnergy = burnValue;
                        if (collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data] != undefined && collectorRecipes[this.data.validID + "" + this.data.validData] != undefined) {
                            if (this.data.activeSunEnergy >= this.data.needEnergy) {
                                if (mainContainer.getSlot("afterBurnSlot").id == 0) {
                                    mainContainer.getSlot("afterBurnSlot").id = collectorRecipes[this.data.validID + "" + this.data.validData].resultid;
                                    mainContainer.getSlot("afterBurnSlot").data = collectorRecipes[this.data.validID + "" + this.data.validData].resultdata;
                                    mainContainer.getSlot("afterBurnSlot").count = 1;
                                    mainContainer.getSlot("burnSlot").count--;
                                    mainContainer.validateSlot("burnSlot");
                                    this.data.activeSunEnergy -= this.data.needEnergy;
                                } else if (mainContainer.getSlot("afterBurnSlot").count == 64 ||
                                    mainContainer.getSlot("afterBurnSlot").id != collectorRecipes[this.data.validID + "" + this.data.validData].resultid ||
                                    mainContainer.getSlot("afterBurnSlot").data != collectorRecipes[this.data.validID + "" + this.data.validData].resultdata) {
                                    this.data.shallMove = 1;
                                } else {
                                    mainContainer.getSlot("afterBurnSlot").count++;
                                    mainContainer.getSlot("burnSlot").count--;
                                    mainContainer.validateSlot("burnSlot");
                                    this.data.activeSunEnergy -= this.data.needEnergy;
                                }
                            }
                        }
                    }
                }
                if (this.data.shallMove == 1) {
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
            } else {
                var center = World.getTileEntity(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
                //Game.message("Was " + center.data.activeSunEnergy + ", added " + this.data.sunTick);
                if (center && center.data.activeSunEnergy < center.data.maxEnergy) {
                    center.data.activeSunEnergy += this.data.sunTick;
                }
            }
            mainContainer.setScale("sunEnergy", this.data.activeSunEnergy / this.data.maxEnergy);
            mainContainer.setText("sunEnergyValue", parseInt(this.data.activeSunEnergy));
            mainContainer.setScale("energy", this.data.activeEnergy / this.data.maxEnergy);
            mainContainer.setText("energyValue", parseInt(this.data.needEnergy));
            mainContainer.setScale("burnScale", this.data.needEnergy == 0 ? 0 : this.data.activeSunEnergy / this.data.needEnergy);
            mainContainer.setScale("lightLevel", this.data.sunTick / 3);
        } else if (World.getThreadTime() % 21 == 0) {
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
            if (mainContainer.getSlot("burnSlot").id == 0 && mainContainer.getSlot("slot8").id != 0 && collectorRecipes[mainContainer.getSlot("slot8").id + "" + mainContainer.getSlot("slot8").data] != undefined) {
                mainContainer.getSlot("burnSlot").id = mainContainer.getSlot("slot8").id;
                mainContainer.getSlot("burnSlot").data = mainContainer.getSlot("slot8").data;
                mainContainer.getSlot("burnSlot").count = mainContainer.getSlot("slot8").count;
                mainContainer.clearSlot("slot8");
            }
            if (mainContainer.getSlot("targetSlot").id != 0 && mainContainer.getSlot("burnSlot").id != 0) {
                for (name in collectorRecipes) {
                    if (mainContainer.getSlot("targetSlot").id == collectorRecipes[name].resultid && mainContainer.getSlot("targetSlot").data == collectorRecipes[name].resultdata) {
                        for (name2 in collectorRecipes) {
                            if (collectorRecipes[name2].value >= collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].value) this.data.needEnergy += collectorRecipes[name2].value;
                        }
                        this.data.validID = parseInt(name / 1000);
                        this.data.validData = parseInt(name % 1000);
                        this.data.validTarget = 1;
                        break;
                    }
                    this.data.validTarget = 0;
                    this.data.needEnergy = 0;
                }
            } else if (mainContainer.getSlot("targetSlot").id == 0) {
                this.data.validTarget = 0;
            }
            blockHost = World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
            if (this.data.shallTransfer == 1 && this.data.placeToTransfer && (blockHost != BlockID.energyCollectorTier1 && blockHost != BlockID.energyCollectorTier2 && blockHost != BlockID.energyCollectorTier3 && blockHost != BlockID.antiMatterTier1 && blockHost != BlockID.antiMatterTier2 && blockHost != BlockID.antiMatterTier3)) {
                //Game.message("Stop transfer to " + this.data.placeToTransfer.x + ":" + this.data.placeToTransfer.y + ":" + this.data.placeToTransfer.z + "-" + World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]));
                this.data.shallTransfer = 0;
            }
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
        x: 365,
        y: 72,
        bitmap: "collector",
        scale: 3.5
    }],
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

IDRegistry.genBlockID("energyCollectorTier3");
Block.createBlock("energyCollectorTier3", [{
    name: "Собиратель энергии МК3",
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

TileEntity.registerPrototype(BlockID.energyCollectorTier3, {
    defaultValues: {
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
        placeToTransfer: {
            x: 0,
            y: 0,
            z: 0
        }
    },
    created: function() {

    },
    click: function(id, count, data, coords) {

    },
    getTransportSlots: function() {

    },
    init: function() {
        if (this.data.shallTransfer == 0) {
            /*Game.message("1 - " + World.getBlockID(this.x + 1, this.y, this.z));
            Game.message("2 - " + World.getBlockID(this.x - 1, this.y, this.z));
            Game.message("3 - " + World.getBlockID(this.x, this.y, this.z + 1));
            Game.message("4 - " + World.getBlockID(this.x, this.y, this.z - 1));
            Game.message("5 - " + World.getBlockID(this.x, this.y - 1, this.z));
            Game.message("Looking for " + BlockID.antiMatterTier1);*/
            if (((World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCollectorTier1 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCollectorTier2 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x + 1, this.y, this.z).data.shallTransfer == 0) || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.antiMatterTier1 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.antiMatterTier2 || World.getBlockID(this.x + 1, this.y, this.z) == BlockID.antiMatterTier3) {
                //Game.message("1");
                this.data.placeToTransfer.x = this.x + 1;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCollectorTier1 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCollectorTier2 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x - 1, this.y, this.z).data.shallTransfer == 0) || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.antiMatterTier1 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.antiMatterTier2 || World.getBlockID(this.x - 1, this.y, this.z) == BlockID.antiMatterTier3) {
                //Game.message("2");
                this.data.placeToTransfer.x = this.x - 1;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCollectorTier1 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCollectorTier2 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x, this.y, this.z + 1).data.shallTransfer == 0) || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.antiMatterTier1 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.antiMatterTier2 || World.getBlockID(this.x, this.y, this.z + 1) == BlockID.antiMatterTier3) {
                //Game.message("3");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z + 1;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCollectorTier1 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCollectorTier2 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x, this.y, this.z - 1).data.shallTransfer == 0) || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.antiMatterTier1 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.antiMatterTier2 || World.getBlockID(this.x, this.y, this.z - 1) == BlockID.antiMatterTier3) {
                //Game.message("4");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z - 1;
                this.data.shallTransfer = 1;
            } else if (((World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCollectorTier1 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCollectorTier2 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCollectorTier3) && World.getTileEntity(this.x, this.y - 1, this.z).data.shallTransfer == 0) || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.antiMatterTier1 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.antiMatterTier2 || World.getBlockID(this.x, this.y - 1, this.z) == BlockID.antiMatterTier3) {
                //Game.message("5");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y - 1;
                this.data.placeToTransfer.z = this.z;
                this.data.shallTransfer = 1;
            }
            //Game.message("Looking for another " + World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) + " on " + this.data.placeToTransfer.x + ":" + this.data.placeToTransfer.y + ":" + this.data.placeToTransfer.z);
            if (World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier1 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier2 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier3) {
                //Game.message("Added 1");
                World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.sidesBusied++;
            }
        }
        Game.message("MK3 is " + nativeGetLightLevel(this.x, this.y + 1, this.z) / 15 * 10);
    },
    destroyBlock: function(coords, player) {
        if (World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier1 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier2 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier3) {
            World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.sidesBusied--;
        }
    },
    tick: function() {
        var mainContainer = this.container;
        if (World.getThreadTime() % 4 == 0) {
            this.data.sunTick = nativeGetLightLevel(this.x, this.y + 1, this.z) / 15 * 10;
            if (this.data.shallTransfer == 0) {
                if (this.data.activeSunEnergy < this.data.maxEnergy) this.data.activeSunEnergy += this.data.sunTick;
                if (collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data] != undefined) {
                    if (this.data.validTarget == 0) {
                        var burnValue = collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].value;
                        this.data.needEnergy = burnValue;
                        if (this.data.activeSunEnergy >= burnValue) {
                            if (mainContainer.getSlot("afterBurnSlot").id == 0) {
                                mainContainer.getSlot("afterBurnSlot").id = collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultid;
                                mainContainer.getSlot("afterBurnSlot").data = collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultdata;
                                mainContainer.getSlot("afterBurnSlot").count = 1;
                                mainContainer.getSlot("burnSlot").count--;
                                mainContainer.validateSlot("burnSlot");
                                this.data.activeSunEnergy -= burnValue;
                            } else if (mainContainer.getSlot("afterBurnSlot").count == 64 ||
                                mainContainer.getSlot("afterBurnSlot").id != collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultid ||
                                mainContainer.getSlot("afterBurnSlot").data != collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultdata) {
                                this.data.shallMove = 1;
                            } else {
                                mainContainer.getSlot("afterBurnSlot").count++;
                                mainContainer.getSlot("burnSlot").count--;
                                mainContainer.validateSlot("burnSlot");
                                this.data.activeSunEnergy -= burnValue;
                            }
                        }
                    } else {
                        //var burnValue = collectorRecipes[mainContainer.getSlot("targetSlot").id+""+mainContainer.getSlot("targetSlot").data].value;
                        //this.data.needEnergy = burnValue;
                        if (collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data] != undefined && collectorRecipes[this.data.validID + "" + this.data.validData] != undefined) {
                            if (this.data.activeSunEnergy >= this.data.needEnergy) {
                                if (mainContainer.getSlot("afterBurnSlot").id == 0) {
                                    mainContainer.getSlot("afterBurnSlot").id = collectorRecipes[this.data.validID + "" + this.data.validData].resultid;
                                    mainContainer.getSlot("afterBurnSlot").data = collectorRecipes[this.data.validID + "" + this.data.validData].resultdata;
                                    mainContainer.getSlot("afterBurnSlot").count = 1;
                                    mainContainer.getSlot("burnSlot").count--;
                                    mainContainer.validateSlot("burnSlot");
                                    this.data.activeSunEnergy -= this.data.needEnergy;
                                } else if (mainContainer.getSlot("afterBurnSlot").count == 64 ||
                                    mainContainer.getSlot("afterBurnSlot").id != collectorRecipes[this.data.validID + "" + this.data.validData].resultid ||
                                    mainContainer.getSlot("afterBurnSlot").data != collectorRecipes[this.data.validID + "" + this.data.validData].resultdata) {
                                    this.data.shallMove = 1;
                                } else {
                                    mainContainer.getSlot("afterBurnSlot").count++;
                                    mainContainer.getSlot("burnSlot").count--;
                                    mainContainer.validateSlot("burnSlot");
                                    this.data.activeSunEnergy -= this.data.needEnergy;
                                }
                            }
                        }
                    }
                }
                if (this.data.shallMove == 1) {
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
            } else {
                var center = World.getTileEntity(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
                //Game.message("Was " + center.data.activeSunEnergy + ", added " + this.data.sunTick);
                if (center && center.data.activeSunEnergy < center.data.maxEnergy) {
                    center.data.activeSunEnergy += this.data.sunTick;
                }
            }
            mainContainer.setScale("sunEnergy", this.data.activeSunEnergy / this.data.maxEnergy);
            mainContainer.setText("sunEnergyValue", parseInt(this.data.activeSunEnergy));
            mainContainer.setScale("energy", this.data.activeEnergy / this.data.maxEnergy);
            mainContainer.setText("energyValue", parseInt(this.data.needEnergy));
            mainContainer.setScale("burnScale", this.data.needEnergy == 0 ? 0 : this.data.activeSunEnergy / this.data.needEnergy);
            mainContainer.setScale("lightLevel", this.data.sunTick / 10);
        } else if (World.getThreadTime() % 21 == 0) {
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
            if (mainContainer.getSlot("burnSlot").id == 0 && mainContainer.getSlot("slot8").id != 0 && collectorRecipes[mainContainer.getSlot("slot8").id + "" + mainContainer.getSlot("slot8").data] != undefined) {
                mainContainer.getSlot("burnSlot").id = mainContainer.getSlot("slot8").id;
                mainContainer.getSlot("burnSlot").data = mainContainer.getSlot("slot8").data;
                mainContainer.getSlot("burnSlot").count = mainContainer.getSlot("slot8").count;
                mainContainer.clearSlot("slot8");
            }
            if (mainContainer.getSlot("targetSlot").id != 0 && mainContainer.getSlot("burnSlot").id != 0) {
                for (name in collectorRecipes) {
                    if (mainContainer.getSlot("targetSlot").id == collectorRecipes[name].resultid && mainContainer.getSlot("targetSlot").data == collectorRecipes[name].resultdata) {
                        for (name2 in collectorRecipes) {
                            if (collectorRecipes[name2].value >= collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].value) this.data.needEnergy += collectorRecipes[name2].value;
                        }
                        this.data.validID = parseInt(name / 1000);
                        this.data.validData = parseInt(name % 1000);
                        this.data.validTarget = 1;
                        break;
                    }
                    this.data.validTarget = 0;
                    this.data.needEnergy = 0;
                }
            } else if (mainContainer.getSlot("targetSlot").id == 0) {
                this.data.validTarget = 0;
            }
            blockHost = World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
            if (this.data.shallTransfer == 1 && this.data.placeToTransfer && (blockHost != BlockID.energyCollectorTier1 && blockHost != BlockID.energyCollectorTier2 && blockHost != BlockID.energyCollectorTier3 && blockHost != BlockID.antiMatterTier1 && blockHost != BlockID.antiMatterTier2 && blockHost != BlockID.antiMatterTier3)) {
                //Game.message("Stop transfer to " + this.data.placeToTransfer.x + ":" + this.data.placeToTransfer.y + ":" + this.data.placeToTransfer.z + "-" + World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]));
                this.data.shallTransfer = 0;
            }
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
        x: 365,
        y: 72,
        bitmap: "collector",
        scale: 3.5
    }],
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

IDRegistry.genBlockID("antiMatterTier1");
Block.createBlock("antiMatterTier1", [{
    name: "Антивещественная печь МК1",
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

TileEntity.registerPrototype(BlockID.antiMatterTier1, {
    defaultValues: {
        activeSunEnergy: 0,
        activeEnergy: 0,
        maxEnergy: 100000,
        sidesBusied: 0,
        additional: 1 / 5,
        validBurnItem: 0
    },
    created: function() {},
    click: function(id, count, data, coords) {

    },
    getTransportSlots: function() {

    },
    init: function() {

    },
    tick: function() {
        if (World.getThreadTime() % 4 == 0) {
            if (this.container.getSlot("burnSlot").id != 0 && getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data) != -1) {
                if (this.data.activeSunEnergy + getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data) <= this.data.maxEnergy) {
                    this.data.activeSunEnergy += getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data);
                    this.container.getSlot("burnSlot").count--;
                    this.container.validateSlot("burnSlot");

                }
                this.data.validBurnItem = 1;
            } else {
                this.data.validBurnItem = 0;
            }
            this.data.activeSunEnergy += this.data.activeSunEnergy < this.data.maxEnergy ? this.data.sidesBusied * this.data.additional : 0;
            this.container.setScale("mainEnergy", this.data.activeSunEnergy / this.data.maxEnergy);
            this.container.setScale("chargingWandBar", 0);
            this.container.setScale("dechargingWandBar", 0);
            this.container.setScale("wandCharging", 1);
            this.container.setScale("burn", this.data.validBurnItem);
            this.container.setText("chargingWandValue", 0);
            this.container.setText("dechargingWandValue", 0);
            this.container.setText("mainEnergyValue", parseInt(this.data.activeSunEnergy));
            //Если в wandSlot есть klein star, то this.container.setScale("wandCharging", 1);
            //Если в wandSlot есть klein star, то this.container.setscale("chargingWandBar", /*энергия в палке*///*макс энергию*/);
            //Если в wandSlot есть klein star, то this.container.setscale("dechargingWandBar", /*энергия в палке*///*макс энергию*/);

        } else if (World.getThreadTime() % 21 == 0) {
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
        x: 365,
        y: 72,
        bitmap: "amSmallBg",
        scale: 3.5
    }],
    elements: {
        "mainEnergy": {
            type: "scale",
            x: 515,
            y: 82,
            direction: 0,
            bitmap: "amBigBarFull",
            scale: 3.5,
            value: 1
        },
        "mainEnergyValue": {
            type: "text",
            x: 652,
            y: 138,
            width: 168,
            height: 25,
            text: ""
        },
        "dechargingWandBar": {
            type: "scale",
            x: 516,
            y: 296,
            direction: 0,
            bitmap: "amSmallBarFull",
            scale: 3.5,
            value: 1
        },
        "dechargingWandValue": {
            type: "text",
            x: 547,
            y: 342,
            width: 168,
            height: 25,
            text: ""
        },
        "chargingWandBar": {
            type: "scale",
            x: 696,
            y: 296,
            direction: 0,
            bitmap: "amSmallBarFull",
            scale: 3.5,
            value: 1
        },
        "chargingWandValue": {
            type: "text",
            x: 727,
            y: 342,
            width: 168,
            height: 25,
            text: ""
        },
        "wandSlot": {
            type: "slot",
            x: 717,
            y: 195,
            size: 90,
            bitmap: "amResultSlot"
        },
        "burnSlot": {
            type: "slot",
            x: 509,
            y: 195,
            size: 90
        },
        "wandCharging": {
            type: "scale",
            x: 606,
            y: 215,
            scale: 3.5,
            direction: 0,
            bitmap: "amArrowFull",
            value: 1
        },
        "burn": {
            type: "scale",
            x: 527,
            y: 144,
            scale: 3.5,
            direction: 0,
            bitmap: "amBurnFull",
            value: 1
        },
        "slot1": {
            type: "slot",
            x: 382,
            y: 118,
            size: 64
        },
        "slot2": {
            type: "slot",
            x: 446,
            y: 118,
            size: 64
        },
        "slot3": {
            type: "slot",
            x: 382,
            y: 180,
            size: 64
        },
        "slot4": {
            type: "slot",
            x: 446,
            y: 180,
            size: 64
        },
        "slot5": {
            type: "slot",
            x: 382,
            y: 244,
            size: 64
        },
        "slot6": {
            type: "slot",
            x: 446,
            y: 244,
            size: 64
        }
    }
});

IDRegistry.genBlockID("antiMatterTier2");
Block.createBlock("antiMatterTier2", [{
    name: "Антивещественная печь МК2",
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

TileEntity.registerPrototype(BlockID.antiMatterTier2, {
    defaultValues: {
        activeSunEnergy: 0,
        activeEnergy: 0,
        maxEnergy: 100000,
        sidesBusied: 0,
        additional: 3 / 5,
        validBurnItem: 0
    },
    created: function() {},
    click: function(id, count, data, coords) {

    },
    getTransportSlots: function() {

    },
    init: function() {

    },
    tick: function() {
        if (World.getThreadTime() % 4 == 0) {
            if (this.container.getSlot("burnSlot").id != 0 && getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data) != -1) {
                if (this.data.activeSunEnergy + getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data) <= this.data.maxEnergy) {
                    this.data.activeSunEnergy += getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data);
                    this.container.getSlot("burnSlot").count--;
                    this.container.validateSlot("burnSlot");

                }
                this.data.validBurnItem = 1;
            } else {
                this.data.validBurnItem = 0;
            }
            this.data.activeSunEnergy += this.data.activeSunEnergy < this.data.maxEnergy ? this.data.sidesBusied * this.data.additional : 0;
            this.container.setScale("mainEnergy", this.data.activeSunEnergy / this.data.maxEnergy);
            this.container.setScale("chargingWandBar", 0);
            this.container.setScale("dechargingWandBar", 0);
            this.container.setScale("wandCharging", 1);
            this.container.setScale("burn", this.data.validBurnItem);
            this.container.setText("chargingWandValue", 0);
            this.container.setText("dechargingWandValue", 0);
            this.container.setText("mainEnergyValue", parseInt(this.data.activeSunEnergy));
            //Если в wandSlot есть klein star, то this.container.setScale("wandCharging", 1);
            //Если в wandSlot есть klein star, то this.container.setscale("chargingWandBar", /*энергия в палке*///*макс энергию*/);
            //Если в wandSlot есть klein star, то this.container.setscale("dechargingWandBar", /*энергия в палке*///*макс энергию*/);

        } else if (World.getThreadTime() % 21 == 0) {
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
        x: 365,
        y: 72,
        bitmap: "amSmallBg",
        scale: 3.5
    }],
    elements: {
        "mainEnergy": {
            type: "scale",
            x: 515,
            y: 82,
            direction: 0,
            bitmap: "amBigBarFull",
            scale: 3.5,
            value: 1
        },
        "mainEnergyValue": {
            type: "text",
            x: 652,
            y: 138,
            width: 168,
            height: 25,
            text: ""
        },
        "dechargingWandBar": {
            type: "scale",
            x: 516,
            y: 296,
            direction: 0,
            bitmap: "amSmallBarFull",
            scale: 3.5,
            value: 1
        },
        "dechargingWandValue": {
            type: "text",
            x: 547,
            y: 342,
            width: 168,
            height: 25,
            text: ""
        },
        "chargingWandBar": {
            type: "scale",
            x: 696,
            y: 296,
            direction: 0,
            bitmap: "amSmallBarFull",
            scale: 3.5,
            value: 1
        },
        "chargingWandValue": {
            type: "text",
            x: 727,
            y: 342,
            width: 168,
            height: 25,
            text: ""
        },
        "wandSlot": {
            type: "slot",
            x: 717,
            y: 195,
            size: 90,
            bitmap: "amResultSlot"
        },
        "burnSlot": {
            type: "slot",
            x: 509,
            y: 195,
            size: 90
        },
        "wandCharging": {
            type: "scale",
            x: 606,
            y: 215,
            scale: 3.5,
            direction: 0,
            bitmap: "amArrowFull",
            value: 1
        },
        "burn": {
            type: "scale",
            x: 527,
            y: 144,
            scale: 3.5,
            direction: 0,
            bitmap: "amBurnFull",
            value: 1
        },
        "slot1": {
            type: "slot",
            x: 382,
            y: 118,
            size: 64
        },
        "slot2": {
            type: "slot",
            x: 446,
            y: 118,
            size: 64
        },
        "slot3": {
            type: "slot",
            x: 382,
            y: 180,
            size: 64
        },
        "slot4": {
            type: "slot",
            x: 446,
            y: 180,
            size: 64
        },
        "slot5": {
            type: "slot",
            x: 382,
            y: 244,
            size: 64
        },
        "slot6": {
            type: "slot",
            x: 446,
            y: 244,
            size: 64
        }
    }
});

IDRegistry.genBlockID("antiMatterTier3");
Block.createBlock("antiMatterTier3", [{
    name: "Антивещественная печь МК3",
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

TileEntity.registerPrototype(BlockID.antiMatterTier3, {
    defaultValues: {
        activeSunEnergy: 0,
        activeEnergy: 0,
        maxEnergy: 100000,
        sidesBusied: 0,
        additional: 10 / 5,
        validBurnItem: 0
    },
    created: function() {},
    click: function(id, count, data, coords) {

    },
    getTransportSlots: function() {

    },
    init: function() {

    },
    tick: function() {
        if (World.getThreadTime() % 4 == 0) {
            if (this.container.getSlot("burnSlot").id != 0 && getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data) != -1) {
                if (this.data.activeSunEnergy + getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data) <= this.data.maxEnergy) {
                    this.data.activeSunEnergy += getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data);
                    this.container.getSlot("burnSlot").count--;
                    this.container.validateSlot("burnSlot");

                }
                this.data.validBurnItem = 1;
            } else {
                this.data.validBurnItem = 0;
            }
            this.data.activeSunEnergy += this.data.activeSunEnergy < this.data.maxEnergy ? this.data.sidesBusied * this.data.additional : 0;
            this.container.setScale("mainEnergy", this.data.activeSunEnergy / this.data.maxEnergy);
            this.container.setScale("chargingWandBar", 0);
            this.container.setScale("dechargingWandBar", 0);
            this.container.setScale("wandCharging", 1);
            this.container.setScale("burn", this.data.validBurnItem);
            this.container.setText("chargingWandValue", 0);
            this.container.setText("dechargingWandValue", 0);
            this.container.setText("mainEnergyValue", parseInt(this.data.activeSunEnergy));
            //Если в wandSlot есть klein star, то this.container.setScale("wandCharging", 1);
            //Если в wandSlot есть klein star, то this.container.setscale("chargingWandBar", /*энергия в палке*///*макс энергию*/);
            //Если в wandSlot есть klein star, то this.container.setscale("dechargingWandBar", /*энергия в палке*///*макс энергию*/);

        } else if (World.getThreadTime() % 21 == 0) {
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
        x: 365,
        y: 72,
        bitmap: "amSmallBg",
        scale: 3.5
    }],
    elements: {
        "mainEnergy": {
            type: "scale",
            x: 515,
            y: 82,
            direction: 0,
            bitmap: "amBigBarFull",
            scale: 3.5,
            value: 1
        },
        "mainEnergyValue": {
            type: "text",
            x: 652,
            y: 138,
            width: 168,
            height: 25,
            text: ""
        },
        "dechargingWandBar": {
            type: "scale",
            x: 516,
            y: 296,
            direction: 0,
            bitmap: "amSmallBarFull",
            scale: 3.5,
            value: 1
        },
        "dechargingWandValue": {
            type: "text",
            x: 547,
            y: 342,
            width: 168,
            height: 25,
            text: ""
        },
        "chargingWandBar": {
            type: "scale",
            x: 696,
            y: 296,
            direction: 0,
            bitmap: "amSmallBarFull",
            scale: 3.5,
            value: 1
        },
        "chargingWandValue": {
            type: "text",
            x: 727,
            y: 342,
            width: 168,
            height: 25,
            text: ""
        },
        "wandSlot": {
            type: "slot",
            x: 717,
            y: 195,
            size: 90,
            bitmap: "amResultSlot"
        },
        "burnSlot": {
            type: "slot",
            x: 509,
            y: 195,
            size: 90
        },
        "wandCharging": {
            type: "scale",
            x: 606,
            y: 215,
            scale: 3.5,
            direction: 0,
            bitmap: "amArrowFull",
            value: 1
        },
        "burn": {
            type: "scale",
            x: 527,
            y: 144,
            scale: 3.5,
            direction: 0,
            bitmap: "amBurnFull",
            value: 1
        },
        "slot1": {
            type: "slot",
            x: 382,
            y: 118,
            size: 64
        },
        "slot2": {
            type: "slot",
            x: 446,
            y: 118,
            size: 64
        },
        "slot3": {
            type: "slot",
            x: 382,
            y: 180,
            size: 64
        },
        "slot4": {
            type: "slot",
            x: 446,
            y: 180,
            size: 64
        },
        "slot5": {
            type: "slot",
            x: 382,
            y: 244,
            size: 64
        },
        "slot6": {
            type: "slot",
            x: 446,
            y: 244,
            size: 64
        }
    }
});

ModAPI.registerAPI("EECore", {
	addItem: function(id, data, value){
		EMCForItems.push({"id": id, "data": data, "value": value});
	}
});

ModAPI.addAPICallback("EECore", function(){
	Logger.Log("Equivalent Exchange API is registred and can be accessed by ModAPI.requireAPI(\"EECore\")", LOGGER_TAG);
});