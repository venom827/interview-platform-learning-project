import './App.css'
import {SignInButton,SignedOut,SignedIn,SignOutButton,UserButton} from "@clerk/clerk-react"
function App() {
 
  return (
    <>
      
      <h1>Welcome to the app</h1>
      <SignedOut>
        <SignInButton mode="modal"/>
      </SignedOut>

      <SignedIn>
        <SignOutButton mode="modal"/>
      </SignedIn>

      <UserButton/>
      
    </>
  )
}

export default App;