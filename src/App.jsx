import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(10)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerate = useCallback(() => {
    let pass = " "
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*`~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 9)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerate()
  },
    [length, numberAllowed, charAllowed, passwordGenerate])
  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-3 my-9 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-4'>Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-6'>
        <input
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-teal-600 hover:bg-teal-800 text-white px-2 py-1 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type='range'
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-2'>
          <input
            type='checkbox'
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-2'>
          <input
            type='checkbox'
            defaultChecked={charAllowed}
            id='characterInput'
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor='characterInput'>Characters</label>
        </div>
      </div>
      <div className='my-4 mb-3'v>
        <img src='https://i.etsystatic.com/41340875/r/il/67b5eb/4715093007/il_fullxfull.4715093007_e4o3.jpg' />
      </div>
    </div>

  )
}

export default App
