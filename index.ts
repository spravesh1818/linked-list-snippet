interface ILinkedList<T> {
  insertInBegin(data: T): LinkedListNode<T>;
  insertAtEnd(data: T): LinkedListNode<T>;
  deleteNode(node: LinkedListNode<T>): void;
  traverse(): T[];
  size(): number;
  search(comparator: (data: T) => boolean): LinkedListNode<T> | null;
}

interface Post {
  title: string;
}

class LinkedListNode<T> {
  //specifying the previous and next nodes asscociated to the current node
  public next: LinkedListNode<T> | null = null;
  public prev: LinkedListNode<T> | null = null;

  constructor(public data: T) {}
}

//class specifying linked list
class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null = null;

  //method to insert node at the begining of the linked list
  public insertInBegin(data: T): LinkedListNode<T> {
    const node = new LinkedListNode(data);
    if (!this.head) {
      this.head = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
    console.log("Node inserted succesfully");
    return node;
  }

  //getting the last item in the linked list
  getLast = (node: LinkedListNode<T>): LinkedListNode<T> => {
    return node.next ? this.getLast(node.next) : node;
  };

  //method to insert node at the end of the linked list
  public insertAtEnd(data: T): LinkedListNode<T> {
    const node = new LinkedListNode(data);
    if (!this.head) {
      this.head = node;
    } else {
      const getLast = (node: LinkedListNode<T>): LinkedListNode<T> => {
        return node.next ? getLast(node.next) : node;
      };

      const lastNode = getLast(this.head);
      node.prev = lastNode;
      lastNode.next = node;
    }
    console.log("Node inserted succesfully");
    console.log(node);
    return node;
  }

  //method for deleting a node
  public deleteNode(node: LinkedListNode<T>): void {
    if (!node.prev) {
      this.head = node.next;
    } else {
      const prevNode = node.prev;
      prevNode.next = node.next;
    }
    console.log("Node deleted succesfully");
  }

  //method to traverse through the linked list
  public traverse(): T[] {
    const array: T[] = [];
    if (!this.head) {
      console.log(array);
      return array;
    }

    const addToArray = (node: LinkedListNode<T>): T[] => {
      array.push(node.data);
      return node.next ? addToArray(node.next) : array;
    };
    return addToArray(this.head);
  }

  //method to find the size of the linked list
  public size(): number {
    return this.traverse().length;
  }

  //searching a node using the given data
  public search(comparator: (data: T) => boolean): LinkedListNode<T> | null {
    const checkNext = (node: LinkedListNode<T>): LinkedListNode<T> | null => {
      if (comparator(node.data)) {
        return node;
      }
      return node.next ? checkNext(node.next) : null;
    };

    return this.head ? checkNext(this.head) : null;
  }
}

const linkedList = new LinkedList<Post>();

linkedList.traverse(); // [];

linkedList.insertAtEnd({ title: "Post A" });
linkedList.insertAtEnd({ title: "Post B" });
linkedList.insertInBegin({ title: "Post C" });
linkedList.insertInBegin({ title: "Post D" });

console.log(linkedList.traverse()); // [{ title : "Post D" }, { title : "Post C" }, { title : "Post A" }, { title : "Post B" }];
linkedList.search(({ title }) => title === "Post A");
