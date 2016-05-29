defmodule PiCntrlMngr.PageController do
  use PiCntrlMngr.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
