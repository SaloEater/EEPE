ModAPI.registerAPI("EECore", {
    addItem: function(id, data, value) {
        EMCSystem.addItem(id, data, value);
    }
});

ModAPI.addAPICallback("EECore", function() {
    Logger.Log("Equivalent Exchange API is registred and can be accessed by ModAPI.requireAPI(\"EECore\")", LOGGER_TAG);
});
