export const TYPECONFIG = [
  {
    name: "Glucose",
    unit: "mmol/l",
    categories: ["before breakfast", 'after breakfast', "before lunch", 'after lunch', "before dinner", 'after dinner'],
    range: {
      from: 2,
      to: 20,
      step: 0.1
    },
    color: '#f857a6',
    gradient: {
      from: '#f857a6',
      to: '#ff5858'
    },
    url: 'glucose'
  },{
    name: "Weight",
    unit: "kg",
    categories: ["morning", "noon", "night"],
    color: '#00d2ff',
    gradient: {
      from: '#00d2ff',
      to: '#3a7bd5'
    },
    range: {
      from: 45,
      to: 120,
      step: 0.1
    },
    url: 'weight'
  },{
    name: "temperature",
    unit: "°C",
    categories: ["illness", "other"],
    color: '#db391e',
    gradient: {
      from: '#db391e',
      to: '#f6a742'
    },
    range: {
      from: 35,
      to: 42,
      step: 0.1
    },
    url: 'temperature'
  }
];
const ip = '10.250.194.13';
const port = '3000';
export const API = {
  base: `http://${ip}:${port}/api/`,
}