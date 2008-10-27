var helloworldConst = new Array();
  helloworldConst[0] = "Hello world!"
  helloworldConst[1] = "None"

var helloworld = new Array();

var temp = new Array();
  temp[0] = 100;
  temp[1] = "0";
  temp[2] = "CONSTANT";
  temp[3] = "'Hello world!'";
  temp[4] = "LOAD_CONST";
  temp[5] = "0";
  helloworld[0] = temp;

var temp = new Array();
  temp[0] = 71;
  temp[4] = "PRINT_ITEM";
  temp[5] = "3";
  helloworld[1] = temp;

var temp = new Array();
  temp[0] = 72;
  temp[4] = "PRINT_NEWLINE";
  temp[5] = "4";
  helloworld[2] = temp;

var temp = new Array();
  temp[0] = 100;
  temp[1] = "1";
  temp[2] = "CONSTANT";
  temp[3] = "None";
  temp[4] = "LOAD_CONST";
  temp[5] = "5";
  helloworld[3] = temp;

var temp = new Array();
  temp[0] = 83;
  temp[4] = "RETURN_VALUE";
  temp[5] = "8";
  helloworld[4] = temp;
