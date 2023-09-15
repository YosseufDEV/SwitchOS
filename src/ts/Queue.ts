class QNode<T> {
    public data: T;
    public next: QNode<T> | null;
    public perv: QNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = this.perv = null;
    }
}
class Queue<T> {
    private _front: QNode<T> | null;
    private _back: QNode<T> | null;
    private _length: number;

    public constructor() {
        this._front = this._back = null;
        this._length = 0;
    }

    private isEmpty() {
        return this._length == 0;
    }

    public enqueue(data: T) {
        const item = new QNode<T>(data);
        if(this.isEmpty()) 
            this._front = this._back = item;
        else {
            item.next = this._back;
            this._back.perv = item;
            this._back = item;
        }
        this._length++;
    }

    public dequeue(): T | undefined {
        if(this.isEmpty()) return undefined;

        const tempFrontData = this._front?.data;
        this._front = this._front.perv
        this._length--;

        return tempFrontData;
    }

    get length() {
        return this._length;
    }

}

export default Queue;
