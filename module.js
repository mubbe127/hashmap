export {theNode, LinkedList}

class theNode {
  constructor(value = null, key = "value", next = null) {
    this[key] = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value, key) {
    const newNode = new theNode(value, key);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let currentNode = this.head;
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode;
    }
  }

  prepend(value, key) {
    const newNode = new theNode(value, key);
    if (this.head === null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  size() {
    if (this.head === null) {
      return 0;
    } else if (this.head !== null) {
      let sum = 1;
      let currentNode = this.head;
      while (currentNode.next !== null) {
        sum += 1;
        currentNode = currentNode.next;
      }
      return sum;
    }
  }

  tail() {
    if (this.head === null) {
      return this.head;
    } else if (this.head !== null) {
      let currentNode = this.head;
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }

      return currentNode;
    }
  }
  at(index) {
    if (index === 0) {
      return this.head;
    }
    if (index + 1 > this.tail()) {
      return "no node found";
    } else {
      let i = 0;
      let currentNode = this.head;

      while (i < index) {
        currentNode = currentNode.next;
        i++;
      }
      return currentNode;
    }
  }
  pop() {
    if (this.head === null) {
      return;
    }
    if (this.head.next === null) {
      // If there's only one node
      this.head = null;
      return;
    }

    let currentNode = this.head;
    while (currentNode.next.next !== null) {
      currentNode = currentNode.next;
    }
    currentNode.next = null;
  }

  contains(value) {
    if (this.head === null) {
      return false;
    } else {
      let currentNode = this.head;
      while (currentNode.next !== null) {
        for (const key in currentNode) {
          if (currentNode[key] === value) {
            return true;
          }
        }
        currentNode = currentNode.next;
      }
      return false;
    }
  }

  find(value) {
    if (this.head === null) {
      return false;
    } else {
      let currentNode = this.head;
      while (currentNode.next !== null) {
        for (const key in currentNode) {
          if (currentNode[key] === value) {
            return true;
          }
        }
        currentNode = currentNode.next;
      }
      return false;
    }
  }
}

const linkedJiep2 = new LinkedList();

linkedJiep2.append("jiep2", "hakuma");
linkedJiep2.append("jiep2");
linkedJiep2.append("jiep2");
linkedJiep2.append("jiep4", "mannen");
linkedJiep2.prepend("sabrina", "jiep");
linkedJiep2.append("jallla jaipe");


console.log(linkedJiep2.head.next)