var LOGGER_TAG = "Equivalent Exchange";
var nativeGetLightLevel = ModAPI.requireGlobal("Level.getBrightness");
var valueButtonAllow = false;
var minimumHeight;
var breakException = {};
var handCheckerPS = false,
    valueBShowed = false;
var GUI1, GUI2, GUIEMC;
var PhStoneMobChangeButtonState = 0;
var screensize = {
    x: 0,
    y: 0
};
var localId;
var localData;
var localX;
var localY;
//var EMCInSystem = 0;
var validItem = false;
var listSlotScale = 60;
var listSlotSpace = listSlotScale / 10;
var tTGuiOpened = false;
var tTSlotYSelected = false;
var activeItemCount = 1;
var maxActiveItemCount = 1;
var tTGuiFirstUpdate = false;
var addedValue = false;
var activeScreen = "null";
var lastCoords = {};
var partOfStar = "";
var starPlaced = 0;
var additionalEMC = 0;
var tTHeight = 0;
var allowedPSButtons=false;