IDRegistry.genBlockID("energyCollectorTier1");
Block.createBlock("energyCollectorTier1", [{
    name: "Energy Collector МК1",
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
        activeEnergy: 0,
        activeWandEnergy: 0,
        maxEnergy: 10000,
		maxWandEnergy: 0,
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
	getTransportSlots: function() {
        var inputA=[], outputA=[];
        for (i = 1; i < 9; i++) {
            inputA.push("slot" + i);
            outputA.push("slot" + i);
        }
		outputA.push("afterBurnSlot");
        return {
            input: inputA,
            output: outputA
        };
    },
    click: function(id, count, data, coords) {

    },
	checkForTransfer: function(){
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
            if ( this.data.shallTransfer ==1 && (World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier1 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier2 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier3)) {
                //Game.message("Added 1");
                World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.sidesBusied++;
            }
        } else {
			blockHost = World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
			if (this.data.placeToTransfer && blockHost != BlockID.energyCollectorTier1 && blockHost != BlockID.energyCollectorTier2 && blockHost != BlockID.energyCollectorTier3 && blockHost != BlockID.antiMatterTier1 && blockHost != BlockID.antiMatterTier2 && blockHost != BlockID.antiMatterTier3 && blockHost != BlockID.energyCondenser)) {
                this.data.shallTransfer = 0;
				this.checkForTransfer();
            }
		}
	},	
    init: function() {
		this.checkForTransfer();
    },
    destroyBlock: function(coords, player) {
        if (World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier1 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier2 || World.getBlockID(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z) == BlockID.antiMatterTier3) {
            World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.sidesBusied--;
        }
    },
    tick: function() {
        var mainContainer = this.container;
        if (World.getThreadTime() % 5 == 0) {
			if (World.getThreadTime() % 20 == 0) {
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
			}
			this.checkForTransfer();
            this.data.sunTick = nativeGetLightLevel(this.x, this.y + 1, this.z) / 15;
            if (this.data.shallTransfer == 0 || (World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"])==BlockID.energyCondenser && World.getTileEntity(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]).hasFreeSpace()==-1)) {
                if (this.data.activeEnergy < this.data.maxEnergy) this.data.activeEnergy += this.data.sunTick;
				if(mainContainer.getSlot("burnSlot").id!=0){
					if(kleinStarController.isStar(mainContainer.getSlot("burnSlot").id)){
						var wandData=mainContainer.getSlot("burnSlot").data;
						if(this.data.starPlaced==0){
							this.data.maxWandEnergy=kleinStarController.getMax(wandData);
						}
						var deltaEMC=kleinStarController.getMax(wandData)-kleinStarController.getEMC(wandData);
						if(deltaEMC>0){
							kleinStarController.addEMC(wandData, deltaEMC>this.data.activeEnergy?this.data.activeEnergy:deltaEMC);
							this.data.activeEnergy-=deltaEMC>this.data.activeEnergy?this.data.activeEnergy:deltaEMC;
							this.data.activeWandEnergy=kleinStarController.getEMC(wandData);
						}
						this.data.starPlaced=1;
					} else {
						if(this.data.starPlaced==1){
							this.data.maxWandEnergy=0;
							this.data.activeWandEnergy=0;
						}
						if (EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data] != undefined) {
							if (mainContainer.getSlot("targetSlot").id != 0) {
								if (this.data.validTarget == 0) {
									for (name in collectorRecipes) {
										if (mainContainer.getSlot("targetSlot").id == EMCSystem.collectorRecipes[name].resultid && mainContainer.getSlot("targetSlot").data == EMCSystem.collectorRecipes[name].resultdata) {
											for (name2 in collectorRecipes) {
												if (EMCSystem.collectorRecipes[name2].value >= EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].value) this.data.needEnergy += EMCSystem.collectorRecipes[name2].value;
											}
											this.data.validID = parseInt(name / 1000);
											this.data.validData = parseInt(name % 1000);
											this.data.validTarget = 1;
											this.data.
											break;
										}
									}
								}
							} else if (mainContainer.getSlot("targetSlot").id == 0 || mainContainer.getSlot("targetSlot").id != this.data.validID) {
								this.data.validTarget = 0;
								this.data.needEnergy = 0;
							}
							if (this.data.validTarget == 0) {
								var burnValue = EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].value;
								this.data.needEnergy = burnValue;
								if (this.data.activeEnergy >= burnValue) {
									if (mainContainer.getSlot("afterBurnSlot").id == 0) {
										mainContainer.getSlot("afterBurnSlot").id = EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultid;
										mainContainer.getSlot("afterBurnSlot").data = EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultdata;
										mainContainer.getSlot("afterBurnSlot").count = 1;
										mainContainer.getSlot("burnSlot").count--;
										mainContainer.validateSlot("burnSlot");
										this.data.activeEnergy -= burnValue;
									} else if (mainContainer.getSlot("afterBurnSlot").count == 64 ||
										mainContainer.getSlot("afterBurnSlot").id != EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultid ||
										mainContainer.getSlot("afterBurnSlot").data != EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data].resultdata) {
										this.data.shallMove = 1;
									} else {
										mainContainer.getSlot("afterBurnSlot").count++;
										mainContainer.getSlot("burnSlot").count--;
										mainContainer.validateSlot("burnSlot");
										this.data.activeEnergy -= burnValue;
									}
								}
							} else {
								//var burnValue = EMCSystem.collectorRecipes[mainContainer.getSlot("targetSlot").id+""+mainContainer.getSlot("targetSlot").data].value;
								//this.data.needEnergy = burnValue;
								if (EMCSystem.collectorRecipes[mainContainer.getSlot("burnSlot").id + "" + mainContainer.getSlot("burnSlot").data] != undefined && EMCSystem.collectorRecipes[this.data.validID + "" + this.data.validData] != undefined) {
									if (this.data.activeEnergy >= this.data.needEnergy) {
										if (mainContainer.getSlot("afterBurnSlot").id == 0) {
											mainContainer.getSlot("afterBurnSlot").id = EMCSystem.collectorRecipes[this.data.validID + "" + this.data.validData].resultid;
											mainContainer.getSlot("afterBurnSlot").data = EMCSystem.collectorRecipes[this.data.validID + "" + this.data.validData].resultdata;
											mainContainer.getSlot("afterBurnSlot").count = 1;
											mainContainer.getSlot("burnSlot").count--;
											mainContainer.validateSlot("burnSlot");
											this.data.activeEnergy -= this.data.needEnergy;
										} else if (mainContainer.getSlot("afterBurnSlot").count == 64 ||
											mainContainer.getSlot("afterBurnSlot").id != EMCSystem.collectorRecipes[this.data.validID + "" + this.data.validData].resultid ||
											mainContainer.getSlot("afterBurnSlot").data != EMCSystem.collectorRecipes[this.data.validID + "" + this.data.validData].resultdata) {
											this.data.shallMove = 1;
										} else {
											mainContainer.getSlot("afterBurnSlot").count++;
											mainContainer.getSlot("burnSlot").count--;
											mainContainer.validateSlot("burnSlot");
											this.data.activeEnergy -= this.data.needEnergy;
										}
									}
								}
							}
						}
						if (this.data.shallMove == 1 || mainContainer.getSlot("afterBurnSlot").count == 64 || mainContainer.getSlot("burnSlot").id == 0) {
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
						if (mainContainer.getSlot("burnSlot").id == 0 && mainContainer.getSlot("slot8").id != 0 && EMCSystem.collectorRecipes[mainContainer.getSlot("slot8").id + "" + mainContainer.getSlot("slot8").data] != undefined) {
							mainContainer.getSlot("burnSlot").id = mainContainer.getSlot("slot8").id;
							mainContainer.getSlot("burnSlot").data = mainContainer.getSlot("slot8").data;
							mainContainer.getSlot("burnSlot").count = mainContainer.getSlot("slot8").count;
							mainContainer.clearSlot("slot8");
						}
					}
				} else {
					this.data.needEnergy=0;
				}
            } else {
                var center = World.getTileEntity(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
                //Game.message("Was " + center.data.activeEnergy + ", added " + this.data.sunTick);
                if(World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"])!=BlockID.energyCondenser){
					if (center && (center.data.activeEnergy+this.data.sunTick) < center.data.maxEnergy) {
						center.data.activeEnergy += this.data.sunTick;
					}
				} else {
					this.data.activeEnergy+=this.data.sunTick;
					center.data.activeEnergy+=this.data.sunTick*2>this.data.activeEnergy?this.data.activeEnergy:this.data.sunTick*2;
					this.data.activeEnergy-=this.data.sunTick*2>this.data.activeEnergy?this.data.activeEnergy:this.data.sunTick*2;
					//center.data.activeEnergy+=this.data.sunTick;
				}
            }
            mainContainer.setScale("energy", this.data.maxEnergy==0?0:this.data.activeEnergy / this.data.maxEnergy);
            mainContainer.setText("energyValue", parseInt(this.data.activeEnergy));
            mainContainer.setScale("wandEnergy",  this.data.maxEnergy==0?0:this.data.activeWandEnergy / this.data.maxEnergy);
            mainContainer.setText("wandEnergyValue", this.data.maxEnergy==0?parseInt(this.data.needEnergy):parseInt(this.data.activeWandEnergy));
            mainContainer.setScale("burnScale", this.data.needEnergy == 0 ? 0 : this.data.activeEnergy / this.data.needEnergy);
            mainContainer.setScale("lightLevel", this.data.sunTick)
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
            x: 418+32,
            y: 82,
            size: 62,
            bitmap: "collectorSlot1"
        },
        "slot2": {
            type: "slot",
            x: 482+32,
            y: 82,
            size: 62,
            bitmap: "collectorSlot2"
        },
        "slot3": {
            type: "slot",
            x: 418+32,
            y: 146,
            size: 62,
            bitmap: "collectorSlot3"
        },
        "slot4": {
            type: "slot",
            x: 482+32,
            y: 146,
            size: 62,
            bitmap: "collectorSlot4"
        },
        "slot5": {
            type: "slot",
            x: 418+32,
            y: 210,
            size: 62,
            bitmap: "collectorSlot5"
        },
        "slot6": {
            type: "slot",
            x: 482+32,
            y: 210,
            size: 62,
            bitmap: "collectorSlot6"
        },
        "slot7": {
            type: "slot",
            x: 418+32,
            y: 270,
            size: 62,
            bitmap: "collectorSlot1"
        },
        "slot8": {
            type: "slot",
            x: 482+32,
            y: 270,
            size: 62,
            bitmap: "collectorSlot8"
        }
    }
});
