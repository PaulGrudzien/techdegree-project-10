import React from 'react';

/* a list of unvalidate fields in forms */
function Validation(props) {
    if (props.errors.length) {
        return (
            <div>
                <div>
                    <h2 className="validation--errors--label">Validation errors</h2>
                    <div className="validation-errors">
                        <ul>
                            {props.errors.map((error, index) =>
                                <li key={index}>{error}</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    };
};

export default Validation;
