var isFirstTimeHandChecked = false;

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

var UIbuttons = {
    container: null,
    Window: new UI.Window({
        location: {
            x: 50,
            y: UI.getScreenHeight() / 2,
            width: 100,
            height: 100
        },
        drawing: [{
            type: "background",
            color: 0
        }],
        elements: {}
    }),
    enableButton: function(name) {
        this.isEnabled = true;
        buttonMap[name] = true;
    },
    disableButton: function(name) {
        buttonMap[name] = false;
    }
}

var buttonMap = {
    buttonCraftingTable: false,
    buttonShoot: false
}

function updateUIbuttons() {
    var buttonContent = {
        buttonCraftingTable: {
            y: 0,
            type: "button",
            bitmap: "buttonCraftOff",
            bitmap2: "buttonCraftOn",
            scale: 50,
            clicker: {
                onClick: function() {
                    Game.message("Открыл верстак");
                }
            }
        }
    }
    var elements = UIbuttons.Window.content.elements;
    for (var name in buttonMap) {
        if (buttonMap[name]) {
            if (!elements[name]) {
                elements[name] = buttonContent[name];
                elements[name].x = 0;
            }
        } else {
            elements[name] = null;
        }
    }
}

Callback.addCallback("tick", function() {
    if (Player.getCarriedItem().id == ItemID.PhilosopherStone && !isFirstTimeHandChecked) {
        Game.message("Open GUI");
        UIbuttons.enableButton("buttonCraftingTable");
        updateUIbuttons();
        UIbuttons.container = new UI.Container();
        UIbuttons.container.openAs(UIbuttons.Window);
        isFirstTimeHandChecked = true;
    } else if (Player.getCarriedItem().id != ItemID.PhilosopherStone && isFirstTimeHandChecked) {
        Game.message("Close GUI");
        UIbuttons.disableButton("buttonCraftingTable");
        UIbuttons.container = null;
        isFirstTimeHandChecked = false;
    }
});