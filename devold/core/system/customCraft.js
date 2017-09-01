var kleinStarZeroDataCraft = function(api, field, result) {
	for (var i in field) {
		api.decreaseFieldSlot(i);
    };
	result.data=kleinStarController.registerWand(result);
}

var kleinStarEnergyCraft = function(api, field, result) {
	var craftedEMC=0;
	for (var i in field) {
		if(field[i].id!=0 && field[i].data!=0)craftedEMC+=kleinStarController.getEMC(field[i].data);
		api.decreaseFieldSlot(i);
    };
	result.data=kleinStarController.registerWand(result);
	kleinStarController.addEMC(result.data, craftedEMC);
}

var philosopherStoneCraft = function(api, field, result) {
	for (var i in field) {
		if(field[i].id!=ItemID.philosopherStone)api.decreaseFieldSlot(i);
    };
	Player.addItemToInventory(result.id, 1, newData);
}
