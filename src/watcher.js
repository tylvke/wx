/**
 * Created by wangshuo on 2017/2/7.
 */
import {
    extend
} from './util'

import Dep from './observer/dep'
import {
    parseExpression
} from './parses/expression'

export default function Watcher(vm,exrOrFn,cb,options) {
    if(options){
        extend(this,options);
    }

    var isFn=typeof exrOrFn==='function';

    this.vm=vm;
    vm._watchers.push(this);
    this.expression=isFn ? exrOrFn.toString() : exrOrFn;
    this.cb=cb;
    this.dirty=this.lazy;
    this.deps=Object.create(null);
    var res={};
    if(isFn){
        res.get=exrOrFn;
    }
    else{
        res=parseExpression(exrOrFn);
    }
    this.getter=res.get;
    this.value=this.dirty ? null :this.get();
}

Watcher.prototype.get=function () {
    this.beforeGet();
    var scope=this.vm;
    var value=this.getter.call(scope,scope);
    this.afterGet();
    return value;
}

Watcher.prototype.set=function (value) {
    this.vm[this.expression]=value;
}

Watcher.prototype.beforeGet=function () {
    Dep.target=this;
    this.newDeps=Object.create(null);
}
Watcher.prototype.afterGet=function () {
    Dep.target=null;
    var ids=Object.keys(this.deps);
    var i=ids.length;
    while (i--){
        var id=ids[i];
        if(!this.newDeps[id]){
            this.deps[i].removeSub(this);
        }
    }
    this.deps=this.newDeps;
}

Watcher.prototype.addDep=function (dep) {
    var id=dep.id;
    if(!this.newDeps[id]){
        this.newDeps[id]=dep;
        if(!this.deps[id]){
            this.deps[id]=dep;
            dep.addSub(this);
        }
    }
}

Watcher.prototype.update=function () {
    this.run();
}

Watcher.prototype.run=function () {
    var value=this.get();
    var oldVal=this.value;
    if(value!==oldVal){
        this.value=value;
        this.cb && this.cb.call(this.vm,value,oldVal);
    }
}

Watcher.prototype.evaluate=function () {
    var target=Dep.target;
    this.value=this.get();
    this.dirty=false;
    Dep.target=target;
}

Watcher.prototype.depend=function () {
    var ids=Object.keys(this.deps);
    var i=ids.length;
    while (i--){
        var id=ids[i];
        this.deps[id].depend();
    }
}
