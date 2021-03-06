var Dashboard = React.createClass({
  getInitialState() {
    return {
      certifications: this.props.certifications,
      fee_categories: this.props.fee_categories,
      user: this.props.user,
      errors: {}
    }
  },
  render() {
    return (
      <div className="dashboard">
        <div id="certifications" className="container collapse" data-state='true'>
          <div className="collapse__title">
            <h1><div className='title'><span>Certifications</span><i className='fa fa-plus'></i></div></h1>
          </div>
          <div className="collapse__content">
            <h4 className="th"><span>Fiscal Year</span><span>Application Status</span><span>Last Updated</span></h4>
            <Certifications certifications={this.state.certifications} user={this.state.user} />
          </div>
        </div>

        <div id="fee-schedule" className="container collapse">
          <div className="collapse__title">
            <h1><span><span className='title'>My Fee Schedule</span><i className='fa fa-plus'></i></span></h1>
          </div>
          <div className="collapse__content">
            <FeeSchedule fee_categories={this.props.fee_categories} floor_categories={this.props.fee_categories} user={this.state.user} certification={this.state.certifications[0]}/>
          </div>
        </div>
      </div>
    );
  }
});
