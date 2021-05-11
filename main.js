function makeObjectDeepCopy (obj) {

    if (obj === null) return null;
  
    let clone = Object.assign({}, obj);
  
    Object.keys(clone).forEach(key => {
      clone[key] = typeof obj[key] === "object" ? makeObjectDeepCopy(obj[key]) : obj[key]
    });
  
    return Array.isArray(obj) && obj.length 
    ? (clone.length = obj.length) && Array.from(clone): Array.isArray(obj) 
    ? Array.from(obj): clone;
  };
  
  const mainObject = { f: "bar", o: { a: 1, c: { a: 1, b: 2, n: {'foo': function(){}, 'bar': 'bar'} } }};
  const cloneObject = makeObjectDeepCopy(mainObject);

  let myIterable = {
    from: 1,
    to: 4,
    [Symbol.iterator]: function() {
 
      let current = this.from
      let last = this.to
  
      if (Object.keys(this).length <= 1) {
        throw new Error("not enough properties in the object")
      }
  
      if (typeof current !== 'number' || typeof last !== 'number') {
        throw new Error("wrong type");
      }else if (last < current) {
        throw new Error("to < from")
      }else {
        return {
          
          next() {
  
            if (current <= last) {
              return {
                done: false,
                value: current++
              }
            }else {
              return {
                done: true
              }
            }
          }
        }
      } 
    }
  };
  
  for (let item of myIterable) {
    console.log(item);
  }


  
  function selectFromInterval (arr, n, x) {

    let intervalX;
    let intervalN;
    let newArr = [];

    if (arr.length === 0 || n < 0 || x < 0) {
      return newArr;
    }

    if (!Array.isArray(arr)) {
      throw new Error("the passed argument is not an array");
    }

    arr.forEach(num => {
      if (typeof num !== 'number') {
        throw new Error("found wrong type in array");
      }
    });

    if (n > x) {
      intervalX = x;
      intervalN = n
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= intervalX && arr[i] <= intervalN) {
          newArr.push(arr[i]);
        }
      }

    }

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] >= n && arr[i] <= x) {
        newArr.push(arr[i]);
      }
    }

    return newArr;
  }
  