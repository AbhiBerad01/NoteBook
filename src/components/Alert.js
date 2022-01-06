import React from 'react'

export default function Alert(props) {
    const capitalize = (word) =>{
        if(word==='danger'){
            word = 'Error'
        }
         const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
       props.alert&& <div className={`alert alert-${props.alert.tag} alert-dismissible fade show`} role="alert">
  <strong>{capitalize(props.alert.tag) } : </strong>{props.alert.msg}
</div>
    )
}
