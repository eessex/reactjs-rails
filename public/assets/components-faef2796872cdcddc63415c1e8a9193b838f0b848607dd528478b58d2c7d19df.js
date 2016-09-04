var Certification=React.createClass({displayName:"Certification",getInitialState:function(){return{certification:this.props.certification,editMode:!1,errors:{}}},setEditMode:function(){this.setState({editMode:!0})},handleFiscalStartChange:function(e){var t=this.state.certification;t.fiscal_start=e.target.value,this.setState({certification:t})},handleFiscalEndChange:function(e){var t=this.state.certification;t.fiscal_end=e.target.value,this.setState({certification:t})},handleStatusChange:function(e){var t=this.state.certification;t.status=e.target.value,this.setState({certification:t})},toggleStatus:function(){var e=this.state.certification;e.status=!this.state.certification.status,this.handleCertificationUpdate()},handleCertificationUpdate:function(){var e=this;$.ajax({method:"PUT",data:{certification:e.state.certification},url:"/certifications/"+e.state.certification.id+".json",success:function(t){e.setState({errors:{},certification:t,editMode:!1})},error:function(t){e.setState({errors:t.responseJSON.errors})}})},handleCertificationDelete:function(){var e=this;$.ajax({method:"DELETE",url:"/certifications/"+e.state.certification.id+".json",success:function(){e.props.onDeleteCertification(e.state.certification)}})},render:function(){return this.state.editMode?markup=React.createElement("tr",null,React.createElement("td",null,React.createElement("input",{type:"date",value:this.state.certification.fiscal_start,onChange:this.handleFiscalStartChange}),React.createElement("span",{style:{color:"red"}},this.state.errors.fiscal_start)),React.createElement("td",null,React.createElement("input",{type:"date",value:this.state.certification.fiscal_end,onChange:this.handleFiscalEndChange}),React.createElement("br",null),React.createElement("span",{style:{color:"red"}},this.state.errors.fiscal_start)),React.createElement("td",null,React.createElement("input",{type:"checkbox",value:this.state.certification.status,onChange:this.handleStatusChange})),React.createElement("td",null,React.createElement("button",{onClick:this.handleCertificationUpdate},"Save"))):markup=React.createElement("tr",null,React.createElement("td",null,this.state.certification.fiscal_start),React.createElement("td",null,this.state.certification.fiscal_end),React.createElement("td",null,this.state.certification.status?"\u2714":""),React.createElement("td",null,React.createElement("button",null,"Edit"),React.createElement("button",null,this.state.certification.status?"Demote":"Promote"),React.createElement("button",{onClick:this.handleCertificationDelete,style:{color:"red"}},"Delete"))),markup}}),Certifications=React.createClass({displayName:"Certifications",getInitialState:function(){return{certifications:this.props.certifications,certification:{fiscal_start:"",fiscal_end:"",status:0},errors:{}}},handleFiscalStartChange:function(e){var t=this.state.certification;t.fiscal_start=e.target.value,this.setState({certification:t})},handleFiscalEndChange:function(e){var t=this.state.certification;t.fiscal_end=e.target.value,this.setState({certification:t})},handleStatusChange:function(e){var t=this.state.certification;t.status=e.target.value,this.setState({certification:t})},handleAddCertification:function(){var e=this;$.ajax({method:"POST",data:{certification:e.state.certification},url:"/certifications.json",success:function(t){var a=e.state.certifications;a.push(t),e.setState({certifications:a,certification:{fiscal_start:"",fiscal_end:"",status:0},errors:{}})},error:function(t){e.setState({errors:t.responseJSON.errors})}})},handleDeleteCertification:function(e){var t=this.state.certifications.filter(function(t){return e.id!==t.id});this.setState({certifications:t})},render:function(){var e=this;return certifications=this.state.certifications.map(function(t){return React.createElement(Certification,{certification:t,key:t.id,onDeleteCertification:e.handleDeleteCertification})}),React.createElement("div",null,React.createElement("h1",null,"Certifications"),React.createElement("div",{id:"certifications"},React.createElement("table",null,React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null,"Fiscal Start"),React.createElement("th",null,"Fiscal End"),React.createElement("th",null,"Manager"))),React.createElement("tbody",null,certifications,React.createElement("tr",null,React.createElement("td",null,React.createElement("input",{type:"text",value:this.state.certification.name,onChange:this.handleFiscalStartChange}),React.createElement("br",null),React.createElement("span",{style:{color:"red"}},this.state.errors.name)),React.createElement("td",null,React.createElement("input",{value:this.state.certification.fiscal_end,type:"text",onChange:this.handleFiscalEndChange}),React.createElement("br",null),React.createElement("span",{style:{color:"red"}},this.state.errors.fiscal_end)),React.createElement("td",null,React.createElement("input",{value:this.state.certification.status,type:"checkbox",onChange:this.handleStatusChange})),React.createElement("td",null,React.createElement("button",{onClick:this.handleAddCertification},"New")))))))}}),Employee=React.createClass({displayName:"Employee",getInitialState:function(){return{employee:this.props.employee,editMode:!1,errors:{}}},setEditMode:function(){this.setState({editMode:!0})},handleNameChange:function(e){var t=this.state.employee;t.name=e.target.value,this.setState({employee:t})},handleEmailChange:function(e){var t=this.state.employee;t.email=e.target.value,this.setState({employee:t})},handleManagerChange:function(e){var t=this.state.employee;t.manager=e.target.value,this.setState({employee:t})},toggleManagerStatus:function(){var e=this.state.employee;e.manager=!this.state.employee.manager,this.handleEmployeeUpdate()},handleEmployeeUpdate:function(){var e=this;$.ajax({method:"PUT",data:{employee:e.state.employee},url:"/employees/"+e.state.employee.id+".json",success:function(t){e.setState({errors:{},employee:t,editMode:!1})},error:function(t){e.setState({errors:t.responseJSON.errors})}})},handleEmployeeFire:function(){var e=this;$.ajax({method:"DELETE",url:"/employees/"+e.state.employee.id+".json",success:function(){e.props.onFireEmployee(e.state.employee)}})},render:function(){return this.state.editMode?markup=React.createElement("tr",null,React.createElement("td",null,React.createElement("input",{type:"text",value:this.state.employee.name,onChange:this.handleNameChange}),React.createElement("span",{style:{color:"red"}},this.state.errors.name)),React.createElement("td",null,React.createElement("input",{type:"text",value:this.state.employee.email,onChange:this.handleEmailChange}),React.createElement("br",null),React.createElement("span",{style:{color:"red"}},this.state.errors.email)),React.createElement("td",null,React.createElement("input",{type:"checkbox",value:this.state.employee.manager,onChange:this.handleManagerChange})),React.createElement("td",null,React.createElement("button",{onClick:this.handleEmployeeUpdate},"Save"))):markup=React.createElement("tr",null,React.createElement("td",null,this.state.employee.name),React.createElement("td",null,this.state.employee.email),React.createElement("td",null,this.state.employee.manager?"\u2714":""),React.createElement("td",null,React.createElement("button",{onClick:this.setEditMode},"Edit"),React.createElement("button",{onClick:this.toggleManagerStatus},this.state.employee.manager?"Demote":"Promote"),React.createElement("button",{onClick:this.handleEmployeeFire,style:{color:"red"}},"Fire"))),markup}}),Employees=React.createClass({displayName:"Employees",getInitialState:function(){return{employees:this.props.employees,employee:{name:"",email:"",manager:!1},errors:{}}},handleNameChange:function(e){var t=this.state.employee;t.name=e.target.value,this.setState({employee:t})},handleEmailChange:function(e){var t=this.state.employee;t.email=e.target.value,this.setState({employee:t})},handleManagerChange:function(e){var t=this.state.employee;t.manager=e.target.value,this.setState({employee:t})},handleHireEmployee:function(){var e=this;$.ajax({method:"POST",data:{employee:e.state.employee},url:"/employees.json",success:function(t){var a=e.state.employees;a.push(t),e.setState({employees:a,employee:{name:"",email:"",manager:!1},errors:{}})},error:function(t){e.setState({errors:t.responseJSON.errors})}})},handleFireEmployee:function(e){var t=this.state.employees.filter(function(t){return e.id!==t.id});this.setState({employees:t})},render:function(){var e=this;return employees=this.state.employees.map(function(t){return React.createElement(Employee,{employee:t,key:t.id,onFireEmployee:e.handleFireEmployee})}),React.createElement("div",null,React.createElement("h1",null,"Employees"),React.createElement("div",{id:"employees"},React.createElement("table",null,React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null,"Name"),React.createElement("th",null,"Email"),React.createElement("th",null,"Manager"))),React.createElement("tbody",null,employees,React.createElement("tr",null,React.createElement("td",null,React.createElement("input",{type:"text",value:this.state.employee.name,onChange:this.handleNameChange}),React.createElement("br",null),React.createElement("span",{style:{color:"red"}},this.state.errors.name)),React.createElement("td",null,React.createElement("input",{value:this.state.employee.email,type:"text",onChange:this.handleEmailChange}),React.createElement("br",null),React.createElement("span",{style:{color:"red"}},this.state.errors.email)),React.createElement("td",null,React.createElement("input",{value:this.state.employee.manager,type:"checkbox",onChange:this.handleManagerChange})),React.createElement("td",null,React.createElement("button",{onClick:this.handleHireEmployee},"Hire")))))))}});