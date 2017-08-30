var EMCSystem = {
	
	globalEMCValue: 0,
	
	getGlobalEMCValue: function(){
		return this.globalEMCValue;
	},
	
	setGlobalEMCValue: function(value){
		this.globalEMCValue=value;
	},
	
	addToGlobalEMCValue: function(value){
		this.globalEMCValue+=value;
	},
	
	removeFromGlobalEMCValue: function(value){
		this.globalEMCValue-=value;
	},
	
	collectorRecipes : {
		2631: {
			value: 32,
			resultid: 331,
			resultdata: 0
		},
		3310: {
			value: 64,
			resultid: 263,
			resultdata: 0
		},
		2630: {
			value: 64,
			resultid: 289,
			resultdata: 0
		},
		2890: {
			value: 192,
			resultid: 348,
			resultdata: 0
		},


		1520: {
			value: 192,
			resultid: 377,
			resultdata: 0,
		},
		3770: {
			value: 384,
			resultid: 173,
			resultdata: 0,
		},
		1730: {
			value: 384,
			resultid: 89,
			resultdata: 0,
		},
	},
	
	
	EMCForItems: [
	
	],
	
	
	learnedItems: [
	
	],
	
	getLearnedItems: function(){
		return this.learnedItems;
	},
	
	setLearnedItems: function(learnedItems){
		this.learnedItems=learnedItems;
	},
	
	addToLearnedItems: function(element){
		this.learnedItems.push(element);
	},
	
    addToCollector: function() {
        this.collectorRecipes[ItemID.alchemicalCoal + "0"] = {
            value: 64,
            resultid: 152,
            resultdata: 0,
        };

        this.collectorRecipes[ItemID.mobiusFuel + "0"] = {
            value: 2560,
            resultid: BlockID.alchemicalCoalBlock,
            resultdata: 0,
        };

        this.collectorRecipes[3480] = {
            value: 128,
            resultid: ItemID.alchemicalCoal,
            resultdata: 0,
        };

        this.collectorRecipes[890] = {
            value: 512,
            resultid: ItemID.mobiusFuel,
            resultdata: 0,
        };

        this.collectorRecipes[BlockID.alchemicalCoalBlock + "0"] = {
            value: 3584,
            resultid: ItemID.aeternalisFuel,
            resultdata: 0,
        };

        this.collectorRecipes[ItemID.aeternalisFuel + "0"] = {
            value: 10240,
            resultid: BlockID.mobiusFuelBlock,
            resultdata: 0,
        };

        this.collectorRecipes[BlockID.mobiusFuelBlock + "0"] = {
            value: 55296,
            resultid: BlockID.aeternalisFuelBlock,
            resultdata: 0,
        };
    },
    addItem: function(id, data, value) {
        this.EMCForItems.push({
            "id": id,
            "data": data,
            "value": value
        });
    },
    addEEItemsToList: function() {
        //Philosopher's Stone
        this.addItem(ItemID.philosopherStone, 0, 9984);
        //Antimatter3
        this.addItem(BlockID.antiMatterTier3, 0, 681281);
        //Antimatter2
        this.addItem(BlockID.antiMatterTier2, 0, 213889);
        //Antimatter1
        this.addItem(BlockID.antiMatterTier1, 0, 74177);
        //EnergyCollector3
        this.addItem(BlockID.energyCollectorTier3, 0, 710665);
        //EnergyCollector2
        this.addItem(BlockID.energyCollectorTier2, 0, 232969);
        //EnergyCollector1
        this.addItem(BlockID.energyCollectorTier1, 0, 82953);
        //energyCondenser
        this.addItem(BlockID.energyCondenser, 0, 42011);
        //energyCondenser
        this.addItem(BlockID.energyCondenser, 0, 42011);
        //TransmutationTable
        this.addItem(BlockID.TransmutationTable, 0, 42011);
        //Low Covalence
        this.addItem(ItemID.lowCovalenceDust, 0, 1);
        //Medium Covalence
        this.addItem(ItemID.mediumCovalenceDust, 0, 8);
        //High Covalence
        this.addItem(ItemID.highCovalenceDust, 0, 208);
        //Alchemist Coal
        this.addItem(ItemID.alchemicalCoal, 0, 512);
        //Mobius Fuel
        this.addItem(ItemID.mobiusFuel, 0, 2048);
        //aeternalis Fuel
        this.addItem(ItemID.aeternalisFuel, 0, 8192);
        //dark Matter
        this.addItem(ItemID.darkMatter, 0, 139264);
        //red Matter
        this.addItem(ItemID.darkMatter, 0, 466944);
        //Alch chest
        this.addItem(BlockID.alchemicalChest, 0, 8987);
        //Alchemist Coal Block
        this.addItem(BlockID.alchemicalCoalBlock, 0, 4608);
        //Mobius Coal Block
        this.addItem(BlockID.mobiusFuelBlock, 0, 18432);
        //Aeternalis Coal Block
        this.addItem(BlockID.aeternalisFuelBlock, 0, 73728);
		//Aeternalis Coal Block
        this.addItem(BlockID.aeternalisFuelBlock, 0, 73728);
		//Ein Star
        this.addItem(ItemID.einStar, 0, 24576);
		//Zwei Star
        this.addItem(ItemID.zweiStar, 0, 98304);
		//Drei Star
        this.addItem(ItemID.dreiStar, 0, 393216);
		//Vier Star
        this.addItem(ItemID.vierStar, 0, 1572864);
		//Sphere Star
        this.addItem(ItemID.sphereStar, 0, 6291456);
		//Omega Star
        this.addItem(ItemID.omegaStar, 0, 25165824);
		
    },
    addVanillaItemsToList: function() {
        //Stone
        this.addItem(1, 0, 1);
        //Grass
        this.addItem(2, 0, 1);
        //Dirt
        this.addItem(3, 0, 1);
        //Cobblestone
        this.addItem(4, 0, 1);
        //Wooden Planks 
        this.addItem(5, 0, 8);
        //Wooden Planks 
        this.addItem(5, 1, 8);
        //Wooden Planks 
        this.addItem(5, 2, 8);
        //Wooden Planks 
        this.addItem(5, 3, 8);
        //Sapling 
        this.addItem(6, 0, 8);
        //Sapling 
        this.addItem(6, 1, 8);
        //Sapling 
        this.addItem(6, 2, 8);
        //Sapling 
        this.addItem(6, 3, 8);
        //Bedrock
        this.addItem(7, 0, 100500);
        //Sand
        this.addItem(12, 0, 1);
        //Gravel
        this.addItem(13, 0, 4);
        //Wood 
        this.addItem(17, 0, 32);
        //Wood 
        this.addItem(17, 1, 32);
        //Wood 
        this.addItem(17, 2, 32);
        //Wood 
        this.addItem(17, 3, 32);
        //Leaves 
        this.addItem(18, 0, 1);
        //Leaves 
        this.addItem(18, 1, 1);
        //Leaves 
        this.addItem(18, 2, 1);
        //Leaves 
        this.addItem(18, 3, 1);
        //Glass
        this.addItem(20, 0, 1);
        //Lapis Lazuli Block
        this.addItem(22, 0, 7776);
        //Dispencer
        this.addItem(23, 0, 119);
        //Sandstone 
        this.addItem(24, 0, 4);
        //Sandstone 
        this.addItem(24, 1, 4);
        //Sandstone 
        this.addItem(24, 2, 4);
        //Note Block 
        this.addItem(25, 0, 128);
        //Powered Rail 
        this.addItem(27, 0, 2059);
        //Detector Rail 
        this.addItem(28, 0, 267);
        //Sticky Piston
        this.addItem(29, 0, 380);
        //Cobweb
        this.addItem(30, 0, 12);
        //Fern 
        this.addItem(31, 0, 1);
        //Fern 
        this.addItem(31, 1, 1);
        //Fern 
        this.addItem(31, 2, 1);
        //Fern 
        this.addItem(31, 3, 1);
        //Dead bush
        this.addItem(32, 0, 1);
        //Piston
        this.addItem(33, 0, 348);
        //Wool
        this.addItem(35, 0, 48);
        //Wool
        this.addItem(35, 1, 64);
        //Wool
        this.addItem(35, 2, 64);
        //Wool
        this.addItem(35, 3, 64);
        //Wool
        this.addItem(35, 4, 64);
        //Wool
        this.addItem(35, 5, 76);
        //Wool
        this.addItem(35, 6, 64);
        //Wool
        this.addItem(35, 7, 80);
        //Wool
        this.addItem(35, 8, 64);
        //Wool
        this.addItem(35, 9, 484);
        //Wool
        this.addItem(35, 10, 488);
        //Wool
        this.addItem(35, 11, 912);
        //Wool
        this.addItem(35, 12, 176);
        //Wool
        this.addItem(35, 13, 56);
        //Wool
        this.addItem(35, 14, 64);
        //Wool
        this.addItem(35, 15, 64);
        //Flower
        this.addItem(37, 0, 16);
        //Red Rose
        this.addItem(38, 0, 16);
        //Muchroom
        this.addItem(39, 0, 32);
        //Muchroom
        this.addItem(40, 0, 32);
        //Gold Block
        this.addItem(41, 0, 18432);
        //Iron Block
        this.addItem(42, 0, 2304);
        //Sand Slab
        this.addItem(44, 1, 2);
        //Brick Slab
        this.addItem(44, 4, 32);
        //Nether Slab
        this.addItem(44, 6, 2);
        //Quartz Slab
        this.addItem(44, 7, 512);
        //Brick Block
        this.addItem(45, 0, 64);
        //TNT
        this.addItem(46, 0, 964);
        //Bookshelf
        this.addItem(47, 0, 528);
        //Moss stone
        this.addItem(48, 0, 2);
        //Obsidian
        this.addItem(49, 0, 64);
        //Torch
        this.addItem(50, 0, 9);
        //Wooden stairs
        this.addItem(53, 0, 12);
        //Chest
        this.addItem(54, 0, 64);
        //Diamond block
        this.addItem(57, 0, 73728);
        //Workbench
        this.addItem(58, 0, 32);
        //Furnace
        this.addItem(61, 0, 8);
        //Ladder
        this.addItem(65, 0, 9);
        //Rail
        this.addItem(66, 0, 96);
        //Cobble stairs
        this.addItem(67, 0, 1);
        //Lever
        this.addItem(69, 0, 5);
        //Stone Pressure Plate
        this.addItem(70, 0, 2);
        //Wooden Pressure Plate
        this.addItem(72, 0, 16);
        //Redstone Torch
        this.addItem(76, 0, 68);
        //Button
        this.addItem(77, 0, 1);
        //Ice
        this.addItem(79, 0, 1);
        //Snow Block
        this.addItem(80, 0, 1);
        //Cactus
        this.addItem(81, 0, 8);
        //Clay
        this.addItem(82, 0, 64);
        //Jukebox
        this.addItem(84, 0, 8256);
        //Fence
        this.addItem(85, 0, 12);
        //Pumpkin
        this.addItem(86, 0, 144);
        //Netherrack
        this.addItem(87, 0, 1);
        //Soul sand
        this.addItem(88, 0, 49);
        //Glowstone
        this.addItem(89, 0, 1536);
        //Jack Lantern
        this.addItem(91, 0, 153);
        //Trap door
        this.addItem(96, 0, 24);
        //Mushroom big block
        this.addItem(99, 0, 1);
        //Mushroom big block
        this.addItem(100, 0, 1);
        //Iron Bar
        this.addItem(101, 0, 96);
        //Melon
        this.addItem(103, 0, 144);
        //Vine
        this.addItem(106, 0, 8);
        //Gate
        this.addItem(107, 0, 32);
        //Brick stairs
        this.addItem(108, 0, 96);
        //Stone brick stairs
        this.addItem(109, 0, 1);
        //Mycelium
        this.addItem(110, 0, 2);
        //Netherbrick
        this.addItem(112, 0, 4);
        //Netherbrick fence
        this.addItem(113, 0, 4);
        //Netherbrick stairs
        this.addItem(114, 0, 6);
        //Enchanting table
        this.addItem(116, 0, 16800);
        //Ender stone
        this.addItem(121, 0, 1);
        //Lamp off
        this.addItem(123, 0, 1792);
        //Lamp on
        this.addItem(124, 0, 1792);
        //Wooden slab
        this.addItem(126, 0, 4);
        //Wooden slab
        this.addItem(126, 1, 4);
        //Wooden slab
        this.addItem(126, 2, 4);
        //Wooden slab
        this.addItem(126, 3, 4);
        //Sandstone stairs
        this.addItem(128, 0, 6);
        //Ender chest
        this.addItem(130, 0, 2304);
        //Grapping hook
        this.addItem(131, 0, 134);
        //Emerald block
        this.addItem(133, 0, 147456);
        //Wooden stairs
        this.addItem(134, 0, 12);
        //Wooden stairs
        this.addItem(135, 0, 12);
        //Wooden stairs
        this.addItem(136, 0, 12);
        //Beacon
        this.addItem(138, 0, 139461);
        //Cobble fence
        this.addItem(139, 0, 1);
        //Moss fence
        this.addItem(139, 1, 2);
        //Wooden button
        this.addItem(143, 0, 8);
        //Anvil
        this.addItem(145, 0, 7936);
        //Trap chest
        this.addItem(146, 0, 198);
        //Gold plate
        this.addItem(147, 0, 4096);
        //Iron plate
        this.addItem(148, 0, 512);
        //Solar 
        this.addItem(151, 0, 783);
        //Redstone block
        this.addItem(152, 0, 576);
        //Hopper
        this.addItem(154, 0, 1344);
        //Quartz  block
        this.addItem(155, 0, 1024);
        //Quartz  block
        this.addItem(155, 1, 1024);
        //Quartz  block
        this.addItem(155, 2, 1024);
        //Quartz  stairs
        this.addItem(156, 0, 1536);
        //Activator rail
        this.addItem(157, 0, 268);
        //Dropper
        this.addItem(158, 0, 71);
        //Colored Clay
        this.addItem(159, 0, 64);
        //Colored Clay
        this.addItem(159, 1, 64);
        //Colored Clay
        this.addItem(159, 2, 64);
        //Colored Clay
        this.addItem(159, 3, 64);
        //Colored Clay
        this.addItem(159, 4, 64);
        //Colored Clay
        this.addItem(159, 5, 64);
        //Colored Clay
        this.addItem(159, 6, 64);
        //Colored Clay
        this.addItem(159, 7, 64);
        //Colored Clay
        this.addItem(159, 8, 64);
        //Colored Clay
        this.addItem(159, 9, 64);
        //Colored Clay
        this.addItem(159, 10, 64);
        //Colored Clay
        this.addItem(159, 11, 64);
        //Colored Clay
        this.addItem(159, 12, 64);
        //Colored Clay
        this.addItem(159, 13, 64);
        //Colored Clay
        this.addItem(159, 14, 64);
        //Colored Clay
        this.addItem(159, 15, 64);
        //Hay bale
        this.addItem(170, 0, 216);
        //WoolSmall
        this.addItem(171, 0, 32);
        //WoolSmall
        this.addItem(171, 1, 42);
        //WoolSmall
        this.addItem(171, 2, 42);
        //WoolSmall
        this.addItem(171, 3, 42);
        //WoolSmall
        this.addItem(171, 4, 42);
        //WoolSmall
        this.addItem(171, 5, 50);
        //WoolSmall
        this.addItem(171, 6, 42);
        //WoolSmall
        this.addItem(171, 7, 53);
        //WoolSmall
        this.addItem(171, 8, 42);
        //WoolSmall
        this.addItem(171, 9, 322);
        //WoolSmall
        this.addItem(171, 10, 325);
        //WoolSmall
        this.addItem(171, 11, 608);
        //WoolSmall
        this.addItem(171, 12, 117);
        //WoolSmall
        this.addItem(171, 13, 37);
        //WoolSmall
        this.addItem(171, 14, 42);
        //WoolSmall
        this.addItem(171, 15, 42);
        //HClay
        this.addItem(172, 0, 64);
        //Coal block
        this.addItem(173, 0, 1152);
		//Podsolnuh
		this.addItem(175, 4, 16); // Check EMC
        //Iron shovel
        this.addItem(256, 0, 264);
        //Iron pickaxe
        this.addItem(257, 0, 776);
        //Iron axe
        this.addItem(258, 0, 776);
        //Flint and steel
        this.addItem(259, 0, 260);
        //Apple
        this.addItem(260, 0, 128);
        //Bow
        this.addItem(261, 0, 48);
        //Arrow
        this.addItem(262, 0, 14);
        //Coal
        this.addItem(263, 0, 128);
        //Charcoal
        this.addItem(263, 1, 32);
        //Diamond
        this.addItem(264, 0, 8192);
        //Iron ingot
        this.addItem(265, 0, 256);
        //Gold ingot
        this.addItem(266, 0, 2048);
        //Iron sword
        this.addItem(267, 0, 516);
        //Wooden sword
        this.addItem(268, 0, 20);
        //Wooden shovel
        this.addItem(269, 0, 16);
        //Wooden pickaxe
        this.addItem(270, 0, 32);
        //Wooden axe
        this.addItem(271, 0, 32);
        //Stone sword
        this.addItem(272, 0, 6);
        //Stone shovel
        this.addItem(273, 0, 9);
        //Stone pickaxe
        this.addItem(274, 0, 11);
        //Stone axe
        this.addItem(275, 0, 11);
        //Diamond sword
        this.addItem(276, 0, 16388);
        //Diamond shovel
        this.addItem(277, 0, 8200);
        //Diamond pickaxe
        this.addItem(278, 0, 24854);
        //Diamond axe
        this.addItem(279, 0, 24854);
        //Stick
        this.addItem(280, 0, 4);
        //Bowl
        this.addItem(281, 0, 6);
        //Mushroom bowl
        this.addItem(282, 0, 70);
        //Gold sword
        this.addItem(283, 0, 4100);
        //Gold shovel
        this.addItem(284, 0, 2056);
        //Gold pickaxe
        this.addItem(285, 0, 6152);
        //Gold axe
        this.addItem(286, 0, 6152);
        //String
        this.addItem(287, 0, 12);
        //Feather
        this.addItem(288, 0, 48);
        //Gunpowder
        this.addItem(289, 0, 192);
        //Wooden hoe
        this.addItem(290, 0, 24);
        //Stone hoe
        this.addItem(291, 0, 10);
        //Iron hoe
        this.addItem(292, 0, 520);
        //Diamond hoe
        this.addItem(293, 0, 16392);
        //Gold hoe
        this.addItem(294, 0, 4104);
        //Wheat seed
        this.addItem(295, 0, 16);
        //Wheat
        this.addItem(296, 0, 24);
        //Bread
        this.addItem(297, 0, 72);
        //Leather helmet
        this.addItem(298, 0, 320);
        //Leather chest
        this.addItem(299, 0, 512);
        //Leather leg
        this.addItem(300, 0, 448);
        //Leather boots
        this.addItem(301, 0, 256);
        //Iron helmet
        this.addItem(306, 0, 1280);
        //Iron chest
        this.addItem(307, 0, 2048);
        //Iron leg
        this.addItem(308, 0, 1792);
        //Iron boots
        this.addItem(309, 0, 1024);
        //Diamond helmet
        this.addItem(310, 0, 40960);
        //Diamond chest
        this.addItem(311, 0, 65536);
        //Diamond leg
        this.addItem(312, 0, 57344);
        //Diamond boots
        this.addItem(313, 0, 32768);
        //Gold helmet
        this.addItem(314, 0, 10240);
        //Gold chest
        this.addItem(315, 0, 16384);
        //Gold leg
        this.addItem(316, 0, 14336);
        //Gold boots
        this.addItem(317, 0, 8192);
        //Flint
        this.addItem(318, 0, 4);
        //Raw pig
        this.addItem(319, 0, 64);
        //Fried pig
        this.addItem(320, 0, 64);
        //Painting
        this.addItem(321, 0, 80);
        //Gold apple
        this.addItem(322, 0, 16512);
        //Gold apple 2?
        this.addItem(322, 1, 147584);
        //Sign
        this.addItem(323, 0, 17);
        //Door
        this.addItem(324, 0, 48);
        //Bucket
        this.addItem(325, 0, 768);
        //Bucket water
        this.addItem(326, 0, 768);
        //Bucket lava
        this.addItem(327, 0, 832);
        //Minecart
        this.addItem(328, 0, 1280);
        //Saddle
        this.addItem(329, 0, 192);
        //Iron door
        this.addItem(330, 0, 1536);
        //Redstone
        this.addItem(331, 0, 64);
        //Snowball
        this.addItem(332, 0, 1);
        //Boat
        this.addItem(333, 0, 40);
        //Leather
        this.addItem(334, 0, 64);
        //Bucket milk
        this.addItem(335, 0, 784);
        //Brick
        this.addItem(336, 0, 16);
        //Clay 
        this.addItem(337, 0, 16);
        //Sugar cane
        this.addItem(338, 0, 32);
        //Paper
        this.addItem(339, 0, 32);
        //Book
        this.addItem(340, 0, 160);
        //Slime
        this.addItem(341, 0, 32);
        //Cart chest
        this.addItem(342, 0, 1344);
        //Cart furnace
        this.addItem(343, 0, 1288);
        //Egg
        this.addItem(344, 0, 32);
        //Compass
        this.addItem(345, 0, 1088);
        //Fishing rod
        this.addItem(346, 0, 36);
        //Clock
        this.addItem(347, 0, 8256);
        //Glowstone
        this.addItem(348, 0, 384);
        //Raw fish
        this.addItem(349, 0, 64);
        //Fried fish
        this.addItem(350, 0, 64);
        //Dye
        this.addItem(351, 0, 16);
        //Dye
        this.addItem(351, 1, 16);
        //Dye
        this.addItem(351, 2, 8);
        //Dye
        this.addItem(351, 3, 128);
        //Dye
        this.addItem(351, 4, 864);
        //Dye
        this.addItem(351, 5, 440);
        //Dye
        this.addItem(351, 6, 436);
        //Dye
        this.addItem(351, 7, 16);
        //Dye
        this.addItem(351, 8, 32);
        //Dye
        this.addItem(351, 9, 16);
        //Dye
        this.addItem(351, 10, 28);
        //Dye
        this.addItem(351, 11, 16);
        //Dye
        this.addItem(351, 12, 16);
        //Dye
        this.addItem(351, 13, 16);
        //Dye
        this.addItem(351, 14, 16);
        //Dye
        this.addItem(351, 15, 48);
        //Bone
        this.addItem(352, 0, 144);
        //Sugar
        this.addItem(353, 0, 32);
        //Cake
        this.addItem(354, 0, 216);
        //Bed
        this.addItem(355, 0, 168);
        //Continuer
        this.addItem(356, 0, 203);
        //Biscuit
        this.addItem(357, 0, 2);
        //Shears
        this.addItem(359, 0, 512);
        //Melon piece
        this.addItem(360, 0, 16);
        //Pumpkin seeds
        this.addItem(361, 0, 36);
        //Melon seeds
        this.addItem(362, 0, 16);
        //Raw cow
        this.addItem(363, 0, 64);
        //Fried cow
        this.addItem(364, 0, 64);
        //Raw chicken
        this.addItem(365, 0, 64);
        //Fried chicken
        this.addItem(366, 0, 64);
        //Rotten flesh
        this.addItem(367, 0, 32);
        //Ender pearl
        this.addItem(368, 0, 1024);
        //Blaze rod
        this.addItem(369, 0, 1536);
        //Ghast tear
        this.addItem(370, 0, 4096);
        //Gold  nugget
        this.addItem(371, 0, 227);
        //Nether wart
        this.addItem(372, 0, 24);
        //Water bottle
        this.addItem(373, 0, 1);
        //Empty bottle
        this.addItem(374, 0, 1);
        //Spider eye
        this.addItem(375, 0, 128);
        //Good spider eye
        this.addItem(376, 0, 192);
        //Blaze powder
        this.addItem(377, 0, 768);
        //Nether Cream
        this.addItem(378, 0, 800);
        //Brewing
        this.addItem(379, 0, 1539);
        //Crucible
        this.addItem(380, 0, 1792);
        //Ender eye
        this.addItem(381, 0, 1792);
        //Gli melon
        this.addItem(382, 0, 1832);
        //Magma ball
        this.addItem(385, 0, 330);
        //Book and quill
        this.addItem(386, 0, 224);
        //Emerald
        this.addItem(388, 0, 16384);
        //Frame
        this.addItem(389, 0, 96);
        //Pot
        this.addItem(390, 0, 48);
        //Carrot
        this.addItem(391, 0, 64);
        //Potato
        this.addItem(392, 0, 64);
        //Fried potato
        this.addItem(393, 0, 64);
        //Rotten potato
        this.addItem(394, 0, 64);
        //Empty map
        this.addItem(395, 0, 1344);
        //Gold carrot
        this.addItem(396, 0, 1880);
        //Carrot rod
        this.addItem(398, 0, 100);
        //Nether start
        this.addItem(399, 0, 139264);
        //Pumpkin pie
        this.addItem(400, 0, 208);
        //Comarator
        this.addItem(404, 0, 463);
        //Nether brick
        this.addItem(405, 0, 1);
        //Quartz
        this.addItem(406, 0, 256);
        //Cart tnt
        this.addItem(407, 0, 2244);
        //Cart hopper
        this.addItem(408, 0, 2624);
        //Iron horse
        this.addItem(417, 0, 2048);
        //Gold horse
        this.addItem(418, 0, 16384);
        //Diamond horse
        this.addItem(419, 0, 40960);
        //Povodok
        this.addItem(420, 0, 40);
    }
}

