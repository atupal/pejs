
function Stack() {
  var array = new Array();
  var sp = -1;
  
  this.pop = function() {
    return array[sp--];
  }
  
  this.push = function(val) {
    array[++sp] = val;
  }
}

var stack = new Stack();

function interpret(progName) {
  var prog = eval(progName); 
  var constPool = eval(progName+"Const"); 
  for (i in prog) {
    switch(prog[i][0]) {
      case 71: //PRINT_ITEM
          printOut(stack.pop());
          break;
      case 72: //PRINT_NEWLINE
          printOut("\n");
          break;
      case 83: //RETURN_VALUE
          break;
      case 90: //HAVE_ARGUMENTS
          break;
      case 100: //LOAD_CONST
          stack.push(constPool[prog[i][1]]);
          break;
    }
  }
}

function printOut(str) {
  switch(env) {
    case "browser":
      document.write(str);
      break;
    case "v8":
      print(str);
      break;
  }
}

var env;
function setEnv() {
  if(typeof(alert) == "undefined") {
    env = "v8";
  } else {
    env = "browser";
  }
}

setEnv();