import React from 'react'

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
        setList(prev => {

            let i = toBeHandledAccountList.findIndex(v => v.id === id)
            if (i === -1) {
                return prev
            }
            return prev.slice(0, i).concat(prev.slice(i + 1))
        })
    }

    function decline(id) {

        setList(prev => {

            let i = toBeHandledAccountList.findIndex(v => v.id === id)
            if (i === -1) {
                return prev
            }
            return prev.slice(0, i).concat(prev.slice(i + 1))
        })
    }

    const [toBeHandledAccountList, setList] = React.useState([
        {
            id: 1,
            name: '诸葛亮',
            cardID: '370523199020191211',
            timestamp: Date.now()
        },
        {
            id: 2,
            name: '貂蝉',
            cardID: '370523199020191211',
            timestamp: Date.now()
        },
        {
            id: 3,
            name: '海尔兄弟',
            cardID: '370523199020191211',
            timestamp: Date.now()
        },
        {
            id: 4,
            name: '牙签',
            cardID: '370523199020191211',
            timestamp: Date.now()
        },
        {
            id: 5,
            name: '火柴人',
            cardID: '370523199020191211',
            timestamp: Date.now()
        },
    ])


    React.useEffect(()=>{
        document.title = '用户管理程序'
        alert(localStorage.getItem('uid')+'  '+localStorage.getItem('token'))

    },[])


    return (
        <>
            <h1>管理员 {'Lph'}</h1>
            <h2>待处理账号列表<button>刷新</button></h2>
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