import fetchRequest from '../fetchRequest';

/* this function try to delete a course */
async function deleteCourse(courseId, props) {
    try {
        const response = await fetchRequest(`/courses/${courseId}`, 'DELETE', null, true, props.credentials);
        if (response.status === 204) {
            props.history.push("/");
        } else if (response.status === 403) {
            props.history.push("/forbidden");
        } else {
            throw new Error("Internal Server Error");
        };
    } catch(error) {
        console.error(error);
        props.history.push("/error");
    };
};

export default deleteCourse;
