// ### Task 9.1 ###

class Character { // БАЗОВЫЙ КЛАСС

  constructor(name_, attack, defence, health = 100, level = 1, type, stonedFact= false) {
    
    this.name = name_;
    this.type = type;
    this.health = health;
    this.level = level;
    this.attack = attack; // базовое значение атаки
    this.defence = defence;
    this.stonedFact = stonedFact; // "одурманен" или нет
    
    try {
    
     if (                               // проверка требований на тип персонажа
          (this.type !== "Bowman") && 
          (this.type !== "Swordsman") && 
          (this.type !== "Magician") && 
          (this.type !== "Daemon") && 
          (this.type !== "Undead") && 
          (this.type !== "Zombie") 
        ) {
          console.log('НЕТ СОВПАДЕНИЯ!');
          throw new Error("Данные типа персонажа некорректны");
        };
    
      if ((this.name.length < 2) || (this.name.length > 10)) { // проверка требований на длину строки имени
        throw new Error("Данные имени некорректны");
      };

    } catch(err) {
      errMessage1 = err.message;
      console.log('ошибка: ', errMessage1);
    };

      if (this.attack === undefined)  // автоматическое выставление поля attack
        switch (this.type) {
        
          case "Undead":
          case "Bowman":
            this.attack = 25;
            break;
    
          case "Zombie":
          case "Swordsman":
            this.attack = 40;
            break;

          case "Daemon":
          case "Magician":
            this.attack = 10;
            break;
        };

      if (this.defence === undefined) // автоматическое выставление поля defence
        switch (this.type) {
        
          case "Undead":
          case "Bowman":
            this.defence = 25;
            break;
    
          case "Zombie":
          case "Swordsman":
            this.defence = 10;
            break;

          case "Daemon":
          case "Magician":
            this.defence = 40;
            break;
        };

    
  };

  
  levelUp() { // метод levelUp

    try { 

      if (this.health <= 0) {
        throw new Error("Нельзя повысить левел умершего");
      };

      this.level++;
      this.attack++;
      this.defence++;
      this.health = 100;

    } catch(err) {
      errMessage2 = err.message;
      console.log('ошибка: ', errMessage2);
    };

  };

  damage(points) { // метод повреждений
    if (this.health >= 0) {
      this.health -= points * (1 - this.defence / 100);
    };
  };
 
};


class AttatackParams {    // КЛАСС, ОПРЕДЕЛЯЮЩИЙ ПАРАМЕТРЫ АТАКИ ПЕРСА

  constructor (baseAttack, stonedFact) {

    this._attack = baseAttack; // значение базовой атаки перса
    this.stonedFact = stonedFact; // "одурманен" или нет
    this.current_attack = baseAttack; // значение текущей атаки по умолчанию = базовой атаке
  };

    set attack(distance) {    // модификатор текущей атаки перса с учётом дистанции

      this.distance = Number(distance);

      if (this.distance > 10) {
        this.current_attack = 0     // радиус действия атаки не более 10 клеток
      } else{
        if (this.distance > 0) {
          this.current_attack = Number(                       //преобразование в число
          (this._attack * (10 - (this.distance - 1)) / 10)    // расчёт значения атаки в зависимости от дистанции
          .toFixed(3)                                         // округление до третьего знака
          ); 
        }else 
          this.current_attack = this._attack;    // если дистанция нулевая, текущая атака равна базовой
        };
    };
    
    get attack() {    // результирующая атака

      let attackResult;

      if ((this.stonedFact) && (this.distance !== 0)) attackResult = (this.current_attack - (Number(Math.log2(this.distance) * 5))).toFixed(3)  // если перс одурманен (и дистанция не ноль!), текущее значение атаки дополнительно уменьшается
      else attackResult = this.current_attack;

      if (attackResult < 0) attackResult = 0; // если модификатор "одурманивания" приводит к отрицательным показателям результирующей атаки - обнуляем результирующую атаку

      return attackResult;
    };

};
//----------------------------------------------------------------------------------------------------


export class Bowman extends Character {   // ДОЧЕРНИЙ КЛАСС
  
  constructor(name_, attack, defence, health, level, type) {
    super(name_, attack, defence, health, level, type= 'Bowman');
    
  };
};


export class Swordsman extends Character {  // ДОЧЕРНИЙ КЛАСС
  
  constructor(name_, attack, defence, health, level, type) {
    super(name_, attack, defence, health, level, type= "Swordsman");
  
  };
};


export class Magician extends Character {   // ДОЧЕРНИЙ КЛАСС С ПРИМЕНЕНИЕМ К НЕМУ МОДИФИКАТОРА АТАКИ
  
  constructor(name_, attack, defence, health, level, type) {
    super(name_, attack, defence, health, level, type= "Magician");

  };
  
  set stoned(value) {     // установка модификатора для перса: "одурманен" или нет
    this.stonedFact = value;
  };

  set attack_Action(distance) { // установка параметров атаки перса на указанную дистанцию

    this._attack_Action = new AttatackParams(this.attack, this.stonedFact);   // формирование атакующих свойств перса
    this._attack_Action.attack = distance;  // передача в модификатор атаки параметра "дистанция"
  };

  get attack_Action() {   // результат атаки (перс наносит удар противнику)
    
    if (!(this._attack_Action)) {
      console.log('Не сформирорваны параметры атаки. Атаковать невозможно!'); // перед "атакой" необходимо указать дистанцию через сеттер attack_Action(distance)
      return;
    } 
     
    return this._attack_Action.attack;
  };
};


export class Undead extends Character {   // ДОЧЕРНИЙ КЛАСС
  
  constructor(name_, attack, defence, health, level, type) {
    super(name_, attack, defence, health, level, type= "Undead");
  };
};


export class Zombie extends Character {   // ДОЧЕРНИЙ КЛАСС
  
  constructor(name_, attack, defence, health, level, type) {
    super(name_, attack, defence, health, level, type= "Zombie");
  };
};


export class Daemon extends Character {   // ДОЧЕРНИЙ КЛАСС С ПРИМЕНЕНИЕМ К НЕМУ МОДИФИКАТОРА АТАКИ
  
  constructor(name_, attack, defence, health, level, type) {
    super(name_, attack, defence, health, level, type= "Daemon");
    
  };

  set stoned(value) {     // установка модификатора для перса: "одурманен" или нет
    this.stonedFact = value;
  };

  set attack_Action(distance) { // установка параметров атаки перса на указанную дистанцию

    this._attack_Action = new AttatackParams(this.attack, this.stonedFact);   // формирование атакующих свойств перса
    this._attack_Action.attack = distance;      // передача в модификатор атаки параметра "дистанция"
  };

  get attack_Action() {   // результат атаки (перс наносит удар противнику)
    
    if (!(this._attack_Action)) {
      console.log('Не сформирорваны параметры атаки. Атаковать невозможно!'); // перед "атакой" необходимо указать дистанцию через сеттер attack_Action(distance)
      return;
    } 
     
    return this._attack_Action.attack;
  };

};


// ### Task 9.2 ###


export function getBuffer() {     // функция эмуляции создания объекта типа ArrayBuffer
  const data = '{"data":{"user":{"id":1,"name":"Hitman","level":10}}}';
  return (input => {
    const buffer = new ArrayBuffer(data.length * 2);
    const bufferView = new Uint16Array(buffer);
    for (let i = 0; i < input.length; i++) {
      bufferView[i] = input.charCodeAt(i);
    }
    return buffer;
  })(data);
};


export class ArrayBufferConverter {   // класс для обработки данных ArrayBuffer

  static load(buffer) {   // метод загрузки данных из буфера

    this.buffer = buffer;
    let arr = new Uint16Array(this.buffer);
    return arr;
  };

  static toString(arrFromBuffer) {    // метод преобразования данных в строку
    this.arrFromBuffer = arrFromBuffer;

    return JSON.stringify(this.arrFromBuffer);
  };

};
