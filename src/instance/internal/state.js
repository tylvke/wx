/**
 * Created by wangshuo on 2017/2/7.
 */
import {
    bind
} from '../../util'

import {
    observe
} from '../../observer/index'
export default function (Wx) {
    Wx.prototype._initState=function () {
        this._initData();
        this._initMethods();
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

    Wx.prototype._unproxy=function () {
        delete this[key];
    }


}