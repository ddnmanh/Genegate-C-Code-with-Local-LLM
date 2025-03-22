import { useEffect, useState } from "react";

import classNames from "classnames/bind"
import style from './ScrollToTop.module.scss'

const cn = classNames.bind(style)

function ScrollToTop() {

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // if (window.pageYOffset >= window.innerHeight) {
            if (window.pageYOffset >= 100) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            className={cn('scroll-to-top-button') + ' ' + (showButton ? cn('show') : '')}
            onClick={handleScrollToTop}
        >
            <span className="material-icons-outlined">expand_less</span>
        </button>
    );
}

export default ScrollToTop


