import React, { useState, useEffect, useCallback } from 'react';

const Custumhooks = () => {

    const useTab = (idx, tab) => {
        const [curruntIdx, setCurruntIdx] = useState(idx);
        return {
            currentItem: tab[curruntIdx],
            setCurruntIdx,
        }
    }

    const tabData = [
        { tit: '탭1', conts: '탭1 메뉴' },
        { tit: '탭2', conts: '탭2 메뉴' },
        { tit: '탭3', conts: '탭3 메뉴' },
    ]

    const { currentItem, setCurruntIdx } = useTab(0, tabData)

    const onTabClick = useCallback((idx) => () => {
        console.log(currentItem)
        setCurruntIdx(idx)
    }, [currentItem])

   

    return (
        <div>
            {tabData.map((val, idx) => <button key={idx} onClick={onTabClick(idx)}>{tabData[idx].tit}</button>)}
            <div>{currentItem.conts}</div>
        </div>    
    );
};

export default Custumhooks 