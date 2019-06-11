import React, {useEffect, useRef} from 'react';
import classes from './InputBox.module.css';

const InputBox = (props) => {
    const inputSearchBox = useRef();
    
    
    // const clear = () =>{
    //     this.input.value = '';
    // }

    useEffect(()=>{
        inputSearchBox.current.value='';
    });

    return(
    <div className={classes.InputBox}>
                    <div className={classes.Title}>{props.title}</div>
                    <input className={classes.Input} type="text" placeholder={props.placeholder} onKeyDown={props.enterHandler} ref={inputSearchBox}/>
    </div>
    )
};

export default InputBox;

//props.setRef