import gql from 'graphql-tag'

export const GET_MEMBERS = gql`
    query allMemberses{
        allMemberses{
            id
            name
            score
            active
        }
    }
`

export const CREATE_MEMBER = gql`
    mutation createMembers($name: String!, $score: Int!){
        createMembers(name: $name, score:$score){
            id
            name
            score
        }
    }
`

export const REMOVED_MEMBER = gql`
    mutation deleteMembers($id: ID!){
        deleteMembers(id:$id){
            id
            name
            score
        }
    }
`
export const UPDATE_SCORE = gql`
    mutation updateMembers($id: ID!, $score: Int){
        updateMembers(id:$id, score: $score){
            id
            name
            score
            active
        }
    }
`

export const UPDATE_ACTIVE = gql`
    mutation updateMembers($id: ID!, $active: Boolean){
        updateMembers(id:$id, active: $active){
            id
            name
            score
            active
        }
    }
`