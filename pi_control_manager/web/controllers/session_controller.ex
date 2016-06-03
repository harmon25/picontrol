defmodule PiCntrlMngr.SessionController do
  use PiCntrlMngr.Web, :controller
  import Ecto.Query, only: [from: 2]
  alias PiCntrlMngr.User
  alias PiCntrlMngr.Repo

  plug :scrub_params, "user" when action in [:user_login]

  def user_login(conn, %{"user"=> username, "pass"=> password}) do
      case(do_i_know_you?(username, password)) do
        {:error, msg} ->
          put_status(conn, 401)
          |> json(%{error: msg})

        {:ok, user} -> send_token(conn, user)
      end
  end

  defp send_token(conn, user) do
    case(user.admin) do
      true ->
         conn = Guardian.Plug.sign_in(conn, user, :token, perms: %{ default: [:read, :write], admin: [:all] })
         token = Map.fetch!(conn.private.plug_session, "guardian_default")
         json conn, %{user: user.name, admin: user.admin, token: token}
      false ->
         conn = Guardian.Plug.sign_in(conn, user, :token, perms: %{default: [:read]})
         token = Map.fetch!(conn.private.plug_session, "guardian_default")
         json conn, %{user: user.name, admin: user.admin, token: token}
    end
  end

  defp do_i_know_you?(username, password) do
    case(Repo.get_by(User, name: username)) do
       nil ->
         {:error, "Invalid Login"}
       user->
         case(Comeonin.Bcrypt.checkpw(password, user.password_hash)) do
            true ->
               {:ok, user}
            false ->
              {:error, "Invalid Login"}
         end
    end
  end

end
