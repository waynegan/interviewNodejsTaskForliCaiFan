const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('close', function() {
    console.log('程序运行完毕');
    process.exit(0);
});

const prompt = {
    onInit:function(){
        rl.question('请您按照要求输入数据\n', (T) => {
           inputProcessor.TProcessor(T);
          });    
    },
    onSetRequirement: function(){
        rl.question('', (NK) => {
            inputProcessor.NKProcessor(NK);
           });
    },
    onInputData: function(){
        rl.question('', (studentData) => {
            inputProcessor.SDProcessor(studentData);
           });
    },
    onLoop:function(){
        rl.question('', (NK) => {
            inputProcessor.NKProcessor(NK);
           });  
    }
}
const inputProcessor = {
    
    TProcessor: function(T){
        T = parseInt(T); 
        outputProcessor.setT(T);
        T >= 1 && T <= 10 ? prompt.onSetRequirement() : outOfRange.onTOutOfRange();
    },
    NKProcessor: function(NK){
        let NKArr = NK.split(' ');
        this.NKArr = NKArr;
        parseInt(NKArr[0]) >= 1 && parseInt(NKArr[0]) <= 1000 
        && parseInt(NKArr[1]) >= 1 && parseInt(NKArr[1]) <= parseInt(NKArr[0]) && NKArr.length == 2
         ? prompt.onInputData() : outOfRange.onNKOutOfRange();
    },
    SDProcessor: function(studentData){
        let studentDataArr = studentData.split(' ');
        studentDataArr.sort();
        that = this;
        function isClassOpen(){  
            outputProcessor.pushOutputArr(studentDataArr[parseInt(that.NKArr[1])-1] <= 0) ;
            let tempT = outputProcessor.T - 1;
            outputProcessor.setT(tempT);
            if(tempT < 1 ){
                for (var value of outputArr) {
                    value ? console.log('NO'):console.log('YES')
                  }
                  rl.close();
            }
            else{
                prompt.onLoop();
            }
        }
        studentDataArr.length == parseInt(this.NKArr[0]) ? isClassOpen() : outOfRange.onStudentOutOfRange()
    },
    NKArr:[]
}

// 设置分组数T、将预输出结果放到数组里

let outputArr = [];
const outputProcessor = {
    setT:function(T){
        this.T = T;
    },
    pushOutputArr: function(result){
        outputArr.push(result);
    },
    T:0
}

// 输入异常时，弹出提示并提示重新输入

const outOfRange = {
    onTOutOfRange: function(){
        rl.question('您输入的分组数有误，请重新输入(1-10)：\n', (T) => {
            inputProcessor.TProcessor(T);
        });
    },
    onNKOutOfRange: function(){
        rl.question('您输入的N K有误，请重新输入：\n', (NK) => {
            inputProcessor.NKProcessor(NK);
        });
    },
    onStudentOutOfRange: function(){
        rl.question('您输入的学生出勤数据有误，请重新输入：\n', (studentData) => {
            inputProcessor.SDProcessor(studentData);
        });
    }
}


prompt.onInit();

