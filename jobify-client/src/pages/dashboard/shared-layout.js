import React from 'react'
import Wrapper from '../../assets/wrappers/SharedLayout'
import { Link, Outlet } from 'react-router-dom'

const SharedLayout = () => {
  return (
    <Wrapper>
        <nav>
            <Link to="add-job">Add job</Link>
            <Link to="all-jobs">All jobs</Link>
        </nav>
        <Outlet />
    </Wrapper>
  )
}

export default SharedLayout