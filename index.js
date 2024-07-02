import { theNode, LinkedList } from "./module.js";

class hashmap {
  constructor(size) {
    this.bucket = this.produceArray(size);
    this.size = size;
  }

  produceArray(size) {
    this.bucket = [];
    for (let i = 0; i < size; i++) {
      this.bucket[i] = undefined;
    }
    return this.bucket;
  }

  hashProduce(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.size;
    }

    return hashCode;
  }
  set(keey, value) {
    this.checkLoad();
    if (
      this.bucket[this.hashProduce(keey)] !== undefined &&
      !(this.bucket[this.hashProduce(keey)] instanceof LinkedList)
    ) {
      let currentNode = this.bucket[this.hashProduce(keey)]
      for(const key in currentNode)
        { if(key===keey) {
          this.bucket[this.hashProduce(keey)]= {[keey]: value}
          return console.log("ersatt värde")
        }}
      
      this.bucket[this.hashProduce(keey)] = new LinkedList();
      for (const key in currentNode) {
        this.bucket[this.hashProduce(keey)].append(currentNode[key], [key]);
      }
      this.bucket[this.hashProduce(keey)].append(value, keey);
    } else if (
      this.bucket[this.hashProduce(keey)] !== undefined &&
      this.bucket[this.hashProduce(keey)] instanceof LinkedList
    ) {
      let currentNode = this.bucket[this.hashProduce(keey)].head;
      while (currentNode !== null) {
        for (const key in currentNode) {
          if (key === keey) {
            currentNode[key] = value;
            console.log(`updated key value to ${value}`);
            return;
          }
        }
        currentNode = currentNode.next;
      }
      this.bucket[this.hashProduce(keey)].append(value, keey);
    } else {
      this.bucket[this.hashProduce(keey)] = { [keey]: value };
    }
  }

  get(keey) {
    if (this.bucket[this.hashProduce(keey)] === undefined) {
      return null;
    } else if (this.bucket[this.hashProduce(keey)].head !== undefined) {
      let currentNode = this.bucket[this.hashProduce(keey)].head;
      while (currentNode !== null) {
        for (const key in currentNode) {
          if (key === keey) {
            return currentNode[key];
          }
        }
        currentNode = currentNode.next;
      }
    } else if (this.bucket[this.hashProduce(keey)] !== undefined) {
      let currentElement = this.bucket[this.hashProduce(keey)];
      for (const key in currentElement) {
        if (key === keey) {
          return currentElement[key];
        }
      }
      console.log("key did not match");
      return;
    } else {
      return this.bucket[this.hashProduce(keey)];
    }
  }

  has(keey) {
    if (this.bucket[this.hashProduce(keey)] === undefined) {
      return false;
    } else if (this.bucket[this.hashProduce(keey)].head !== undefined) {
      let currentNode = this.bucket[this.hashProduce(keey)].head;
      while (currentNode !== null) {
        for (const key in currentNode) {
          console.log(key);
          if (key === keey) {
            return true;
          }
        }
        currentNode = currentNode.next;
      }
      return false;
    } else if (this.bucket[this.hashProduce(keey)] !== undefined) {
      let currentElement = this.bucket[this.hashProduce(keey)];
      for (const key in currentElement) {
        if (key === keey) {
          return true;
        }
      }
      console.log("key did not match");
      return false;
    }
  }

  remove(keey) {
    if (this.bucket[this.hashProduce(keey)] === undefined) {
      return false;
    } else if (this.bucket[this.hashProduce(keey)].head !== undefined) {
      let currentNode = this.bucket[this.hashProduce(keey)].head;
      for (const key in currentNode) {
        if (key === keey) {
          this.bucket[this.hashProduce(keey)].head = currentNode.next;
          return true;
        }
      }

      let previosNode = null;
      currentNode = this.bucket[this.hashProduce(keey)].head;
      while (currentNode !== null) {
        for (const key in currentNode) {
          if (key === keey) {
            previosNode.next = currentNode.next;
            console.log("du lyckades radera");
            return true;
          }
        }
        previosNode = currentNode;
        currentNode = currentNode.next;
      }
      return false;
    } else if (
      this.bucket[this.hashProduce(keey)] !== undefined &&
      !this.bucket[this.hashProduce(keey)].head
    ) {
      let currentElement = this.bucket[this.hashProduce(keey)];
      for (const key in currentElement) {
        if (key === keey) {
          this.bucket[this.hashProduce(keey)] = undefined;

          return true;
        }
      }
      console.log("key did not match");
      return false;
    }
  }

  length() {
    let length = 0;

    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i] && this.bucket[i].head !== undefined) {
        let currentElement = this.bucket[i].head;
        while (currentElement !== null) {
          length++;
          currentElement = currentElement.next;
        }
      } else if (this.bucket[i] !== undefined) {
        length++;
      }
    }
    return length;
  }

  clear() {
    for (let i = 0; i < this.bucket.length; i++) {
      this.bucket[i] = undefined;
    }
  }

  keys() {
    let array = [];
    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i] && this.bucket[i].head !== undefined) {
        let currentNode = this.bucket[i].head;
        while (currentNode !== null) {
          for (const key in currentNode) {
            if (key !== "next") {
              array.push(key);
            }
          }
          currentNode = currentNode.next;
        }
      } else if (this.bucket[i] !== undefined) {
        let currentNode = this.bucket[i];
        for (const key in currentNode) {
          array.push(key);
        }
      }
    }
    return array;
  }

  values() {
    let array = [];
    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i] && this.bucket[i].head !== undefined) {
        let currentNode = this.bucket[i].head;
        while (currentNode !== null) {
          for (const key in currentNode) {
            if (key !== "next") {
              array.push(currentNode[key]);
            }
          }
          currentNode = currentNode.next;
        }
      } else if (this.bucket[i] !== undefined) {
        let currentNode = this.bucket[i];
        for (const key in currentNode) {
          array.push(currentNode[key]);
        }
      }
    }
    return array;
  }

  entries(bucket = this.bucket) {
    let array = [];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i] && bucket[i].head !== undefined) {
        let currentNode = bucket[i].head;
        while (currentNode !== null) {
          for (const key in currentNode) {
            if (key !== "next") {
              array.push([key, currentNode[key]]);
            }
          }
          currentNode = currentNode.next;
        }
      } else if (bucket[i] !== undefined) {
        let currentNode = bucket[i];
        for (const key in currentNode) {
          array.push([key, currentNode[key]]);
        }
      }
    }
    return array;
  }

  checkLoad() {
    if (this.length() / this.size >= 0.75) {
      this.resize();
    }
  }

  resize() {
    let currentBucket = this.bucket;
    this.size *= 1.5;
    this.produceArray(this.size);

    this.entries(currentBucket).forEach((entry) => {
      this.set(...entry);
    });

    return this.bucket;
  }
}

const test = new hashmap(16);
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
console.log(test.bucket);
console.log(test.keys())
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("sara","tajudin")
test.set("mubarek", "tajudin")
console.log(test.keys())


console.log(test.bucket);
console.log(test.values())
console.log(test.entries())
