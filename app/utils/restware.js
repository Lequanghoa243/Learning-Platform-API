
'use strict';


const sendError = function(res, errorCode, errorMes, httpCode, errorDesc, data) {
    if (!res) {
        return;
    }

    const out = {};
    out.result = 'fail';
    out.code = errorCode;
    out.error = errorMes ? errorMes : null;
    
    if (data) {
        out.data = data;
    }
    out.all = errorDesc;


    const status = httpCode ? httpCode : 500;

    res.status(status);
    res.contentType('json');
    return res.json(out);
};

module.exports = {
    sendError,
};
