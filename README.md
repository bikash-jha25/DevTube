# Requirement Clarification

- 1.Features
  - Live Chat
  - Comments
  - Video Player

- 2.Teach Stack
  - Vite bundler
  - tailwind for styling
  - react router dom for routing
  - Redux for state management

# Architechture

- Header
- Body
  - SideBar
    - Menu Item
  - Main Container
    - Button List
      - Button
    - Video Container
      - Video card

# API CALL FOR Debouncing

- Getting the API key of youtube auto suggest
- Make api folder at root level
  - add suggetion.js inside api folder
- update vite.congig.js with new config
- update header to make api call

# Debouncing

- Suppose you press key= i and wait for 300 ms
  - as soon as you press i key useEffect called
  - New timer start for 300 ms
  - after 300 ms api call happens
  - you get your result
  - gain press key =ip wait for 300 gain get result

- Suppose you press key= i and not wait for 300 ms
  - as soon as you press i key useEffect called
  - New timer start for 300 ms
  - before 300 ms ends you type key=ip
  - then return function is called and old timer is destroyed
  - before calling useEffect that triggers key=\_p
  - for ip new timer starts for 300 ms

# Cache in debouncing

- Time complexity to search in array = O(n)
  [i, ip, iph, ipho ]

- Time complexity to search in object = O(1)
  {
  i:
  ip:
  iph:
  ipho:
  }

# Live chat feature

- setInterval (polling)[after evry 1500 ms new string and message genrated {name,msg}]
  ↓
  dispatch(addMessage) [after genration of {} we push that in to store]
  ↓
  Redux reducer updates state
  ↓
  useSelector detects change
  ↓
  React re-renders component 
  ↓
  .map() renders messages [visually looks like new messgage is popping but actually map
  iterated on entire message store and renders only new ones with key=uniqe ]
  ↓
  DOM updates efficiently


# Code Editor
  - Set Up the strcuture of input output box how it will look
  - install npm monac
  - inside input div -> copy editor componet
  - Out Put
    - As soon as i hit "Run Code" my all the code of editor shoud go and make a post request
    - Pass the current code of editor= value and current language to output component as prop. 
    - get the response and show on the output box