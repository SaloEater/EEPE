Callback.addCallback("NativeGuiChanged", function(screenName) {
	var inventories=["ender_chest_screen", "dispenser_screen", "dropper_screen", "small_chest_screen", "hopper_screen", "furnace_screen", "large_chest_screen"];
	//Game.dialogMessage(screenName);
	if(inventories.indexOf(screenName)!=-1){
		invValueButton(1);
	} else {
		invValueButton(2);
	}
});

Callback.addCallback("tick", function() {
    if (World.getThreadTime() % 10 == 0) {
        if (lastCoords.x != undefined) {
            if (World.getTileEntity(lastCoords.x, lastCoords.y, lastCoords.z) == undefined || World.getTileEntity(lastCoords.x, lastCoords.y, lastCoords.z).container == undefined || !World.getTileEntity(lastCoords.x, lastCoords.y, lastCoords.z).container.isOpened()) {
                invValueButton(2);
            }
        } 
    }
});

Callback.addCallback("ItemUse", function(coords, item, block) {
    if (World.getTileEntity(coords.x, coords.y, coords.z)) {
        lastCoords.x = coords.x;
        lastCoords.y = coords.y;
        lastCoords.z = coords.z;
        invValueButton(1);
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
    var spaceY = 88;
    var slotsAdded = 0;
    emcValuesContainer.elements = null;
	emcValuesContainer.elements = {};
    var getSlotId = ModAPI.requireGlobal("Player.getInventorySlot");
    var getSlotCount = ModAPI.requireGlobal("Player.getInventorySlotCount");
    var getSlotData = ModAPI.requireGlobal("Player.getInventorySlotData");
	var counter=0;
    for (i = 9; i < 45; i++) {
        if (getSlotId(i) != 0 && readedItems.indexOf(getSlotId(i)+":"+getSlotData(i))==-1 && !kleinStarController.isStar(getSlotId(i))) {
            emcValuesContainer.elements["slot" + counter] = {
                type: "slot",
                x: slotX,
                y: mainY + 8,
                size: listSlotScale,
                visual: true
            };
            emcValuesContainer.elements["name" + counter] = {
                type: "text",
                x: nameX,
                y: mainY,
                text: "Предмет:  " + Item.getName(getSlotId(i), getSlotData(i))
            };
            emcValuesContainer.elements["value" + counter] = {
                type: "text",
                x: valueX,
                y: mainY + 46,
                text: getEMC(getSlotId(i), getSlotData(i)) == -1 ? "Не зарегистрирован предмет "+ getSlotId(i)+":"+ getSlotData(i): "Ценность: " + getEMC(getSlotId(i), getSlotData(i))
            };
            mainY += spaceY;
			readedItems.push(getSlotId(i)+":"+getSlotData(i));
			counter++;
        } else if(kleinStarController.isStar(getSlotId(i))){
			//Game.dialogMessage("Inv has");
			 emcValuesContainer.elements["slot" + counter] = {
                type: "slot",
                x: slotX,
                y: mainY + 8,
                size: listSlotScale,
                visual: true
            };
			emcValuesContainer.elements["value" + counter] = {
                type: "text",
                x: valueX,
                y: mainY + 46,
				text: "Содержит "+kleinStarController.getEMC(getSlotData(i))+" EMC"
			};
			mainY += spaceY;
			readedItems.push(getSlotId(i)+":"+0);
			counter++;
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
									emcValuesContainer.elements["slot" + counter] = {
										type: "slot",
										x: slotX,
										y: mainY + 8,
										size: listSlotScale,
										visual: true
									};
									emcValuesContainer.elements["name" + counter] = {
										type: "text",
										x: nameX,
										y: mainY,
										text: "Предмет:  " + Item.getName(tileContainer.getSlot(slot).id, 0, (tileContainer.getSlot(slot).data))
									};
									emcValuesContainer.elements["value" + counter] = {
										type: "text",
										x: valueX,
										y: mainY + 46,
										text: getEMC(tileContainer.getSlot(slot).id, tileContainer.getSlot(slot).data) == -1 ?( "Не зарегистрирован предмет "+ tileContainer.getSlot(slot).id+":"+tileContainer.getSlot(slot).data): "Ценность: " + getEMC(tileContainer.getSlot(slot).id, tileContainer.getSlot(slot).data)
									};
									mainY += spaceY;
									readedItems.push(tileContainer.getSlot(slot).id+":"+tileContainer.getSlot(slot).data);
									counter++;
								} else if(kleinStarController.isStar(tileContainer.getSlot(slot).id)){
									emcValuesContainer.elements["slot" + counter] = {
									type: "slot",
										x: slotX,
										y: mainY + 8,
										size: listSlotScale,
										visual: true
									};
									emcValuesContainer.elements["value" + counter] = {
										type: "text",
										x: valueX,
										y: mainY + 46,
										text: "Содержит "+kleinStarController.getEMC(tileContainer.getSlot(slot).data)+" EMC"
									};
									mainY += spaceY;
									readedItems.push(tileContainer.getSlot(slot).id+":"+0);
									counter++;
								}
							});
	
	
    emcValuesContainer.standart.minHeight = mainY + 15;
    openedUI.openAs(emcValuesWindow);
	for(i=0; i<counter; i++){
		openedUI.getSlot("slot" + i).id = readedItems[i].split(":")[0];
		openedUI.getSlot("slot" + i).data = readedItems[i].split(":")[1];
		openedUI.getSlot("slot" + i).count = 0
	}
}

