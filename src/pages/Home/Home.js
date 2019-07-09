import React from 'react'
import {$http, acceptUser, declineUser, getUnauthorizedUsers, login} from "../../API";

function AccountItem({name, cardID, id, onAccept, onDecline}) {
    return <tr>
        <td>{name}</td>
        <td>{cardID}</td>
        <td>
            <button onClick={onAccept}>同意</button>
            <button onClick={onDecline}>拒绝</button>
        </td>
    </tr>
}

export function HomePage() {

    function accept(id) {
        acceptUser(id).then(() => {

            setList(prev => {

                let i = toBeHandledAccountList.findIndex(v => v.id === id)
                if (i === -1) {
                    return prev
                }
                return prev.slice(0, i).concat(prev.slice(i + 1))
            })
        }, e => {

            alert(`出现错误：${JSON.stringify(e)}`)

            const {remote} = window.require('electron')
            remote.getCurrentWindow().close()
        })
    }

    function decline(id) {

        declineUser(id).then(() => {

            setList(prev => {

                let i = toBeHandledAccountList.findIndex(v => v.id === id)
                if (i === -1) {
                    return prev
                }
                return prev.slice(0, i).concat(prev.slice(i + 1))
            })
        }, e => {

            alert(`出现错误：${JSON.stringify(e)}`)

            const {remote} = window.require('electron')
            remote.getCurrentWindow().close()
        })
    }

    const [toBeHandledAccountList, setList] = React.useState([])

    React.useEffect(() => {
        document.title = '用户管理程序'
        alert(localStorage.getItem('uid') + '  ' + localStorage.getItem('token'))

        const id = localStorage.getItem('uid')
        const password = localStorage.getItem('token')

        login(id, password).then(getUnauthorizedUsers).then(data => {
            setList(data)
        }).catch(e => {
            alert(`出现错误：${JSON.stringify(e)}`)

            const {remote} = window.require('electron')
            remote.getCurrentWindow().close()
        })

    }, [])

    function refresh() {
        setList([])
        getUnauthorizedUsers().then(data => {
            setList(data)
        }).catch(e => {
            alert(`出现错误：${JSON.stringify(e)}`)

            const {remote} = window.require('electron')
            remote.getCurrentWindow().close()
        })
    }


    return (
        <>
            <h1>管理员 {'Lph'}</h1>
            <h2>待处理账号列表
                <button onClick={refresh}>刷新</button>
            </h2>
            {toBeHandledAccountList.length > 0 ? <table cellPadding={10}>
                <thead>
                <tr>
                    <th>姓名</th>
                    <th>身份证号</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {toBeHandledAccountList.map((item, i) =>
                    <AccountItem key={i} {...item}
                                 onAccept={() => accept(item.id)}
                                 onDecline={() => decline(item.id)}/>)}
                </tbody>
            </table> : <div>待处理账号列表为空</div>}
        </>
    )
}