/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/

function GameObject(gameAttributes) {
	this.createdAt = gameAttributes.createdAt;
	this.name = gameAttributes.name;
	this.dimensions = gameAttributes.dimensions;
}

GameObject.prototype.destroy = function() {
	return `${this.name} was removed from the game.`;
};


/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats(characterAttributes) {
	GameObject.call(this, characterAttributes);
	this.healthPoints = characterAttributes.healthPoints;
}


CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function() {
	return `${this.name} took damage.`;
};


/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

function Humanoid(humanAttributes)
{
	CharacterStats.call(this, humanAttributes);
	this.team = humanAttributes.team;
	this.weapons = humanAttributes.weapons;
	this.language = humanAttributes.language;
}


Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function() {
	return `${this.name} offers a greeting in ${this.language}`;
};
 
/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/




// Test you work by un-commenting these 3 objects and the list of console logs below:


const mage = new Humanoid({
	createdAt: new Date(),
	dimensions: {
  		length: 2,
  		width: 1,
  		height: 1,
	},
	healthPoints: 5,
	name: 'Bruce',
	team: 'Mage Guild',
	weapons: [
	  'Staff of Shamalama',
	],
	language: 'Common Tongue',
});

const swordsman = new Humanoid({
	createdAt: new Date(),
	dimensions: {
  	length: 2,
  	width: 2,
  	height: 2,
	},
	healthPoints: 15,
	name: 'Sir Mustachio',
	team: 'The Round Table',
	weapons: [
	  'Giant Sword',
	  'Shield',
	],
	language: 'Common Tongue',
});

const archer = new Humanoid({
	createdAt: new Date(),
	dimensions: {
  	length: 1,
  	width: 2,
  	height: 4,
	},
	healthPoints: 10,
	name: 'Lilith',
	team: 'Forest Kingdom',
	weapons: [
  	'Bow',
  	'Dagger',
	],
	language: 'Elvish',
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


  // Stretch task: 
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!

function Hero(heroAttributes)
{
	Humanoid.call(this, heroAttributes);
	this.min_attack_damage = heroAttributes.min_attack_damage;
	this.max_attack_damage = heroAttributes.max_attack_damage;
	this.dodge_power = heroAttributes.dodge_power;
	this.hero_heal_power = heroAttributes.hero_heal_power;
	this.armor_strength = heroAttributes.armor_strength;
}

Hero.prototype = Object.create(Humanoid.prototype);

Hero.prototype.attack = function(defender) {


	let weapon_index = 0;
	
	if(this.weapons.length > 0)
	{
		if(this.weapons.length > 1)
			weapon_index = Math.floor(Math.random() * this.weapons.length);

		console.log(this.name + " chooses to attack with his/her " + this.weapons[weapon_index]);
	}
	else
	{
		console.log(this.name + " has no weapons!");
		return true;
	}

	if(!defender.dodgeAttempt(this.name))
	{
		let dmg = Math.floor((Math.random() * this.max_attack_damage) + this.min_attack_damage);
		console.log(this.name + " struck " + defender.name + " with his " + this.weapons[weapon_index] + "!");
		
		if(!defender.takeDamage(dmg))
			return false;
	}

	return true;
}

Hero.prototype.dodgeAttempt = function(attackers_name) {
	if(this.dodge_power > Math.random())
	{
		console.log(this.name + " dodged " + attackers_name + " attack!.");
		this.heal(); //SPECIAL HERO POWER - HEAL AFTER SUCCESSFUL DODGE
		return true;
	}
	else
	{
		console.log(this.name + " dodge failed.");
		return false;

	}
}

Hero.prototype.takeDamage = function(damage) {
	damage -= this.armor_strength;
	this.healthPoints -= damage;
	console.log(this.name + " took " + damage + " points of damage.");
	
	if(this.healthPoints <= 0)
	{
		console.log(this.name + " is dead!");
		return false;
	}
	else
		console.log(this.name + " has " + this.healthPoints + " remaining.");

	return true;
}

Hero.prototype.heal = function() {
	this.healthPoints += this.hero_heal_power;
	console.log(this.name + " healed for " + this.hero_heal_power);
}


function Villian(villianAttributes)
{
	Humanoid.call(this, villianAttributes);
	this.min_attack_damage = villianAttributes.min_attack_damage;
	this.max_attack_damage = villianAttributes.max_attack_damage;
	this.dodge_power = villianAttributes.dodge_power;
	this.villian_extra_attack_chance =  villianAttributes.villian_extra_attack_chance;
	this.armor_strength = villianAttributes.armor_strength;
}

Villian.prototype = Object.create(Humanoid.prototype);


Villian.prototype.attack = function(defender) {

	let weapon_index = 0;
	
	if(this.weapons.length > 0)
	{
		if(this.weapons.length > 1)
			weapon_index = Math.floor(Math.random() * this.weapons.length);

		console.log(this.name + " chooses to attack with his/her " + this.weapons[weapon_index]);
	}
	else
	{
		console.log(this.name + " has no weapons!");
		return true;
	}


	if(!defender.dodgeAttempt(this.name))
	{
		let dmg = Math.floor((Math.random() * this.max_attack_damage) + this.min_attack_damage);
		console.log(this.name + " struck " + defender.name + " with his " + this.weapons[weapon_index] + "!");
		
		if(!defender.takeDamage(dmg))
			return false;
	}


	if(!this.extraAttack(defender)) //SPECIAL VILLIAN POWER - CHANCE FOR AN EXTRA ATTACK IF DEFENDER DOESN'T DODGE
		return false;

	return true;
}

Villian.prototype.dodgeAttempt = function(attackers_name) {
	if(this.dodge_power > Math.random())
	{
		console.log(this.name + " dodged " + attackers_name + " attack!.");
		return true;
	}
	else
	{
		console.log(this.name + " dodge failed.");
		return false;

	}
}

Villian.prototype.takeDamage = function(damage) {
	damage -= this.armor_strength;
	this.healthPoints -= damage;
	console.log(this.name + " took " + damage + " points of damage.");
	
	if(this.healthPoints <= 0)
	{
		console.log(this.name + " is dead!");
		return false;
	}
	else
		console.log(this.name + " has " + this.healthPoints + " remaining.");

	return true;
}

Villian.prototype.extraAttack = function(defender) {
	if(this.villian_extra_attack_chance > Math.random())
	{
		console.log(this.name + " gets an extra attack!");
		if(!this.attack(defender))
			return false;
	}

	return true;
}

/***********************************/

const goodGuy = new Hero({
	createdAt: new Date(),
	dimensions: {
  		length: 2,
  		width: 2,
  		height: 2,
	},
	healthPoints: 100,
	name: 'Good Guy',
	team: 'The Round Table',
	weapons: [
	  'Giant Sword',
	  'Shield',
	],
	language: 'Common Tongue',
	min_attack_damage: 1,
	max_attack_damage: 5,
	dodge_power: .15,
	hero_heal_power: 3,
	armor_strength: 0
});

const badGuy = new Villian({
	createdAt: new Date(),
	dimensions: {
  		length: 1,
  		width: 2,
  		height: 4,
	},
	healthPoints: 100,
	name: 'Bad Guy',
	team: 'Forest Kingdom',
	weapons: [
  	'Bow',
  	'Dagger',
	],
	language: 'Elvish',

	min_attack_damage: 1,
	max_attack_damage: 5,
	dodge_power: .1,
	villian_extra_attack_chance: .25,
	armor_strength: 0
});

/****game loop******/
var counter = 0;
do
{
	console.log("\n****Round " + ++counter + "****\n");
}
while(goodGuy.attack(badGuy) && badGuy.attack(goodGuy))

