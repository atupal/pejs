testArray.sort();

var exceptions = new Array();
var success = 0;
var total = 0;
var totalTime = 0;

function indent(str,ind) {
  for (var i=str.length;i<=ind;i++) {
    str += " ";
  }
  return str;
}

function runTest(delayArr, withExceptions) {
  for (var i=0; i<delayArr.length; i++) {
    var result = "";
    var timeSpent;
    var progName = delayArr[i];
    if (!(/^Benchmark/.test(progName)))
      continue;
    result += indent(""+(i+1),4);
    result += indent(progName,45);
    total++;
    if (withExceptions) {
      interpret(progName);
    } else {
      try {
	var startTime = (new Date()).getTime();
	interpret(progName);
	var endTime = (new Date()).getTime();
	timeSpent = endTime - startTime;
	totalTime += timeSpent;
      } catch (exception) {
	result += indent("FAIL",5);
	exceptions.push(progName+": "+exception);
      }
    }
    result += indent(""+timeSpent,0);
    print(result);
  }
}
runTest(testArray, false);

print(indent("Total time spent: "+totalTime+"ms"));
//print(indent(total+" tests run: "+success+" succeeded, "+
//		(total-(success+exceptions.length))+" returned wrong result and "+
//		exceptions.length +" failed with an exception.\n"));

if (exceptions.length > 0) {
  print("Exceptions:");
  for (var i=0; i<exceptions.length; i++) {
    print(exceptions[i]);
  }
}

