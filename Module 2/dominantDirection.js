function characterScript(code) {
    const SCRIPTS = [
      {name: "Latin", ranges: [[65, 90], [97, 122]], direction: "ltr"},
      {name: "Arabic", ranges: [[1536, 1791]], direction: "rtl"},
      {name: "Han", ranges: [[19968, 40959]], direction: "ttb"}
    ];
    for (let script of SCRIPTS) {
      if (script.ranges.some(([from, to]) => code >= from && code < to)) {
        return script;
      }
    }
    return null;
  }
  
  function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
      let name = groupName(item);
      let known = counts.find(c => c.name === name);
      if (known) {
        known.count++;
      } else {
        counts.push({name, count: 1});
      }
    }
    return counts;
  }
  
  function dominantDirection(text) {
    let directions = countBy(text, char => {
      let script = characterScript(char.codePointAt(0));
      return script ? script.direction : "none";
    }).filter(({name}) => name !== "none");
  
    if (directions.length === 0) return "ltr";
  
    return directions.reduce((a, b) => a.count > b.count ? a : b).name;
  }
  
  console.log(dominantDirection("Hello!")); // → ltr
  console.log(dominantDirection("Hey, مساء الخير")); // → rtl
  