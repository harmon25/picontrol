defmodule PiCtrlAgnt.SysInfo do
  @moduledoc """
  Functions used to gather information or stats about an Agent system
  """

  @node_name Node.self()
  @banana_temp "/sys/devices/platform/sunxi-i2c.0/i2c-0/0-0034/temp1_input"
  @pi_temp "/sys/class/thermal/thermal_zone0/temp"

  @doc """
  CPU performance statistics
  """
  def cpu_perf() do
    %{@node_name => %{"avg1" => :cpu_sup.avg1,
                      "avg5" => :cpu_sup.avg5,
                      "avg15" => :cpu_sup.avg15,
                      "details" => :cpu_sup.util([:per_cpu])
                    }
      }
  end

  @doc """
  Disk information
  """
  def disks() do
    %{@node_name => :disksup.get_disk_data}
  end

  @doc """
  RAM information
  """
  def ram() do
    %{@node_name => :memsup.get_system_memory_data}
  end

  @doc """
  Network interaface details
  """
  def net_info() do
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

  @doc """
  Network interface RX/TX statistics
  """
  def net_stats() do
    {:ok, interface_info} = :inet.getifaddrs()
     {:ok, file_pid} = File.open "/proc/net/dev", [:read]
     net_stats = IO.binread(file_pid, :all) |> parse_net_stats
    %{@node_name => net_stats}
  end

  @doc """
  System kernel
  """
  def kernel() do
    result = Porcelain.shell("uname -mrs")
    k = result.out |> String.strip
    %{@node_name => k}
  end

  @doc """
  Currently logged in users
  """
  def users() do
    result = Porcelain.shell("who")
    user_list = result.out |> String.split("\n", trim: true) |> Enum.map(&(String.split(&1, " ", trim: true)))
    %{@node_name => user_list}
  end

  @doc """
  System uptime in seconds
  """
  def uptime() do
     {:ok, file_pid} = File.open "/proc/uptime", [:read]
      u = IO.binread(file_pid, :all) |> String.split |> List.first |> String.to_float
     %{@node_name =>   u}
  end


  @doc """
  CPU Temp in C and F
  """
  def cpu_temp() do
    {:ok, file_pid} =
    case(cpu_type) do
      "BCM" <> _ ->  File.open @pi_temp, [:read]
      "sun" <> _ ->  File.open @banana_temp, [:read]
    end
   temp = IO.binread(file_pid, :all) |> String.strip |> String.to_integer(10)
   c = temp/1000
   f = (c*1.8) + 32
   %{@node_name => {c,f}}
  end


  @doc """
  Distro name
  """
  def distro() do
    {:ok, file_pid} = File.open "/etc/os-release", [:read]
     [distro] = Enum.filter IO.stream(file_pid, :line), &(String.contains?(&1, "PRETTY"))
     distro_stripped =  String.split(distro, "=", trim: true) |> List.last |>  String.strip |> String.strip(?")
    %{@node_name => distro_stripped}
  end

  @doc """
  CPU name
  """
  def cpu_name() do
     %{@node_name => cpu_type}
  end

  defp cpu_type() do
     {:ok, file_pid} = File.open "/proc/cpuinfo", [:read]
      [hw] = Enum.filter IO.stream(file_pid, :line), &(String.contains?(&1, "Hardware"))
      String.split(hw, " ", trim: true) |> List.last |> String.strip
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
