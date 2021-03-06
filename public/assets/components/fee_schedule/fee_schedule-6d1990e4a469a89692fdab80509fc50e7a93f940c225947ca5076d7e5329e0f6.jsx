var FeeSchedule = React.createClass({
  getInitialState() {
    return {
      fee_categories: this.props.fee_categories,
      certification: this.props.certification
    }
  },
  componentDidMount() {
    this.revealFeeInfo()
  },
  feeStatus() {
    var feeStatus
    if (this.props.certification.operating_expenses >= 15000000) {
      feeStatus = "max"
    } else if (this.props.certification.operating_expenses >= 5000000) {
      feeStatus = "over5m"
    } else if (this.props.certification.operating_expenses > 500000) {
      feeStatus = "min"
    } else {
      feeStatus = "floor"
    }
    return feeStatus
  },
  isMax() {
    var message
    if (this.feeStatus() == 'max') {
      message = <div className="message">
        <h4>If your operating budget is over $15,000,000 you are required to pay artist fees meeting Minimum W.A.G.E. standards but must also not exceed a Maximum W.A.G.E.</h4>
        <h4>To determine the Maximum W.A.G.E. please contact us directly: <a href="mailto: certification@wageforwork.com">certification@wageforwork.com</a>.</h4>
      </div>
    }
    return message
  },
  revealFeeInfo() {
    $('.wide .info--title').mouseover(function(e) {
      $(this).addClass('active')
      $(this).siblings('.info').fadeIn()
    })
    $('.wide .info--title').mouseout(function(e) {
      $(this).removeClass('active')
      $(this).siblings('.info').fadeOut()
    })
  },
  feeHeader() {
    var status = this.feeStatus()
    var fee_header
    var floor_info = <div className="info info--floor">Minimum for instiuttions with TAOE under $500K</div>
    var minimum_info = <div className="info info--minimum">Minimum required for certification</div>
    var recommended_info = <div className="info info--recommended">Recommended miminum for institutions with operating expenses over $5M</div>
    var max_info = <div className="info info--minimum">Required for institutions with operating expenses over $15M</div>
    if (status == "floor") {
      fee_header = <span className="wide single">
                     <span className="info--title">Minimum Wage<i className="fa fa-question-circle" aria-hidden="true"></i></span>
                     {minimum_info}
                   </span>
    } else if (status == "min") {
      fee_header = <span className="wide">
                    <span className="left">
                      <span className="info--title">Floor Wage</span>
                      {floor_info}
                    </span>
                    <span>
                      <span className="info--title">Minimum Wage</span>
                      {minimum_info}
                    </span>
                  </span>
    } else if (status == "over5m") {
      fee_header = <span className="wide">
                    <span className="left">
                      <span className="info--title">Recommended</span>
                      {recommended_info}
                    </span>
                    <span>
                      <span className="info--title">Minimum Wage</span>
                      {minimum_info}
                    </span>
                  </span>
    } else if (status == "max") {
      fee_header = <span className="wide single">
                     <span className="info--title">Minimum Wage</span>
                     {max_info}
                   </span>
    }
    return fee_header
  },
  FeeCategoryRows() {
    var fee_categories = this.state.fee_categories.map( function(fee_category, i) {
    var status = this.feeStatus()
    var subtitle = <span className="subtitle">{fee_category.fee_subtitle}</span>

    var floor_fee = Number(fee_category.floor_fee).toLocaleString()
    var min_fee = Number(this.state.certification.operating_expenses * Number(fee_category.over500K)).toLocaleString()
    var over5m = Number(5000000 * Number(fee_category.over500K)).toLocaleString()
    var existing_text = Number(((this.state.certification.operating_expenses/5000000) * Number(fee_category.over500K)) + .25 )

    var format_fee
    if (status == "floor") {
      format_fee = <span className="wide"><span><span className="amount">${floor_fee}</span>{subtitle}</span></span>
    } else if (status == "min") {
      if (i == 11 || i == 12) {
        format_fee = <span className="wide">
                      <span className="left">
                        <span className="amount">${floor_fee}</span>
                        {subtitle}
                      </span>
                      <span className="right">
                        <span className="amount">${existing_text.toLocaleString()}</span>
                        <span className="subtitle">/word</span>
                      </span>
                    </span>
      } else if (i == 13) {
       format_fee = <span className="wide">
                     <span className="left">
                       <span className="amount">${floor_fee}</span>
                       {subtitle}
                      </span>
                      <span className="right">
                        <span className="amount">${floor_fee}</span>
                        {subtitle}
                      </span>
                    </span>
     } else {
      format_fee = <span className="wide">
                    <span className="left">
                      <span className="amount">${floor_fee}</span>
                      {subtitle}
                    </span>
                    <span className="right">
                      <span className="amount">${min_fee}</span>
                      {subtitle}
                    </span>
                  </span>
      }
    } else if (status == "over5m") {
      if (i == 11 || i == 12) {
       floor_fee = (Number(fee_category.over500K)) + .25
       format_fee = <span className="wide">
                     <span className="left">
                       <span className="amount">${existing_text.toLocaleString()}</span>
                       <span className="subtitle">/word</span>
                      </span>
                      <span className="right">
                        <span className="amount">${floor_fee}</span>
                        <span className="subtitle">/word</span>
                      </span>
                    </span>
     } else if (i == 13) {
      format_fee = <span className="wide">
                    <span className="left">
                      <span className="amount">${fee_category.over500K}</span>
                      <span className="subtitle">/day</span>
                     </span>
                     <span className="right">
                       <span className="amount">${floor_fee}</span>
                       {subtitle}
                     </span>
                   </span>
    } else {
      format_fee = <span className="wide">
                    <span className="left">
                      <span className="amount">${min_fee}</span>
                      {subtitle}
                    </span>
                    <span className="right">
                      <span className="amount">${over5m}</span>
                      {subtitle}
                    </span>
                  </span>
      }
    } else if (status == "max") {
      if (i == 11 || i == 12) {
       floor_fee = (Number(fee_category.over500K)) + .25
       format_fee = <span className="wide">
                      <span className="right">
                        <span className="amount">${existing_text.toLocaleString()}</span>
                        <span className="subtitle">/word</span>
                      </span>
                    </span>
     } else if (i == 13) {
      format_fee = <span className="wide">
                    <span className="right">
                      <span className="amount">${fee_category.over500K}</span>
                      <span className="subtitle">/day</span>
                    </span>
                  </span>
    } else {
      format_fee = <span className="wide">
                      <span className="right">
                        <span className="amount">${over5m}</span>
                        {subtitle}
                      </span>
                    </span>
      }
    }
    var format_percent
    if (fee_category.id != 12 && fee_category.id != 13 && fee_category.id != 14 ){
      format_percent = <span className="percent">({Number(fee_category.over500K) * 100}% TAOE)</span>
    }

    return (
      <div key={fee_category.id} className="fee-category">
        <h5>
          <span className="title"><span className="category">{fee_category.name}</span>{format_percent}</span>
          {format_fee}
        </h5>
        <div className="description">{fee_category.description}</div>
      </div>
      )
    }, this);
    return fee_categories
  },
  render() {
    return (
      <div id="fee-schedule">
      {this.isMax()}
      <div id="schedule-table">
        <div>
          <div className="fee-category header">
            <h5>
              <div className="title">
                <span>Fee Category</span>
              </div>
              {this.feeHeader()}
            </h5>
          </div>
          {this.FeeCategoryRows()}
        </div>
      </div>
    </div>
    )
  }
});

// Existing Text for Publication
// ((operating_expenses/5000000)*0.075)+0.025

// Commissioned Text for Publication
// ((operating_expenses/5000000)*0.75)+0.25

// Day Rate for Performers
