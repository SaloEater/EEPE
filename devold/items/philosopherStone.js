IDRegistry.genItemID("philosopherStone");
Item.createItem("philosopherStone", "Philosopher's Stone", {
    name: "PhilosopherStone",
    meta: 0
}, {
    stack: 1
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
		if(!GUI1){
			Game.message("Show C");
			var ctx = UI.getMcContext();
			UI.run(function() {
				var layout = new android.widget.LinearLayout(ctx);
				layout.setOrientation(1);
				var directory = new android.graphics.Bitmap.createScaledBitmap(new android.graphics.BitmapFactory.decodeFile("/sdcard/games/com.mojang/mods/EEPE/gui/buttonCraft.png"), screensize[0] / 20, screensize[0] / 20, true);
				var img = new android.graphics.drawable.BitmapDrawable(directory);
				var image = new android.widget.ImageView(ctx);
				image.setImageBitmap(directory);
				image.setOnClickListener(new android.view.View.OnClickListener({
					onClick: function(viewarg) {
						ModAPI.requireGlobal("WorkbenchPocketStyle.openUI()");
					}
				}));
				layout.addView(image);
				GUI1 = new android.widget.PopupWindow(layout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
				GUI1.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.RED));
				GUI1.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 0);
			});
		}
    } else {
		if(GUI1){
			Game.message("Clear C");
			UI.run(function() {
				GUI1.dismiss();
				GUI1 = null;
			});
		}
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
	if(World.getThreadTime()%5==0&&lastCoords.x&&World.getTileEntity(lastCoords.x, lastCoords.y, lastCoords.z)&&World.getTileEntity(lastCoords.x, lastCoords.y, lastCoords.z).container&& World.getTileEntity(lastCoords.x, lastCoords.y, lastCoords.z).container.isOpened() ){
		allowPSButtons=2;
	} else if(allowPSButtons!=1){
		allowPSButtons=0;
	}
    if (Player.getCarriedItem().id == ItemID.philosopherStone && allowPSButtons==0) {
        phStoneButtons(1);
    } else if (Player.getCarriedItem().id != ItemID.philosopherStone || allowPSButtons!=0) {
        phStoneButtons(2);
    }
});

Callback.addCallback("NativeGuiChanged", function(screenName) {
	allowPSButtons=1;
    if (screenName == "hud_screen" || screenName == "in_game_play_screen") {
		allowPSButtons=0;
    }
});