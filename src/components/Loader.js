import React from 'react';
import {SyncLoader} from "react-spinners";
const Loader = () => {
    return (
        <div>
            {/* <ClipLoader color="#36D7B7" size={150} />*/}
            <br/>
            <SyncLoader color="#36D7B7" />
        </div>
    );
};
export default Loader;