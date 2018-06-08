import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { compose } from 'recompose'
import { graphql, withApollo } from 'react-apollo'
import { Grid, PageHeader } from 'react-bootstrap'
import { showSpinnerWhileApolloLoading, showApolloError, showNoData } from 'common/helpers'
import { GET_MEMBERS, CREATE_MEMBER, REMOVED_MEMBER, UPDATE_SCORE, UPDATE_ACTIVE } from 'modules/home/qql'
import Turntable from 'modules/home/components/Turntable'
import _ from 'lodash'


class HomePage extends React.PureComponent{
  constructor(props){
    super(props)
    this.state = {

    }
    
    this.handleDelete = this.handleDelete.bind(this)
    this.AddMember = this.AddMember.bind(this)
    this.updateScore = this.updateScore.bind(this)
    this.updateActive = this.updateActive.bind(this)
  }


  handleDelete(id){
    this.props.client.mutate({
      mutation: REMOVED_MEMBER,
      variables: {
        id
      },
      refetchQueries:[{
        query: GET_MEMBERS
      }]
    })
    .then((res) => {
      console.log(res)
    })
  }

  updateScore(name){
   
    const { allMemberses } = this.props.data
    const filterMember = _.filter(allMemberses, function(o){
      return o.name == name
    })
   
    const newScore = filterMember[0].score + 1

    console.log("name", filterMember)
    this.props.client.mutate({
      mutation: UPDATE_SCORE,
      variables: {
        id: filterMember[0].id,
        score: newScore
      },
      refetchQueries:[{
        query: GET_MEMBERS
      }]
    })
    .then((res) => {
      console.log(res)
    })
  }

  updateActive(id, active){
    console.log(active)
    this.props.client.mutate({
      mutation: UPDATE_ACTIVE,
      variables: {
        id,
        active: active
      },
      refetchQueries:[{
        query: GET_MEMBERS
      }]
    })
    .then((res) => {
      console.log(res)
    })
  }


  AddMember(name){
    this.props.client.mutate({
       mutation: CREATE_MEMBER,
       variables: {
         name,
         score: 0
       },
       refetchQueries:[{
         query: GET_MEMBERS
       }]
    })
    .then((res) => {
      console.log(res)
    })
  }


  
  render(){
    const { allMemberses } = this.props.data
    console.log(this.props)

   
    return(
      <div>
      <Grid>
        <Turntable 
          updateActive={this.updateActive}
          updateScore={this.updateScore}
          handleDelete={this.handleDelete}
          AddMember={this.AddMember} 
          members={allMemberses} />
      </Grid>
      </div>
    )
  }

}


const enhance = compose(
  withApollo,
  graphql(GET_MEMBERS),
  showApolloError(),
  showSpinnerWhileApolloLoading(),
  showNoData(props => !props.data.allMemberses)('There are no member in database.'),
)


export default enhance(HomePage)
