# PiCntrlMngr
The heart or brain of PiControl, a coordinator and manager of `PiControlAgents`.

- A modern, distributed, successor to [RaspControl](https://github.com/harmon25/raspcontrol)
  - Powered by a Phoenix Server, and React/Redux Client

- `PiControlAgents` can be just about any host that runs erlang
- Designed with single board Linux computers in mind
  - Raspberry Pi, Banana Pi, BeagleBone, OrangePi ...


# Getting Started
```sh
# Use docker to run a postgres database
# (Create a better password in production)
docker run --name phoenix-pg -e POSTGRES_PASSWORD=postgres -d postgres:9.5

cd picontrol/pi_control_manager
# Run mix task to create database
mix ecto.create

# launch manager with a short name in interactive shell
iex --sname manager -S mix phoenix.server
```
# Create a user!
alias PiCntrlMngr.User
changeset = User.add_user_changeset(%User{}, %{name: "harmon",
                                             password: "strongpass",
                                             admin: true,
                                             email: "nomraharmon@gmail.com"
                                           })

changeset.valid?

PiCntrlMngr.Repo.insert(changeset)


Within the Elixir shell will have access to the Manager module
- `connect_agents/0` connects connfigured agents
- `gather_stats/1` runs a :rpc.multicall on all agents to retrieve system stats
```elixir
PiCntrlMngr.Manager.connect_agents

PiCntrlMngr.Manager.gather_stats :cpu
PiCntrlMngr.Manager.gather_stats :net
PiCntrlMngr.Manager.gather_stats :ram
PiCntrlMngr.Manager.gather_stats :disks
```
