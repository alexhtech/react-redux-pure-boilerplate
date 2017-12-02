import React from 'react'
import styled from 'styled-components'
import {Link, NavLink} from 'react-router-dom'
import logo from '../../assets/react.png'


export default class Navigation extends React.Component {
    render() {
        return (
            <Wrapper>
                <Link to={{pathname: '/'}}>
                    <img src={logo}/>
                </Link>
                <Items>
                    <NavItem to={{pathname: '/test'}}>
                        Test
                    </NavItem>
                    <NavItem to={{pathname: '/users'}}>
                        Users
                    </NavItem>
                    <NavItem to={{pathname: '/catalog'}}>
                        Catalog
                    </NavItem>
                    <NavItem to={{pathname: '/catalog/items'}}>
                        Catalog/Items
                    </NavItem>
                </Items>
            </Wrapper>
        )
    }
}


const Wrapper = styled.div`
    display: flex;
    img{
        height: 40px;
        margin: 0 10px;
    }
    a{
        height: 40px;
    }
    align-items: center;
    border-radius: 0 0 5px 5px;
    box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.17);
    background: white;
`

const Items = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    li{
        display: inline-block;
        padding: 1rem 1.5rem;
        color: black;
        text-decoration: none;
        text-transform: uppercase;
    }
    a.active li{
        background: rgb(243, 243, 243);
        
    }
    a.active li{
        color: #3c3c3c;
    }
    
`

const NavItem = ({children, ...props}) => (
    <NavLink {...props}>
        <li>{children}</li>
    </NavLink>
)

