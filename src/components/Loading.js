import ClipLoader from 'react-spinners/ClipLoader';
import React from 'react';

class Loading extends React.Component {

    render() {
        return (
            <div className="spinner">
                <ClipLoader
                    size={350}
                    color={'#123abc'}
                />
            </div>
        );
    }
}
export default Loading;
