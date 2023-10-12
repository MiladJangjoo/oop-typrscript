import { v4 as uuidv4 } from 'uuid';

interface InventoryItem {
    id: string,
    name:string,
    description:string,
    value: number
}

interface Armor extends InventoryItem {
    defense: number
}

interface Weapon extends InventoryItem {
    damage: number
}

interface RPGCharacter {
    id: string,
    name: string,
    archtype : string,
    fightingStyle: 'ranged' | 'melee',
    inventory: InventoryItem[];
}

function createCharacter (name: string,archtype: string,fightingStyle: 'ranged' | 'melee'): RPGCharacter{
    const charachter: RPGCharacter = {
        id: uuidv4(),
        name,
        archtype,
        fightingStyle,
        inventory: []
    }

    return charachter
}

function createInventoryItem(name:string,description:string,value:number,isWeapon:boolean):InventoryItem {
    const inventory: InventoryItem= {
    id: uuidv4(),
    name,
    description,
    value
}
    if (isWeapon) {
        const weapon: Weapon = { ...inventory, damage: 0 };
        return weapon;
    } else {
        const armor: Armor = { ...inventory, defense: 0 };
        return armor;
    }  
}

function addToInventory(item:InventoryItem , charachter: RPGCharacter):void{
    charachter.inventory.push(item)
}

function removeFromInventory(item: InventoryItem, character: RPGCharacter): void {
    character.inventory = character.inventory.filter((invItem) => invItem.id !== item.id);
}

function inventoryValue(character: RPGCharacter): number {
    return character.inventory.reduce((totalValue, item) => totalValue + item.value, 0);
}

function printInventory(character: RPGCharacter): void {
    character.inventory.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - ${item.description} - Value: ${item.value}`);
    });
}

const charachter:RPGCharacter = createCharacter('Milad','Demolation', 'melee')
console.log(charachter)

const createinventory = createInventoryItem('milad','USA', 20, false)
console.log(createinventory);

const club = createInventoryItem('club','woodenclub', 20, false)
console.log(createinventory);

addToInventory(createinventory, charachter)
console.log(charachter)

printInventory(charachter)

addToInventory(club, charachter)
console.log(charachter)

removeFromInventory(club,charachter)
console.log(charachter)
console.log(inventoryValue(charachter))