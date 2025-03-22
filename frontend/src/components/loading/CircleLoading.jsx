
import classNames from "classnames/bind"
import style from './CircleLoading.module.scss'

const cn = classNames.bind(style)

function CircleLoading() {
    return (
        <div className={cn("lds-dual-ring")}> 
            <div className={cn('circle')}>
            </div>
        </div> 
    )
}

export default CircleLoading