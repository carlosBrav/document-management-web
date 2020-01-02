import React, {Component, Fragment} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
import map from 'lodash/map';

class CommonTab extends Component{

  state = {
    activeTab: this.props.tabList[0].id
  };

  toggle(tab, cb) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
    cb()
  }

  render(){
    const {tabList} = this.props
    return(
      <div className='tabs-navigation'>
        {
          tabList && tabList.length>0 ?
            <Fragment>
              <Nav tabs className='tab-common' >
                {map(tabList, tab =>
                    <NavItem key={tab.id}  className={'nav-item'} data-test={'item-tab-' + tab.id}>
                      <NavLink className={this.state.activeTab === tab.id ? 'active' : ''}
                               onClick={()=>this.toggle(tab.id, tab.onClick)}
                      >
                        {tab.title}
                      </NavLink>
                    </NavItem>
                )}
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                {map(tabList, tab =>
                  <TabPane tabId={tab.id} key={tab.id}>
                    <div>
                      {tab.content()}
                    </div>
                  </TabPane>
                )}
              </TabContent>
            </Fragment> : null
        }
      </div>
    )
  }
}
export default CommonTab