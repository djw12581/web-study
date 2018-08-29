for(var i=0;i<3;i++){
    (function(){
        var j=i;
        setTimeout(function timer(){
            console.log(j);
        },1000);
    })();   
}
for(var i=0;i<3;i++){
    (function(j){
        setTimeout(function timer(){
            console.log(j);
        },1000);
    })(i);   
}
for(var i=0;i<3;i++){
    setTimeout(
        (function(j){
        return function(){
            console.log(j);
        }
    })(i)
    ,1000);
    console.log('aa')
}

for(var i=0;i<3;i++){
    let j=i;
    setTimeout(function timer(){
        console.log(j);
    },1000);
}

for(let i=0;i<3;i++){
    setTimeout(function timer(){
        console.log(i);
    },1000);
}
