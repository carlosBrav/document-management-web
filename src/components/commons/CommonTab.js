import React, {Component} from 'react';

class CommonTab extends Component{

  render(){
    const {tabList, currentUser} = this.props
    return(
      <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10}}>
        {
          tabList && tabList.length>0 ?
            <div>
              <nav style={{marginBottom: 5}}>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  {
                    tabList.map((tab, index)=>{
                      return <a key={'link'+index} className={"nav-item nav-link "+(index === 0 ? 'active':'')}
                                id={`nav-${tab.id}-tab`}
                                data-toggle="tab"
                                href={`#nav-${tab.id}`}
                                role="tab"
                                aria-controls={`nav-${tab.id}`}
                                aria-selected="true"
                                onClick={tab.onClick}>{tab.title}</a>
                    })
                  }
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                {
                  tabList.map((tab, index)=>{
                    return <div key={'tabContent'+index} className={"tab-pane fade "+(index === 0 ? 'show active' : '') }
                                id={`nav-${tab.id}`}
                                role="tabpanel"
                                aria-labelledby={`nav-${tab.id}-tab`}>
                      {tab.action()}
                    </div>
                  })
                }
              </div>
            </div> : null
        }
      </div>
    )
  }
}
export default CommonTab