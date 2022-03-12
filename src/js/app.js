// TODO: write your code here
import {Bowman, Swordsman, Magician, Undead, Zombie, Daemon, getBuffer, ArrayBufferConverter} from './basic';


// ### Task 9.1 ###
console.log('(для нулевой дистанции атаки!) логарифм нуля по основанию 2 = ', Number(Math.log2(0) * 5));

console.log('*********** атака персонажа Pers1 ***********************');

const Pers1 = new Magician('Vasiliy', 250, 400, 59);  // генерация перса с предустановленными параметрами
console.log(Pers1);

console.log();
Pers1.stoned = true;
console.log(`персонаж ${Pers1.name} одурманен: `, Pers1.stonedFact);
console.log();

Pers1.attack_Action = '6';
console.log(`персонаж ${Pers1.name} атакует на дистанцию 6 c величиной урона: `, Pers1.attack_Action);
console.log();


console.log('*********** атака персонажа Pers2 ***********************');

const Pers2 = new Daemon('Ivan');    // генерация перса со значениями по умолчанию
console.log(Pers2);
console.log();

Pers2.stoned = true;
console.log(`персонаж ${Pers2.name} одурманен: `, Pers2.stonedFact);
console.log();

Pers2.attack_Action = '0';
console.log(`персонаж ${Pers2.name} атакует на дистанцию 0 c величиной урона: `, Pers2.attack_Action);
console.log();


console.log('*********** атака персонажа Pers3 ***********************');

const Pers3 = new Magician('Timur', 200, 500, 89);  // генерация перса с предустановленными параметрами
console.log(Pers3);
console.log();

console.log(`персонаж ${Pers3.name} HE одурманен: `, Pers3.stonedFact);
console.log();

Pers3.attack_Action = '12';
console.log(`персонаж ${Pers3.name} атакует на дистанцию 12 c величиной урона: `, Pers3.attack_Action);
console.log();



// ### Task 9.2 ###

console.log('*********** ОБРАБОТКА ДАННЫХ ArrayBuffert **************');

const dataBuffer = getBuffer();
console.log('dataBuffer : ', dataBuffer);
console.log();

const signatur = ArrayBufferConverter.load(dataBuffer);
console.log('signatur : ', signatur);

const resultString = ArrayBufferConverter.toString(signatur);
console.log('resultString : ', resultString);


console.log();
console.log('end of execution!');

