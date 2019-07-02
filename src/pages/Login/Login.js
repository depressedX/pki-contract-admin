import {default as React, useState} from 'react'
import './Login.scss'
import classNames from 'classnames'

function usePassword(maxLength=6) {
    function deleteOne() {
        setText(prev => prev.slice(0, prev.length - 1))
    }

    function inputOne(key) {
        if (text.length >= maxLength) return
        setText(prev => prev + key)
    }

    const [text, setText] = useState('')

    return [text, inputOne, deleteOne]
}

export function LoginPage() {

    const maxLength = 6
    const [pwd, inputOne, deleteOne] = usePassword(maxLength)

    if (pwd.length === maxLength) {
        alert('输入完成')
    }

    return (
        <>
            <div className={'pwd-container-grid'}>
                <div className={classNames('pwd-input-container')}>
                    <input className={'pwd-input'} type={'password'} value={pwd} disabled={true}/></div>
                <button className={classNames('pwd-grid-item')} onClick={() => inputOne(1)}>
                    <div className={classNames('pwd-grid-item-number')}>1</div>
                </button>
                <button className={classNames('pwd-grid-item')} onClick={() => inputOne(2)}>
                    <div className={classNames('pwd-grid-item-number')}>2</div>
                </button>
                <button className={classNames('pwd-grid-item')} onClick={() => inputOne(3)}>
                    <div className={classNames('pwd-grid-item-number')}>3</div>
                </button>
                <button className={classNames('pwd-grid-item')} onClick={() => inputOne(4)}>
                    <div className={classNames('pwd-grid-item-number')}>4</div>
                </button>
                <button className={classNames('pwd-grid-item')} onClick={() => inputOne(5)}>
                    <div className={classNames('pwd-grid-item-number')}>5</div>
                </button>
                <button className={classNames('pwd-grid-item')} onClick={() => inputOne(6)}>
                    <div className={classNames('pwd-grid-item-number')}>6</div>
                </button>
                <button className={classNames('pwd-grid-item')} onClick={() => inputOne(7)}>
                    <div className={classNames('pwd-grid-item-number')}>7</div>
                </button>
                <button className={classNames('pwd-grid-item')} onClick={() => inputOne(8)}>
                    <div className={classNames('pwd-grid-item-number')}>8</div>
                </button>
                <button className={classNames('pwd-grid-item')} onClick={() => inputOne(9)}>
                    <div className={classNames('pwd-grid-item-number')}>9</div>
                </button>
                <div></div>
                <button className={classNames('pwd-grid-item')} onClick={() => inputOne(0)}>
                    <div className={classNames('pwd-grid-item-number')}>0</div>
                </button>
                <button className={classNames('pwd-grid-item')} onClick={() => deleteOne()}>
                    <div className={classNames('pwd-grid-item-delete')}>删除</div>
                </button>
            </div>
        </>
    )
}