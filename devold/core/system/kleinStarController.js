var kleinStarController = {
	save: {
		uniqueID: 1
	},
	
	starIds: [],
	
	addStarId: function(id){
		this.starIds.push(id);
	},
	
	addEMC: function(data, amount){
		this.save[data].current+=amount;
	},
	
	extractEMC: function(data, amount){
		this.save[data].current-=amount;
	},
	
	extractAllEMC: function(data){
		this.save[data].current=0;
	},
	
	getEMC: function(data){
		return this.save[data].current;
	},
	
	getMax: function(data){
		return this.save[data].max;
	},
	
	getSavePack: function(){
		return this.save;
	},
	
	setSavePack: function(pack){
		this.save=pack?pack:{uniqueID: 1};
	},
	
	registerWand: function(wand){
		var maximum=((wand.id==ItemID.einStar?50000:(wand.id==ItemID.zweiStar?200000:(wand.id==ItemID.dreiStar?800000:(wand.id==ItemID.vierStar?3200000:(wand.id==ItemID.sphereStar?12800000:(wand.id==ItemID.omegaStar?51200000:0)))))));
		this.save[this.save.uniqueID]={};
		this.save[this.save.uniqueID].current=0;
		this.save[this.save.uniqueID].max=maximum;
		return this.save.uniqueID++;
	}, 

	isStar: function(id){
		return this.starIds.indexOf(id)==-1?false:true;
	}
};
