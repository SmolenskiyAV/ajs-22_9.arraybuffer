import {Bowman, Swordsman, Magician, Undead, Zombie, Daemon, getBuffer, ArrayBufferConverter} from '../basic';

// ПРОВЕРКА ТОЛЬКО ДЛЯ ЦЕЛЕВЫХ КЛАССОВ (указанных в задании 9)

// проверка работы метода "атака персонажа"
test('shoud check class AttatackParams', () => {
  let  Pers = new Magician('Vasiliy', 250, 400, 59);

  Pers.stoned = true;
  Pers.attack_Action = '6';

  const result = Pers.attack_Action;

  expect(result).toBe('112.075');
});

// проверка работы метода загрузки данных из буфера
test('shoud check ArrayBufferConverter.load', () => {

  const dataBuffer = getBuffer();

  const result = ArrayBufferConverter.load(dataBuffer).length;

  expect(result).toBe(53);
});

// проверка работы метода преобразования данных буфера в строку
test('shoud check ArrayBufferConverter.toString', () => {

  const dataBuffer = getBuffer();

  const result = ArrayBufferConverter.toString(
      ArrayBufferConverter.load(dataBuffer)
      );

  expect(result).toBe("{\"0\":123,\"1\":34,\"2\":100,\"3\":97,\"4\":116,\"5\":97,\"6\":34,\"7\":58,\"8\":123,\"9\":34,\"10\":117,\"11\":115,\"12\":101,\"13\":114,\"14\":34,\"15\":58,\"16\":123,\"17\":34,\"18\":105,\"19\":100,\"20\":34,\"21\":58,\"22\":49,\"23\":44,\"24\":34,\"25\":110,\"26\":97,\"27\":109,\"28\":101,\"29\":34,\"30\":58,\"31\":34,\"32\":72,\"33\":105,\"34\":116,\"35\":109,\"36\":97,\"37\":110,\"38\":34,\"39\":44,\"40\":34,\"41\":108,\"42\":101,\"43\":118,\"44\":101,\"45\":108,\"46\":34,\"47\":58,\"48\":49,\"49\":48,\"50\":125,\"51\":125,\"52\":125}"
  );
});

