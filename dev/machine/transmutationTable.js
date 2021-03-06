Callback.addCallback("ItemUse", function(coords, item, block) {
	if(block.id==BlockID.TransmutationTable)updateAvailableItems(World.getTileEntity(coords.x, coords.y, coords.z).container, activeFirstIndex);
});

Callback.addCallback("NativeCommand", function(command){
Game.message(command);
	var splitted = command.split(" ");
	if (splitted.shift() == "eereset"){
		EMCSystem.setGlobalEMCValue(0);
	}
});


var TransmutationTableUI=null;
var pageLimit = 21;
var activeFirstIndex = 0;

Callback.addCallback("LevelLoaded", function() {
	activeFirstIndex = 0;
});

Callback.addCallback("PostLoaded", function() {
	
	TransmutationTableUI = new UI.StandartWindow();
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
			minHeight: 1480*2+95
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
					onClick: function(container, tileEntity) {
						//Game.dialogMessage(JSON.stringify(container));
						if(!kleinStarController.isStar(container.getSlot("burnSlot").id)){
							validItem = true;
							burnSlot = container.getSlot("burnSlot");
							try {
								EMCSystem.getLearnedItems().forEach(function(item, i, arr) {
									if (item["id"] == burnSlot.id && +item["data"] == burnSlot.data) {
										throw breakException;
									}
								});
							} catch (e) {
								if (e !== breakException) throw e;
								validItem = false;
							}
							if (validItem) {
								EMCSystem.addToLearnedItems({
									id: burnSlot.id,
									data: burnSlot.data
								});
								sortLearnedItems();
							}
							try {
								var emcValue = getEMC(burnSlot.id, burnSlot.data);
								if (emcValue != -1) {
									EMCSystem.addToGlobalEMCValue(emcValue * burnSlot.count);
									container.clearSlot("burnSlot");
									container.setText("EMCValue", "ЕМС в системе:  " + EMCSystem.getGlobalEMCValue());
								}
							} catch (e) {
								if (e !== breakException) throw e;
							}
						} else {
							validItem = true;
							burnSlot = container.getSlot("burnSlot");
							try {
								EMCSystem.getLearnedItems().forEach(function(item, i, arr) {
									if (item["id"] == burnSlot.id) {
										throw breakException;
									}
								});
							} catch (e) {
								if (e !== breakException) throw e;
								validItem = false;
							}
							if (validItem) {
								EMCSystem.addToLearnedItems({
									id: burnSlot.id,
									data: 0
								});
								sortLearnedItems();
							}
							try {
								var emcValue = getEMC(burnSlot.id, 0);
								if (emcValue != -1) {
									EMCSystem.addToGlobalEMCValue(emcValue * burnSlot.count);
									container.clearSlot("burnSlot");
									tileEntity.data.starPlaced=0;
									container.setText("EMCValue", "ЕМС в системе:  " + EMCSystem.getGlobalEMCValue());
								}
							} catch (e) {
								if (e !== breakException) throw e;
							}
						}
						/*for (name in container.getGuiContent().elements) {
							if (name.indexOf("slotOn") >= 0) {
								container.getGuiContent().elements[name] = null;
							}
						}*/
						if (tTSlotYSelected) {
							clearAdditionalButtons(container);
						}
						updateAvailableItems(container, activeFirstIndex);
					}
				}
			},
			"EMCValue": {
				type: "text",
				x: 365,
				y: 53,
				width: 300,
				height: 50,
				text: "ЕМС в системе:  " + EMCSystem.getGlobalEMCValue()
			},
			"addValue": {
				type: "text",
				x: 675,
				y: 22,
				width: 500,
				height: 25,
				text: ""
			}
		}
	});
});

IDRegistry.genBlockID("TransmutationTable");
Block.createBlock("TransmutationTable", [{
    name: "Transmutation Table",
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
    x: 0.001,
    y: 0.001,
    z: 0.001
}, {
    x: 0.999,
    y: 0.3,
    z: 0.999
});


function updateAvailableItems(anotherContainer, first) {
    var posYForSlot = 110;
    var posXForButtons = 365;
	for (name in anotherContainer.getGuiContent().elements) {
		if (name.indexOf("slotOn") >= 0) {
			anotherContainer.getGuiContent().elements[name] = null;
		}
	}
	var i=first;
var addedCounter=0;
	for(i = first; addedCounter<=pageLimit; i++){
		if(!EMCSystem.getLearnedItems()[i])break;
		var itemLocal = EMCSystem.getLearnedItems()[i];
		var emcValue = getEMC(itemLocal["id"], itemLocal["data"]);
        if (EMCSystem.getGlobalEMCValue() / emcValue >= 1) {
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
						var localValue = getEMC(localId, localData);
                        var localX = this.rect.x;
                        var localY = this.rect.y;
                        try {
                            EMCSystem.EMCForItems.forEach(function(item, i, arr) {
                                if (item["id"] == localId && item["data"] == localData) {
                                    maxActiveItemCount = Math.floor(EMCSystem.getGlobalEMCValue() / item["value"]);
                                    activeItemCount =( EMCSystem.getGlobalEMCValue()>=localValue)?1:0;
                                    throw breakException;
                                }
                            });
                        } catch (e) {
                            if (e != breakException) throw e;
                        }
                        container.getGuiContent().elements["buttonMinus"] = {
                            type: "button",
                            x: 365-30,//localX - 59.5 * 2,
                            y: localY,
                            bitmap: "buttonMinusOff",
                            bitmap2: "buttonMinusOn",
                            scale: 1.5,//3.4,
                            clicker: {
                                onClick: function(container, tileEntity) {
                                    if (activeItemCount > 1 && !kleinStarController.isStar(localId)) activeItemCount--;
                                    container.setText("currentAmountForItem", "Выбрано: " + activeItemCount);
                                }
                            }
                        };


                        container.getGuiContent().elements["buttonPlus"] = {
                            type: "button",
                            x: 365-30,
                            y: localY+25,
                            bitmap: "buttonPlusOff",
                            bitmap2: "buttonPlusOn",
                            scale: 1.5,
                            clicker: {
                                onClick: function(container, tileEntity) {
                                    if (activeItemCount < maxActiveItemCount && !kleinStarController.isStar(localId)) activeItemCount++;
                                    container.setText("currentAmountForItem", "Выбрано: " + activeItemCount);
                                }
                            }
                        };
						
                        container.getGuiContent().elements["currentAmountForItem"] = {
                            type: "text",
                            x: 365,
                            y: localY,
                            width: 185,
                            height: 30,
                            text: "Выбрано: " + activeItemCount
                        };

                        container.getGuiContent().elements["maxRangeForItem"] = {
                            type: "text",
                            x: 365,
                            y: localY + 25,
                            width: 185,
                            height: 35,
                            text: "Максимум: " + maxActiveItemCount
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
									var emcValue = getEMC(localId, localData);
									var freeSlots = 0;
									var getSlotId = ModAPI.requireGlobal("Player.getInventorySlot");
									var getSlotData = ModAPI.requireGlobal("Player.getInventorySlotData");
									var getSlotCount = ModAPI.requireGlobal("Player.getInventorySlotCount");
									for (var i = 9; i < 45; i++) {
										if (getSlotId(i) == 0) {
											freeSlots+=ItemRegistry.getMaxStack(getSlotId(i));
										} else if(getSlotId(i)==localId && getSlotData(i)==localData && !kleinStarController.isStar(localId)){
											freeSlots+=ItemRegistry.getMaxStack(getSlotId(i))-getSlotCount(i);
										}
									}

									if(freeSlots>0){
										if(!kleinStarController.isStar(localId)) {
											Player.getInventory().addItem(localId, freeSlots > activeItemCount ? activeItemCount : freeSlots, localData);
										} else {
											Player.getInventory().addItem(localId, activeItemCount, kleinStarController.registerWand({id: localId}));
										}
										EMCSystem.removeFromGlobalEMCValue((freeSlots > activeItemCount ? activeItemCount : freeSlots) * emcValue);
										container.setText("EMCValue", "ЕМС в системе:  " + EMCSystem.getGlobalEMCValue());
										
									}
									clearAdditionalButtons(container);
									updateAvailableItems(container, activeFirstIndex);
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
                                    if(!kleinStarController.isStar(localId))activeItemCount = maxActiveItemCount;
                                    container.setText("currentAmountForItem", "Выбрано: " + activeItemCount);
                                }
                            }
                        };

                        tTSlotYSelected = true;
                        //updateAvailableItems(container);
                    }
                }
            };
            anotherContainer.getGuiContent().elements["slotOn" + posYForSlot] = slot;
            posYForSlot += (listSlotScale + listSlotSpace);
addedCounter++;
        }
	};
	if(addedCounter>pageLimit&&EMCSystem.getLearnedItems()[i]){
		anotherContainer.getGuiContent().elements["buttonForward"] = {
			type: "button",
			x: 865,
			y: posYForSlot,
			bitmap: "buttonForwardOff",
			bitmap2: "buttonForwardOn",
			scale: 3.4,
			clicker: {
				onClick: function(container, tileEntity) {
					activeFirstIndex=i;
					clearAdditionalButtons(anotherContainer);
					updateAvailableItems(anotherContainer, activeFirstIndex);
				}
			}
		}
	}
	if(activeFirstIndex>=pageLimit){
		anotherContainer.getGuiContent().elements["buttonBackward"] = {
			type: "button",
			x: 365,
			y: posYForSlot,
			bitmap: "buttonBackwardOff",
			bitmap2: "buttonBackwardOn",
			scale: 3.4,
			clicker: {
				onClick: function(container, tileEntity) {
					activeFirstIndex-=pageLimit;
					clearAdditionalButtons(anotherContainer);
					updateAvailableItems(anotherContainer, activeFirstIndex);
				}
			}
		}
	}
	//Game.dialogMessage(i+"-"+pageLimit, "i");
    /*EMCSystem.getLearnedItems().forEach(function(itemLocal, iLocal, arrLocal) {
		var emcValue = getEMC(itemLocal["id"], itemLocal["data"]);
        if (EMCSystem.getGlobalEMCValue() / emcValue >= 1) {
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
						var localValue = getEMC(localId, localData);
                        var localX = this.rect.x;
                        var localY = this.rect.y;
                        try {
                            EMCSystem.EMCForItems.forEach(function(item, i, arr) {
                                if (item["id"] == localId && item["data"] == localData) {
                                    maxActiveItemCount = Math.floor(EMCSystem.getGlobalEMCValue() / item["value"]);
                                    activeItemCount =( EMCSystem.getGlobalEMCValue()>=localValue)?1:0;
                                    throw breakException;
                                }
                            });
                        } catch (e) {
                            if (e != breakException) throw e;
                        }
                        container.getGuiContent().elements["buttonMinus"] = {
                            type: "button",
                            x: localX - 59.5 * 2,
                            y: localY,
                            bitmap: "buttonMinusOff",
                            bitmap2: "buttonMinusOn",
                            scale: 3.4,
                            clicker: {
                                onClick: function(container, tileEntity) {
                                    if (activeItemCount > 1 && !kleinStarController.isStar(localId)) activeItemCount--;
                                    container.setText("currentAmountForItem", "Выбрано: " + activeItemCount);
                                }
                            }
                        };

                        container.getGuiContent().elements["currentAmountForItem"] = {
                            type: "text",
                            x: 365,
                            y: localY,
                            width: 185,
                            height: 30,
                            text: "Выбрано: " + activeItemCount
                        };

                        container.getGuiContent().elements["maxRangeForItem"] = {
                            type: "text",
                            x: 365,
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
                                    if (activeItemCount < maxActiveItemCount && !kleinStarController.isStar(localId)) activeItemCount++;
                                    container.setText("currentAmountForItem", "Выбрано: " + activeItemCount);
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
									var emcValue = getEMC(localId, localData);
									var freeSlots = 0;
									var getSlotId = ModAPI.requireGlobal("Player.getInventorySlot");
									var getSlotData = ModAPI.requireGlobal("Player.getInventorySlotData");
									var getSlotCount = ModAPI.requireGlobal("Player.getInventorySlotCount");
									for (var i = 9; i < 45; i++) {
										if (getSlotId(i) == 0) {
											freeSlots+=ItemRegistry.getMaxStack(getSlotId(i));
										} else if(getSlotId(i)==localId && getSlotData(i)==localData && !kleinStarController.isStar(localId)){
											freeSlots+=ItemRegistry.getMaxStack(getSlotId(i))-getSlotCount(i);
										}
									}

									if(freeSlots>0){
										if(!kleinStarController.isStar(localId)) {
											Player.getInventory().addItem(localId, freeSlots > activeItemCount ? activeItemCount : freeSlots, localData);
										} else {
											Player.getInventory().addItem(localId, activeItemCount, kleinStarController.registerWand({id: localId}));
										}
										EMCSystem.removeFromGlobalEMCValue((freeSlots > activeItemCount ? activeItemCount : freeSlots) * emcValue);
										container.setText("EMCValue", "ЕМС в системе:  " + EMCSystem.getGlobalEMCValue());
										
									}
									clearAdditionalButtons(container);
									updateAvailableItems(container);
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
                                    if(!kleinStarController.isStar(localId))activeItemCount = maxActiveItemCount;
                                    container.setText("currentAmountForItem", "Выбрано: " + activeItemCount);
                                }
                            }
                        };

                        tTSlotYSelected = true;
                        //updateAvailableItems(container);
                    }
                }
            };
            anotherContainer.getGuiContent().elements["slotOn" + posYForSlot] = slot;
            posYForSlot += (listSlotScale + listSlotSpace);
        }
    });*/
}

function sortLearnedItems() {
    EMCSystem.getLearnedItems().sort(function(a, b) {
        if (Item.getName(a["id"], 0, a["data"]).toLowerCase() < Item.getName(b["id"], 0, b["data"]).toLowerCase()) return 8;
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
	container.getGuiContent().elements["buttonForward"] = null;
	container.getGuiContent().elements["buttonBackward"] = null;
    container.applyChanges();
    tTSlotYSelected = false;
}

TileEntity.registerPrototype(BlockID.TransmutationTable, {
    defaultValues: {
		wandData: 0,
		starPlaced: 0
	},
    click: function(id, count, data, coords) {

    },
    init: function() {
		
	},
	 getTransportSlots: function() {
        return {
            input: [],
            output: []
        };
    },
    tick: function() {
        if (this.container.isOpened()) {
            if (kleinStarController.isStar(this.container.getSlot("burnSlot").id)) {
                if (this.data.starPlaced == 0) {
					this.data.wandData = this.container.getSlot("burnSlot").data;
					var additionalEMC = kleinStarController.getEMC(this.data.wandData);
					kleinStarController.extractAllEMC(this.data.wandData);
					EMCSystem.addToGlobalEMCValue(additionalEMC);
					this.container.setText("EMCValue", "ЕМС в системе:  " + EMCSystem.getGlobalEMCValue());
					
					var emcValue = getEMC(this.container.getSlot("burnSlot").id, 0);
                    this.container.setText("addValue", emcValue == -1 ? "Нельзя сжечь" : "+" + emcValue * this.container.getSlot("burnSlot").count);
                    addedValue = true;
					
					clearAdditionalButtons(this.container);
					updateAvailableItems(this.container, activeFirstIndex);
					
					this.data.starPlaced = 1;
                }
            } else {
                if (this.data.starPlaced == 1) {
                    this.data.starPlaced = 0;
					var deltaEMC = kleinStarController.getMax(this.data.wandData)-kleinStarController.getEMC(this.data.wandData);
					if (deltaEMC > 0) {
						kleinStarController.addEMC(this.data.wandData, deltaEMC > EMCSystem.getGlobalEMCValue() ? EMCSystem.getGlobalEMCValue() : deltaEMC);
						EMCSystem.removeFromGlobalEMCValue(deltaEMC > EMCSystem.getGlobalEMCValue() ? EMCSystem.getGlobalEMCValue() : deltaEMC);
					}
					activeFirstIndex=0;
					clearAdditionalButtons(this.container);
					updateAvailableItems(this.container, activeFirstIndex);
					//Game.dialogMessage("Remove EMC");
                }
                this.container.setText("EMCValue", "ЕМС в системе:  " + EMCSystem.getGlobalEMCValue());
                if (tTGuiFirstUpdate) {
                    tTGuiFirstUpdate = false;
                    updateAvailableItems(this.container, activeFirstIndex);
                }
                if (!addedValue && this.container.getSlot("burnSlot").id != 0) {
                    var emcValue = getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data);
                    this.container.setText("addValue", emcValue == -1 ? "Нельзя сжечь" : "+" + emcValue * this.container.getSlot("burnSlot").count);
                    addedValue = true;
                } else if (addedValue && this.container.getSlot("burnSlot").id == 0) {
                    this.container.setText("addValue", "");
                    addedValue = false;
                }
				if(this.container.getSlot("burnSlot").id != 0){
					var emcValue = getEMC(this.container.getSlot("burnSlot").id, this.container.getSlot("burnSlot").data);
					this.container.setText("addValue", emcValue == -1 ? "Нельзя сжечь" : "+" + emcValue * this.container.getSlot("burnSlot").count);
				}
            }
        }
    },
    getGuiScreen: function() {
        tTGuiFirstUpdate = true;
        return TransmutationTableUI;
    }
});
