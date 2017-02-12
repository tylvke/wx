/**
 * Created by wangshuo on 2017/2/7.
 */
import publicDirectives from './directives/index'

let delimiters = /\{\{(.*)\}\}/;

const bindRE=/^v-bind:|^:/
const onRE=/^v-on:|^@/
const argRE=/:(.*)$/;

const terminalDirectives=[
    'for',
    'if'
];
export function compile(el,options){
    var nodeLinkFn=compileNode(el,options);

    var childLinkFn=el.hasAttributes()? compileNodeList(el.childNodes,options):null;

    return function compositeLinkFn(vm,el) {
        var childNodes=el.childNodes;
        var dirs=linkAndCapture(function () {
            if(nodeLinkFn)nodeLinkFn(vm,el);
            if(childLinkFn)childLinkFn(vm,childNodes);
        },vm);
    }
}

function linkAndCapture(linker,vm) {
    var originaalDirCount=vm._directives.length;
    linker();
    var dirs=vm._directives.slice(originaalDirCount);
    for(var i=0,len=dirs.length;i<len;i++){
        dirs[i]._bind();
    }
    return dirs;
}

function compileNode(node,options) {
    var type=node.nodeType;
    if(type===1){
        return compileElement(node,options);
    }
    else if(type===3){
        return compileTextNode(node,options);
    }
    else{
        return null;
    }
}

function compileNodeList(childNodes,options) {
    var linkFns=[];
    var nodeLinkFn,childLinkFn,node;
    for (var i=0,len=childNodes.length;i<len;i++){
        node=childNodes[i];
        nodeLinkFn=compileNode(node,options);
        childLinkFn=node.hasChildNodes() ? compileNodeList(node.childNodes,options) : null;
        linkFns.push(nodeLinkFn,childLinkFn);
    }
    return linkFns.length ? makeChildLinkFn(linkFns) : null;
}

function makeChildLinkFn(linkFns) {
    return function childLinkFn(vm,nodes) {
        var node,nodeLinkFn,childrenLinkFn;
        for(var i=0,n=0,len=linkFns.length;i<len;n++){
            node=nodes[n];
            nodeLinkFn=linkFns[i++];
            childrenLinkFn=linkFns[i++];

            nodeLinkFn && nodeLinkFn(vm,node);
            childrenLinkFn && childrenLinkFn(vm,node.childNodes);
        }
    }
}

function compileElement(el,options) {
    var linkFn;
    var hasAttrs=el.hasAttributes();

    if(hasAttrs){
        linkFn=checkTerminalDirective(el,options);
    }
    if(hasAttrs){
        linkFn=compileDirectives(el.attributes,options);
    }
    return linkFn;
}

function checkTerminalDirective(el,options) {
    var value,dirName;
    for(var i=0,len=terminalDirectives.length;i<len;i++){
        dirName=terminalDirectives[i];
        value=el.getAttribute('v-'+dirName);
        if(value!=null){
            return makeTerminalDirective(el,dirName,value,options);
        }
    }
}

function makeTerminalDirective(el,dirName,value,options) {
    var descriptor={
        name:dirName,
        expression:value,
        rawVal:value,
        def:terminalDirectives[dirName]
    }

    return function terminalNodeLinkFn(vm,el) {
        vm._bindDir(descriptor,el);
    }
}

function compileDirectives(attrs,options) {
    var i=attrs.length;
    var dirs=[];
    var attr,name,value,rawName,rawValue,dirName,arg,modifiers,dirDef,tokens;
    while (i--){
        attr=attrs[i];
        name=rawName=attr.name;
        value=rawValue=attr.value;
        if(onRE.test(name)){
            arg=name.replace(onRE,'');
            pushDir('on',publicDirectives.on)
        }

        if(bindRE.test(name)){
            arg=dirName=name.replace(bindRE,'');
            pushDir('bind',publicDirectives.bind);
        }
        if(name.indexOf('v-')===0){
            arg=(arg=name.match(argRE)) && arg[1];
            if(arg){
                name=name.replace(argRE,'');
            }
            dirName=name.slice(2);

            pushDir(dirName,publicDirectives[dirName]);
        }
    }

    function pushDir(dirName,def) {
        dirs.push({
            name:dirName,
            attr:rawName,
            raw:rawValue,
            def:def,
            arg:arg,
            expression:value
        })
    }

    if(dirs.length){
        return makeNodeLinkFn(dirs);
    }
}

function makeNodeLinkFn(directives) {
    return function nodeLinkFn(vm,el) {
        var i=directives.length;
        while (i--){
            vm._bindDir(directives[i],el);
        }
    }
}


function compileTextNode(el,options) {
    var text=el.textContent;
    if(delimiters.test(text)){
        var match=delimiters.exec(text)
        var value=match[1];

        var descriptor={
            name:"text",
            rawVal:text,
            def:publicDirectives.text,
            expression:value
        }

        return makeTextNodeLinkFn(descriptor);
    }
}

function makeTextNodeLinkFn(descriptor) {
    return function textNodeLinkFn(vm,el) {
        vm._bindDir(descriptor,el);
    }
}