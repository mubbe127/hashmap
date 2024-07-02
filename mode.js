import { theNode, LinkedList } from "./module.js";

class hashmap {

  bucket = []
  constructor(size) {
    this.bucket = this.produceArray(size);
    this.size = size;
  }

  produceArray(size) {
  
    for (let i = 0; i < size; i++) {
      this.bucket[i] = undefined;
    }
    return bucket;
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
    if (
      this.bucket[this.hashProduce(keey)] !== undefined &&
      !(this.bucket[this.hashProduce(keey)] instanceof LinkedList)
    ) {
      let currentNode = this.bucket[this.hashProduce(keey)];
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
          console.log(key);
          if (key === keey) {
            console.log("jieep lii");
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
            console.log("jieep lii");
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
          console.log("jaalaaaa jieeeep");
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
          console.log("harrykane");
          length++;
          currentElement = currentElement.next;
        }
      } else if (this.bucket[i] !== undefined) {
        console.log("morata");
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
      if (this.bucket[i] && (this.bucket[i].head !== undefined)) {
        let currentNode = this.bucket[i].head;
        while (currentNode !== null) {
          for (const key in currentNode) {
            if (key !== "next") {
              console.log("lillia")
              array.push(key);
            }
          }
          currentNode = currentNode.next
        }
      }
      else if(this.bucket[i]!==undefined) {
        let currentNode = this.bucket[i]
        for( const key in currentNode) {
          array.push(key)
        }
      }
    }
    return array
  }

  values(){

    let array = [];
    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i] && (this.bucket[i].head !== undefined)) {
        let currentNode = this.bucket[i].head;
        while (currentNode !== null) {
          for (const key in currentNode) {
            if (key !== "next") {
              console.log("lillia")
              array.push(currentNode[key]);
            }
          }
          currentNode = currentNode.next
        }
      }
      else if(this.bucket[i]!==undefined) {
        let currentNode = this.bucket[i]
        for( const key in currentNode) {
          array.push(currentNode[key])
        }
      }
    }
    return array


  }

  entries(){

    let array = [];
    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i] && (this.bucket[i].head !== undefined)) {
        let currentNode = this.bucket[i].head;
        while (currentNode !== null) {
          for (const key in currentNode) {
            if (key !== "next") {
              console.log("lillia")
              array.push([key,currentNode[key]]);
            }
          }
          currentNode = currentNode.next
        }
      }
      else if(this.bucket[i]!==undefined) {
        let currentNode = this.bucket[i]
        for( const key in currentNode) {
          array.push([key,currentNode[key]])
        }
      }
    }
    return array

  }

  checkLoad(){

    if(this.length()/this.size>0.8) {
      console.log(this.length()/this.size>0.8)
      this.produceArray(this.size*1.25)
    }
  }

}

const thehash = new hashmap(16);
thehash.set("jiep", 520);
thehash.set("mannen");
thehash.set("map", 101);
thehash.set("lena", 101);
thehash.set("lena", "jag gillar");
thehash.set("daghammar", "jalla")

console.log("jieeeee6")

console.log(thehash.bucket);