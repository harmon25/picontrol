defmodule PiCntrlMngr.ApiController do
  use PiCntrlMngr.Web, :controller

  def verify_token(conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    json conn, %{user: user.name, admin: user.admin}
  end

end
