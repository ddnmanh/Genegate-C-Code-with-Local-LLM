
import classNames from 'classnames/bind'
import style from './Loading.module.scss'

const cn = classNames.bind(style)

function Loading({props}) {

    let color = (props && props.color)?props.color:'#ccc';
    
    return (
        <div className={cn('loading-container')}>
            <h1 style={{color: `${color}`}}>Victory</h1>
            <div className={cn('dot-loader')}>
                <span style={{backgroundColor: `${color}`}}></span>
                <span style={{backgroundColor: `${color}`}}></span>
                <span style={{backgroundColor: `${color}`}}></span>
                <span style={{backgroundColor: `${color}`}}></span>
            </div>
        </div>
    )
}

export default Loading