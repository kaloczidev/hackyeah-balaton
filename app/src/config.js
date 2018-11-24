export const TYPECONFIG = [
  {
    name: "Glucose",
    unit: "mmol/l",
    categories: ["breakfast", "lunch", "dinner"],
    range: {
      from: 2,
      to: 20,
      step: 0.1
    },
    color: '#f40c87',
    url: '/glucose'
  },{
    name: "Weight",
    unit: "kg",
    categories: ["morning", "noon", "night"],
    color: '#0c7cf4',
    range: {
      from: 45,
      to: 120,
      step: 0.1
    },
  }
];
