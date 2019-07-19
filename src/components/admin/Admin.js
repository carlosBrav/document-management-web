import React, {Component} from 'react';
import banner from '../../assets/images/rectorado-san-marcos.png';
import Example from '../commons/CommonMenu'

class Admin extends Component{

  render(){

    return(
      <div className='container-admin'>
        <div className='admin-container-image'>
          <img src={banner} alt={'banner'} className='admin-image'/>
        </div>
        <div className='container-menu-admin'>
          <Example />
        </div>

      </div>
    )
  }
}

export default Admin