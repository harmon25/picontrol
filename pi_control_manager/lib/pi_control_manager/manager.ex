defmodule PiCntrlMngr.Manager do
  # grab agents list from application config
  @agents Application.get_env(:pi_control_manager, :agents)

  @doc ~S"""
    Try and connect to all agents
  """
  def connect_agents() do
     Enum.map(@agents, fn(n) ->
       {n, Node.connect(n)}
     end)
  end

  @doc ~S"""
    Try and connect to a list of agents.
  """
  def connect_agents(agents_list) do
     Enum.map(agents_list, fn(n) ->
       {n, Node.connect(n)}
     end)
  end


  @doc ~S"""
    Run RPC multicall on list of configured agents.
    Returns a keyword list with the node name as the key,
    and result of RPC call on that node as the value
    Currently can only run funtions in the PiCtrlAgnt.System Module
  """
  def gather_stats(function_name) do
    {resp, bad_nodes } = :rpc.multicall(@agents, PiCtrlAgnt.SysInfo, function_name, [])
    resp
  end

end
