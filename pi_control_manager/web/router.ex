defmodule PiCntrlMngr.Router do
  use PiCntrlMngr.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    #plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :auth do
    plug :accepts, ["json"]
    plug :fetch_session
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader
    #plug Guardian.Plug.EnsurePermissions, handler: PiCntrlMngr.SessionController, default: [:read], admin: [:all]
    plug Guardian.Plug.LoadResource
  end

  scope "/login", PiCntrlMngr do
    pipe_through :auth # Use the default browser stack
    post "/", SessionController, :user_login
  end

  scope "/api", PiCntrlMngr do
    pipe_through :api
    get "/user", ApiController, :verify_token
  end


  scope "/", PiCntrlMngr do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", PiCntrlMngr do
  #   pipe_through :api
  # end
end
