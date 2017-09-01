IDRegistry.genItemID("einStar");
Item.createItem("einStar", "Star I", {
    name: "klein_star",
    meta: 1
}, {
    stack: 1
});
Translation.addTranslation("Star I", {
    ru: "Звезда I"
});

IDRegistry.genItemID("zweiStar");
Item.createItem("zweiStar", "Star II", {
    name: "klein_star",
    meta: 2
}, {
    stack: 1
});
Translation.addTranslation("Star II", {
    ru: "Звезда II"
});

IDRegistry.genItemID("dreiStar");
Item.createItem("dreiStar", "Star III", {
    name: "klein_star",
    meta: 3
}, {
    stack: 1
});
Translation.addTranslation("Star III", {
    ru: "Звезда III"
});

IDRegistry.genItemID("vierStar");
Item.createItem("vierStar", "Star IV", {
    name: "klein_star",
    meta: 4
}, {
    stack: 1
});
Translation.addTranslation("Star IV", {
    ru: "Звезда IV"
});

IDRegistry.genItemID("sphereStar");
Item.createItem("sphereStar", "Star Sphere", {
    name: "klein_star",
    meta: 5
}, {
    stack: 1
});
Translation.addTranslation("Star Sphere", {
    ru: "Звезда Сфера"
});

IDRegistry.genItemID("omegaStar");
Item.createItem("omegaStar", "Star Omega", {
    name: "klein_star",
    meta: 6
}, {
    stack: 1
});
Translation.addTranslation("Star Omega", {
    ru: "Звезда Омега"
});

Callback.addCallback("tick", function() {
    if(World.getThreadTime()%20==0&&kleinStarController.isStar(Player.getCarriedItem().id)){
		Game.tipMessage("\n\n\n\n"+kleinStarController.getEMC(Player.getCarriedItem().data)+"/"+kleinStarController.getMax(Player.getCarriedItem().data));
    }
});
