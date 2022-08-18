/**
* A Node represents an HTML Element. A node can have a tag name,
* a list of CSS classes and a list of children nodes.
*/
class Node {

  constructor(tag, children, classes, id) {
    // Tag name of the node.
    this.tag = tag;
    // Array of CSS class names (string) on this element.
    this.classes = classes;
    // Array of child nodes.
    this.children = children; // All children are of type Node
    // id of the node
    this.id = id;
  }
  
  /**
  * Returns descendent nodes matching the selector. Selector can be 
  * a tag name or a CSS class name. BFS traversal algorithm is used
  * 
  * For example: 
  * 
  * 1.
  * <div> 
  *   <span id="span-1"></span>
  *   <span id="span-2"></span>
  *   <div>
  *     <span id="span-3"></span>
  *   </div>
  * </div>
  * Selector `span` should return 3 span nodes in this order
  * span-1 -> span-2 -> span-3.
  *
  * 2.
  * <div> 
  *   <span id="span-1" class="note"></span>
  *   <span id="span-2"></span>
  *   <div>
  *     <span id="span-3"></span>
  *   </div>
  * </div>
  * Selector `.note` should return one span node with `note` class.
  *
  * 3.
  * <div> 
  *   <span id="span-1"></span>
  *   <span id="span-2"></span>
  *   <article>
  *     <div>
  *       <span id="span-3"></span>
  *     </div>
  *   </article>
  * </div>
  * Selector `div span` should return three span nodes in this order
  * span-1 -> span-2 -> span-3.
  * 
  * @param {string} the selector string.
  * @returns {Array} Array of descendent nodes.
  * @public
  */
  search(selector) {
    let searchElement;
    let queue = [];
    let result = [];
    if(selector == undefined)
      return;
    
    // queue.push(this);
    // Adding children of the node in queue
    queue.push.apply(queue, this.children);

    // Searching matched element
    while(queue.length !=0) {
      // removing first element from the queue and checking whether it matches or not
      let ele = queue.shift();
      // if there are children for current node, then adding them to queue
      if(ele.children.length != 0)
        queue.push.apply(queue, ele.children);
      // Checking whether its class or not 
      if(selector.charAt(0) == ".") {
        searchElement = selector.substring(1);
        if(ele.classes.includes(searchElement))
          result.push(ele);
      }
      // checking whether its id
      else if(selector.charAt(0) == "#") 
        searchElement = ele.id;
      // if none of the above, then assigning tag
      else searchElement = ele.tag;

      // if search by id
      if(selector.charAt(0) == "#" && searchElement == selector.substring(1)) {
        result.push(ele);
      }
      // if it is tag
      else if(selector.charAt(0) != "." && searchElement == selector){
        result.push(ele);
      }
      
    }
    return result;
  }
}

//Function to call search with different testcase
function testCases(node, selector) {
  let result = node.search(selector);
  // console.log(result);
  let i;
  let s = "";
  // if no result found
  if(result == undefined)
    console.log("You have entered incorrect input,Please Enter correct input");
  else if(result.length == 0)
    console.log("No result found");
  else {
    for(i=0; i<result.length-1; i++)        
      s = s + result[i].id + " ---> ";
    s = s + result[i].id;
    //printing result
    console.log(s);
  }
}

// constructor(tag, children, classes, id)
//Create tree for html tags
let span1 = new Node("span", [], ["note"], "span-1" );
let span2 = new Node("span", [], [], "span-2");
let p1 = new Node("p", [], ["sub1-p1", "note"], "para-1");
let span3 = new Node("span", [], ["sub1-span3"], "span-3");
let label1 = new Node("label", [], [], "lbl-1");
let span4 = new Node("span", [], ["mania"], "span-4");
let span5 = new Node("span", [], ["note", "mania"], "span-5");

let section1 = new Node("section", [label1], [], "sec-1");

let div2 = new Node("div", [p1, span3], ["subContainer1"], "div-2");
let div3 = new Node("div", [section1], ["subContainer2"], "div-3");
let div4 = new Node("div", [span4, span5], [], "div-4");
let div1 = new Node("div", [span1, span2, div2, div3, div4], ["mainContainer"], "div-1");

let span6 = new Node("span", [], ["randomSpan"], "span-6");
let body = new Node("body", [div1, span6], [], "content");



// start searching
console.log("Started...")

// Different test cases
console.log("Test Case 1:")
testCases(div1, "span");

console.log("Test Case 2:")
testCases(div1, ".note");

console.log("Test Case 3:")
testCases(div1, "label");

console.log("Test Case 4:")
testCases(p1, ".note");

console.log("Test Case 5:")
testCases(div1, "div");

console.log("Test Case 6:")
testCases(div1, "div");     //random node

console.log("Test Case 7:")
testCases(div2, "section");

console.log("Test Case 8:")
testCases(body);

console.log("Test Case 9:")
testCases(body, "section");

console.log("Test Case 10:")
testCases(div1, ".randomSpan");
