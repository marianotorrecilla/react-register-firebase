import {useState} from 'react';

const useCustomForm = () => {
    const [values, setState] = useState({});
    const handlerChange = (e) => {
        setState({...values, [e.target.name] : e.target.value });
    };
    return [values, handlerChange,setState];
}

export default useCustomForm;