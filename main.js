 // Константи для розрахунків:
const FRACTION_ASH_COAL = 0.8; //  частка золи, яка виходить з котла у вигляді леткої золи, вугілля;
const FRACTION_ASH_OIL = 1; //  частка золи, яка виходить з котла у вигляді леткої золи, мазуту;
const LOWER_HEAT_COAL = 20.47; //  нижча робоча теплота згоряння палива, МДж/кг, вугілля;
const LOWER_HEAT_OIL = 39.48; //  нижча робоча теплота згоряння палива, МДж/кг, мазуту;
const LOWER_HEAT_GAS = 33.08; //  нижча робоча теплота згоряння палива, МДж/кг, газу;
const MASS_CONT_ASH_COAL = 25.2; //  масовий вміст золи в паливі на робочу масу %, вугілля;
const MASS_CONT_ASH_OIL = 0.15; //  масовий вміст золи в паливі на робочу масу %, мазуту;
var MASS_CONT_COMB_SUBS_COAL = 1.5; //  масовий вміст горючих речовин у викидах твердих частинок %, вугілля;
var MASS_CONT_COMB_SUBS_OIL = 0; //  масовий вміст горючих речовин у викидах твердих частинок %, мазуту;
var CLEANING_EFFICIENCY_GAS = 0.985; //  ефективність очищення димових газів від твердих частинок;

function getValueById(id) { //  Функція отримання значення
  return parseFloat(document.getElementById(id).value);
}

function setValueToId(id, value) { //  Відобразити значення в заданому елементів;
  const element = document.getElementById(id); //  Отримуємо елемент з DOM;
  if (element) { // Перевіряємо чи елемент існує;
    element.innerHTML = (+value).toFixed(2); //  Якщо існує то встановлюємо значення;
  } else {
    console.log(`Елемент з id "${id}" не знайдено.`); // Якщо ні - виводимо помилку в консоль;
  }
}

function calculateAndShow(event) { // Головна функція;
    event.preventDefault(); // Заборона перезавантаження сторінки;
    // Отримуємо введені значення;
    let coal = getValueById('coal');
    let oil = getValueById('oil');
    let gas = getValueById('gas');
  
    let coalParticles = (10**6/LOWER_HEAT_COAL) * FRACTION_ASH_COAL * 
    (MASS_CONT_ASH_COAL/(100 - MASS_CONT_COMB_SUBS_COAL)) * (1 - CLEANING_EFFICIENCY_GAS); //  Обрахунок часточок при спалюванні вугілля;
    let oilParticles = (10**6/LOWER_HEAT_OIL) * FRACTION_ASH_OIL * 
    (MASS_CONT_ASH_OIL/(100 - MASS_CONT_COMB_SUBS_OIL)) * (1 - CLEANING_EFFICIENCY_GAS); //  Обрахунок часточок при спалюванні мазуту;
    let gasParticles = 0; //  Часточки виділяються при спалюванні газу;

    let coalEmission = 10**(-6) * coalParticles * LOWER_HEAT_COAL * coal; //  Обрахунок викидів при спалюванні вугілля;
    let oilEmission = 10**(-6) * oilParticles * LOWER_HEAT_OIL * oil; //  Обрахунок викидів при спалюванні мазуту;
    let gasEmission = 10**(-6) * gasParticles * LOWER_HEAT_GAS * gas; //  Обрахунок викидів при спалюванні газу;

    //  Вивід кількості часточок при спалюванні вугілля, мазуту, газу відповідно;
    setValueToId("particles_coal", coalParticles);
    setValueToId("particles_oil", oilParticles);
    setValueToId("particles_gas", gasParticles);

    //  Вивід кількості забруднення при спалюванні вугілля, мазуту, газу відповідно;
    setValueToId("emission_coal",coalEmission);
    setValueToId("emission_oil",oilEmission);
    setValueToId("emission_gas",gasEmission);

  }

