
// Capitalize the first word of each string
export const capitalize = (strang) => {
  if (strang && strang.length > 0) {
    const words = strang.split(' ');
    let final = [];
    words.forEach(word => final.push(word[0].toUpperCase()+word.substring(1)));
    return final.join(' ');
  } else return "";
}

// Get a string representing the range with the given units
export const rangeString = (min, max, units) => {
  if (min && max) { return `${min} - ${max} ${units}`; }
  else if (min && !max) { return `≥ ${min} ${units}`; }
  else if (!min && max) { return `≤ ${max} ${units}`; }
  else return `Report in ${units}`;
}
