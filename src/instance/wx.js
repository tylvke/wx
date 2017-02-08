/**
 * Created by wangshuo on 2017/2/7.
 */
import initMix from './internal/init'
import stateMix from './internal/state'
import lifecycleMix from './internal/lifecycle'

import lifecycleAPI from './api/lifecycle'
function Wx(options) {
    this._init(options);
}

initMix(Wx)
stateMix(Wx)
lifecycleMix(Wx)

lifecycleAPI(Wx)
export default Wx;