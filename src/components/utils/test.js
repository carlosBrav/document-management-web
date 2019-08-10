import React, {Fragment} from 'react';


class MenuComponent extends React.Component {

  render(){
    return(
      <div style={{marginLeft: 20, marginTop: 20, width: '35%', height: 300,
        backgroundColor: '#F5F5DC', display: 'flex', flexDirection: 'row', justifyContent:'space-between',
      paddingLeft: 5, paddingRight: 5, paddingTop: 5}}>
        <div style={{backgroundColor: '#FFFFFF', height: '90%', width: 300, borderRadius: 10}}>
          1
        </div>
        <div style={{backgroundColor: '#FFFFFF', height: '90%', width: 50,  borderRadius: 10}}>
          2
        </div>
        <div style={{backgroundColor: '#FFFFFF', height: '90%', width: 300,  borderRadius: 10}}>
          3
        </div>
      </div>
    )
  }
}

export default MenuComponent