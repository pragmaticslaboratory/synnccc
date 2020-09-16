var SyncCC = {};

SyncCC.cont = null;
SyncCC.stop = new Continuation();

SyncCC.makeStop = function () {
    SyncCC.stop();
};

SyncCC.resume = function (val) {
    SyncCC.cont(val);
};

var aspectCallback = {
    pointcut: PCs.exec(callback),
    advice: function (jp) {
        SyncCC.resume(jp.args[0]);
    },
    kind: AS.AFTER
};

var aspectDownload = {
    pointcut: PCs.call(asyncDownload),
    advice: function (jp) {
        SyncCC.cont = new Continuation();
        var result = jp.proceed();
        SyncCC.makeStop();
        return result;
    },
    kind: AS.AROUND
};

AS.deploy(aspectCallback);
AS.deploy(aspectDownload);