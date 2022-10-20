const {parentPort, worker}=require("worker_threads")
let sum=0;
    for(let i=0; i<10e7;i++){
        sum=sum+i
    }

parentPort.postMessage({sum,"threadID":require('node:worker_threads').threadId})