import React from 'react';

/* a view that informe the page is not authorized for this user */
function Forbidden() {
    return (
        <div className="bounds">
            <h1>Forbidden</h1>
            <p>Oh oh! You can't access this page.</p>
        </div>
    );
}

export default Forbidden;
