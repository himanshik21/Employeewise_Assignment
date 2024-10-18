/* eslint-disable react/prop-types */
const LogoutBtn = ({logoutHandler}) => {
  return (
    <button className='logoutBtn' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn