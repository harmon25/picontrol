# picontrol
A modern distributed Phoenix/Elixir successor to [raspcontrol](https://github.com/harmon25/raspcontrol)

- PiControlManager connects to a list of known nodes on the LAN
- Should configure a common security cookie for all nodes
 - set the same value for every nodes `~/.erlang.cookie`
 - not very secure but better than nothing, all communication between nodes is plaintext
- PiControlManager has Phoenix API Server to host a modern React/Redux front-end.
- Authentication over JSON API
- Uses Phoenix Channels to communicate system stats to client
- Phoenix Authenticated channels also used to run a controlled group of commands on the connected Agents

## Architecture
![PiControl](https://github.com/harmon25/picontrol/PiControl.png)
