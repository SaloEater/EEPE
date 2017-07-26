var isFirstTimeHandChecked = false;
var GUI;
var PhStoneButtonState=0;
IDRegistry.genItemID("PhilosopherStone");
Item.createItem("PhilosopherStone", "Философский камень", {
    name: "PhilosopherStone",
    meta: 0
}, {
    stack: 1
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

var PhStoneButtons = new UI.StandartWindow({
    location: {
            x: 0,
            y: 0,
            width: 50,
            height: 50
    },
    drawing: [
        {
            type: "background", color: 0
        }
    ],
    elements: {
        "button": {
            x: 0,
            y: 0,
            type: "button",
            bitmap: "buttonCraftOff",
            bitmap2: "buttonCraftOn",
            scale: 50,
            clicker: {
                onClick: function() {
                    ModAPI.requireGlobal("WorkbenchPocketStyle.openUI()");
                }
            }
        }
    }
});

var anotherPhStoneButtons=null;

function PhStoneButtonsController(type){
    if(type==1){
        var ctx = UI.getMcContext();
        var screensize = ModAPI.requireGlobal("GuiUtils.GetDisplaySize()");
        UI.run(function(){
            var layout = new android.widget.LinearLayout(ctx);
                layout.setOrientation(1);
                var directory = new android.graphics.Bitmap.createScaledBitmap(new android.graphics.BitmapFactory.decodeFile("/sdcard/windows/BstSharedFolder/EEPE/gui/buttonCraftOff.png"), 50, 50, true);
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
                GUI = new android.widget.PopupWindow(layout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                GUI.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.RED));
                GUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 100, 100);
            });
    } else {
        UI.run(function(){
            if(GUI!=null){
                GUI.dismiss();
                GUI=null;
            }
        });
    }
}

Callback.addCallback("tick", function() {
    if (Player.getCarriedItem().id == ItemID.PhilosopherStone && !isFirstTimeHandChecked) {
        //anotherPhStoneButtons=PhStoneButtons;
        Game.message("Open GUI");
        PhStoneButtonsController(1);
        //UI.openUI(PhStoneButtons);
        isFirstTimeHandChecked = true;
    } else if (Player.getCarriedItem().id != ItemID.PhilosopherStone && isFirstTimeHandChecked) {
        Game.message("Close GUI");
        //anotherPhStoneButtons.content.elements["button"]=null;
        //anotherPhStoneButtons=null
        //UI.WindowProvider.removeWindow(PhStoneButtons);
        PhStoneButtonsController(2);
        isFirstTimeHandChecked = false;
    }
});