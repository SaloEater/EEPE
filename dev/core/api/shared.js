ModAPI.registerAPI("EECore", {
    addItem: function(id, data, value) {
        EMCSystem.addItem(id, data, value);
    }
});

ModAPI.addAPICallback("EECore", function() {
    Logger.Log("Equivalent Exchange API is registred and can be accessed by ModAPI.requireAPI(\"EECore\")", LOGGER_TAG);
});

Saver.addSavesScope("BackpacksScope",
    function read(scope) {
        EMCSystem.setGlobalEMCValue(scope.emc);
		EMCSystem.setLearnedItems(scope.learned);
		kleinStarController.setSavePack(scope.stars);
    },

    function save() {
        var save = {};
        save.emc = EMCSystem.getGlobalEMCValue();
        save.learned= EMCSystem.getLearnedItems();
		save.stars = kleinStarController.getSavePack();
        return save;
    }
);