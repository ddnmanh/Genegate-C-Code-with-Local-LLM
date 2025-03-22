
import { Fragment } from "react";
import { ScrollToTop } from "../../components/index.js";

function DefaultLayout( {children} ) {
    return (
        <Fragment>
            <ScrollToTop />
            {/* <Header></Header> */}
            {children}
            {/* <Footer></Footer> */}
        </Fragment>
    )
}

export default DefaultLayout