
import * as actionType from '../constants/index.js'


// 合并并初始化初始值。
let initRecordData = {
    isHaveDate: '0',
    tempRecord: [],
    isJoinHabit: false,
    lastRecord: '',
    tabIndex: 0,
    bottomTab: 'discover'
};

export default (state, action) => {
    if (typeof state === "undefined") {
        state = initRecordData
    }
    let newData = action.data;

    switch (action.type) {
        case actionType.STORE__RECORD_DATA:

            let {
                type,
                recordList,
                isHaveDate,
                isJoinHabit,
                lastRecord,
                tabIndex = state.tabIndex,
                bottomTab = state.bottomTab
            } = newData.data;

            if (type === 'issue') {
                state = {
                    ...state,
                    ...{
                        tempRecord: [...recordList, ...state.tempRecord]
                    }
                }
                console.log(state)
            } else if (type === 'update') {
                let updateRecordList = state.tempRecord.map((item) => {
                    let matchId = item._id === recordList[0]._id
                    return matchId ? {
                        ...item,
                        praiseCount: recordList[0].praiseCount,
                        praise: recordList[0].praise,
                        comment: [...recordList[0].comment],
                        commentCount: recordList[0].commentCount
                    } : item;
                })
                state = {
                    ...state,
                    ...{
                        tempRecord: updateRecordList
                    }
                }
            } else if (type === 'del') {
                let delIndex = state.tempRecord.findIndex((item) => {
                    return item._id === recordList[0]._id
                })

                state.tempRecord.splice(delIndex, 1)
                state = {
                    ...state
                }
            } else if (type === 'list') {
                // 刷新
                state = {
                    ...state,
                    ...{
                        tempRecord: recordList,
                        isHaveDate,
                        isJoinHabit,
                        lastRecord
                    }
                }
            } else if (type === 'up') {
                // 上拉加载
                console.log(recordList)
                state = {
                    ...state,
                    ...{
                        tempRecord: [...state.tempRecord, ...recordList],
                        lastRecord
                    }
                }
            } else {
                state = {
                    ...state,
                    ...{
                        isHaveDate,
                        isJoinHabit,
                        tabIndex: tabIndex !== undefined ? tabIndex : state.tabIndex,
                        bottomTab: bottomTab !== undefined ? bottomTab : state.bottomTab,
                        tempRecord: recordList
                    }
                }
            }

            return state

        case actionType.STORE__CLEAR:
            state = initRecordData;
            console.log(state)
            return state

        default:
            return state
    }
}
