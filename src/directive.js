/**
 * Created by wangshuo on 2017/2/7.
 */
import {on,extend} from './util'
import Watcher from './watcher'
export default function Directive(descriptor,vm,el){
    this.vm=vm;
    this.el=el;
    this.descriptor=descriptor;
    this.name=descriptor.name;
    this.arg=descriptor.arg;
    this.rawVal=descriptor.rawVal;
    this.expression=descriptor.expression;

    this._listeners;
}

Directive.prototype._bind=function () {
    var name=this.name;
    var descriptor=this.descriptor;

    var def=descriptor.def;

    extend(this,def);

    if(this.bind){
        this.bind();
    }

    var dir=this;
    if(this.update && !this._checkStatement()){
        this._update=function (val,oldVal) {
            dir.update(val,oldVal)
        }

        var watcher=this._watcher=new Watcher(this.vm,this.expression,this._update,{

        })

        this.update(watcher.value);
    }
}

Directive.prototype._checkStatement=function () {
    var express=this.expression;
    if(express && this.acceptStatement){
        var fn=makeFn();
        var scope=this.vm;
        var handler=function (e) {
            scope.$event=e;
            fn.call(scope,scope);
            scope.$event=null;
        }
        this.update(handler)
        return true;
    }

    function makeFn() {
        return new Function('scope','return scope.'+express+';')
    }
}

Directive.prototype.set=function (value) {
    this._watcher.set(value);
}

Directive.prototype.on=function (event,handler) {
    on(this.el,event,handler);
    (this._listeners || (this._listeners=[])).push([event,handler]);
}