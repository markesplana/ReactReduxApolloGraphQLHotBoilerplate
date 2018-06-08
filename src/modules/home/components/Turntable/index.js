import React from "react"
import ReactDOM from "react-dom"
import ReactTurntable from "react-turntable"
import { Modal, Button, Table, Icon, Divider, Input, Checkbox } from 'antd'

import sizeMe from 'react-sizeme'
import Confetti from 'react-confetti'

import _ from 'lodash'
import logo from './kape2.gif';
import kape from './kape.gif'

const confirm = Modal.confirm;


function success(name, updateScore) {
    confirm({
        title: 'Magtimpla Ka na!',
        content:<div> 
                <Confetti style={{ position: "absolute", height: '100%', width: '100%' }} />

                <div style={{ textAlign: 'center' }}>
                    <img src={logo} style={{ height: 120 }} alt="logo" /><br />
                    <h3><strong>Sir {name}</strong></h3>
                </div>
                </div>,
    onOk() {
        updateScore(name)
    },
    onCancel() {
        console.log('Cancel');
    },
    });
}



const styles = {
    justifyContent:"center",
    alignContent:"center",
    display:"flex"
}





class Turntable extends React.PureComponent {
    constructor(){
        super()
        this.state = {
            name: null,
            mem: ["Mark", "Jerwin", "Oliver", "Dale", "Lan", "Carmelito", "Ems"],
            error: '',
            hasError: false,
        }
        this.emitEmpty = this.emitEmpty.bind(this)
        this.onChangeUserName = this.onChangeUserName.bind(this)
        this.AddMember = this.AddMember.bind(this)
        this.removeMember = this.removeMember.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    
  removeMember(id, handleDelete){
    confirm({
      title: 'Are you sure delete this task?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete(id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    
  }

    emitEmpty(){
        this.userNameInput.focus();
        this.setState({ name: '' });
    }
    onChangeUserName(e){
        this.setState({ name: e.target.value });
        
    }

    AddMember(){
        const { name } = this.state
        if(name == null || name == ''){
            this.setState({
                error: 'Maglagay ka ng pangalan TANGA!',
                hasError: true
            })
        }else{
            this.setState({
                error: '',
                hasError: false,
                name: ''
            })
            this.props.AddMember(name)
        }
      
    }

    onChange(e, id) {
        console.log(`checked ${e.target.checked}`);
        this.props.updateActive(id, e.target.checked)
      }

    render(){
        const { name, hasError } = this.state;

        const { members, handleDelete, updateScore } = this.props

        const activeMember = _.filter(members, function(o){
            return o.active == true
          })
      

        const prizes = _.map(activeMember, function(item){
            return item.name
        })


        const suffix = name ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        const options = {
            width: 500,
            eight: 500,
            primaryColor: "#827717",
            secondaryColor: "#9e9d24",
            fontStyle:{
                color:"#fff",
                size:"20px",
                fontVertical:true,
                fontWeight:"bold",
                fontFamily:"Microsoft YaHei"
            },
            speed : 30000,
            duration:10000,
            clickText:"Click",
            onComplete(prize){
              success(prize, updateScore)
            }
        }

        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          }, {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
          },{
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            render: (text, record) => (
                <span>
                    <Checkbox checked={record.active} onChange={(e) => {this.onChange(e, record.id)}}> Kasali</Checkbox>
                </span>
              ),
          }, {
            title: '...',
            key: 'action',
            render: (text, record) => (
              <span>
                <a onClick={() => { this.removeMember(record.id, handleDelete)}}>Delete</a>
                <Divider type="vertical" />
              </span>
            ),
          }];
        return(
            <section>
                <div className="row">
                    <div className="col-md-6">
                        <div style={styles}>
                            <ReactTurntable prizes={prizes} {...options}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                    <div className="media">
                        <div className="pull-left">
                            <img className="media-object" src={kape} style={{ width: 100, height: 100 }}/>
                        </div>
                        <div className="media-body" style={{paddingTop: 35}}>
                            <h4 className="media-heading">KopiKers</h4>
                            ICT
                        </div>
                        </div>
                        <Input
                            placeholder="Enter your name"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={suffix}
                            value={name}
                            onChange={this.onChangeUserName}
                            ref={node => this.userNameInput = node}
                            addonAfter={<Button type="primary" onClick={this.AddMember}>Add</Button>}
                        />
                        { hasError ? <small style={{color: "red"}}>{this.state.error}</small> : null }
                        <br />
                        <Table columns={columns} pagination="false" dataSource={members} pa size="small" />
                    </div>
                </div>
                
            </section>
        )
    }
} 




export default Turntable
