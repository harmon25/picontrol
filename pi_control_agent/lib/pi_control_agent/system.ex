defmodule PiCtrlAgnt.System do
  @node_name Node.self()

  def cpu() do
    %{@node_name => {:cpu_sup.avg1, :cpu_sup.avg5, :cpu_sup.avg15}}
  end

  def disks() do
    %{@node_name => :disksup.get_disk_data}
  end

  def ram() do
    %{@node_name => :memsup.get_system_memory_data}
  end

  def net() do
    %{@node_name => :inet.getifaddrs()}
  end
end
