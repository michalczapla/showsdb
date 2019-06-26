import React , {useEffect, useState} from 'react';
import classes from './Message.module.css';

const Message = (props) => {
    
    const [show, setShow] = useState(null);
    // let behaviorClass = null;
    useEffect(()=>{
        if (props.message !==null & props.message!== '') {
            setShow(true);
            setCloseTimeout();
        }
    },[props.message]);
    
    const setCloseTimeout =() => {
        setTimeout(()=>setShow(false),5000);
    }
    
    

// , (show) ? classes.Show : classes.Hide].join(' ')
    return (
        <div className={[classes.MessageContainer, classes[props.type], (show) ? classes.Show : classes.Hide].join(' ')}>
            {props.message}
        </div>
    )
};

export default Message;