import {default as React, useState} from 'react'
import './Login.scss'
import classNames from 'classnames'
import CryptoJs from 'crypto-js'

function usePassword(maxLength = 6) {
    function deleteOne() {
        setText(prev => prev.slice(0, prev.length - 1))
    }

    function inputOne(key) {
        if (text.length >= maxLength) return
        setText(prev => prev + key)
    }

    function clear() {
        setText('')
    }

    const [text, setText] = useState('')

    return [text, inputOne, deleteOne,clear]
}

export function LoginPage() {

    const maxLength = 6
    const [pwd, inputOne, deleteOne, clear] = usePassword(maxLength)

    // 完成输入  进行验证
    function finishInput() {


        const fs = window.require('fs')
        const data = fs.readFileSync('passport.key')
        const bytes = CryptoJs.AES.decrypt(data.toString(), pwd)
        let decrypted = bytes.toString(CryptoJs.enc.Utf8)

        let sepIndex = decrypted.indexOf('.')

        if (sepIndex === -1) {
            alert('密钥文件已损坏或输入了错误的PIN码！')
            clear()
        } else {
            let uid = decrypted.slice(0, sepIndex)
            let token = decrypted.slice(sepIndex + 1)

            // 向主进程发送消息，表示已获得PIN码。该页面任务执行完毕
            const {ipcRenderer} = window.require('electron')
            localStorage.setItem('uid', uid)
            localStorage.setItem('token', token)
            ipcRenderer.send('onVerified')
        }


    }

    if (pwd.length === maxLength) {

        finishInput()
    }

    React.useEffect(() => {
        document.title = '输入PIN码'
    }, [])

    // 检查密钥文件是否存在
    const fs = window.require('fs')
    const {remote} = window.require('electron')
    fs.exists('passport.key', function (exists) {
        if (!exists) {
            alert('请将密钥放在根目录')
            remote.getCurrentWindow().close()
        }
    })

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