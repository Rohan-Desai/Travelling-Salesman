let weightedGraph = [
	[0, 0, 0, 0, 0],
	[0, 0, 2, 3, 2],
	[0, 2, 0, 7, 3],
	[0, 3, 7, 0, 4],
	[0, 2, 3, 4, 0]
];
let usedVertices = [];
let remainingVertices = initializeVertices(weightedGraph.length);

function initializeVertices(weightedGraphSize) {
	let array = new Array(weightedGraphSize);

	for (let i = 0; i < weightedGraphSize; i++) {
		array[i] = i;
	}

	return array;
}

class TravelingSalesman {
	constructor(weightedGraph, startNode, isMostWeightedPath, isleastWeightedPath) {
		//weighted graph -2d Array
		this.weightedGraph = weightedGraph;
		//index value of start node
		this.startNode = startNode;
		this.leastExpensiveRoute = Number.MAX_SAFE_INTEGER;
		this.leastWeightedPath = [];
		this.mostExpensiveRoute = Number.MIN_SAFE_INTEGER;
		this.mostWeightedPath = []
		this.usedVertices = [];
		this.isMostWeightedPath = isMostWeightedPath;
		this.isleastWeightedPath = isleastWeightedPath;
	}

	travelingSalesman() {
		//usedVertices contains start node 
		//remainingVertices contains all other nodes
		this.remainingVertices = this.initializeVertices(this.weightedGraph.length);
		this.remainingVertices = this.removeItem(this.remainingVertices, this.startNode);
		this.usedVertices.push(this.startNode);
		this.currentVal = 0;
		this.cache = {};
		return this.travelingSalesmanInternal(this.weightedGraph, this.remainingVertices, this.usedVertices, this.currentVal);
	}
	removeItem(arr, value) {
		let index = arr.indexOf(value);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	}

	initializeVertices(weightedGraphSize) {
		let array = new Array(weightedGraphSize);

		for (let i = 0; i < weightedGraphSize; i++) {
			array[i] = i;
		}

		return array;
	}

	travelingSalesmanInternal(weightedGraph, remainingVertices, usedVertices, currentVal) {
		remainingVertices.forEach(node => {
			let lastIndex = usedVertices.length - 1;

			currentVal += weightedGraph[usedVertices[lastIndex]][node]

			let updatedRemainingVertices = remainingVertices.slice(0);
			updatedRemainingVertices = this.removeItem(updatedRemainingVertices, node);

			let updatedUsedVertices = usedVertices.slice(0);
			updatedUsedVertices.push(node);
			if (this.cache.hasOwnProperty(updatedUsedVertices)) {
				currentVal = this.cache.updatedUsedVertices;
			} else {
				this.cache[updatedUsedVertices] = currentVal;
				if (this.isleastWeightedPath) {
					if (updatedRemainingVertices.length == 0) {
						this.findLeastWeightedPath(updatedUsedVertices, currentVal)
					} else {
						this.travelingSalesmanInternal(weightedGraph, updatedRemainingVertices, updatedUsedVertices, currentVal);
					}
				}
				if (this.isMostWeightedPath) {
					if (updatedRemainingVertices.length == 0) {
						this.findMostWeightedPath(updatedUsedVertices, currentVal)
					} else {
						this.travelingSalesmanInternal(weightedGraph, updatedRemainingVertices, updatedUsedVertices, currentVal);
					}
				}
			}
		});
		if (this.isleastWeightedPath) {
			return [this.leastExpensiveRoute, this.leastWeightedPath];
		}
		if (this.isMostWeightedPath) {
			return [this.mostExpensiveRoute, this.mostWeightedPath];
		}

	}

	findMostWeightedPath(updatedUsedVertices, currentVal) {
		if (this.mostExpensiveRoute < currentVal) {
			this.mostExpensiveRoute = currentVal;
			this.mostWeightedPath = updatedUsedVertices;
		}
	}

	findLeastWeightedPath(updatedUsedVertices, currentVal) {
		if (this.leastExpensiveRoute > currentVal) {
			this.leastExpensiveRoute = currentVal;
			this.leastWeightedPath = updatedUsedVertices;
		}
	}
}

let salesmanObject = new travelingSalesmanClass(weightedGraph, 0, true, false);
console.log(salesmanObject.travelingSalesman());