import fetchRequest from '../fetchRequest';

async function deleteCourse(course, props) {
    if (course.owner.id === props.user.id) {
        fetchRequest(`/courses/${course.id}`, 'DELETE', null, true, props.credentials)
            .then( () => {props.history.push('/')})
            .catch( error => console.log(error) )
    } else {
        props.history.push("/forbidden")
    }
}

export default deleteCourse;
