/**
 * Created by wangshuo on 2017/2/7.
 */
import {
    bind
} from '../../util'

import {
    observe
} from '../../observer/index'

import Watcher from '../../watcher'
import Dep from '../../observer/dep'
export default function (Wx) {
    Wx.prototype._initState=function () {
        this._initData();
        this._initMethods();
        this._initComputed();
    }

    Wx.prototype._initMethods=function () {
        var methods=this.$options.methods;
        if(methods){
            for(var key in methods){
                this[key]=bind(methods[key],this);
            }
        }
    }

    Wx.prototype._initData=function () {
        this._data=this.$options.data;
        var data=this._data;

        var keys=Object.keys(data);
        var i,key;
        i=keys.length
        while (i--){
            key=keys[i];
            this._proxy(key);
        }

        observe(data);
    }

    function noop() {}
    Wx.prototype._initComputed=function () {
        var computed=this.$options.computed;
        if(computed){
            for(var key in computed){
                var def={
                    enumerable:true,
                    configurable:true,
                }
                def.get=makeComputedGetter(this,computed[key]);
                def.set=noop;

                Object.defineProperty(this,key,def);
            }
        }

    }

    function makeComputedGetter(vm,getter) {
        var watcher=new Watcher(vm,getter,null,{
            lazy:true
        });
        return function computedGetter() {
            if(watcher.dirty){
                watcher.evaluate();
            }
            if(Dep.target){
                watcher.depend();
            }
            return watcher.value;
        }
    }

    Wx.prototype._proxy=function (key) {
        var self=this;
        Object.defineProperty(self,key,{
            configurable:true,
            enumerable:true,
            get:function proxyGetter() {
                return self._data[key];
            },
            set:function proxySetter(val) {
                self._data[key]=val;
            }
        })
    }

    Wx.prototype._unproxy=function (key) {
        delete this[key];
    }


}