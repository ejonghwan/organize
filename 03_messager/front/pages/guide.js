import React from 'react'
import s from './guild.module.css'
import SerchButton from '../components/smallPieces/button/SerchButton'
import DefaultButton from '../components/smallPieces/button/DefaultButton'
import TextButton from '../components/smallPieces/button/TextButton'
import BoxButton from '../components/smallPieces/button/BoxButton'

const guide = () => {

    


    return (
        <div style={{padding: "40px;"}}>
            <div>
            <h2 style={{fontSize: "25px", background: "#f9f9f", margin: "20px 0px"}}>### button</h2>
            <div className={s.item}>
                <h3>1. 인풋 안 버튼</h3>
                <ul className={s.list1}>
                    <li>컴포넌트:  {"<SerchButton type={} value={} /> "}</li>
                    <li>옵션: type: 버튼타입, value: 히든되는 텍스트</li> 
                    <li>타입: {"{type1}"} / {"{type2}"}</li> 
                </ul>
                <ul className={s.list2}>
                    <li><SerchButton type={"type1"} value={'정보 검색'}/></li>
                    <li><SerchButton type={"type2"} value={'지도 검색'}/></li>
                    <li><SerchButton type={"type2"} value={'지도 검색'}/></li>
                    <li><SerchButton type={"type2"} value={'지도 검색'}/></li>
                    <li><SerchButton type={"type2"} value={'지도 검색'}/></li>
                </ul>
            </div>

            <div className={s.item}>
                <h3>2. 기본버튼</h3>
                <ul className={s.list1}>
                    <li>컴포넌트: {"<DefaultButton type={} value={} /> "}</li>
                    <li>옵션: type: 버튼타입, value: 히든되는 텍스트</li> 
                    <li>타입: {"{type1}"} / {"{type2}"} / {"{type3}"} / {"{type4}"}</li>
                </ul>
                <ul className={s.list2}>
                    <li><DefaultButton type={"type1"} value={'type1'}/></li>
                    <li><DefaultButton type={"type2"} value={'type2'}/></li>
                    <li><DefaultButton type={"type3"} value={'type3'}/></li>
                    <li><DefaultButton type={"type4"} value={'type4'}/></li>
                </ul>
            </div>

            <div className={s.item}>
                <h3>3. 텍스트 버튼</h3>
                <ul className={s.list1}>
                    <li>컴포넌트: {"<TextButton type={} value={} /> "}</li>
                    <li>옵션: type: 버튼타입, value: 히든되는 텍스트</li> 
                    <li>타입: {"{type1}"} / {"{type2}"} / {"{type3}"} / {"{type4}"}</li> 
                </ul>
                <ul className={s.list2}>
                    <li><TextButton type={"type1"} value={'type1'}/></li>
                    <li><TextButton type={"type2"} value={'type2'}/></li>
                    <li><TextButton type={"type3"} value={'type3'}/></li>
                    <li><TextButton type={"type4"} value={'type4'}/></li>
                </ul>
            </div>

            <div className={s.item}>
                <h3>4. 박스 버튼</h3>
                <ul className={s.list1}>
                    <li>컴포넌트: {"<BoxButton type={} value={} /> "}</li>
                    <li>옵션: type: 버튼타입, value: 히든되는 텍스트</li> 
                    <li>타입: {"{type1}"} / {"{type2}"} / {"{type3}"} / {"{type4}"}</li> 
                </ul>
                <ul className={s.list2}>
                    <li><BoxButton type={"type1"} value={'type1'}/></li>
                    <li><BoxButton type={"type2"} value={'type2'}/></li>
                    <li><BoxButton type={"type3"} value={'type3'}/></li>
                    <li><BoxButton type={"type4"} value={'type4'}/></li>
                </ul>
            </div>
              
            </div>
        </div>
    )
}

export default guide;