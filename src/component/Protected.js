import React from 'react'
import { Route, redirect } from 'react-router-dom'

export default function ProtectedRouter(element, ...rest) {
    var RenderComponents = element;
    console.log(element)
  return (
    <Route {...rest} render = {
        props =>{
            return false ? <RenderComponents {...props} /> : <redirect to = {{ pathname : '/login'}} />;
            
        }
    } />
  )
}


