var BreakException = {};
var isFirstTimeHandChecked = false;
var GUI1, GUI2;
var PhStoneMobChangeButtonState = 0;
var screensize = {
    x: 0,
    y: 0
};
var EMCInSystem = 0;
var learnedItems = [];
var invalidItem=false;
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

IDRegistry.genItemID("PhilosopherStone");
Item.createItem("PhilosopherStone", "Философский камень", {
    name: "PhilosopherStone",
    meta: 0
}, {
    stack: 1
});

Callback.addCallback("LevelLoaded", function() {
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
    },
    params: {
        textures: {
            slot: "invisible_slot"
        },
    },
    drawing: [

    ],
    elements: {
        "burnSlot": {
            type: "slot",
            x: 665,
            y: 48,
            size: 60,
            bitmap: "burnIcon"
        },
        "buttonBurn": {
            type: "button",
            x: 745,
            y: 48,
            bitmap: "buttonBurn",
            scale: 3.6,
            clicker: {
                onClick: function(container) {
                    burnSlot = container.getSlot("burnSlot");
                    try {
                        EMCForItems.forEach(function(item, i, arr) {
                            if (item['id'] == burnSlot.id && +item['data'] == burnSlot.data) {
                                EMCInSystem += item['value'] * burnSlot.count;
                                container.clearSlot("burnSlot");
                                container.getGuiContent().elements["EMCValue"]={
                                    type: "text", 
                                    x: 365, 
                                    y: 73, 
                                    width: 300, 
                                    height: 50, 
                                    text: "ЕМС в системе:\n"+EMCInSystem
                                };
                                throw BreakException;
                            }
                        });
                    } catch (e) {
                        if (e !== BreakException) throw e;
                    }
                }
            }
        },
        "EMCValue": {
            type: "text", 
            x: 365, 
            y: 73, 
            width: 300, 
            height: 50, 
            text: "ЕМС в системе:\n"+EMCInSystem
        }
    }
});

TileEntity.registerPrototype(BlockID.TransmutationTable, {
    defaultvalues: {
        activeItem: {id:0, data:0}
    },
    click: function(id, count, data, coords) {
        
    },
    getGuiScreen: function() {
        return TransmutationTableUI;
    }
});