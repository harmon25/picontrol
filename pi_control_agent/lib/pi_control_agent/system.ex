defmodule PiCtrlAgnt.System do

  @node_name Node.self()
  @banana_temp "/sys/devices/platform/sunxi-i2c.0/i2c-0/0-0034/temp1_input"
  @pi_temp "/sys/class/thermal/thermal_zone0/temp"


  def cpu() do
    cpu_details = :cpu_sup.util([:per_cpu])
    %{@node_name => %{avg1: :cpu_sup.avg1, avg5: :cpu_sup.avg5, avg15: :cpu_sup.avg15, details: cpu_details }}
  end

  def disks() do
    %{@node_name => :disksup.get_disk_data}
  end

  def ram() do
    %{@node_name => :memsup.get_system_memory_data}
  end

  def net() do
    {:ok, interface_info} = :inet.getifaddrs()
    interfaces =
    Enum.filter_map(interface_info,
    fn({int_name, int_details}) ->
      Keyword.fetch!(int_details, :flags)
      |> Enum.member?(:up)
    end,
    fn({int_name, int_details}) ->
       mac = Keyword.get(int_details, :hwaddr)
        |> Enum.map(&(pad_mac(Integer.to_string(&1, 16))))
        |> Enum.join(":")
       {int_name, %{ip: Keyword.get(int_details, :addr), mac: mac}}
    end)
    %{@node_name => interfaces}
  end

  def net_stats() do
    {:ok, interface_info} = :inet.getifaddrs()
     {:ok, file_pid} = File.open "/proc/net/dev", [:read]
     net_stats = IO.binread(file_pid, :all) |> parse_net_stats
    %{@node_name => net_stats}
  end

  def cpu_temp() do
    {:ok, file_pid} =
    case(cpu_type) do
      "BCM" <> _ ->  File.open @pi_temp, [:read]
      "sun" <> _ ->  File.open @banana_temp, [:read]
    end
   temp = IO.binread(file_pid, :all)
  end


  def cpu_type() do
     {:ok, file_pid} = File.open "/proc/cpuinfo", [:read]
      [hw] = Enum.filter IO.stream(file_pid, :line), &(String.contains?(&1, "Hardware"))
      String.split(hw) |> List.last |> String.strip
  end

  defp parse_net_stats(data) do
     # this is a bit verbose..but works
    String.split(data, "\n")
    |> Enum.drop(2)
    |> List.delete_at(-1)
    |> Enum.map(&(String.strip(&1)))
    |> Enum.map(&(String.split(&1)))
    |> Enum.map(
     fn([ifname | stats]) ->
      interface = String.rstrip(ifname, ?:)
      %{"name" =>  interface,
        "rx_bytes" => Enum.fetch!(stats,0),
        "rx_packets" => Enum.fetch!(stats,1),
        "tx_bytes" => Enum.fetch!(stats,8),
        "tx_packets" => Enum.fetch!(stats,9),
       }
     end)
  end




  # little function to pad a MAC address byte
  defp pad_mac(string_digit) when byte_size(string_digit) != 2, do: "0#{string_digit}"
  defp pad_mac(string_digit) when byte_size(string_digit) == 2, do: string_digit


end
