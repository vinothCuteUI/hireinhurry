export const VALIDATOR_REQUIRE = (state, action)=>{
    if(action.type === "REQUIRE"){
        return {value: action.val, isValid: action.val.trim().length > 0}
    }
    return {value:'', isValid:null}
}

export const IS_CHECKED = (state, action)=>{
    if(action.type === "CHECKED"){
        return {isValid: action.isChecked}
    }
    return {value:'', isValid:null}
}

export const REQUIRE_LETTER = (state, action)=>{
    let isLetters = (/^[A-Za-z ]+$/);
    
    if(action.type === "REQUIRELETTER")
    {
        if(action.val.match(isLetters)){
            return {value: action.val, isValid: action.val.trim().length > 0}
        }else{
            return {value: action.val, isValid: false}

        }
        
    }
    return {value:'', isValid:null}
}

export const REQUIRE_EMAIL = (state, action)=>{
    let isEmail = (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    
    if(action.type === "EMAIL"){
        if(action.val.match(isEmail)){
            return {value: action.val, isValid: action.val.trim().length > 0}
        }else{
            return {value: action.val, isValid: false}
        }
    }
    return {value:'', isValid:null}
}

export const REQUIRE_NUMBER = (state, action)=>{
    let isNumber = (/^[0-9]{1,10}$/g);
    
    if(action.type === "NUMBER"){
        if(action.val.match(isNumber)){
            return {value: action.val, isValid: action.val.trim().length > 0}
        }else{
            return {value: action.val, isValid: false}
        }
    }
    return {value:'', isValid:null}
}

export const OPT_VALIDATE = (state, action)=>{
    if(action.type === "OTP"){
        return {...state, [action.otpID]: action.val, isValid: action.val.trim().length > 0}
    }
    return {otp1: "", otp2: "", otp3: "", otp4: "", isValid:null}
}

