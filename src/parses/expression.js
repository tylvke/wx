/**
 * Created by wangshuo on 2017/2/10.
 */
const wsRE = /\s/g
const newlineRE = /\n/g
const saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|new |typeof |void /g
const restoreRE = /"(\d+)"/g
const pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/
const identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g
const booleanLiteralRE = /^(?:true|false)$/

var saved=[];

function save(str,isString) {
    var i=saved.length;
    saved[i]=isString ? str.replace(newlineRE,'\\n') : str;
    return '"' + i + '"';
}

function rewrite(raw) {
    var c = raw.charAt(0)
    var path = raw.slice(1)
    path = path.indexOf('"') > -1
        ? path.replace(restoreRE, restore)
        : path
    return c + 'scope.' + path
}

function restore(str,i) {
    return saved[i];
}

export function parseExpression(exp) {
    exp=exp.trim();
    var res={exp:exp};
    res.get=isSimplePath(exp) && exp.indexOf('[')<0
            ? makeGetterFn("scope."+exp)
            : compileGetter(exp);

    return res;
}

function compileGetter(exp) {
    saved.length=0;
    var body=exp.replace(saveRE,save).replace(wsRE,'');
    body=(' ' + body).replace(identRE,rewrite).replace(restoreRE,restore);
    return makeGetterFn(body);
}

function isSimplePath(exp) {
    return pathTestRE.test(exp) && !booleanLiteralRE.test(exp) && exp.slice(0,5)!=='Math';
}

function makeGetterFn(exp) {
    return new Function('scope','return '+exp+';')
}