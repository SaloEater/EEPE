IDRegistry.genBlockID("antiMatterTier3");
Block.createBlock("antiMatterTier3", [{
    name: "Antimatter Relay МК3",
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
        activeEnergy: 0,
        activeWandEnergy: 0,
        maxEnergy: 10000000,
		maxWandEnergy: 0,
        sidesBusied: 0,
        additional: 10 / 4,
        validBurnItem: 0,
		starPlaced: 0,
        isTransfering: 0,
        placeToTransfer: {
            x: 0,
            y: 0,
            z: 0
        },
		transferSpeed: 640
    },
    created: function() {},
    click: function(id, count, data, coords) {

    },
	checkForTransfer: function(){
		if (this.data.isTransfering == 0) {
            if (World.getBlockID(this.x + 1, this.y, this.z) == BlockID.energyCondenser) {
                //Game.message("1");
                this.data.placeToTransfer.x = this.x + 1;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z;
                this.data.isTransfering = 1;
            } else if (World.getBlockID(this.x - 1, this.y, this.z) == BlockID.energyCondenser) {
                //Game.message("2");
                this.data.placeToTransfer.x = this.x - 1;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z;
                this.data.isTransfering = 1;
            } else if (World.getBlockID(this.x, this.y, this.z + 1) == BlockID.energyCondenser) {
                //Game.message("3");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z + 1;
                this.data.isTransfering = 1;
            } else if (World.getBlockID(this.x, this.y, this.z - 1) == BlockID.energyCondenser) {
                //Game.message("4");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y;
                this.data.placeToTransfer.z = this.z - 1;
                this.data.isTransfering = 1;
            } else if (World.getBlockID(this.x, this.y - 1, this.z) == BlockID.energyCondenser) {
                //Game.message("5");
                this.data.placeToTransfer.x = this.x;
                this.data.placeToTransfer.y = this.y - 1;
                this.data.placeToTransfer.z = this.z;
                this.data.isTransfering = 1;
            }
        } else {
			blockHost = World.getBlockID(this.data.placeToTransfer["x"], this.data.placeToTransfer["y"], this.data.placeToTransfer["z"]);
            if (this.data.isTransfering == 1 && blockHost != BlockID.energyCondenser) {
                this.data.isTransfering = 0;
				this.checkForTransfer();
            }
		}
	},	
    getTransportSlots: function() {
        var inputA=[], outputA=[];
        for (i = 1; i < 21; i++) {
            inputA.push("slot" + i);
        }
		inputA.push("burnSlot");
        return {
            input: inputA,
            output: outputA
        };
    },
    init: function() {

    },
    tick: function() {
        if (World.getThreadTime() % 5 == 0) {
			if (World.getThreadTime() % 20 == 0) {
				for (i = 9; i > 0; i--) {
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
				if (this.container.getSlot("burnSlot").id == 0 && this.container.getSlot("slot20").id != 0) {
					this.container.getSlot("burnSlot").id = this.container.getSlot("slot20").id;
					this.container.getSlot("burnSlot").data = this.container.getSlot("slot20").data;
					this.container.getSlot("burnSlot").count = this.container.getSlot("slot20").count;
					this.container.clearSlot("slot20");
				}
			}
            if (this.container.getSlot("burnSlot").id != 0 && !kleinStarController.isStar(this.container.getSlot("burnSlot").id) && getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data) != -1) {
                if (this.data.activeEnergy + getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data) <= this.data.maxEnergy) {
                    this.data.activeEnergy += getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data);
                    this.container.getSlot("burnSlot").count--;
                    this.container.validateSlot("burnSlot");

                }
                this.data.validBurnItem = 1;
            } else {
                this.data.validBurnItem = 0;
            }
			if(kleinStarController.isStar(this.container.getSlot("burnSlot").id)){
				this.container.getSlot("wandSlot").id=this.container.getSlot("burnSlot").id;
				this.container.getSlot("wandSlot").data=this.container.getSlot("burnSlot").data;
				this.container.getSlot("wandSlot").count=this.container.getSlot("burnSlot").count;
				this.container.clearSlot("burnSlot");
			}
            this.data.activeEnergy += this.data.activeEnergy < this.data.maxEnergy ? this.data.sidesBusied * this.data.additional : 0;
			
			if(kleinStarController.isStar(this.container.getSlot("wandSlot").id)){
				var wandData = this.container.getSlot("wandSlot").data;
				if(this.data.starPlaced==0){
					this.data.maxWandEnergy=kleinStarController.getMax(wandData);
				}
				var deltaEMC=kleinStarController.getMax(wandData)-kleinStarController.getEMC(wandData);
				if(deltaEMC>0){
					kleinStarController.addEMC(wandData, deltaEMC>this.data.activeEnergy?this.data.activeEnergy:deltaEMC);
					this.data.activeEnergy-=deltaEMC>this.data.activeEnergy?this.data.activeEnergy:deltaEMC;
				}
				this.data.activeWandEnergy=kleinStarController.getEMC(wandData);
				this.data.starPlaced=1;
			} else {
				this.data.maxWandEnergy=0;
				this.data.activeWandEnergy=0;
				this.data.starPlaced=0;
				this.checkForTransfer();
				if(this.data.isTransfering==1){
					//var activeEnergy = World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.activeEnergy;
					//var needEnergy = World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.itemInSlotValue;
					if(World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).hasFreeSpace()){
						World.getTileEntity(this.data.placeToTransfer.x, this.data.placeToTransfer.y, this.data.placeToTransfer.z).data.activeEnergy+=this.data.activeEnergy>this.data.transferSpeed?this.data.transferSpeed:this.data.activeEnergy;
						this.data.activeEnergy-=this.data.activeEnergy>this.data.transferSpeed?this.data.transferSpeed:this.data.activeEnergy;
					}
				}
			}
			
			this.container.setScale("wandCharging", this.data.maxWandEnergy==0?0:1);
			this.container.setText("chargingWandValue", this.data.activeWandEnergy );
			this.container.setScale("chargingWandBar", this.data.maxWandEnergy==0?0:this.data.activeWandEnergy/this.data.maxWandEnergy);
			
            this.container.setScale("mainEnergy", this.data.activeEnergy / this.data.maxEnergy);
            this.container.setText("mainEnergyValue", parseInt(this.data.activeEnergy));
            this.container.setScale("burn", this.data.validBurnItem);
			this.container.setScale("dechargingWandBar", 0);
            this.container.setText("dechargingWandValue", 0);

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
        x:-48+ 128+365,
        y: 72,
        bitmap: "amSmallBg",
        scale: 3.5
    }],
    elements: {
        "mainEnergy": {
            type: "scale",
            x:-48+128+ 515,
            y: 82,
            direction: 0,
            bitmap: "amBigBarFull",
            scale: 3.5,
            value: 1
        },
        "mainEnergyValue": {
            type: "text",
            x:-48+128+ 652,
            y: 138,
            width: 168,
            height: 30,
            text: ""
        },
        "dechargingWandBar": {
            type: "scale",
            x:-48+128+ 516,
            y: 296,
            direction: 0,
            bitmap: "amSmallBarFull",
            scale: 3.5,
            value: 1
        },
        "dechargingWandValue": {
            type: "text",
            x:-48+128+ 547,
            y: 342,
            width: 168,
            height: 30,
            text: ""
        },
        "chargingWandBar": {
            type: "scale",
            x:-48+128+ 696,
            y: 296,
            direction: 0,
            bitmap: "amSmallBarFull",
            scale: 3.5,
            value: 1
        },
        "chargingWandValue": {
            type: "text",
            x:-48+128+ 727,
            y: 342,
            width: 168,
            height: 30,
            text: ""
        },
        "wandSlot": {
            type: "slot",
            x:-48+128+ 717,
            y: 195,
            size: 90,
            bitmap: "amResultSlot"
        },
        "burnSlot": {
            type: "slot",
            x:-48+128+ 509,
            y: 195,
            size: 90
        },
        "wandCharging": {
            type: "scale",
            x:-48+128+ 606,
            y: 215,
            scale: 3.5,
            direction: 0,
            bitmap: "amArrowFull",
            value: 1
        },
        "burn": {
            type: "scale",
            x:-48+128+ 527,
            y: 144,
            scale: 3.5,
            direction: 0,
            bitmap: "amBurnFull",
            value: 1
        },
		"slot1": {
            type: "slot",
            x:-48+382,
            y: 118,
            size: 64
        },
        "slot2": {
            type: "slot",
            x:-48+64+ 382,
            y: 118,
            size: 64
        },
        "slot3": {
            type: "slot",
            x:-48+128+ 382,
            y: 118,
            size: 64
        },
        "slot4": {
            type: "slot",
            x:-48+128+ 446,
            y: 118,
            size: 64
        },
		"slot5": {
            type: "slot",
            x:-48+382,
            y: 180,
            size: 64
        },
		"slot6": {
            type: "slot",
            x:-48+64+ 382,
            y: 180,
            size: 64
        },
		"slot7": {
            type: "slot",
            x:-48+128+ 382,
            y: 180,
            size: 64
        },
        "slot8": {
            type: "slot",
            x:-48+128+ 446,
            y: 180,
            size: 64
        },
		"slot9": {
            type: "slot",
            x:-48+382,
            y: 244,
            size: 64
        },
		"slot10": {
            type: "slot",
            x:-48+64+ 382,
            y: 244,
            size: 64
        },
		"slot11": {
            type: "slot",
            x:-48+128+ 382,
            y: 244,
            size: 64
        },
        "slot12": {
            type: "slot",
            x:-48+128+ 446,
            y: 244,
            size: 64
        },
		"slot13": {
            type: "slot",
            x:-48+382,
            y: 308,
            size: 64
        },
		"slot14": {
            type: "slot",
            x:-48+64+ 382,
            y: 308,
            size: 64
        },
		"slot15": {
            type: "slot",
            x:-48+128+ 382,
            y: 308,
            size: 64
        },
        "slot16": {
            type: "slot",
            x:-48+128+ 446,
            y: 308,
            size: 64
        },
		"slot17": {
            type: "slot",
            x:-48+382,
            y: 372,
            size: 64
        },
		"slot18": {
            type: "slot",
            x:-48+64+ 382,
            y: 372,
            size: 64
        },
		"slot19": {
            type: "slot",
            x:-48+128+ 382,
            y: 372,
            size: 64
        },
        "slot20": {
            type: "slot",
            x:-48+128+ 446,
            y: 372,
            size: 64
        }
    }
});
