import IceCreamGenerator from "./components/iceCreamGenerator.js";
import VendingMachine from "./components/vendingmachine.js";

const iceCreamGenerator = new IceCreamGenerator();
const vendingMachine = new VendingMachine();

await iceCreamGenerator.setup();
vendingMachine.setup();
