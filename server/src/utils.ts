
export function isNumeric(v) {
  return !isNaN(parseFloat(v)) && isFinite(v);
}

export function parseNumber(value) {
  if (typeof value !== 'string') return value;

  try {
    const parsedNumber = parseInt(value, 10);
    return parsedNumber;
  } catch (error) {
    return value;
  }
}

export function CORSMiddleware(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    res.send('');
  } else {
    next();
  }
}
