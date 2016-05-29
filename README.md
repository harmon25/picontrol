# picontrol
A modern distributed Phoenix/Elixir successor to [raspcontrol](https://github.com/harmon25/raspcontrol)

- `PiControlManager` connects to a list of known nodes on the LAN
- Should configure a common security cookie for all nodes
 - set the same value for every nodes `~/.erlang.cookie`
 - not very secure but better than nothing, all communication between nodes is plaintext
- `PiControlManager` has Phoenix API Server to host a modern React/Redux front-end.
- Authentication over JSON API
- Uses Phoenix Channels to communicate system stats to client
- Phoenix Authenticated channels also used to run a controlled group of commands on the connected Agents

## Architecture
- `PiControlManager` could be run on the same Pi as a `PiControlAgent`, but does not have to.
 - Splitting them up lets the Pis do whatever the Pis do, without having to manage any websocket connections or serve any files.
- `PiControlManager` communicates with agents via the erlang `:rpc` module
- `PiControlAgent` can be just about any host that runs Elixir/Erlang
- Designed with single board Linux computers in mind
  - Raspberry Pi, Banana Pi, BeagleBone, OrangePi ...

![PiControl](https://raw.githubusercontent.com/harmon25/picontrol/master/PiControl.png)


### Example of Gathering stats from agent nodes
```
 :rpc.call(:"agent1@APi1", PiCtrlAgnt.System, :cpu)
 :rpc.call(:"agent1@APi1", PiCtrlAgnt.System, :disks)
 :rpc.call(:"agent1@APi1", PiCtrlAgnt.System, :ram)
```
