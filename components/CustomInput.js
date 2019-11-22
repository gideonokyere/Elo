import React,{Component} from 'react';
import {Text} from 'react-native';
import {Input} from 'react-native-elements';
import Constainer from './Constainer';

class CustomInput extends Component{

    _handleChange=(value)=>{
        this.props.onChange(this.props.name,value);
    }

    _handleTouch=()=>{
        this.props.onTouched(this.props.name);
    }

    render(){
        const{label,error,...rest}=this.props;
        return(

               <Input
                 label={this.props.label}
                 rightIcon={this.props.rightIcon}
                 onChangeText={this._handleChange}
                 onBlur={this._handleTouch}
                 errorMessage={this.props.error}
                 {...rest}
              />
        )
    }
}

export default CustomInput;