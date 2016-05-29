defmodule PiCtrlAgnt.System do

  def cpu() do
     {:cpu_sup.avg1, :cpu_sup.avg5, :cpu_sup.avg15}
  end

  def disks() do
     :disksup.get_disk_data
  end

  def mem() do
     :memsup.get_system_memory_data
  end

end
