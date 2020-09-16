

load("libs-as/jsparse.js");
load("libs-as/jsrewrite.js");

/*
var readLine = (typeof readline === 'function') ? readline : (function() {
     print("ANTES del import");
     importPackage(java.io);
     importPackage(java.lang);
     var stdin = new BufferedReader(new InputStreamReader(System['in']));

     print("ANTES");
     return function() {
         print("line:"+stdin.readLine());
         return String(stdin.readLine());  // Read line,
     };                                    // force to JavaScript String
 }());
 */

 var ins = java.lang.System.in;
 var newLine = java.lang.System.getProperty("line.separator");
 var is = new java.io.InputStreamReader(ins);
 var sb=new java.lang.StringBuilder();
 var br = new java.io.BufferedReader(is);
 //var line = br.readLine();

var scriptText = "";
var line = null;


var numberOfSeqEmptyLines = 0;
var MAX_NUM_OF_SEQ_EMPTY_LINES = 10;

//var stdin = new BufferedReader(new InputStreamReader(System['in']) ); //pleger
while((line = br.readLine()) != null){  //remove stdin
    if(line == ""){
        if(++numberOfSeqEmptyLines >= MAX_NUM_OF_SEQ_EMPTY_LINES){
            break;
        }
    }
    else{
        numberOfSeqEmptyLines = 0;
        scriptText += (line + "\n");
    }
}

print(AspectScriptRewrite.rewrite(scriptText));
