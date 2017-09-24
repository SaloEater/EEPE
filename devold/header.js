importLib("ToolType", "*");

ToolAPI.registerBlockMaterial(BlockID.TransmutationTable, "dirt", 2);
ToolAPI.registerBlockMaterial(BlockID.energyCondenser, "stone", 2);
ToolAPI.registerBlockMaterial(BlockID.energyCollectorTier1, "dirt", 2);
ToolAPI.registerBlockMaterial(BlockID.energyCollectorTier2, "dirt", 2);
ToolAPI.registerBlockMaterial(BlockID.energyCollectorTier3, "dirt", 2);
ToolAPI.registerBlockMaterial(BlockID.antiMatterTier1, "stone", 2);
ToolAPI.registerBlockMaterial(BlockID.antiMatterTier2, "stone", 2);
ToolAPI.registerBlockMaterial(BlockID.antiMatterTier3, "stone", 2);
ToolAPI.registerBlockMaterial(BlockID.alchemicalChest, "stone", 2);
ToolAPI.registerBlockMaterial(BlockID.alchemicalCoalBlock, "stone", 2);
ToolAPI.registerBlockMaterial(BlockID.mobiusFuelBlock, "stone", 2);
ToolAPI.registerBlockMaterial(BlockID.aeternalisFuelBlock, "stone", 2);

Callback.addCallback("LevelLoaded", function() {
    minimumHeight = UI.getScreenHeight() + EMCSystem.EMCForItems.length * (listSlotScale + listSlotSpace); // Ну ало, фикс ми
    screensize = ModAPI.requireGlobal("GuiUtils.GetDisplaySize()");
});

Callback.addCallback("PostLoaded", function() {
	kleinStarController.addStarId(ItemID.einStar);
	kleinStarController.addStarId(ItemID.zweiStar);
	kleinStarController.addStarId(ItemID.dreiStar);
	kleinStarController.addStarId(ItemID.vierStar);
	kleinStarController.addStarId(ItemID.sphereStar);
	kleinStarController.addStarId(ItemID.omegaStar);
    EMCSystem.addVanillaItemsToList();
    EMCSystem.addEEItemsToList();
    EMCSystem.addToCollector();
	tTHeight = UI.getScreenHeight() + EMCSystem.EMCForItems.length * (listSlotScale + listSlotSpace);
    Recipes.addShaped({
        id: ItemID.philosopherStone,
        count: 1,
        data: 0
    }, [
        "rgr",
        "gdg",
        "rgr"
    ], ['r', 331, 0, 'g', 348, 0, 'd', 264, 0]);

    Recipes.addShaped({
        id: BlockID.TransmutationTable,
        count: 1,
        data: 0
    }, [
        "oso",
        "sps",
        "oso"
    ], ['o', 49, 0, 's', 1, 0, 'p', ItemID.philosopherStone, 0]);

    Recipes.addShaped({
        id: BlockID.energyCondenser,
        count: 1,
        data: 0
    }, [
        "odo",
        "dad",
        "odo"
    ], ['o', 49, 0, 'a', BlockID.alchemicalChest, 0, 'd', 264, 0]);

    Recipes.addShaped({
        id: BlockID.alchemicalChest,
        count: 1,
        data: 0
    }, [
        "lmh",
        "sds",
        "ici"
    ], ['s', 1, 0, 'l', ItemID.lowCovalenceDust, 0, 'm', ItemID.mediumCovalenceDust, 0, 'h', ItemID.highCovalenceDust, 0, 'd', 264, 0, 'i', 265, 0, 'c', 54, 0]);

    Recipes.addShaped({
        id: BlockID.energyCollectorTier1,
        count: 1,
        data: 0
    }, [
        "gbg",
        "gdg",
        "gfg"
    ], ['g', 89, 0, 'b', 20, 0, 'd', 57, 0, 'f', 61, 0]);

    Recipes.addShaped({
        id: BlockID.energyCollectorTier2,
        count: 1,
        data: 0
    }, [
        "gdg",
        "gfg",
        "ggg"
    ], ['g', 89, 0, 'd', ItemID.darkMatter, 0, 'f', BlockID.energyCollectorTier1, 0]);

    Recipes.addShaped({
        id: BlockID.energyCollectorTier3,
        count: 1,
        data: 0
    }, [
        "grg",
        "gsg",
        "ggg"
    ], ['g', 89, 0, 'r', ItemID.redMatter, 0, 's', BlockID.energyCollectorTier2, 0]);

    Recipes.addShaped({
        id: BlockID.antiMatterTier1,
        count: 1,
        data: 0
    }, [
        "gbg",
        "gdg",
        "ggg"
    ], ['g', 49, 0, 'b', 20, 0, 'd', 57, 0]);

    Recipes.addShaped({
        id: BlockID.antiMatterTier2,
        count: 1,
        data: 0
    }, [
        "gbg",
        "gdg",
        "ggg"
    ], ['g', 49, 0, 'b', ItemID.darkMatter, 0, 'd', BlockID.antiMatterTier1, 0]);

    Recipes.addShaped({
        id: BlockID.antiMatterTier3,
        count: 1,
        data: 0
    }, [
        "grg",
        "gsg",
        "ggg"
    ], ['g', 49, 0, 'r', ItemID.redMatter, 0, 's', BlockID.antiMatterTier2, 0]);

    Recipes.addShaped({
        id: ItemID.lowCovalenceDust,
        count: 40,
        data: 0
    }, [
        "ccc",
        "ccc",
        "cch"
    ], ['c', 4, 0, 'h', 263, 1]);

    Recipes.addShapeless({
        id: ItemID.mediumCovalenceDust,
        count: 40,
        data: 0
    }, [{
        id: 265,
        data: 0
    }, {
        id: 331,
        data: 0
    }]);
    Recipes.addShapeless({
        id: ItemID.highCovalenceDust,
        count: 40,
        data: 0
    }, [{
        id: 263,
        data: 0
    }, {
        id: 264,
        data: 0
    }]);

    Recipes.addShaped({
        id: ItemID.redMatter,
        count: 1,
        data: 0
    }, [
        "aaa",
        "ddd",
        "aaa"
    ], ['a', ItemID.aeternalisFuel, 0, 'd', ItemID.darkMatter, 0]);

    Recipes.addShaped({
        id: ItemID.darkMatter,
        count: 1,
        data: 0
    }, [
        "aaa",
        "ada",
        "aaa"
    ], ['a', ItemID.aeternalisFuel, 0, 'd', 264, 0]);

    Recipes.addShaped({
        id: ItemID.aeternalisFuel,
        count: 1,
        data: 0
    }, [
        "pm ",
        "mm ",
        "m  "
    ], ['p', ItemID.philosopherStone, 0, 'm', ItemID.mobiusFuel, 0]);

    Recipes.addShaped({
        id: ItemID.mobiusFuel,
        count: 1,
        data: 0
    }, [
        "pa ",
        "aa ",
        "a  "
    ], ['p', ItemID.philosopherStone, 0, 'a', ItemID.alchemicalCoal, 0]);

    Recipes.addShaped({
        id: ItemID.alchemicalCoal,
        count: 1,
        data: 0
    }, [
        "pc ",
        "cc ",
        "c  "
    ], ['p', ItemID.philosopherStone, 0, 'c', 263, 0]);

    Recipes.addShaped({
        id: BlockID.alchemicalCoalBlock,
        count: 1,
        data: 0
    }, [
        "aaa",
        "aaa",
        "aaa"
    ], ['a', ItemID.alchemicalCoal, 0]);

    Recipes.addShaped({
        id: BlockID.mobiusFuelBlock,
        count: 1,
        data: 0
    }, [
        "aaa",
        "aaa",
        "aaa"
    ], ['a', ItemID.mobiusFuel, 0]);

    Recipes.addShaped({
        id: BlockID.aeternalisFuelBlock,
        count: 1,
        data: 0
    }, [
        "aaa",
        "aaa",
        "aaa"
    ], ['a', ItemID.aeternalisFuel, 0]);

    Recipes.addShaped({
        id: ItemID.einStar,
        count: 1,
        data: 0
    }, [
        "aaa",
        "ada",
        "aaa"
    ], ['a', ItemID.mobiusFuel, 0, 'd', 264, 0], kleinStarZeroDataCraft);
	
	Recipes.addShaped({
        id: 263,
        count: 1,
        data: 1
    }, [
        "pc ",
        "cc ",
        "c  "
    ], ['c', 263, 1, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: 263,
        count: 4,
        data: 1
    }, [
        "pc ",
        "   ",
        "   "
    ], ['c', 263, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: 266,
        count: 1,
        data: 0
    }, [
        "pii",
        "iii",
        "iii"
    ], ['i', 265, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: 265,
        count: 8,
        data: 0
    }, [
        "pg ",
        "   ",
        "   "
    ], ['g', 266, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: 264,
        count: 1,
        data: 0
    }, [
        "pg ",
        "gg",
        "g  "
    ], ['g', 266, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: 266,
        count: 4,
        data: 0
    }, [
        "pd ",
        "   ",
        "   "
    ], ['d', 264, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: ItemID.alchemicalCoal,
        count: 1,
        data: 0
    }, [
        "pc ",
        "cc ",
        "c  "
    ], ['c', 263, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: 263,
        count: 4,
        data: 0
    }, [
        "pc ",
        "   ",
        "   "
    ], ['c', ItemID.alchemicalCoal, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: ItemID.mobiusFuel,
        count: 1,
        data: 0
    }, [
        "pc ",
        "cc ",
        "c  "
    ], ['c', ItemID.alchemicalCoal, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: ItemID.alchemicalCoal,
        count: 1,
        data: 0
    }, [
        "pc ",
        "   ",
        "   "
    ], ['c', ItemID.mobiusFuel, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: ItemID.aeternalisFuel,
        count: 1,
        data: 0
    }, [
        "pc ",
        "cc ",
        "c  "
    ], ['c', ItemID.mobiusFuel, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: ItemID.mobiusFuel,
        count: 1,
        data: 0
    }, [
        "pc ",
        "   ",
        "   "
    ], ['c', ItemID.aeternalisFuel, 0, 'p', ItemID.philosopherStone, 0], philosopherStoneCraft);
	
	Recipes.addShaped({
        id: ItemID.zweiStar,
        count: 1,
        data: 0
    }, [
        "ss ",
        "ss ",
        "   "
    ], ['s', ItemID.einStar, -1], kleinStarEnergyCraft);
	
	Recipes.addShaped({
        id: ItemID.dreiStar,
        count: 1,
        data: 0
    }, [
        "ss ",
        "ss ",
        "   "
    ], ['s', ItemID.zweiStar, -1], kleinStarEnergyCraft);
	
	Recipes.addShaped({
        id: ItemID.vierStar,
        count: 1,
        data: 0
    }, [
        "ss ",
        "ss ",
        "   "
    ], ['s', ItemID.dreiStar, -1], kleinStarEnergyCraft);
	
	Recipes.addShaped({
        id: ItemID.sphereStar,
        count: 1,
        data: 0
    }, [
        "ss ",
        "ss ",
        "   "
    ], ['s', ItemID.vierStar, -1], kleinStarEnergyCraft);
	
	Recipes.addShaped({
        id: ItemID.omegaStar,
        count: 1,
        data: 0
    }, [
        "ss ",
        "ss ",
        "   "
    ], ['s', ItemID.sphereStar, -1], kleinStarEnergyCraft);

});

function getEMC(id, data) {
    emcValue = -1;
    try {
        EMCSystem.EMCForItems.forEach(function(item, i, arr) {
            if (item["id"] == id && item["data"] == data) {
                emcValue = item["value"];
                throw breakException;
            }
        });
    } catch (e) {
        if (e != breakException) throw e;
    }
    return emcValue;
}
