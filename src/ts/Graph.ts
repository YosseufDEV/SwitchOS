enum EdgeRelationshipType {
    EDGE_DIRECTED,
    EDGE_UNDIRECTED
}

abstract class Edge<T> {
    edges: Edge<T>[] | null;
    heldValue: T | null;
    parentReleationShipType: EdgeRelationshipType;

    constructor() {
        this.edges = null;
        this.parentReleationShipType = EdgeRelationshipType.EDGE_UNDIRECTED
        this.heldValue = null;
    }
}

class Graph<T> {
    head: Edge<T> | null;

    constructor() {
        this.head = null;
    }
}

export default Graph;
