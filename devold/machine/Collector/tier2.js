
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
        sidesBusied: 0,
        placeToTransfer: {
            x: 0,
            y: 0,
            z: 0
        },
        slots: 12
    },
    created: function() {

    },
    getTransportSlots: function() {
        var inputA = [],
            outputA = [];
        for (i = 1; i < this.data.slots+1; i++) {
            inputA.push("slot" + i);
            outputA.push("slot" + i);
        }
        inputA.push("burnSlot");
        outputA.push("afterBurnSlot");
        return {
            input: inputA,
            output: outputA
        };
    },
    click: function(id, count, data, coords) {

    },
    checkTransfering: function() {
        if (this.data.sidesBusied == 0) {
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
                if (this.data.shallTransfer == 1) World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.sidesBusied++;
            } else {
                blockHost = World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
                if (this.data.placeToTransfer && blockHost != BlockID.energyCollectorTier1 && blockHost != BlockID.energyCollectorTier2 && blockHost != BlockID.energyCollectorTier3 && blockHost != BlockID.antiMatterTier1 && blockHost != BlockID.antiMatterTier2 && blockHost != BlockID.antiMatterTier3 && blockHost != BlockID.energyCondenser) {
                    this.data.placeToTransfer = {};
                    this.data.shallTransfer = 0;
                    this.checkTransfering();
                }
            }
        }
    },
    init: function() {
        this.checkTransfering();
    },
    destroyBlock: function(coords, player) {
        if (World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier1 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier2 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier3) {
            World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.sidesBusied--;
        }
    },
    transferToNeighbour: function() {
        var center = World.getTileEntity(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
        if (World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]) != BlockID.energyCondenser) {
            if (center && (center.data.activeEnergy + this.data.sunTick) < center.data.maxEnergy) {
                center.data.activeEnergy += this.data.sunTick;
            }
        } else {
            this.data.activeEnergy += this.data.sunTick;
            center.data.activeEnergy += this.data.sunTick * 2 > this.data.activeEnergy ? this.data.activeEnergy : this.data.sunTick * 2;
            this.data.activeEnergy -= this.data.sunTick * 2 > this.data.activeEnergy ? this.data.activeEnergy : this.data.sunTick * 2;
        }
    },
    setupStar: function() {
        var wandData = this.container.getSlot("burnSlot").data;
        if (this.data.starPlaced == 0) {
            this.data.maxWandEnergy = kleinStarController.getMax(wandData);
        }
        var deltaEMC = kleinStarController.getMax(wandData) - kleinStarController.getEMC(wandData);
        if (deltaEMC > 0) {
            kleinStarController.addEMC(wandData, deltaEMC > this.data.activeEnergy ? this.data.activeEnergy : deltaEMC);
            this.data.activeEnergy -= deltaEMC > this.data.activeEnergy ? this.data.activeEnergy : deltaEMC;
            this.data.activeWandEnergy = kleinStarController.getEMC(wandData);
        }
        this.data.starPlaced = 1;
    },
    setupTarget: function() {
        if (this.container.getSlot("targetSlot").id != 0) {
            if (this.data.validTarget == 0) {
                for (name in EMCSystem.getRecipes()) {
                    var recipe = EMCSystem.getRecipe(name);
                    if (this.container.getSlot("targetSlot").id == recipe.resultid && this.container.getSlot("targetSlot").data == recipe.resultdata) {
                        var found = 0;
                        var lookingFor = this.container.getSlot("burnSlot").id + "" + this.container.getSlot("burnSlot").data;
                        if (getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data) < getEMC(this.container.getSlot("targetSlot").id, this.container.getSlot("targetSlot").data)) {
                            this.data.validID = this.container.getSlot("targetSlot").id;
                            this.data.validData = this.container.getSlot("targetSlot").data;
                            this.data.needEnergy = getEMC(this.container.getSlot("targetSlot").id, this.container.getSlot("targetSlot").data) - getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data);
                            this.data.validTarget = 1;
                            break;
                        }
                    }
                }
            }
        } else if (this.container.getSlot("targetSlot").id == 0) {
            this.data.validTarget = 0;
            this.data.needEnergy = 0;
        } else if (this.container.getSlot("targetSlot").id != this.data.validID) {
            this.data.validTarget = 0;
            this.setupTarget();
        }
		//if(this.data.validTarget==0&&this.container.getSlot("targetSlot").id!=0)this.container.dropSlot("targetSlot", this.x, this.y + 1, this.z);
    },
    sortSlots: function() {
        for (i = this.data.slots; i > 0; i--) {
            if (this.container.getSlot("slot" + i).id == 0) {
                for (j = i - 1; j > 0; j--) {
					this.tryMoveSlot("slot" + j, "slot" + i, -1);
					if(this.container.getSlot("slot"+j).id==0)break;
                }
            }
        }
    },
    moveAfterBurnSlot: function() {
if(this.container.getSlot("afterBurnSlot").id!=0){
        for (i = 1; i <=this.data.slots; i++) {
			this.tryMoveSlot("afterBurnSlot", "slot"+i, -1);
			//Game.dialogMessage(i);
			if(this.container.getSlot("afterBurnSlot").id==0)break;
        }
        this.data.shallMove = 0;
} 
    },
    tryToFillBurnSlot: function() {
		this.tryMoveSlot("slot" + this.data.slots, "burnSlot", -1);
		//Game.dialogMessage("Try to fill");
    },
	tryMoveSlot: function(origin, place, customCount){
		if(this.container.getSlot(origin).id==0)return false;
		var id = this.container.getSlot(origin).id;
		var data = this.container.getSlot(origin).data;
		var max = Item.getMaxStack(this.container.getSlot(origin).id);
		var count = customCount==-1?this.container.getSlot(origin).count:customCount;
		//Game.dialogMessage(data+"-"+this.container.getSlot(place).data, "count");
		if(this.container.getSlot(place).id==0){
			//Game.dialogMessage("Free");
			this.container.getSlot(place).id= id;
			this.container.getSlot(place).data=data;
			this.container.getSlot(place).count = count;
			this.container.getSlot(origin).count-=count;
			
			max=-1;
		} else if(this.container.getSlot(place).id==id&&this.container.getSlot(place).data==data&&this.container.getSlot(place).count<max){
			//Game.dialogMessage("Space");
			this.container.getSlot(place).count+=Math.min(count, 64-this.container.getSlot(place).count);
			this.container.getSlot(origin).count-=Math.min(count, 64-this.container.getSlot(place).count);
			max=-1;
		}
		this.container.validateSlot(origin);
		return max==-1?true:false;
	},
	tryMoveItem: function(origin, place, id, data, count){
		if(this.container.getSlot(origin).id==0)return false;
		var max = Item.getMaxStack(id);
		if(this.container.getSlot(place).id==0){
			this.container.getSlot(place).id= id;
			this.container.getSlot(place).data=data;
			this.container.getSlot(place).count = count;
			this.container.getSlot(origin).count-=count;
			max=-1;
		} else if(this.container.getSlot(place).id==id&& this.container.getSlot(place).data==data&&this.container.getSlot(place).count<max){
			this.container.getSlot(place).count+=Math.min(count, 64-this.container.getSlot(place).count);
			this.container.getSlot(origin).count-=Math.min(count, 64-this.container.getSlot(place).count);
			max=-1;
		}
		this.container.validateSlot(origin);
		return max==-1?true:false;
	},
    tick: function() {
        if (World.getThreadTime() % 5 == 0) {
            this.checkTransfering();
            this.data.sunTick = nativeGetLightLevel(this.x, this.y + 1, this.z) / 15*3;
            if (this.data.shallTransfer == 0 || (World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]) == BlockID.energyCondenser && World.getTileEntity(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]).hasFreeSpace() == -1)) {
                if (this.data.activeEnergy < this.data.maxEnergy) this.data.activeEnergy += this.data.sunTick;
                if (this.container.getSlot("burnSlot").id != 0) {
                    if (kleinStarController.isStar(this.container.getSlot("burnSlot").id)) {
                        this.setupStar();
                    } else {
                        if (this.data.starPlaced == 1) {
                            this.data.maxWandEnergy = 0;
                            this.data.activeWandEnergy = 0;
                        }
                        this.setupTarget();
						
						//if(this.container.getSlot("burnSlot").id!=0 && World.getThreadTime()%40==0)Game.dialogMessage(this.container.getSlot("burnSlot").id + "" + this.container.getSlot("burnSlot").data);
                        if (EMCSystem.getRecipe(this.container.getSlot("burnSlot").id + "" + this.container.getSlot("burnSlot").data) || this.data.validTarget == 1) {
                            if (this.data.validTarget == 0) {
                                this.data.needEnergy = EMCSystem.getRecipe(this.container.getSlot("burnSlot").id + "" + this.container.getSlot("burnSlot").data).value;
                                this.data.validID = EMCSystem.getRecipe(this.container.getSlot("burnSlot").id + "" + this.container.getSlot("burnSlot").data).resultid;
                                this.data.validData = EMCSystem.getRecipe(this.container.getSlot("burnSlot").id + "" + this.container.getSlot("burnSlot").data).resultdata;
                            }
							while(this.data.activeEnergy >= this.data.needEnergy && this.tryMoveItem("burnSlot", "afterBurnSlot", this.data.validID, this.data.validData, 0)){
								this.tryMoveItem("burnSlot", "afterBurnSlot", this.data.validID, this.data.validData, 1);
								this.data.activeEnergy -= this.data.needEnergy;
							}
                        } else {
                           // this.container.dropSlot("burnSlot", this.x, this.y + 1, this.z);
                        }
                    }
                } else {
                    this.data.needEnergy = 0;
                }
            } else {
                this.transferToNeighbour();
            }
            this.sortSlots();
            this.tryToFillBurnSlot();
            this.moveAfterBurnSlot();
            this.container.setScale("energy", this.data.maxEnergy == 0 ? 0 : this.data.activeEnergy / this.data.maxEnergy);
            this.container.setText("energyValue", parseInt(this.data.activeEnergy));
            this.container.setScale("wandEnergy", this.data.maxWandEnergy == 0 ? 0 : this.data.activeWandEnergy / this.data.maxWandEnergy);
            this.container.setText("wandEnergyValue", this.data.maxWandEnergy == 0 ?this.data.needEnergy:this.data.activeWandEnergy);
            this.container.setScale("burnScale", this.data.needEnergy == 0 ? 0 : this.data.activeEnergy / this.data.needEnergy);
            this.container.setScale("lightLevel", this.data.sunTick)
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
