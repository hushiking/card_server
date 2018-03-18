export default {
    dataFilter(dataList, searchObj) {
        let curSelectArr = [];
        // 如果是空 不执行
        if (Object.keys(dataList).length <= 0) {
            return;
        }
        searchObj.forEach((item) => {
            // 进行类型判断
            if (item.type == 'select') {
                // 进行字符串判断 传入的对象存在 对应属性 并且 当前的数组长度为0 则1位当前的表单元素 添加这个数组
                if(dataList.hasOwnProperty(item['viewName']) && item.data.length <= 0){
                    curSelectArr = dataList[item['viewName']];
                    curSelectArr.forEach((strItem) => {
                        item.data.push({
                            id: strItem.id,
                            name: strItem.name
                        })
                    })
                    item.data.unshift({
                        id: 'all',
                        name: '全部'
                    });
                    return;
                }else{
                    return;
                }
                // if (typeof curSelectArr[0] === 'string') {
                // } else {
                //     item.data = curSelectArr;
                // }
            }
        })
    }
}