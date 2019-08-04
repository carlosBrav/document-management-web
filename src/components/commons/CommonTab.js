import React, {Component, Fragment} from 'react';

class CommonTab extends Component{

  render(){
    const {tabTitles} = this.props
    return(
      <div style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10}}>
        {
          tabTitles && tabTitles.length>0 ?
            <div>
              <nav style={{marginBottom: 5}}>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  {
                    tabTitles.map((tab, index)=>{
                      return <a className={"nav-item nav-link "+(index === 0 ? 'active':'')}
                                id={`nav-${tab.id}-tab`}
                                data-toggle="tab"
                                href={`#nav-${tab.id}`}
                                role="tab"
                                aria-controls={`nav-${tab.id}`}
                                aria-selected="true">{tab.title}</a>
                    })
                  }
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                {
                  tabTitles.map((tab, index)=>{
                    return <div className={"tab-pane fade "+(index === 0 ? 'show active' : '') }
                                id={`nav-${tab.id}`}
                                role="tabpanel"
                                aria-labelledby={`nav-${tab.id}-tab`}>
                      {tab.component}
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