class TreeDiagram{
	constructor(data,container){
		this.data = this.modifyData(data);
		this.container = document.querySelector(container);
	}
	modifyData(arr){		
		let tree = [],
        	mappedArr = {},
        	arrElem,
        	mappedElem;
    	for(var i = 0, len = arr.length; i < len; i++) {
        	arrElem = arr[i];
        	mappedArr[arrElem.id] = arrElem;
        	mappedArr[arrElem.id]['children'] = [];
    	}
    	for (var id in mappedArr) {
        	if (mappedArr.hasOwnProperty(id)) {
        		mappedElem = mappedArr[id];
        		if (mappedElem.parent) {
            		mappedArr[mappedElem['parent']]['children'].push(mappedElem);
        		} else {
            		tree.push(mappedElem);
        		}
        	}
    	}
    	return tree;
	}
	buildTree(data = this.data, container = this.container){
		for (let i = 0; i < data.length; i++) {
            let treeItems = document.createElement('div');
				treeItems.setAttribute('class','tree-items');
			let treeItem = document.createElement('div');
				treeItem.setAttribute('class','tree-item');
        	let treeItemText = document.createTextNode(data[i].id);
        	let treeDelete = document.createElement('div');
				treeDelete.setAttribute('class','tree-delete');
				treeDelete.addEventListener('click', this.removeElement);
        	let treeAdd = document.createElement('div');
				treeAdd.setAttribute('class','tree-add');
				treeAdd.addEventListener('click', this.addElement);
			treeItem.appendChild(treeItemText);
			treeItem.appendChild(treeAdd);
			treeItem.appendChild(treeDelete);
			treeItems.appendChild(treeItem);
            container.appendChild(treeItems);         
            if (data[i].children.length !== 0) {
                let treeSubitems = document.createElement('div');
					treeSubitems.setAttribute('class','tree-subitems');
                	treeItems.appendChild(treeSubitems);
                this.buildTree(data[i].children, treeSubitems);
            } 
        }
	}
	addElement(e){
		let currElement = e.target;
		let currElementContainer = currElement.parentNode.closest('.tree-items');
		let currElementItems = currElement.parentNode.nextSibling;
		let items = document.querySelectorAll('.tree-item');
		let itemsLength = items.length;
		if(currElementItems === null){
			let treeSubitems = document.createElement('div');
				treeSubitems.setAttribute('class','tree-subitems');
			let treeItems = document.createElement('div');
				treeItems.setAttribute('class','tree-items');
			let treeItem = document.createElement('div');
				treeItem.setAttribute('class','tree-item');
        	let treeItemText = document.createTextNode(itemsLength + 1);
			let treeDelete = document.createElement('div');
				treeDelete.setAttribute('class','tree-delete');
				treeDelete.addEventListener('click', this.removeElement);
        	let treeAdd = document.createElement('div');
				treeAdd.setAttribute('class','tree-add');
				treeAdd.addEventListener('click', this.addElement);
			treeItem.appendChild(treeItemText);
			treeItem.appendChild(treeDelete);
        	treeItem.appendChild(treeAdd);
			treeItems.appendChild(treeItem);
			treeSubitems.appendChild(treeItems);
  			currElementContainer.appendChild(treeSubitems);
		} else{
			let treeItems = document.createElement('div');
				treeItems.setAttribute('class','tree-items');
			let treeItem = document.createElement('div');
				treeItem.setAttribute('class','tree-item');
        	let treeItemText = document.createTextNode(itemsLength + 1);
			let treeDelete = document.createElement('div');
				treeDelete.setAttribute('class','tree-delete');
				treeDelete.addEventListener('click', this.removeElement);
        	let treeAdd = document.createElement('div');
				treeAdd.setAttribute('class','tree-add');
				treeAdd.addEventListener('click', this.addElement);
			treeItem.appendChild(treeItemText);
			treeItem.appendChild(treeDelete);
        	treeItem.appendChild(treeAdd);
			treeItems.appendChild(treeItem);
			currElementItems.appendChild(treeItems);
		}
	}
	removeElement(e){
		let currElement = e.target;
		let currElementContainer = currElement.parentNode.closest('.tree-items');
		currElementContainer.remove();
	}
}

TreeAPI.getData().then(
	result => {
		let data = result.data;
		let tree = new TreeDiagram(data,'.tree-container');
		tree.buildTree();
	},
	error => {
		console.error(error);
	}
);